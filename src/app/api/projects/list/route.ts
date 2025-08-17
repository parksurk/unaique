import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { AirtableService } from '@/lib/airtable';

export async function GET(request: NextRequest) {
  try {
    // 사용자 인증 확인
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: '인증이 필요합니다.' },
        { status: 401 }
      );
    }

    // URL 파라미터에서 businessId 가져오기
    const { searchParams } = new URL(request.url);
    const businessId = searchParams.get('businessId');

    if (!businessId) {
      return NextResponse.json(
        { error: 'Business ID가 필요합니다.' },
        { status: 400 }
      );
    }

    console.log('=== 사용자 프로젝트 목록 조회 시작 ===');
    console.log('Business ID:', businessId);

    try {
      // 사용자의 프로젝트 목록 조회
      const projects = await AirtableService.getUserProjects(businessId);
      
      console.log('✅ 프로젝트 목록 조회 성공');
      console.log('프로젝트 수:', projects.length);

      return NextResponse.json({
        success: true,
        projects,
        count: projects.length
      });

    } catch (error) {
      console.error('❌ 프로젝트 목록 조회 실패:', error);
      
      return NextResponse.json({
        success: false,
        error: error instanceof Error ? error.message : '프로젝트 목록을 가져올 수 없습니다.'
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