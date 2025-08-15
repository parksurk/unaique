// 세션 관리를 위한 유틸리티 함수들
import { CustomerData } from './airtable';

export interface CustomerSessionData {
  recordId: string;        // Airtable record_id (시스템 고유값, 불변)
  businessId?: string;     // 비즈니스 ID (직접 만든 필드, 변경 가능)
  clerkId: string;         // Clerk 사용자 ID
  name: string;            // 고객 이름
  phone?: string;          // 전화번호 (선택사항)
  email: string;           // 이메일 주소
  tier?: string;           // 고객 등급 (선택사항)
  favoriteCategory?: string; // 선호 카테고리 (선택사항)
  lastUpdated: string;     // 마지막 업데이트 시간
}

/**
 * 세션 스토리지에 고객 정보 저장
 */
export const saveCustomerToSession = (customerData: CustomerSessionData): void => {
  try {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('unaique_customer', JSON.stringify(customerData));
      console.log('고객 정보를 세션에 저장했습니다:', customerData);
    }
  } catch (error) {
    console.error('세션 저장 중 오류:', error);
  }
};

/**
 * 세션에서 고객 정보 조회
 */
export const getCustomerFromSession = (): CustomerSessionData | null => {
  try {
    if (typeof window !== 'undefined') {
      const customerData = sessionStorage.getItem('unaique_customer');
      if (customerData) {
        const parsed = JSON.parse(customerData);
        console.log('세션에서 고객 정보를 조회했습니다:', parsed);
        return parsed;
      }
    }
    return null;
  } catch (error) {
    console.error('세션 조회 중 오류:', error);
    return null;
  }
};

/**
 * 세션에서 고객 정보 삭제 (로그아웃 시)
 */
export const clearCustomerSession = (): void => {
  try {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('unaique_customer');
      console.log('고객 세션 정보를 삭제했습니다.');
    }
  } catch (error) {
    console.error('세션 삭제 중 오류:', error);
  }
};

/**
 * 세션에 고객 정보가 있는지 확인
 */
export const hasCustomerSession = (): boolean => {
  try {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('unaique_customer') !== null;
    }
    return false;
  } catch (error) {
    console.error('세션 확인 중 오류:', error);
    return false;
  }
};

/**
 * 세션의 고객 정보가 유효한지 확인 (24시간 이내)
 */
export const isCustomerSessionValid = (): boolean => {
  try {
    const customerData = getCustomerFromSession();
    if (!customerData) return false;

    const lastUpdated = new Date(customerData.lastUpdated);
    const now = new Date();
    const hoursDiff = (now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60);

    return hoursDiff < 24; // 24시간 이내
  } catch (error) {
    console.error('세션 유효성 확인 중 오류:', error);
    return false;
  }
};

/**
 * 고객 정보를 세션에 저장할 수 있는 형태로 변환
 */
export const formatCustomerForSession = (airtableCustomer: { id: string; fields: CustomerData }, clerkUserId?: string): CustomerSessionData => {
  const fields = airtableCustomer.fields;
  return {
    recordId: airtableCustomer.id,     // Airtable record_id (시스템 고유값, 불변)
    businessId: fields.ID || undefined, // 비즈니스 ID (직접 만든 필드, 변경 가능)
    clerkId: clerkUserId || 'unknown', // Clerk 사용자 ID
    name: fields.Name || 'Unknown',
    phone: fields.Phone || '',
    email: fields.Email || '',
    tier: fields.Tier || '',
    favoriteCategory: fields['Favorite Category'] || '',
    lastUpdated: new Date().toISOString()
  };
}; 