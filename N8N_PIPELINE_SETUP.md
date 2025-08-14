# n8n 파이프라인 설정 가이드

## 🎯 목표
로그인한 사용자가 대시보드의 "새 비디오 제작" 버튼을 클릭하면 n8n의 'Unaique-VG-Pipeline' 자동화 파이프라인을 호출

## 📋 사전 준비사항

### 1. n8n 인스턴스
- n8n이 설치되어 있고 실행 중이어야 함
- 웹훅을 받을 수 있는 상태여야 함
- API 키가 설정되어 있어야 함

### 2. 환경 변수 설정
`.env.local` 파일에 다음 값들이 설정되어 있습니다:

```bash
# n8n 설정
N8N_WEBHOOK_URL=https://parksurk.app.n8n.cloud/webhook-test/d9ce9929-0e40-44d7-9416-fcc60b4734ca
N8N_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlMzEwY2FlYS02NWU0LTQzN2QtYTgxOC1mMWQxNWZjYTMxZDEiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzU1MTg5MzUyfQ.DhqIe8PkSp4MgIdZz5VkgZKkoUvLYcCU4PB5T5IjV_Y
```

## 🔧 n8n 워크플로우 설정 (단계별)

### 1단계: n8n 대시보드 접속
1. [n8n 대시보드](https://parksurk.app.n8n.cloud)에 로그인
2. 메인 화면에서 **"New Workflow"** 버튼 클릭

### 2단계: 워크플로우 기본 설정
1. **워크플로우 이름**을 **"Unaique-VG-Pipeline"**으로 변경
2. **설명**에 "Unaique 비디오 제작 자동화 파이프라인" 입력

### 3단계: 웹훅 노드 추가
1. **"Webhook"** 노드를 캔버스에 추가 (왼쪽 사이드바에서 검색)
2. **"Webhook"** 노드 더블클릭하여 설정 열기

### 4단계: 웹훅 노드 상세 설정
**HTTP Method**: `POST` 선택
**Path**: `/webhook-test/d9ce9929-0e40-44d7-9416-fcc60b4734ca` 입력
**Response Mode**: `Last Node` 선택

**Options 탭에서:**
- **Response Headers** 추가:
  ```
  Content-Type: application/json
  ```

### 5단계: 웹훅 URL 확인
웹훅 노드 설정 후 **"Listen for calls"** 버튼 클릭
생성된 URL이 다음과 일치하는지 확인:
```
https://parksurk.app.n8n.cloud/webhook-test/d9ce9929-0e40-44d7-9416-fcc60b4734ca
```

### 6단계: 워크플로우 노드 구성
웹훅 노드 다음에 원하는 자동화 노드들을 추가:

```
Webhook → [비디오 제작 로직] → [결과 반환]
```

**추천 노드 구성:**
- **Webhook** (입력) ✅
- **Set** (데이터 처리)
- **Code** (커스텀 로직)
- **Respond to Webhook** (결과 반환)

### 7단계: 워크플로우 활성화 (중요!)
1. **"Active"** 토글을 켜서 워크플로우 활성화
2. **"Save"** 버튼 클릭하여 저장
3. **"Execute workflow"** 버튼 클릭하여 웹훅 등록

### 8단계: 웹훅 등록 확인
1. 웹훅 노드에서 **"Listen for calls"** 상태 확인
2. **"Test step"** 버튼으로 웹훅 동작 테스트

## 🧪 테스트 방법

### 1. n8n 웹훅 직접 테스트
```bash
curl -X POST "https://parksurk.app.n8n.cloud/webhook-test/d9ce9929-0e40-44d7-9416-fcc60b4734ca" \
  -H "Content-Type: application/json" \
  -d '{
    "pipeline": "Unaique-VG-Pipeline",
    "userId": "test_user",
    "timestamp": "2024-01-01T00:00:00.000Z",
    "source": "test"
  }'
```

**성공 응답 예시:**
```json
{
  "success": true,
  "message": "Webhook received successfully"
}
```

### 2. 애플리케이션에서 테스트
1. 애플리케이션 실행: `npm run dev`
2. 로그인 후 `/dashboard` 접속
3. "새 비디오 제작" → "시작하기" 버튼 클릭
4. 성공/실패 메시지 확인

### 3. n8n 실행 로그 확인
1. n8n 대시보드에서 워크플로우 선택
2. **"Executions"** 탭에서 실행 로그 확인
3. 웹훅 데이터 수신 및 처리 과정 확인

## 🔍 문제 해결

### 1. "The requested webhook is not registered" 오류
**원인**: 워크플로우가 활성화되지 않았거나 웹훅이 등록되지 않음
**해결방법**:
- 워크플로우 **"Active"** 토글 확인
- **"Execute workflow"** 버튼 클릭
- 웹훅 노드에서 **"Listen for calls"** 상태 확인

### 2. "n8n 파이프라인 트리거에 실패했습니다" 오류
**원인**: n8n 웹훅 URL 오류 또는 네트워크 문제
**해결방법**:
- 웹훅 URL 정확성 확인
- n8n 인스턴스 상태 확인
- 네트워크 연결 상태 확인

### 3. CORS 오류
**원인**: n8n에서 CORS 설정 문제
**해결방법**:
- 웹훅 노드의 응답 헤더에 `Access-Control-Allow-Origin: *` 추가
- n8n CORS 설정 확인

## 📊 전송되는 데이터 구조

### 1. 기본 데이터
```json
{
  "pipeline": "Unaique-VG-Pipeline",
  "userId": "user_123456",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "source": "unaique-dashboard"
}
```

### 2. 추가 데이터
```json
{
  "userEmail": "user@example.com",
  "userName": "홍길동",
  "action": "create_video",
  "projectType": "new_video"
}
```

## 📝 로그 확인 방법

### 1. 서버 로그
```bash
# 터미널에서 Next.js 서버 로그 확인
npm run dev
```

### 2. n8n 로그
- n8n 대시보드 → 워크플로우 → **"Executions"** 탭
- 웹훅 노드의 입력/출력 데이터 확인
- 실행 상태 및 오류 메시지 확인

### 3. 브라우저 콘솔
- F12 → Console 탭에서 API 호출 결과 확인
- 네트워크 탭에서 요청/응답 상태 확인

## 🚀 고급 설정

### 1. 인증 추가
```typescript
// API 키를 사용한 인증
headers: {
  'Authorization': `Bearer ${process.env.N8N_API_KEY}`,
  'Content-Type': 'application/json',
}
```

### 2. 에러 핸들링
```typescript
// 재시도 로직
const maxRetries = 3;
let retryCount = 0;

while (retryCount < maxRetries) {
  try {
    // API 호출
    break;
  } catch (error) {
    retryCount++;
    if (retryCount === maxRetries) throw error;
    await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
  }
}
```

## 📞 지원

문제가 지속되는 경우:
1. **n8n 워크플로우 상태** 확인 (Active, 웹훅 등록)
2. **서버 로그**에서 오류 메시지 확인
3. **n8n 실행 로그**에서 웹훅 수신 상태 확인
4. **환경 변수** 설정 재확인
5. **네트워크 연결** 상태 확인

## ⚠️ 중요 체크리스트

- [ ] n8n 워크플로우 생성 완료
- [ ] 웹훅 노드 설정 완료 (Path: `/webhook-test/d9ce9929-0e40-44d7-9416-fcc60b4734ca`)
- [ ] 워크플로우 **"Active"** 상태로 설정
- [ ] **"Execute workflow"** 버튼 클릭하여 웹훅 등록
- [ ] 웹훅 노드에서 **"Listen for calls"** 상태 확인
- [ ] **"Test step"**으로 웹훅 동작 테스트
- [ ] 환경 변수 설정 확인 (`N8N_WEBHOOK_URL`, `N8N_API_KEY`) 