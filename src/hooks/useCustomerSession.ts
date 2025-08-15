import { useEffect, useState, useCallback } from 'react';
import { useUser } from '@clerk/nextjs';
import { 
  getCustomerFromSession, 
  clearCustomerSession,
  hasCustomerSession,
  isCustomerSessionValid,
  CustomerSessionData 
} from '@/lib/session';

export const useCustomerSession = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const [customerData, setCustomerData] = useState<CustomerSessionData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSession, setHasSession] = useState(false);
  const [isSessionValid, setIsSessionValid] = useState(false);

  // 로그인 성공 시 세션 정보 저장
  const saveCustomerSession = useCallback(async () => {
    if (!isSignedIn || !user?.primaryEmailAddress?.emailAddress) {
      return;
    }

    setIsLoading(true);
    try {
      const email = user.primaryEmailAddress.emailAddress;
      console.log('로그인 성공, 세션 정보 저장 시작:', email);

      const response = await fetch('/api/auth/save-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('세션 저장 성공:', result.customer);
        setCustomerData(result.customer);
        
        // 세션 상태 업데이트
        setHasSession(true);
        setIsSessionValid(true);
      } else {
        console.error('세션 저장 실패:', response.status);
        setHasSession(false);
        setIsSessionValid(false);
      }
    } catch (error) {
      console.error('세션 저장 중 오류:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isSignedIn, user?.primaryEmailAddress?.emailAddress]);

  // 세션에서 고객 정보 로드
  const loadCustomerFromSession = useCallback(() => {
    const hasSessionData = hasCustomerSession();
    const isValidSession = isCustomerSessionValid();
    
    setHasSession(hasSessionData);
    setIsSessionValid(isValidSession);
    
    if (hasSessionData && isValidSession) {
      const sessionData = getCustomerFromSession();
      if (sessionData) {
        setCustomerData(sessionData);
        console.log('세션에서 고객 정보 로드됨:', sessionData);
        return true;
      }
    }
    return false;
  }, []);

  // 세션 정보 삭제 (로그아웃 시)
  const clearSession = useCallback(() => {
    clearCustomerSession();
    setCustomerData(null);
    setHasSession(false);
    setIsSessionValid(false);
    console.log('세션 정보 삭제됨');
  }, []);

  // 로그인 상태 변경 시 세션 관리
  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn) {
        // 로그인된 경우: 세션에서 로드 시도, 없으면 새로 저장
        if (!loadCustomerFromSession()) {
          saveCustomerSession();
        }
      } else {
        // 로그아웃된 경우: 세션 정보 삭제
        clearSession();
      }
    }
  }, [isSignedIn, isLoaded, loadCustomerFromSession, saveCustomerSession, clearSession]);

  // 초기 로딩 시 세션 상태 확인
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      loadCustomerFromSession();
    }
  }, [isLoaded, isSignedIn, loadCustomerFromSession]);

  // 고객 정보 새로고침
  const refreshCustomerData = useCallback(() => {
    if (isSignedIn) {
      saveCustomerSession();
    }
  }, [isSignedIn, saveCustomerSession]);

  return {
    customerData,
    isLoading,
    hasSession,
    isSessionValid,
    saveCustomerSession,
    loadCustomerFromSession,
    clearSession,
    refreshCustomerData,
  };
}; 