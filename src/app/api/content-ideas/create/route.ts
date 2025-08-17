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
    const { businessId, 아이디어, 자막, '배경 설명': 배경설명 } = body;

    // 필수 필드 검증
    if (!businessId || !아이디어 || !자막 || !배경설명) {
      return NextResponse.json(
        { error: 'Business ID, 아이디어, 자막, 배경 설명은 필수입니다.' },
        { status: 400 }
      );
    }

    console.log('=== Content Idea 생성 API 요청 데이터 ===');
    console.log('Business ID:', businessId);
    console.log('아이디어:', 아이디어);
    console.log('자막:', 자막);
    console.log('배경 설명:', 배경설명);

    // Content Ideas 테이블에 아이디어 추가
    const contentIdea = await AirtableService.createContentIdea({
      Customer: businessId,
      아이디어,
      자막,
      '배경 설명': 배경설명,
      자동화: '자동화 시작'
    });

    console.log('✅ Content Idea 생성 성공:', contentIdea);

    return NextResponse.json({
      success: true,
      id: contentIdea.ID,
      message: 'Content Idea가 성공적으로 생성되었습니다.'
    });

  } catch (error) {
    console.error('Content Idea 생성 실패:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Content Idea 생성에 실패했습니다.' },
      { status: 500 }
    );
  }
} 