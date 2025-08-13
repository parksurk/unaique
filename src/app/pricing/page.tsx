import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Video, 
  ArrowRight,
  CheckCircle,
  DollarSign,
  Calculator,
  Info
} from "lucide-react"

export default function PricingPage() {
  const pricingPlans = [
    {
      name: "쇼츠 영상",
      duration: "15초 ~ 1분",
      price: "5,000원 ~ 10,000원",
      priceUSD: "$4 ~ $8",
      description: "짧고 임팩트 있는 쇼츠 영상 제작",
      features: [
        "ShotStack 렌더링 (3-5 크레딧)",
        "AI 스크립트 생성 (Gemini)",
        "AI 음성 합성 (ElevenLabs)",
        "기본 템플릿 제공",
        "1회 수정 가능",
        "24시간 내 완성"
      ],
      costBreakdown: [
        { item: "ShotStack 렌더링", cost: "3-5 크레딧", detail: "약 $0.30~0.75" },
        { item: "AI 모델 사용", cost: "최소화", detail: "짧은 영상으로 비용 절약" },
        { item: "데이터 관리", cost: "기본", detail: "Pinecone, Airtable 포함" },
        { item: "서버 비용", cost: "낮음", detail: "API 호출 횟수 적음" }
      ],
      bestFor: "소셜미디어 마케팅, 빠른 홍보 영상",
      popular: false
    },
    {
      name: "1분 영상",
      duration: "1분",
      price: "12,000원 ~ 20,000원",
      priceUSD: "$9 ~ $16",
      description: "간결하고 효과적인 1분 영상 제작",
      features: [
        "ShotStack 렌더링 (5-8 크레딧)",
        "AI 스크립트 생성 (Gemini)",
        "AI 음성 합성 (ElevenLabs)",
        "고급 템플릿 선택",
        "2회 수정 가능",
        "48시간 내 완성",
        "기본 자막 제공"
      ],
      costBreakdown: [
        { item: "ShotStack 렌더링", cost: "5-8 크레딧", detail: "약 $0.50~1.20" },
        { item: "AI 텍스트 생성", cost: "중간", detail: "Gemini 토큰 비용" },
        { item: "AI 음성 합성", cost: "1분 TTS", detail: "ElevenLabs 비용" },
        { item: "데이터베이스", cost: "일부 할당", detail: "Airtable, Pinecone" }
      ],
      bestFor: "제품 소개, 교육 콘텐츠, 브랜드 메시지",
      popular: true
    },
    {
      name: "3분 영상",
      duration: "3분",
      price: "30,000원 ~ 45,000원",
      priceUSD: "$22 ~ $35",
      description: "상세하고 전문적인 3분 영상 제작",
      features: [
        "ShotStack 렌더링 (15-20 크레딧)",
        "AI 스크립트 생성 (Gemini Pro)",
        "AI 음성 합성 (ElevenLabs Pro)",
        "프리미엄 템플릿 선택",
        "3회 수정 가능",
        "72시간 내 완성",
        "고급 자막 및 효과",
        "음악 라이브러리 제공"
      ],
      costBreakdown: [
        { item: "ShotStack 렌더링", cost: "15-20 크레딧", detail: "약 $1.50~3.00" },
        { item: "AI 모델 사용량", cost: "증가", detail: "텍스트, 음성, 이미지 생성" },
        { item: "API 호출량", cost: "상승", detail: "데이터 처리 비용 증가" },
        { item: "서버 및 관리", cost: "포함", detail: "안정적 서비스 보장" }
      ],
      bestFor: "상세 제품 설명, 교육 강의, 회사 소개",
      popular: false
    },
    {
      name: "10분 영상",
      duration: "10분",
      price: "80,000원 ~ 120,000원",
      priceUSD: "$60 ~ $90",
      description: "고품질 프리미엄 10분 영상 제작",
      features: [
        "ShotStack 렌더링 (50-70+ 크레딧)",
        "AI 스크립트 생성 (Gemini Ultra)",
        "AI 음성 합성 (ElevenLabs Pro)",
        "커스텀 템플릿 디자인",
        "무제한 수정 가능",
        "7일 내 완성",
        "프로페셔널 자막",
        "고급 시각 효과",
        "전용 프로젝트 매니저",
        "우선 지원"
      ],
      costBreakdown: [
        { item: "ShotStack 렌더링", cost: "50-70+ 크레딧", detail: "약 $5.00~10.50" },
        { item: "AI 모델 사용량", cost: "대폭 증가", detail: "고급 모델 사용" },
        { item: "벡터 DB 및 관리", cost: "증가", detail: "Pinecone Pro, Airtable" },
        { item: "프리미엄 지원", cost: "포함", detail: "전용 매니저, 우선 지원" }
      ],
      bestFor: "상세 교육 콘텐츠, 프리미엄 브랜드 영상, 전문 강의",
      popular: false
    }
  ]

  const additionalServices = [
    {
      name: "AI 음성 커스터마이징",
      description: "브랜드에 맞는 고유한 음성 톤 설정",
      price: "5,000원 / 프로젝트"
    },
    {
      name: "다국어 자막 생성",
      description: "한국어, 영어, 일본어 등 다국어 자막",
      price: "3,000원 / 언어"
    },
    {
      name: "프리미엄 음악 라이브러리",
      description: "저작권 걱정 없는 고품질 음악",
      price: "2,000원 / 프로젝트"
    },
    {
      name: "긴급 제작 서비스",
      description: "24시간 내 완성 보장",
      price: "기본 가격의 50% 추가"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                  <Video className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-slate-900">Unaique</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  ← 홈으로 돌아가기
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700 ring-1 ring-inset ring-green-700/10">
              <DollarSign className="mr-2 h-4 w-4" />
              투명한 가격 정책
            </span>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
            합리적인
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              가격 정책
            </span>
          </h1>
          
          <p className="mt-6 text-lg leading-8 text-slate-600 max-w-3xl mx-auto">
            영상 길이와 복잡도에 따라 투명하게 책정된 가격으로 
            AI 기반 동영상 제작 서비스를 이용하세요.
          </p>
          
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              가격 계산기
              <Calculator className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg">
              <Info className="mr-2 h-4 w-4" />
              가격 정책 상세보기
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-6">
              서비스별 가격
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              영상 길이와 복잡도에 따라 최적화된 가격으로 제공됩니다.
              모든 가격에는 AI 모델 사용료와 렌더링 비용이 포함되어 있습니다.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingPlans.map((plan) => (
              <Card 
                key={plan.name} 
                className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                  plan.popular 
                    ? 'ring-2 ring-blue-500 bg-gradient-to-br from-blue-50 to-purple-50' 
                    : 'bg-white'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      인기
                    </span>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl mb-2">{plan.name}</CardTitle>
                  <div className="text-sm text-slate-600 mb-2">{plan.duration}</div>
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-slate-900">{plan.price}</div>
                    <div className="text-sm text-slate-500">{plan.priceUSD}</div>
                  </div>
                  <CardDescription className="text-sm">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2 text-sm text-slate-600">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' 
                        : 'bg-slate-900 hover:bg-slate-800'
                    }`}
                  >
                    선택하기
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cost Breakdown */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-6">
              가격 구성 요소
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              각 서비스 가격에 포함된 비용 요소들을 투명하게 공개합니다.
              AI 모델 사용료부터 렌더링 비용까지 모든 것이 포함되어 있습니다.
            </p>
          </div>
          
          <div className="space-y-8">
            {pricingPlans.map((plan) => (
              <Card key={plan.name} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">{plan.name} 서비스</CardTitle>
                      <CardDescription>{plan.duration} • {plan.price}</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-slate-900">{plan.price}</div>
                      <div className="text-sm text-slate-500">{plan.priceUSD}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">비용 구성</h4>
                      <div className="space-y-3">
                        {plan.costBreakdown.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex justify-between items-center py-2 border-b border-slate-100">
                            <span className="text-sm text-slate-700">{item.item}</span>
                            <div className="text-right">
                              <div className="text-sm font-medium text-slate-900">{item.cost}</div>
                              <div className="text-xs text-slate-500">{item.detail}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">적합한 용도</h4>
                      <p className="text-sm text-slate-600 mb-4">{plan.bestFor}</p>
                      
                      <h4 className="font-semibold text-slate-900 mb-3">주요 특징</h4>
                      <ul className="space-y-2 text-sm text-slate-600">
                        {plan.features.slice(0, 4).map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center space-x-2">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-6">
              추가 서비스
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              기본 서비스 외에도 필요에 따라 선택할 수 있는 
              추가 서비스들을 제공합니다.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {additionalServices.map((service) => (
                              <Card key={service.name} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-slate-900">{service.price}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    추가하기
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-white">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-6">
              자주 묻는 질문
            </h2>
          </div>
          
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">가격에 모든 비용이 포함되어 있나요?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  네, 모든 가격에는 AI 모델 사용료(ShotStack, Gemini, PiAPI, ElevenLabs), 
                  렌더링 비용, 데이터베이스 비용, 서버 운영비가 포함되어 있습니다. 
                  추가 비용 없이 명시된 가격으로 서비스를 이용할 수 있습니다.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">수정 횟수 제한이 있나요?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  서비스 유형에 따라 수정 횟수가 다릅니다. 쇼츠 영상은 1회, 1분 영상은 2회, 
                  3분 영상은 3회, 10분 영상은 무제한 수정이 가능합니다. 
                  추가 수정이 필요한 경우 별도 요금이 발생할 수 있습니다.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">긴급 제작 서비스는 언제 이용할 수 있나요?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  긴급 제작 서비스는 24시간 내 완성이 필요한 경우에 이용할 수 있습니다. 
                  기본 가격의 50% 추가 요금이 발생하며, 
                  프로젝트의 복잡도에 따라 완성 시간이 달라질 수 있습니다.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <Card className="border-0 shadow-2xl bg-gradient-to-r from-green-600 to-blue-600 text-white">
            <CardHeader className="pb-8">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                지금 바로 시작하세요
              </h2>
              <p className="text-lg text-green-100 max-w-2xl mx-auto">
                투명한 가격으로 AI 기반 동영상 제작 서비스를 
                체험해보고 전문적인 콘텐츠를 만들어보세요.
              </p>
            </CardHeader>
            <CardContent className="pb-8">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-gray-100">
                  무료 체험 시작하기
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
                  상담 문의하기
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-200">
        <div className="mx-auto max-w-6xl text-center">
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                <Video className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">Unaique</span>
            </div>
            <p className="text-slate-600 max-w-md mx-auto">
              One-man Creator를 위한 AI 기반 동영상 제작 서비스
            </p>
          </div>
          <div className="border-t border-slate-200 pt-8">
            <p className="text-slate-500">&copy; 2024 Unaique. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 