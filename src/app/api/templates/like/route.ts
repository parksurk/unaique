import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { getTemplatesTable } from '@/lib/airtable';

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
    const { templateId } = body;

    // 필수 필드 검증
    if (!templateId) {
      return NextResponse.json(
        { error: '템플릿 ID는 필수입니다.' },
        { status: 400 }
      );
    }

    // Airtable에서 템플릿의 현재 like 값 조회
    const templatesTable = getTemplatesTable();
    const template = await templatesTable.find(templateId);
    
    if (!template) {
      return NextResponse.json(
        { error: '템플릿을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 현재 like 값에 1을 더함
    const currentLike = (template.fields.like as number) || 0;
    const newLike = currentLike + 1;

    // Airtable 업데이트
    await templatesTable.update(templateId, {
      like: newLike
    });

    console.log(`✅ 템플릿 ${templateId} 좋아요 업데이트 성공: ${currentLike} → ${newLike}`);

    return NextResponse.json({
      success: true,
      newLike,
      message: '좋아요가 성공적으로 업데이트되었습니다.'
    });

  } catch (error) {
    console.error('❌ 템플릿 좋아요 업데이트 실패:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: '좋아요 업데이트에 실패했습니다.' },
      { status: 500 }
    );
  }
} 