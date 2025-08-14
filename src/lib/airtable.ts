import Airtable from 'airtable';

// Airtable 설정
const getAirtableConfig = () => {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!apiKey) {
    throw new Error('AIRTABLE_API_KEY가 설정되지 않았습니다.');
  }

  if (!baseId) {
    throw new Error('AIRTABLE_BASE_ID가 설정되지 않았습니다.');
  }

  return { apiKey, baseId };
};

const airtable = new Airtable({
  apiKey: getAirtableConfig().apiKey,
});

const baseId = getAirtableConfig().baseId;
const base = airtable.base(baseId);
const customersTable = base('Customers');

export interface CustomerData {
  Name: string;
  Phone?: string;
  Email: string;
  Tier?: string;
  'Total Purchases'?: number;
  'Purchase Count'?: number;
  'Favorite Category'?: string;
}

export interface AirtableCustomerRecord {
  id: string;
  fields: CustomerData;
}

export class AirtableService {
  /**
   * 새로운 고객을 Customers 테이블에 추가
   */
  static async createCustomer(customerData: CustomerData): Promise<AirtableCustomerRecord> {
    try {
      console.log('=== createCustomer 시작 ===');
      console.log('입력 데이터:', customerData);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const record = await (customersTable.create as any)([
        {
          fields: customerData
        }
      ]);

      if (record && record.length > 0) {
        const newRecord = {
          id: record[0].id,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          fields: record[0].fields as any
        };
        console.log('Customer created successfully:', newRecord);
        return newRecord;
      }

      throw new Error('Failed to create customer record');
    } catch (error) {
      console.error('Error creating customer in Airtable:', error);
      throw error;
    }
  }

  /**
   * 이메일로 고객 검색
   */
  static async findCustomerByEmail(email: string): Promise<AirtableCustomerRecord | null> {
    try {
      console.log('Searching for customer with email:', email);

      const records = await customersTable.select({
        filterByFormula: `{Email} = '${email}'`
      }).firstPage();

      if (records && records.length > 0) {
        const customer = {
          id: records[0].id,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          fields: records[0].fields as any
        };
        console.log('Customer found:', customer);
        return customer;
      }

      console.log('No customer found with email:', email);
      return null;
    } catch (error) {
      console.error('Error finding customer in Airtable:', error);
      return null;
    }
  }

  /**
   * 핸드폰 번호로 고객 검색
   */
  static async findCustomerByPhone(phone: string): Promise<AirtableCustomerRecord | null> {
    try {
      console.log('Searching for customer with phone:', phone);

      if (!phone || phone.trim() === '') {
        console.log('Phone number is empty, skipping search');
        return null;
      }

      const records = await customersTable.select({
        filterByFormula: `{Phone} = '${phone.trim()}'`
      }).firstPage();

      if (records && records.length > 0) {
        const customer = {
          id: records[0].id,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          fields: records[0].fields as any
        };
        console.log('Customer found by phone:', customer);
        return customer;
      }

      console.log('No customer found with phone:', phone);
      return null;
    } catch (error) {
      console.error('Error finding customer by phone in Airtable:', error);
      return null;
    }
  }

  /**
   * 고객 정보 업데이트
   */
  static async updateCustomer(recordId: string, updates: Partial<CustomerData>): Promise<AirtableCustomerRecord> {
    try {
      console.log('Updating customer:', recordId, 'with updates:', updates);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const record = await (customersTable.update as any)([
        {
          id: recordId,
          fields: updates
        }
      ]);

      if (record && record.length > 0) {
        const updatedRecord = {
          id: record[0].id,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          fields: record[0].fields as any
        };
        console.log('Customer updated successfully:', updatedRecord);
        return updatedRecord;
      }

      throw new Error('Failed to update customer record');
    } catch (error) {
      console.error('Error updating customer in Airtable:', error);
      throw error;
    }
  }

  /**
   * 사용자 정보를 Airtable에 동기화 (기존 사용자 확인 후 없으면 생성)
   */
  static async syncUserToAirtable(userData: {
    email: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
  }): Promise<AirtableCustomerRecord> {
    try {
      console.log('=== syncUserToAirtable 시작 ===');
      console.log('사용자 데이터:', userData);

      // 1. 이메일로 기존 고객 확인
      const existingCustomer = await this.findCustomerByEmail(userData.email);

      if (existingCustomer) {
        console.log('기존 고객 발견:', existingCustomer.id);

        // 2. 기존 고객 정보 업데이트 (필요한 경우)
        const updates: Partial<CustomerData> = {};
        let hasUpdates = false;

        const fullName = `${userData.firstName || ''} ${userData.lastName || ''}`.trim() || 'Unknown';
        if (existingCustomer.fields.Name !== fullName) {
          updates.Name = fullName;
          hasUpdates = true;
        }

        if (userData.phone && existingCustomer.fields.Phone !== userData.phone) {
          updates.Phone = userData.phone;
          hasUpdates = true;
        }

        if (hasUpdates) {
          console.log('고객 정보 업데이트 중:', updates);
          return await this.updateCustomer(existingCustomer.id, updates);
        } else {
          console.log('업데이트할 정보 없음, 기존 고객 반환');
          return existingCustomer;
        }
      } else {
        // 3. 새 고객 생성
        console.log('기존 고객 없음, 새 고객 생성 중...');
        const customerData: CustomerData = {
          Name: `${userData.firstName || ''} ${userData.lastName || ''}`.trim() || 'Unknown',
          Email: userData.email,
          Phone: userData.phone || '',
          'Total Purchases': 0,
          'Purchase Count': 0,
        };

        return await this.createCustomer(customerData);
      }
    } catch (error) {
      console.error('Error syncing user to Airtable:', error);
      throw error;
    }
  }

  /**
   * Airtable 연결 테스트
   */
  static async testConnection(): Promise<boolean> {
    try {
      console.log('Testing Airtable connection...');
      
      await customersTable.select({
        maxRecords: 1
      }).firstPage();

      console.log('Airtable connection successful');
      return true;
    } catch (error) {
      console.error('Airtable connection failed:', error);
      return false;
    }
  }
} 