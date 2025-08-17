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

export const getTemplatesTable = () => {
  return getBase()('Templates');
};

const getContentIdeasTable = () => {
  return getBase()('Content Ideas');
};

const getOrdersTable = () => {
  return getBase()('Orders');
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
  like?: number;           // 좋아요 수
  [key: string]: unknown;  // 인덱스 시그니처 추가
}

export interface ContentIdeaData {
  ID: number;              // Content Ideas 테이블의 ID
  Customer: string;        // Business ID
  아이디어: string;        // 사용자가 입력한 아이디어
  자막: string;            // 사용자가 입력한 자막
  '배경 설명': string;     // 사용자가 입력한 배경 설명
  자동화: string;          // 자동화 상태
  [key: string]: unknown;
}

export interface OrderData {
  'Order Number': number;  // Orders 테이블의 ID
  Customer: string;        // Business ID
  Status: string;          // 생성중, 완료, 에러종료
  'Order Date': string;    // 주문 날짜시간
  'Used Credits': number;  // 사용된 크레딧
  'Delivery Date'?: string; // 완료/에러 날짜시간
  'Video Link'?: string;   // 생성된 비디오 URL
  [key: string]: unknown;
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

  /**
   * 템플릿 업데이트
   */
  static async updateTemplate(templateId: string, updates: Partial<TemplateData>): Promise<{ id: string; fields: TemplateData }> {
    try {
      console.log('=== 템플릿 업데이트 시작 ===');
      console.log('템플릿 ID:', templateId);
      console.log('업데이트 데이터:', updates);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const record = await (getTemplatesTable().update as any)([
        {
          id: templateId,
          fields: updates
        }
      ]);

      if (record && record.length > 0) {
        const updatedRecord = {
          id: record[0].id,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          fields: record[0].fields as TemplateData
        };
        console.log('✅ 템플릿 업데이트 성공:', updatedRecord);
        return updatedRecord;
      }

      throw new Error('Failed to update template record');
    } catch (error) {
      console.error('❌ 템플릿 업데이트 실패:', error);
      throw error;
    }
  }

  /**
   * Content Ideas 테이블 가져오기
   */
  static getContentIdeasTable() {
    return getContentIdeasTable();
  }

  /**
   * Orders 테이블 가져오기
   */
  static getOrdersTable() {
    return getOrdersTable();
  }

  /**
   * Content Ideas 테이블에 새 아이디어 추가
   */
  static async createContentIdea(contentData: Omit<ContentIdeaData, 'ID'>): Promise<ContentIdeaData> {
    try {
      console.log('=== Content Idea 생성 시작 ===');
      console.log('입력 데이터:', contentData);

      // Content Ideas 테이블 가져오기
      console.log('Content Ideas 테이블 접근 시도...');
      const table = getContentIdeasTable();
      console.log('✅ 테이블 접근 성공');

      // ID 필드의 최대값 + 1 계산
      console.log('기존 레코드 조회 중...');
      const existingRecords = await table.select().all();
      console.log('기존 레코드 수:', existingRecords.length);
      
      const maxId = existingRecords.length > 0 
        ? Math.max(...existingRecords.map(r => (r.fields.ID as number) || 0))
        : 0;
      const newId = maxId + 1;
      console.log('새 ID:', newId);

      const recordData = {
        ...contentData,
        ID: newId
      };
      console.log('생성할 레코드 데이터:', recordData);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const record = await (table.create as any)([
        {
          fields: recordData
        }
      ]);

      if (record && record.length > 0) {
        const newRecord: ContentIdeaData = {
          ID: newId,
          Customer: contentData.Customer as string,
          아이디어: contentData.아이디어 as string,
          자막: contentData.자막 as string,
          '배경 설명': contentData['배경 설명'] as string,
          자동화: contentData.자동화 as string
        };
        console.log('✅ Content Idea 생성 성공:', newRecord);
        return newRecord;
      }

      throw new Error('Failed to create content idea record');
    } catch (error) {
      console.error('❌ Content Idea 생성 실패:', error);
      throw error;
    }
  }

  /**
   * Orders 테이블에 새 주문 추가
   */
  static async createOrder(orderData: Omit<OrderData, 'Order Number'>): Promise<OrderData> {
    try {
      console.log('=== 주문 생성 시작 ===');
      console.log('입력 데이터:', orderData);

      // Order Number 필드의 최대값 + 1 계산
      const existingRecords = await getOrdersTable().select().all();
      const maxOrderNumber = existingRecords.length > 0 
        ? Math.max(...existingRecords.map(r => (r.fields['Order Number'] as number) || 0))
        : 0;
      const newOrderNumber = maxOrderNumber + 1;

                      const recordData = {
                  ...orderData,
                  'Order Number': newOrderNumber
                };

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const record = await (getOrdersTable().create as any)([
                  {
                    fields: recordData
                  }
                ]);

                if (record && record.length > 0) {
                  const newRecord: OrderData = {
                    'Order Number': newOrderNumber,
                    Customer: orderData.Customer as string,
                    Status: orderData.Status as string,
                    'Order Date': orderData['Order Date'] as string,
                    'Used Credits': orderData['Used Credits'] as number,
                    'Delivery Date': orderData['Delivery Date'] as string | undefined,
                    'Video Link': orderData['Video Link'] as string | undefined
                  };
                  console.log('✅ 주문 생성 성공:', newRecord);
                  return newRecord;
                }

      throw new Error('Failed to create order record');
    } catch (error) {
      console.error('❌ 주문 생성 실패:', error);
      throw error;
    }
  }

  /**
   * Orders 테이블의 주문 상태 업데이트
   */
  static async updateOrderStatus(orderNumber: number, updates: Partial<OrderData>): Promise<OrderData> {
    try {
      console.log('=== 주문 상태 업데이트 시작 ===');
      console.log('Order Number:', orderNumber);
      console.log('업데이트 내용:', updates);

      // 주문 번호로 레코드 찾기
      const records = await getOrdersTable().select({
        filterByFormula: `{Order Number} = ${orderNumber}`
      }).firstPage();

      if (!records || records.length === 0) {
        throw new Error(`Order Number ${orderNumber} not found`);
      }

      const recordId = records[0].id;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const record = await (getOrdersTable().update as any)([
        {
          id: recordId,
          fields: updates
        }
      ]);

      if (record && record.length > 0) {
        const updatedRecord = {
          ...updates,
          'Order Number': orderNumber
        } as OrderData;
        console.log('✅ 주문 상태 업데이트 성공:', updatedRecord);
        return updatedRecord;
      }

      throw new Error('Failed to update order record');
    } catch (error) {
      console.error('❌ 주문 상태 업데이트 실패:', error);
      throw error;
    }
  }

  /**
   * Customers 테이블의 Available Credits 업데이트
   */
  static async updateCustomerCredits(businessId: string, usedCredits: number): Promise<void> {
    try {
      console.log('=== 고객 크레딧 업데이트 시작 ===');
      console.log('Business ID:', businessId);
      console.log('사용된 크레딧:', usedCredits);

      // Business ID로 고객 찾기
      const records = await getCustomersTable().select({
        filterByFormula: `{ID} = '${businessId}'`
      }).firstPage();

      if (!records || records.length === 0) {
        throw new Error(`Customer with Business ID ${businessId} not found`);
      }

      const recordId = records[0].id;
      const currentCredits = (records[0].fields['Available Credits'] as number) || 0;
      const newCredits = Math.max(0, currentCredits - usedCredits);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (getCustomersTable().update as any)([
        {
          id: recordId,
          fields: {
            'Available Credits': newCredits
          }
        }
      ]);

      console.log('✅ 고객 크레딧 업데이트 성공:', newCredits);
    } catch (error) {
      console.error('❌ 고객 크레딧 업데이트 실패:', error);
      throw error;
    }
  }

  /**
   * 사용자 프로젝트 목록 조회 (Orders + Content Ideas 조인)
   */
  static async getUserProjects(businessId: string): Promise<{
    orderNumber: number;
    status: string;
    orderDate: string;
    usedCredits: number;
    deliveryDate?: string;
    videoLink?: string;
    contentIdea?: {
      id: number;
      아이디어: string;
      자막: string;
      '배경 설명': string;
      자동화: string;
    };
  }[]> {
    try {
      console.log('=== 사용자 프로젝트 목록 조회 시작 ===');
      console.log('Business ID:', businessId);

      // Orders 테이블에서 사용자의 주문 조회
      const ordersTable = getOrdersTable();
      const orders = await ordersTable.select({
        filterByFormula: `{Customer} = '${businessId}'`
      }).all();

      console.log('Orders 테이블 조회 결과:', orders.length, '개');

      if (orders.length === 0) {
        return [];
      }

      // Content Ideas 테이블에서 관련 아이디어 조회
      const contentIdeasTable = getContentIdeasTable();
      const contentIdeas = await contentIdeasTable.select().all();

      console.log('Content Ideas 테이블 조회 결과:', contentIdeas.length, '개');

      // Orders와 Content Ideas 조인
      const projects = orders.map(order => {
        const orderFields = order.fields;
        
        // Content Ideas에서 해당하는 아이디어 찾기
        const contentIdea = contentIdeas.find(idea => 
          idea.fields.ID === orderFields['Content Idea ID']
        );

        return {
          orderNumber: Number(orderFields['Order Number']) || 0,
          status: String(orderFields.Status || ''),
          orderDate: String(orderFields['Order Date'] || ''),
          usedCredits: Number(orderFields['Used Credits']) || 0,
          deliveryDate: orderFields['Delivery Date'] ? String(orderFields['Delivery Date']) : undefined,
          videoLink: orderFields['Video Link'] ? String(orderFields['Video Link']) : undefined,
          contentIdea: contentIdea ? {
            id: Number(contentIdea.fields.ID) || 0,
            아이디어: String(contentIdea.fields.아이디어 || ''),
            자막: String(contentIdea.fields.자막 || ''),
            '배경 설명': String(contentIdea.fields['배경 설명'] || ''),
            자동화: String(contentIdea.fields.자동화 || '')
          } : undefined
        };
      });

      console.log('✅ 프로젝트 조인 완료:', projects.length, '개');
      return projects;

    } catch (error) {
      console.error('❌ 사용자 프로젝트 목록 조회 실패:', error);
      throw error;
    }
  }
} 