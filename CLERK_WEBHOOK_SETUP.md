# Clerk Webhook 설정 가이드

## 🎯 목표
Clerk에서 구글 계정으로 로그인할 때마다 Airtable의 Customers 테이블에 자동으로 고객 정보를 동기화

## 📋 사전 준비사항

### 1. 환경 변수 설정
`.env.local` 파일에 다음 값들이 올바르게 설정되어 있어야 합니다:

```bash
# Clerk 설정
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_실제_웹훅_시크릿

# Airtable 설정
AIRTABLE_API_KEY=pat_...
AIRTABLE_BASE_ID=app_...
```

### 2. Airtable 테이블 구조
`Customers` 테이블이 다음 필드를 포함해야 합니다:
- `Name` (Single line text)
- `Email` (Email)
- `Phone` (Phone number)
- `Total Purchases` (Number)
- `Purchase Count` (Number)

## 🔧 Clerk Dashboard 설정

### 1. Clerk Dashboard 접속
1. [Clerk Dashboard](https://dashboard.clerk.com/)에 로그인
2. 해당 프로젝트 선택

### 2. Webhook 설정
1. **Webhooks** 메뉴 클릭
2. **Add Endpoint** 버튼 클릭
3. **Endpoint URL** 입력:
   ```
   https://yourdomain.com/api/webhooks/clerk
   ```
   또는 로컬 테스트용:
   ```
   https://your-ngrok-url.ngrok.io/api/webhooks/clerk
   ```

### 3. 이벤트 선택
다음 이벤트들을 활성화:
- ✅ `user.created` - 새 사용자 생성 시
- ✅ `user.updated` - 사용자 정보 업데이트 시
- ✅ `user.deleted` - 사용자 삭제 시

### 4. Webhook Secret 복사
1. **Signing Secret** 섹션에서 `whsec_`로 시작하는 값 복사
2. `.env.local` 파일의 `CLERK_WEBHOOK_SECRET`에 붙여넣기

## 🧪 테스트 방법

### 1. 로컬 테스트 (ngrok 사용)
```bash
# ngrok 설치 (맥OS)
brew install ngrok

# ngrok 인증
ngrok config add-authtoken YOUR_AUTH_TOKEN

# 터널 생성
ngrok http 3000

# 생성된 URL을 Clerk Webhook Endpoint에 설정
# 예: https://abc123.ngrok.io/api/webhooks/clerk
```

### 2. 애플리케이션 실행
```bash
npm run dev
```

### 3. Webhook 테스트 페이지 접속
브라우저에서 `http://localhost:3000/webhook-test` 접속

### 4. Airtable 연결 테스트
1. "Airtable 연결 테스트" 버튼 클릭
2. 연결 성공 확인

### 5. 고객 동기화 테스트
1. 테스트 데이터 입력 (이름, 이메일, 전화번호)
2. "고객 동기화 테스트" 버튼 클릭
3. Airtable에 고객 정보 생성 확인

### 6. 실제 구글 로그인 테스트
1. `/sign-in` 페이지에서 구글 계정으로 로그인
2. Clerk Dashboard의 Webhook 로그 확인
3. Airtable Customers 테이블에 고객 정보 생성 확인

## 🔍 문제 해결

### 1. Webhook이 작동하지 않는 경우
- **Clerk Dashboard**에서 Webhook 상태 확인
- **Endpoint URL**이 올바른지 확인
- **Webhook Secret**이 올바르게 설정되었는지 확인
- **ngrok URL**이 유효한지 확인 (로컬 테스트 시)

### 2. Airtable 연결 실패
- **AIRTABLE_API_KEY**가 올바른지 확인
- **AIRTABLE_BASE_ID**가 올바른지 확인
- **Customers** 테이블이 존재하는지 확인
- **테이블 필드명**이 정확한지 확인

### 3. 고객 정보가 동기화되지 않는 경우
- **브라우저 콘솔**에서 오류 메시지 확인
- **서버 로그**에서 webhook 처리 상태 확인
- **Clerk Dashboard**에서 webhook 이벤트 로그 확인

## 📝 로그 확인 방법

### 1. 서버 로그
```bash
# 터미널에서 Next.js 서버 로그 확인
npm run dev
```

### 2. 브라우저 콘솔
- F12 → Console 탭에서 오류 메시지 확인

### 3. Clerk Dashboard
- Webhooks → 해당 Endpoint → Recent Deliveries에서 전송 상태 확인

### 4. Airtable
- Customers 테이블에서 고객 정보 생성/업데이트 확인

## 🚀 배포 시 주의사항

### 1. 프로덕션 환경
- **HTTPS URL** 사용 필수
- **실제 도메인**으로 Webhook Endpoint 설정
- **환경 변수**를 서버에 올바르게 설정

### 2. 보안
- **Webhook Secret**을 안전하게 관리
- **API 키**를 공개하지 않음
- **환경 변수**를 버전 관리에 포함하지 않음

## 📞 지원

문제가 지속되는 경우:
1. **Clerk Dashboard**의 Webhook 로그 확인
2. **서버 로그**에서 오류 메시지 확인
3. **Airtable 연결** 상태 확인
4. **환경 변수** 설정 재확인 