import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { AirtableService } from '@/lib/airtable';

export async function POST(request: NextRequest) {
  try {
    // 사용자 인증 확인
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: '인증이 필요합니다.' },
        { status: 401 }
      );
    }

    // 요청 본문 파싱
    const body = await request.json();
    const { businessId, contentIdeaId, status } = body;

    // 필수 필드 검증
    if (!businessId || !contentIdeaId || !status) {
      return NextResponse.json(
        { error: 'Business ID, Content Idea ID, 상태는 필수입니다.' },
        { status: 400 }
      );
    }

    // 현재 날짜시간
    const now = new Date().toISOString();

                    // Orders 테이블에 주문 추가
                const order = await AirtableService.createOrder({
                  Customer: businessId,
                  Status: '생성중', // Airtable에서 정의된 한글 Status 옵션
                  'Order Date': now,
                  'Used Credits': 0 // 초기값
                });

    console.log('주문 생성 성공:', order);

    return NextResponse.json({
      success: true,
      orderNumber: order['Order Number'],
      message: '주문이 성공적으로 생성되었습니다.'
    });

  } catch (error) {
    console.error('주문 생성 실패:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: '주문 생성에 실패했습니다.' },
      { status: 500 }
    );
  }
} 