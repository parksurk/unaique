const https = require('https');
const http = require('http');

// 환경 변수 로드
require('dotenv').config({ path: '.env.local' });

const WEBHOOK_URL = process.env.WEBHOOK_URL || 'http://localhost:3000/api/webhooks/clerk';
const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

if (!WEBHOOK_SECRET || WEBHOOK_SECRET === 'whsec_your_webhook_secret_here') {
  console.error('❌ CLERK_WEBHOOK_SECRET이 올바르게 설정되지 않았습니다.');
  console.error('CLERK_WEBHOOK_SECRET을 .env.local 파일에 설정하세요.');
  process.exit(1);
}

// 테스트용 webhook 페이로드 (user.created 이벤트)
const testPayload = {
  type: 'user.created',
  data: {
    id: 'user_test_123',
    email_addresses: [
      {
        id: 'email_test_123',
        email_address: 'test@example.com',
        verification: {
          status: 'verified',
          strategy: 'oauth_google'
        }
      }
    ],
    primary_email_address_id: 'email_test_123',
    first_name: '테스트',
    last_name: '사용자',
    phone_numbers: [
      {
        id: 'phone_test_123',
        phone_number: '+82-10-1234-5678',
        verification: {
          status: 'verified',
          strategy: 'sms_code'
        }
      }
    ],
    created_at: Date.now(),
    updated_at: Date.now()
  },
  object: 'event'
};

// Webhook 전송 함수
function sendWebhook(payload) {
  const data = JSON.stringify(payload);
  
  const url = new URL(WEBHOOK_URL);
  const options = {
    hostname: url.hostname,
    port: url.port || (url.protocol === 'https:' ? 443 : 3000),
    path: url.pathname,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data),
      'svix-id': 'test_svix_id',
      'svix-timestamp': Math.floor(Date.now() / 1000).toString(),
      'svix-signature': 'test_signature' // 실제로는 svix로 생성해야 함
    }
  };

  const client = url.protocol === 'https:' ? https : http;
  
  const req = client.request(options, (res) => {
    console.log(`📡 응답 상태: ${res.statusCode}`);
    console.log(`📡 응답 헤더:`, res.headers);
    
    let responseData = '';
    res.on('data', (chunk) => {
      responseData += chunk;
    });
    
    res.on('end', () => {
      console.log(`📡 응답 본문: ${responseData}`);
      
      if (res.statusCode === 200) {
        console.log('✅ Webhook 전송 성공!');
      } else {
        console.log('❌ Webhook 전송 실패');
      }
    });
  });

  req.on('error', (error) => {
    console.error('❌ Webhook 전송 중 오류:', error.message);
  });

  req.write(data);
  req.end();
}

// 메인 실행
console.log('🚀 Webhook 테스트 시작');
console.log(`📡 Webhook URL: ${WEBHOOK_URL}`);
console.log(`🔑 Webhook Secret: ${WEBHOOK_SECRET ? '✅ 설정됨' : '❌ 설정 안됨'}`);
console.log('');

console.log('📤 테스트 페이로드 전송 중...');
sendWebhook(testPayload);

console.log('');
console.log('💡 참고사항:');
console.log('- 이 스크립트는 테스트용이므로 실제 svix 서명이 없습니다.');
console.log('- 실제 Clerk webhook은 svix 서명 검증을 통과해야 합니다.');
console.log('- 서버 로그에서 webhook 처리 상태를 확인하세요.');
console.log('- Airtable Customers 테이블에 고객 정보가 생성되었는지 확인하세요.'); 