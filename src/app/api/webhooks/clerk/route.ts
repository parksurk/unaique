import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { AirtableService } from '@/lib/airtable';

export async function POST(req: Request) {
  console.log('=== Clerk Webhook 요청 수신 ===');
  console.log('요청 시간:', new Date().toISOString());
  
  try {
    // Clerk webhook 시그니처 검증
    const headerPayload = await headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    console.log('Webhook 헤더 확인:');
    console.log('- svix-id:', svix_id ? '✅ 존재' : '❌ 누락');
    console.log('- svix-timestamp:', svix_timestamp ? '✅ 존재' : '❌ 누락');
    console.log('- svix-signature:', svix_signature ? '✅ 존재' : '❌ 누락');

    if (!svix_id || !svix_timestamp || !svix_signature) {
      console.error('❌ 필수 webhook 헤더가 누락됨');
      return new Response('Error occured -- no svix headers', {
        status: 400
      });
    }

    // 요청 본문 가져오기
    const payload = await req.json();
    const body = JSON.stringify(payload);

    console.log('Webhook 페이로드 타입:', payload.type);
    console.log('Webhook 페이로드 데이터:', JSON.stringify(payload.data, null, 2));

    // webhook 시그니처 검증
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
    console.log('Webhook Secret 확인:', webhookSecret ? '✅ 설정됨' : '❌ 설정 안됨');

    if (!webhookSecret || webhookSecret === 'whsec_your_webhook_secret_here') {
      console.error('❌ CLERK_WEBHOOK_SECRET이 올바르게 설정되지 않음');
      return new Response('Webhook secret not configured', {
        status: 500
      });
    }

    const wh = new Webhook(webhookSecret);
    let evt: WebhookEvent;

    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
      console.log('✅ Webhook 시그니처 검증 성공');
    } catch (err) {
      console.error('❌ Webhook 시그니처 검증 실패:', err);
      return new Response('Error occured', {
        status: 400
      });
    }

    // 이벤트 타입에 따른 처리
    const eventType = evt.type;
    console.log('처리할 이벤트 타입:', eventType);

    if (eventType === 'user.created') {
      console.log('=== user.created 이벤트 처리 시작 ===');
      
      try {
        const { id, email_addresses, first_name, last_name, phone_numbers } = evt.data;

        console.log('사용자 데이터:');
        console.log('- ID:', id);
        console.log('- 이메일 주소들:', email_addresses);
        console.log('- 이름:', first_name);
        console.log('- 성:', last_name);
        console.log('- 전화번호들:', phone_numbers);

        // 필수 필드 확인
        if (!email_addresses || email_addresses.length === 0) {
          console.error('❌ 이메일 주소가 없는 사용자');
          return new Response('User created without email address', { status: 400 });
        }

        const primaryEmail = email_addresses.find(email => email.id === evt.data.primary_email_address_id);
        if (!primaryEmail) {
          console.error('❌ 기본 이메일 주소를 찾을 수 없음');
          return new Response('Primary email not found', { status: 400 });
        }

        console.log('기본 이메일 주소:', primaryEmail.email_address);

        // 핸드폰 번호 확인
        const phoneNumber = phone_numbers && phone_numbers.length > 0 ? phone_numbers[0].phone_number : '';
        console.log('전화번호:', phoneNumber || '없음');

        if (phoneNumber) {
          // 핸드폰 번호로 중복 고객 체크
          console.log('전화번호 중복 체크 시작...');
          const existingCustomer = await AirtableService.findCustomerByPhone(phoneNumber);

          if (existingCustomer) {
            console.error('❌ 전화번호가 중복된 고객 발견:', phoneNumber);
            return new Response('Customer with this phone number already exists', {
              status: 409,
              headers: {
                'Content-Type': 'application/json'
              }
            });
          }
          console.log('✅ 전화번호 중복 없음');
        }

        // Airtable에 사용자 동기화
        console.log('Airtable 동기화 시작...');
        const userData = {
          email: primaryEmail.email_address,
          firstName: first_name || undefined,
          lastName: last_name || undefined,
          phone: phoneNumber || undefined
        };

        console.log('동기화할 사용자 데이터:', userData);

                            const syncedCustomer = await AirtableService.syncUserToAirtable(userData);
                    console.log('✅ Airtable 동기화 성공:', syncedCustomer);

                    // 세션 정보 저장을 위한 응답 헤더 추가
                    return new Response('Customer created successfully', { 
                      status: 200,
                      headers: {
                        'X-Customer-ID': syncedCustomer.id,
                        'X-Customer-Email': syncedCustomer.fields.Email,
                        'X-Clerk-User-ID': evt.data.id
                      }
                    });
      } catch (error) {
        console.error('❌ user.created 처리 중 오류:', error);
        return new Response('Error syncing user to Airtable', { status: 500 });
      }
    }

    // user.updated 이벤트 처리
    if (eventType === 'user.updated') {
      console.log('=== user.updated 이벤트 처리 시작 ===');
      
      try {
        const { id, email_addresses, first_name, last_name, phone_numbers } = evt.data;

        console.log('업데이트된 사용자 데이터:');
        console.log('- ID:', id);
        console.log('- 이메일 주소들:', email_addresses);
        console.log('- 이름:', first_name);
        console.log('- 성:', last_name);
        console.log('- 전화번호들:', phone_numbers);

        if (!email_addresses || email_addresses.length === 0) {
          console.error('❌ 이메일 주소가 없는 사용자');
          return new Response('User updated without email address', { status: 400 });
        }

        const primaryEmail = email_addresses.find(email => email.id === evt.data.primary_email_address_id);
        if (!primaryEmail) {
          console.error('❌ 기본 이메일 주소를 찾을 수 없음');
          return new Response('Primary email not found', { status: 400 });
        }

        // Airtable에 사용자 동기화 (업데이트 또는 생성)
        console.log('Airtable 동기화 시작...');
        const userData = {
          email: primaryEmail.email_address,
          firstName: first_name || undefined,
          lastName: last_name || undefined,
          phone: phone_numbers && phone_numbers.length > 0 ? phone_numbers[0].phone_number : undefined
        };

        console.log('동기화할 사용자 데이터:', userData);

        const syncedCustomer = await AirtableService.syncUserToAirtable(userData);
        console.log('✅ Airtable 동기화 성공:', syncedCustomer);

        return new Response('Customer updated successfully', { status: 200 });
      } catch (error) {
        console.error('❌ user.updated 처리 중 오류:', error);
        return new Response('Error syncing updated user to Airtable', { status: 500 });
      }
    }

    // user.deleted 이벤트 처리
    if (eventType === 'user.deleted') {
      console.log('=== user.deleted 이벤트 처리 시작 ===');
      
      try {
        const { id } = evt.data;
        console.log('삭제된 사용자 ID:', id);
        return new Response('User deletion processed', { status: 200 });
      } catch (error) {
        console.error('❌ user.deleted 처리 중 오류:', error);
        return new Response('Error processing user deletion', { status: 500 });
      }
    }

    // 기타 이벤트는 무시 (로그인 등)
    console.log('⚠️ 무시되는 이벤트 타입:', eventType);
    return new Response('Event ignored', { status: 200 });
    
  } catch (error) {
    console.error('❌ Webhook 처리 중 예상치 못한 오류:', error);
    return new Response('Internal server error', { status: 500 });
  }
} 