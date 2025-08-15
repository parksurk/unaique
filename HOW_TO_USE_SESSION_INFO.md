# 세션 정보 활용 가이드

## 🎯 목표
로그인에 성공한 사용자의 Airtable Customers 테이블 정보를 세션에 저장하고, 다른 페이지나 기능에서 활용하는 방법을 안내합니다.

## 📋 저장되는 세션 정보

### CustomerSessionData 인터페이스
```typescript
interface CustomerSessionData {
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
```

### ID 구분 및 권장 사용법

#### 1. recordId (Airtable 시스템 ID)
- **용도**: 세션, JWT, API 통신의 기본 식별자
- **특징**: 항상 고유하며 변경 불가
- **권장**: DB/데이터 통신의 기본 기준으로 사용

#### 2. businessId (비즈니스 ID)
- **용도**: 사용자 친화적인 식별값 (회원번호, 사번 등)
- **특징**: 중복 가능, 변경 가능
- **권장**: 표시 및 연동이 필요할 때만 사용

## 🚀 기본 사용법

### 1. useCustomerSession 훅 사용

```typescript
import { useCustomerSession } from "@/hooks/useCustomerSession";

export default function MyComponent() {
  const { 
    customerData,        // 고객 정보
    isLoading,           // 로딩 상태
    hasSession,          // 세션 존재 여부
    isSessionValid,      // 세션 유효성 (24시간 이내)
    refreshCustomerData  // 고객 정보 새로고침
  } = useCustomerSession();

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (customerData) {
    return (
      <div>
        <h1>안녕하세요, {customerData.name}님!</h1>
        <p>등급: {customerData.tier || '일반'}</p>
        <p>선호 카테고리: {customerData.favoriteCategory || '없음'}</p>
      </div>
    );
  }

  return <div>고객 정보를 불러올 수 없습니다.</div>;
}
```

### 2. 직접 세션 함수 사용

```typescript
import { 
  getCustomerFromSession, 
  saveCustomerToSession, 
  clearCustomerSession,
  hasCustomerSession,
  isCustomerSessionValid 
} from "@/lib/session";

// 세션에서 고객 정보 조회
const customerData = getCustomerFromSession();

// 세션에 고객 정보 저장
saveCustomerToSession(customerData);

// 세션 정보 삭제 (로그아웃 시)
clearCustomerSession();

// 세션 존재 여부 확인
if (hasCustomerSession()) {
  console.log('세션이 존재합니다');
}

// 세션 유효성 확인 (24시간 이내)
if (isCustomerSessionValid()) {
  console.log('세션이 유효합니다');
}
```

## 🔧 고급 사용법

### 1. 조건부 렌더링

```typescript
export default function ConditionalComponent() {
  const { customerData, hasSession } = useCustomerSession();

  return (
    <div>
      {hasSession && customerData ? (
        <div>
          {/* 로그인된 사용자 전용 콘텐츠 */}
          <h2>{customerData.name}님의 맞춤 콘텐츠</h2>
          
          {customerData.tier === 'Premium' && (
            <div className="premium-content">
              <h3>프리미엄 전용 기능</h3>
              {/* 프리미엄 사용자 전용 콘텐츠 */}
            </div>
          )}
          
          {customerData.favoriteCategory && (
            <div className="personalized-content">
              <h3>{customerData.favoriteCategory} 관련 추천</h3>
              {/* 개인화된 콘텐츠 */}
            </div>
          )}
        </div>
      ) : (
        <div>
          {/* 비로그인 사용자용 콘텐츠 */}
          <p>로그인하여 맞춤 콘텐츠를 확인하세요</p>
        </div>
      )}
    </div>
  );
}
```

### 2. 폼 데이터 자동 채우기

```typescript
export default function AutoFillForm() {
  const { customerData } = useCustomerSession();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: ''
  });

  // 세션 데이터로 폼 자동 채우기
  useEffect(() => {
    if (customerData) {
      setFormData({
        name: customerData.name,
        email: customerData.email,
        phone: customerData.phone || '',
        category: customerData.favoriteCategory || ''
      });
    }
  }, [customerData]);

  return (
    <form>
      <input 
        type="text" 
        value={formData.name} 
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        placeholder="이름"
      />
      <input 
        type="email" 
        value={formData.email} 
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        placeholder="이메일"
      />
      {/* 추가 폼 필드들 */}
    </form>
  );
}
```

### 3. API 요청 시 세션 데이터 활용

```typescript
export default function ApiComponent() {
  const { customerData } = useCustomerSession();

  const handleSubmit = async () => {
    if (!customerData) return;

    try {
      const response = await fetch('/api/some-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recordId: customerData.recordId,        // Airtable 시스템 ID (권장)
          businessId: customerData.businessId,    // 비즈니스 ID (선택)
          clerkId: customerData.clerkId,
          customerTier: customerData.tier,
          customerCategory: customerData.favoriteCategory,
          // 기타 필요한 데이터
        }),
      });

      if (response.ok) {
        console.log('API 요청 성공');
      }
    } catch (error) {
      console.error('API 요청 실패:', error);
    }
  };

  return (
    <button onClick={handleSubmit} disabled={!customerData}>
      제출하기
    </button>
  );
}
```

## 📱 페이지별 활용 예시

### 1. 대시보드 페이지
```typescript
// src/app/dashboard/page.tsx
export default function DashboardPage() {
  const { customerData } = useCustomerSession();

  return (
    <div>
      <h1>안녕하세요, {customerData?.name}님!</h1>
      
      {/* 고객 등급별 맞춤 콘텐츠 */}
      {customerData?.tier === 'Premium' && (
        <PremiumFeatures />
      )}
      
      {/* 선호 카테고리 기반 추천 */}
      {customerData?.favoriteCategory && (
        <RecommendedContent category={customerData.favoriteCategory} />
      )}
      
      {/* ID 정보 표시 */}
      <div className="customer-ids">
        <p><strong>시스템 ID:</strong> {customerData?.recordId}</p>
        {customerData?.businessId && (
          <p><strong>회원번호:</strong> {customerData.businessId}</p>
        )}
      </div>
    </div>
  );
}
```

### 2. API 통신에서 ID 활용
```typescript
// API 요청 시 올바른 ID 사용법
const handleApiRequest = async () => {
  if (!customerData) return;

  try {
    const response = await fetch('/api/customer/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        // 권장: recordId 사용 (시스템 고유값)
        recordId: customerData.recordId,
        
        // 선택: businessId 사용 (사용자 친화적)
        businessId: customerData.businessId,
        
        // 기타 데이터
        updates: { tier: 'Premium' }
      })
    });
    
    if (response.ok) {
      console.log('고객 정보 업데이트 성공');
    }
  } catch (error) {
    console.error('API 요청 실패:', error);
  }
};
```

### 2. 프로필 페이지
```typescript
// src/app/profile/page.tsx
export default function ProfilePage() {
  const { customerData, refreshCustomerData } = useCustomerSession();

  return (
    <div>
      <h1>프로필</h1>
      
      <div className="profile-info">
        <p><strong>이름:</strong> {customerData?.name}</p>
        <p><strong>이메일:</strong> {customerData?.email}</p>
        <p><strong>전화번호:</strong> {customerData?.phone || '미입력'}</p>
        <p><strong>등급:</strong> {customerData?.tier || '일반'}</p>
        <p><strong>선호 카테고리:</strong> {customerData?.favoriteCategory || '없음'}</p>
      </div>
      
      <button onClick={refreshCustomerData}>
        정보 새로고침
      </button>
    </div>
  );
}
```

### 3. 맞춤형 추천 페이지
```typescript
// src/app/recommendations/page.tsx
export default function RecommendationsPage() {
  const { customerData } = useCustomerSession();

  return (
    <div>
      <h1>맞춤형 추천</h1>
      
      {customerData?.favoriteCategory ? (
        <div>
          <h2>{customerData.favoriteCategory} 관련 추천 콘텐츠</h2>
          <RecommendedContent category={customerData.favoriteCategory} />
        </div>
      ) : (
        <div>
          <h2>인기 콘텐츠</h2>
          <PopularContent />
        </div>
      )}
      
      {customerData?.tier === 'Premium' && (
        <div>
          <h2>프리미엄 전용 추천</h2>
          <PremiumRecommendations />
        </div>
      )}
    </div>
  );
}
```

## ⚠️ 주의사항

### 1. 세션 유효성
- 세션은 24시간 후 자동으로 만료됩니다
- `isSessionValid()` 함수로 유효성을 확인하세요
- 만료된 세션은 자동으로 새로고침됩니다

### 2. 보안
- 세션 데이터는 클라이언트 사이드에 저장됩니다
- 민감한 정보는 저장하지 마세요
- 로그아웃 시 `clearCustomerSession()`을 호출하세요

### 3. 성능
- `useCustomerSession` 훅은 자동으로 세션을 관리합니다
- 불필요한 API 호출을 방지하기 위해 세션 데이터를 우선 사용하세요
- `refreshCustomerData()`는 필요할 때만 호출하세요

## 🔄 세션 업데이트

### 1. 자동 업데이트
- 로그인 시 자동으로 세션이 생성됩니다
- Clerk 인증 상태 변경 시 자동으로 세션이 관리됩니다

### 2. 수동 업데이트
```typescript
const { refreshCustomerData } = useCustomerSession();

// 사용자가 정보를 수정한 후
const handleProfileUpdate = async () => {
  await updateProfile(newData);
  refreshCustomerData(); // 세션 정보 새로고침
};
```

### 3. 실시간 업데이트
```typescript
// WebSocket이나 Server-Sent Events를 사용한 실시간 업데이트
useEffect(() => {
  const eventSource = new EventSource('/api/customer-updates');
  
  eventSource.onmessage = (event) => {
    const update = JSON.parse(event.data);
    if (update.customerId === customerData?.id) {
      refreshCustomerData(); // 세션 정보 새로고침
    }
  };

  return () => eventSource.close();
}, [customerData?.id, refreshCustomerData]);
```

## 📊 디버깅 및 모니터링

### 1. 콘솔 로그 확인
```typescript
// 브라우저 콘솔에서 세션 상태 확인
console.log('세션 데이터:', getCustomerFromSession());
console.log('세션 존재 여부:', hasCustomerSession());
console.log('세션 유효성:', isCustomerSessionValid());
```

### 2. React DevTools
- `useCustomerSession` 훅의 상태를 React DevTools에서 확인
- 세션 데이터 변경 시점 추적

### 3. 네트워크 탭
- `/api/auth/save-session` API 호출 확인
- 세션 저장 성공/실패 여부 확인

## 🚀 최적화 팁

### 1. 조건부 렌더링 최적화
```typescript
// 좋은 예: 세션 상태에 따른 조건부 렌더링
{hasSession && customerData && (
  <CustomerSpecificContent data={customerData} />
)}

// 나쁜 예: 불필요한 리렌더링
{customerData && customerData.id && (
  <CustomerSpecificContent data={customerData} />
)}
```

### 2. 메모이제이션 활용
```typescript
import { useMemo } from 'react';

export default function OptimizedComponent() {
  const { customerData } = useCustomerSession();
  
  const customerStats = useMemo(() => {
    if (!customerData) return null;
    
    return {
      isPremium: customerData.tier === 'Premium',
      hasPhone: !!customerData.phone,
      hasCategory: !!customerData.favoriteCategory
    };
  }, [customerData]);

  return (
    <div>
      {customerStats?.isPremium && <PremiumBadge />}
      {customerStats?.hasPhone && <ContactInfo />}
      {customerStats?.hasCategory && <CategoryRecommendations />}
    </div>
  );
}
```

---

## 📝 요약

세션 정보 활용을 통해 다음과 같은 기능을 구현할 수 있습니다:

1. **개인화된 사용자 경험**: 고객 등급, 선호 카테고리 기반 맞춤 콘텐츠
2. **자동 폼 채우기**: 사용자 정보를 자동으로 입력하여 편의성 향상
3. **권한 기반 접근**: 등급별 기능 제한 및 프리미엄 기능 제공
4. **맞춤형 추천**: 선호 카테고리 기반 콘텐츠 추천
5. **사용자 상태 관리**: 로그인 상태와 고객 정보를 통합 관리

이 가이드를 참고하여 Unaique 서비스에서 세션 정보를 효과적으로 활용하세요! 🚀 