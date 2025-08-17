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
    const { orderNumber } = body;

    if (!orderNumber) {
      return NextResponse.json(
        { error: 'Order Number가 필요합니다.' },
        { status: 400 }
      );
    }

    console.log('=== 프로젝트 취소 시작 ===');
    console.log('Order Number:', orderNumber);

    try {
      // 주문 상태를 '취소'로 업데이트
      await AirtableService.updateOrderStatus(orderNumber, {
        Status: '취소',
        'Delivery Date': new Date().toISOString()
      });
      
      console.log('✅ 프로젝트 취소 성공');

      return NextResponse.json({
        success: true,
        message: '프로젝트가 성공적으로 취소되었습니다.',
        orderNumber
      });

    } catch (error) {
      console.error('❌ 프로젝트 취소 실패:', error);
      
      return NextResponse.json({
        success: false,
        error: error instanceof Error ? error.message : '프로젝트 취소에 실패했습니다.'
      }, { status: 500 });
    }

  } catch (error) {
    console.error('❌ API 오류:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : '서버 오류가 발생했습니다.'
    }, { status: 500 });
  }
} 