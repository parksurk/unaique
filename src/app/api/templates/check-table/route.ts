import { NextResponse } from 'next/server';
import { AirtableService } from '@/lib/airtable';

export async function GET() {
  try {
    console.log('=== Templates 테이블 구조 확인 ===');

    // 1. Airtable 연결 테스트
    console.log('1. Airtable 연결 테스트 중...');
    const connectionTest = await AirtableService.testConnection();
    
    if (!connectionTest) {
      return NextResponse.json({
        success: false,
        message: 'Airtable 연결 실패',
        error: 'Connection failed',
        details: 'AIRTABLE_API_KEY와 AIRTABLE_BASE_ID를 확인해주세요.'
      }, { status: 500 });
    }

    console.log('✅ Airtable 연결 성공');

    // 2. Templates 테이블 접근 테스트
    console.log('2. Templates 테이블 접근 테스트 중...');
    try {
      const templates = await AirtableService.getAllTemplates();
      console.log('✅ Templates 테이블 접근 성공');
      
      return NextResponse.json({
        success: true,
        message: 'Templates 테이블 연결 성공',
        connection: 'Connected',
        tableAccess: 'Success',
        existingTemplates: templates.length,
        details: 'Templates 테이블이 정상적으로 접근 가능합니다.'
      });

    } catch (tableError) {
      console.error('❌ Templates 테이블 접근 실패:', tableError);
      
      return NextResponse.json({
        success: false,
        message: 'Templates 테이블 접근 실패',
        error: 'Table access failed',
        details: '가능한 원인: 1) Templates 테이블이 존재하지 않음, 2) 테이블명이 다름, 3) 권한 문제',
        suggestion: 'Airtable에서 "Templates" 테이블을 생성하고 API 키 권한을 확인해주세요.'
      }, { status: 500 });
    }

  } catch (error) {
    console.error('❌ 테이블 구조 확인 중 오류:', error);

    return NextResponse.json({
      success: false,
      message: '테이블 구조 확인 중 오류가 발생했습니다.',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 