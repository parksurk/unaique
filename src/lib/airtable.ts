import Airtable from 'airtable';

// Airtable 설정 - 지연 평가로 변경
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

// 지연 평가를 위한 함수들
const getAirtableInstance = () => {
  const config = getAirtableConfig();
  return new Airtable({ apiKey: config.apiKey });
};

const getBase = () => {
  const config = getAirtableConfig();
  return getAirtableInstance().base(config.baseId);
};

const getCustomersTable = () => {
  return getBase()('Customers');
};

const getTemplatesTable = () => {
  return getBase()('Templates');
};

export interface CustomerData {
  ID?: string;             // 비즈니스 ID (직접 만든 필드, 변경 가능)
  Name: string;
  Phone?: string;
  Email: string;
  Tier?: string;
  'Total Purchases'?: number;
  'Purchase Count'?: number;
  'Favorite Category'?: string;
  [key: string]: unknown; // 인덱스 시그니처 추가
}

export interface TemplateData {
  Category: string;        // 템플릿 카테고리 (교육, 마케팅, 엔터테인먼트, 비즈니스)
  Name: string;            // 템플릿 이름
  Desc: string;            // 템플릿 설명
  아이디어: string;        // 주요 기능 및 아이디어
  Duration?: string;       // 영상 길이
  Difficulty?: string;     // 난이도
  Thumbnail?: string;      // 썸네일 이모지
  [key: string]: unknown;  // 인덱스 시그니처 추가
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
      const record = await (getCustomersTable().create as any)([
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

      const records = await getCustomersTable().select({
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

      const records = await getCustomersTable().select({
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
      const record = await (getCustomersTable().update as any)([
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
      
      await getCustomersTable().select({
        maxRecords: 1
      }).firstPage();

      console.log('Airtable connection successful');
      return true;
    } catch (error) {
      console.error('Airtable connection failed:', error);
      return false;
    }
  }

  /**
   * 이메일로 고객 정보를 완전히 조회 (세션 저장용)
   */
  static async getCustomerForSession(email: string): Promise<AirtableCustomerRecord | null> {
    try {
      console.log('Getting customer data for session:', email);

      const records = await getCustomersTable().select({
        filterByFormula: `{Email} = '${email}'`
      }).firstPage();

      if (records && records.length > 0) {
        const customer = {
          id: records[0].id,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          fields: records[0].fields as any
        };
        console.log('Customer data retrieved for session:', customer);
        return customer;
      }

      console.log('No customer found for session with email:', email);
      return null;
    } catch (error) {
      console.error('Error getting customer data for session:', error);
      return null;
    }
  }

  /**
   * 템플릿 데이터 일괄 추가 (Airtable 제한: 한 번에 최대 10개)
   */
  static async addTemplates(templates: TemplateData[]): Promise<boolean> {
    try {
      console.log('=== 템플릿 일괄 추가 시작 ===');
      console.log('추가할 템플릿 수:', templates.length);
      console.log('첫 번째 템플릿 샘플:', templates[0]);

      // Airtable 연결 테스트
      console.log('Airtable 연결 테스트 중...');
      const connectionTest = await this.testConnection();
      if (!connectionTest) {
        throw new Error('Airtable 연결 실패');
      }
      console.log('✅ Airtable 연결 성공');

      // Templates 테이블 존재 확인
      console.log('Templates 테이블 접근 테스트 중...');
      try {
        await getTemplatesTable().select({ maxRecords: 1 }).firstPage();
        console.log('✅ Templates 테이블 접근 성공');
      } catch (tableError) {
        console.error('❌ Templates 테이블 접근 실패:', tableError);
        throw new Error(`Templates 테이블 접근 실패: ${tableError instanceof Error ? tableError.message : 'Unknown error'}`);
      }

      // Airtable 제한: 한 번에 최대 10개 레코드 생성 가능
      const BATCH_SIZE = 10;
      const totalTemplates = templates.length;
      let successCount = 0;

      console.log(`배치 크기: ${BATCH_SIZE}, 총 템플릿: ${totalTemplates}`);

      // 템플릿을 배치로 나누어 처리
      for (let i = 0; i < totalTemplates; i += BATCH_SIZE) {
        const batch = templates.slice(i, i + BATCH_SIZE);
        const batchNumber = Math.floor(i / BATCH_SIZE) + 1;
        const totalBatches = Math.ceil(totalTemplates / BATCH_SIZE);
        
        console.log(`배치 ${batchNumber}/${totalBatches} 처리 중... (${batch.length}개)`);

        // 템플릿 데이터 변환
        const templateRecords = batch.map(template => ({
          fields: template
        }));

        // 배치별 템플릿 생성
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const records = await (getTemplatesTable().create as any)(templateRecords);

        if (records && records.length > 0) {
          successCount += records.length;
          console.log(`✅ 배치 ${batchNumber} 성공: ${records.length}개 추가됨`);
        } else {
          throw new Error(`배치 ${batchNumber} 실패: 레코드가 반환되지 않음`);
        }

        // 마지막 배치가 아니면 잠시 대기 (API 제한 방지)
        if (i + BATCH_SIZE < totalTemplates) {
          console.log('다음 배치를 위해 1초 대기...');
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      console.log(`✅ 모든 배치 완료: 총 ${successCount}개 템플릿 추가 성공`);
      return true;

    } catch (error) {
      console.error('❌ 템플릿 일괄 추가 실패:', error);
      if (error instanceof Error) {
        console.error('오류 메시지:', error.message);
        console.error('오류 스택:', error.stack);
      }
      return false;
    }
  }

  /**
   * 모든 템플릿 조회
   */
  static async getAllTemplates(): Promise<unknown[]> {
    try {
      console.log('=== 모든 템플릿 조회 ===');

      const records = await getTemplatesTable().select().all();
      
      if (records && records.length > 0) {
        console.log('✅ 템플릿 조회 성공:', records.length, '개');
        return Array.from(records);
      }

      console.log('템플릿이 없습니다.');
      return [];
    } catch (error) {
      console.error('❌ 템플릿 조회 실패:', error);
      return [];
    }
  }
} 