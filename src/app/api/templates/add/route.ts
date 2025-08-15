import { NextResponse } from 'next/server';
import { AirtableService, TemplateData } from '@/lib/airtable';

// 템플릿 데이터 정의
const defaultTemplates: TemplateData[] = [
  // 교육 카테고리
  {
    Category: "교육",
    Name: "온라인 강의",
    Desc: "교육 분야에 특화된 전문 템플릿",
    아이디어: "자막 자동 생성, 퀴즈 삽입, 진도 표시",
    Duration: "10-15분",
    Difficulty: "초급",
    Thumbnail: "📚"
  },
  {
    Category: "교육",
    Name: "튜토리얼",
    Desc: "단계별 학습을 위한 체계적인 가이드 템플릿",
    아이디어: "단계별 가이드, 화면 녹화, 요약 슬라이드",
    Duration: "5-8분",
    Difficulty: "초급",
    Thumbnail: "🎯"
  },
  {
    Category: "교육",
    Name: "프레젠테이션",
    Desc: "전문적이고 학술적인 프레젠테이션 템플릿",
    아이디어: "전문적 디자인, 차트 삽입, 브랜딩 요소",
    Duration: "15-20분",
    Difficulty: "중급",
    Thumbnail: "📊"
  },
  
  // 마케팅 카테고리
  {
    Category: "마케팅",
    Name: "제품 소개",
    Desc: "제품의 매력을 효과적으로 전달하는 템플릿",
    아이디어: "제품 하이라이트, CTA 버튼, 소셜 미디어 최적화",
    Duration: "2-3분",
    Difficulty: "초급",
    Thumbnail: "🛍️"
  },
  {
    Category: "마케팅",
    Name: "브랜드 스토리",
    Desc: "브랜드의 가치와 스토리를 감동적으로 전달하는 템플릿",
    아이디어: "감정적 스토리텔링, 브랜드 컬러, 음악 동기화",
    Duration: "3-5분",
    Difficulty: "중급",
    Thumbnail: "💫"
  },
  {
    Category: "마케팅",
    Name: "광고",
    Desc: "짧고 강력한 메시지로 시청자의 시선을 사로잡는 템플릿",
    아이디어: "빠른 컷 편집, 시선 집중 효과, 강력한 메시지",
    Duration: "15-30초",
    Difficulty: "고급",
    Thumbnail: "🎬"
  },
  
  // 엔터테인먼트 카테고리
  {
    Category: "엔터테인먼트",
    Name: "브이로그",
    Desc: "자연스럽고 친근한 일상 기록을 위한 템플릿",
    아이디어: "자연스러운 편집, 음악 오버레이, 자막 효과",
    Duration: "5-10분",
    Difficulty: "초급",
    Thumbnail: "📱"
  },
  {
    Category: "엔터테인먼트",
    Name: "게임 하이라이트",
    Desc: "게임의 긴장감과 재미를 극대화하는 템플릿",
    아이디어: "액션 시퀀스, 게임 UI 오버레이, 긴장감 조성",
    Duration: "3-5분",
    Difficulty: "중급",
    Thumbnail: "🎮"
  },
  {
    Category: "엔터테인먼트",
    Name: "음악 비디오",
    Desc: "음악의 리듬과 감정을 시각적으로 표현하는 템플릿",
    아이디어: "비트 동기화, 시각적 효과, 색상 그라데이션",
    Duration: "3-4분",
    Difficulty: "고급",
    Thumbnail: "🎵"
  },
  
  // 비즈니스 카테고리
  {
    Category: "비즈니스",
    Name: "회사 소개",
    Desc: "회사의 전문성과 신뢰성을 효과적으로 전달하는 템플릿",
    아이디어: "로고 애니메이션, 팀 소개, 성과 지표",
    Duration: "2-3분",
    Difficulty: "중급",
    Thumbnail: "🏢"
  },
  {
    Category: "비즈니스",
    Name: "회의 녹화",
    Desc: "회의 내용을 체계적으로 정리하고 공유하기 위한 템플릿",
    아이디어: "화자 표시, 주제별 챕터, 검색 가능한 자막",
    Duration: "30-60분",
    Difficulty: "초급",
    Thumbnail: "💼"
  },
  {
    Category: "비즈니스",
    Name: "투자 피치",
    Desc: "투자자에게 회사의 가치와 잠재력을 설득력 있게 전달하는 템플릿",
    아이디어: "데이터 시각화, 전문적 그래픽, 신뢰감 있는 톤",
    Duration: "5-7분",
    Difficulty: "고급",
    Thumbnail: "📈"
  }
];

export async function POST() {
  try {
    console.log('=== 템플릿 추가 API 요청 ===');

    // Airtable에 템플릿 일괄 추가 (배치 처리)
    console.log('=== API에서 템플릿 추가 시작 ===');
    console.log('전송할 템플릿 데이터:', defaultTemplates[0]);
    console.log('총 템플릿 수:', defaultTemplates.length);
    console.log('배치 처리: 10개씩 나누어 처리 (Airtable 제한)');
    
    const success = await AirtableService.addTemplates(defaultTemplates);

    if (success) {
      console.log('✅ 템플릿 추가 성공');
      return NextResponse.json({
        success: true,
        message: '12개의 템플릿이 성공적으로 추가되었습니다. (10개 + 2개 배치 처리)',
        count: defaultTemplates.length,
        batchInfo: 'Airtable 제한으로 인해 10개씩 나누어 처리됨',
        templates: defaultTemplates
      });
    } else {
      console.error('❌ 템플릿 추가 실패');
      return NextResponse.json({
        success: false,
        message: '템플릿 추가 중 오류가 발생했습니다. Airtable 연결 및 테이블 구조를 확인해주세요.',
        error: 'Template creation failed - check Airtable connection and table structure',
        details: '가능한 원인: 1) Templates 테이블이 존재하지 않음, 2) 필드명이 일치하지 않음, 3) Airtable 권한 문제, 4) 배치 처리 중 오류',
        suggestion: '먼저 "테이블 구조 확인" 버튼으로 연결 상태를 확인해주세요.'
      }, { status: 500 });
    }

  } catch (error) {
    console.error('❌ 템플릿 추가 API 오류:', error);

    return NextResponse.json({
      success: false,
      message: '템플릿 추가 중 오류가 발생했습니다.',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    console.log('=== 템플릿 조회 API 요청 ===');

    // Airtable에서 모든 템플릿 조회
    const templates = await AirtableService.getAllTemplates();

    return NextResponse.json({
      success: true,
      message: '템플릿 조회가 완료되었습니다.',
      count: templates.length,
      templates: templates
    });

  } catch (error) {
    console.error('❌ 템플릿 조회 API 오류:', error);

    return NextResponse.json({
      success: false,
      message: '템플릿 조회 중 오류가 발생했습니다.',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 