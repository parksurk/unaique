import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  try {
    console.log('=== n8n 파이프라인 트리거 요청 ===');
    
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

    // 요청 본문에서 파이프라인 정보 가져오기
    const body = await req.json();
    const { pipelineName = 'Unaique-VG-Pipeline', additionalData = {} } = body;

    console.log('트리거할 파이프라인:', pipelineName);
    console.log('추가 데이터:', additionalData);

    // n8n 웹훅 URL (환경 변수에서 가져오기)
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
    
    if (!n8nWebhookUrl) {
      console.error('❌ N8N_WEBHOOK_URL이 설정되지 않음');
      return NextResponse.json({
        success: false,
        message: 'n8n 웹훅 URL이 설정되지 않았습니다',
        error: 'Configuration missing'
      }, { status: 500 });
    }

    console.log('n8n 웹훅 URL:', n8nWebhookUrl);

    // n8n 파이프라인 트리거
    const triggerData = {
      pipeline: pipelineName,
      userId: userId,
      timestamp: new Date().toISOString(),
      source: 'unaique-dashboard',
      ...additionalData
    };

    console.log('n8n에 전송할 데이터:', triggerData);

    const response = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.N8N_API_KEY || ''}`,
      },
      body: JSON.stringify(triggerData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ n8n 파이프라인 트리거 실패:', response.status, errorText);
      
      return NextResponse.json({
        success: false,
        message: 'n8n 파이프라인 트리거에 실패했습니다',
        error: `HTTP ${response.status}: ${errorText}`,
        n8nResponse: errorText
      }, { status: response.status });
    }

    const responseData = await response.json();
    console.log('✅ n8n 파이프라인 트리거 성공:', responseData);

    return NextResponse.json({
      success: true,
      message: 'n8n 파이프라인이 성공적으로 트리거되었습니다',
      pipeline: pipelineName,
      userId: userId,
      timestamp: new Date().toISOString(),
      n8nResponse: responseData
    });

  } catch (error) {
    console.error('❌ n8n 파이프라인 트리거 중 오류:', error);
    
    return NextResponse.json({
      success: false,
      message: 'n8n 파이프라인 트리거 중 오류가 발생했습니다',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 