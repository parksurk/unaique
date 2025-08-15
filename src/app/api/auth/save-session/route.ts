import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { AirtableService } from '@/lib/airtable';
import { formatCustomerForSession, saveCustomerToSession } from '@/lib/session';

export async function POST(req: Request) {
  try {
    console.log('=== 세션 저장 API 요청 ===');

    // 사용자 인증 확인
    const { userId } = await auth();

    if (!userId) {
      console.error('❌ 인증되지 않은 사용자');
      return NextResponse.json({
        success: false,
        message: '로그인이 필요합니다',
        error: 'Unauthorized'
      }, { status: 401 });
    }

    console.log('사용자 ID:', userId);

    // 요청 본문에서 이메일 가져오기
    const body = await req.json();
    const { email } = body;

    if (!email) {
      console.error('❌ 이메일이 제공되지 않음');
      return NextResponse.json({
        success: false,
        message: '이메일이 필요합니다',
        error: 'Email required'
      }, { status: 400 });
    }

    console.log('세션 저장 요청 이메일:', email);

    // Airtable에서 고객 정보 조회
    const customerData = await AirtableService.getCustomerForSession(email);

    if (!customerData) {
      console.error('❌ Airtable에서 고객 정보를 찾을 수 없음');
      return NextResponse.json({
        success: false,
        message: '고객 정보를 찾을 수 없습니다',
        error: 'Customer not found'
      }, { status: 404 });
    }

    // 세션 저장용 데이터 형식으로 변환 (Clerk ID 포함)
    const sessionData = formatCustomerForSession(customerData, userId);

    // 세션에 저장
    saveCustomerToSession(sessionData);

    console.log('✅ 세션 저장 성공:', sessionData);

    return NextResponse.json({
      success: true,
      message: '세션 정보가 성공적으로 저장되었습니다',
      customer: sessionData
    });

  } catch (error) {
    console.error('❌ 세션 저장 중 오류:', error);

    return NextResponse.json({
      success: false,
      message: '세션 저장 중 오류가 발생했습니다',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 