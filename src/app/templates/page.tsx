import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Video, 
  Sparkles, 
  Users, 
  Zap, 
  Star, 
  Play,
  ArrowRight,
  CheckCircle,
  Headphones,
  Mic,
  Palette,
  Clock,
  Globe,
  Shield,
  BarChart3,
  Lightbulb,
  BookOpen,
  TrendingUp,
  ShoppingCart,
  Heart,
  Music,
  Camera,
  Target
} from "lucide-react"

export default function TemplatesPage() {
  const templateCategories = [
    {
      name: "교육",
      icon: BookOpen,
      description: "학습과 지식 공유를 위한 전문적인 교육 영상 템플릿",
      templates: [
        {
          title: "온라인 강의",
          duration: "10-15분",
          difficulty: "초급",
          features: ["자막 자동 생성", "퀴즈 삽입", "진도 표시"],
          thumbnail: "📚"
        },
        {
          title: "튜토리얼",
          duration: "5-8분",
          difficulty: "초급",
          features: ["단계별 가이드", "화면 녹화", "요약 슬라이드"],
          thumbnail: "🎯"
        },
        {
          title: "프레젠테이션",
          duration: "15-20분",
          difficulty: "중급",
          features: ["전문적 디자인", "차트 삽입", "브랜딩 요소"],
          thumbnail: "📊"
        }
      ]
    },
    {
      name: "마케팅",
      icon: TrendingUp,
      description: "브랜드 홍보와 제품 소개를 위한 매력적인 마케팅 영상 템플릿",
      templates: [
        {
          title: "제품 소개",
          duration: "2-3분",
          difficulty: "초급",
          features: ["제품 하이라이트", "CTA 버튼", "소셜 미디어 최적화"],
          thumbnail: "🛍️"
        },
        {
          title: "브랜드 스토리",
          duration: "3-5분",
          difficulty: "중급",
          features: ["감정적 스토리텔링", "브랜드 컬러", "음악 동기화"],
          thumbnail: "💫"
        },
        {
          title: "광고",
          duration: "15-30초",
          difficulty: "고급",
          features: ["빠른 컷 편집", "시선 집중 효과", "강력한 메시지"],
          thumbnail: "🎬"
        }
      ]
    },
    {
      name: "엔터테인먼트",
      icon: Music,
      description: "재미있고 매력적인 콘텐츠를 위한 엔터테인먼트 영상 템플릿",
      templates: [
        {
          title: "브이로그",
          duration: "5-10분",
          difficulty: "초급",
          features: ["자연스러운 편집", "음악 오버레이", "자막 효과"],
          thumbnail: "📱"
        },
        {
          title: "게임 하이라이트",
          duration: "3-5분",
          difficulty: "중급",
          features: ["액션 시퀀스", "게임 UI 오버레이", "긴장감 조성"],
          thumbnail: "🎮"
        },
        {
          title: "음악 비디오",
          duration: "3-4분",
          difficulty: "고급",
          features: ["비트 동기화", "시각적 효과", "색상 그라데이션"],
          thumbnail: "🎵"
        }
      ]
    },
    {
      name: "비즈니스",
      icon: Target,
      description: "전문적이고 신뢰감 있는 비즈니스 콘텐츠를 위한 템플릿",
      templates: [
        {
          title: "회사 소개",
          duration: "2-3분",
          difficulty: "중급",
          features: ["로고 애니메이션", "팀 소개", "성과 지표"],
          thumbnail: "🏢"
        },
        {
          title: "회의 녹화",
          duration: "30-60분",
          difficulty: "초급",
          features: ["화자 표시", "주제별 챕터", "검색 가능한 자막"],
          thumbnail: "💼"
        },
        {
          title: "투자 피치",
          duration: "5-7분",
          difficulty: "고급",
          features: ["데이터 시각화", "전문적 그래픽", "신뢰감 있는 톤"],
          thumbnail: "📈"
        }
      ]
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
            <span className="inline-flex items-center rounded-full bg-purple-50 px-3 py-1 text-sm font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
              <Palette className="mr-2 h-4 w-4" />
              1000+ 전문 템플릿
            </span>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
            전문가가 만든
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              동영상 템플릿
            </span>
          </h1>
          
          <p className="mt-6 text-lg leading-8 text-slate-600 max-w-3xl mx-auto">
            교육, 마케팅, 엔터테인먼트 등 다양한 목적에 맞는 전문적으로 디자인된 템플릿으로 
            빠르고 쉽게 전문적인 동영상을 제작하세요.
          </p>
          
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              템플릿 둘러보기
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg">
              <Play className="mr-2 h-4 w-4" />
              데모 영상 보기
            </Button>
          </div>
        </div>
      </section>

      {/* Template Categories */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-6">
              카테고리별 템플릿
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              목적과 장르에 맞는 최적의 템플릿을 선택하여 
              효율적으로 동영상을 제작할 수 있습니다.
            </p>
          </div>
          
          <div className="space-y-16">
            {templateCategories.map((category, categoryIndex) => (
              <div key={category.name}>
                <div className="flex items-center space-x-3 mb-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
                    <category.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">{category.name}</h3>
                    <p className="text-slate-600">{category.description}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {category.templates.map((template, templateIndex) => (
                    <Card key={templateIndex} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-3xl">{template.thumbnail}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                              {template.difficulty}
                            </span>
                            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                              {template.duration}
                            </span>
                          </div>
                        </div>
                        <CardTitle className="text-lg">{template.title}</CardTitle>
                        <CardDescription>
                          {category.name} 분야에 특화된 전문 템플릿
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <ul className="space-y-2 mb-6">
                          {template.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center space-x-2 text-sm text-slate-600">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="flex space-x-2">
                          <Button size="sm" className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                            사용하기
                          </Button>
                          <Button size="sm" variant="outline">
                            <Heart className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Template Features */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-6">
              템플릿의 특별한 기능
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Unaique 템플릿만의 차별화된 기능들로 
              더욱 창의적이고 전문적인 동영상을 제작할 수 있습니다.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-lg text-center">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <Sparkles className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-lg">AI 최적화</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-sm">
                  AI가 자동으로 색상, 폰트, 레이아웃을 최적화하여 
                  완벽한 결과물을 만들어냅니다.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                  <Clock className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-lg">빠른 제작</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-sm">
                  드래그 앤 드롭으로 간단하게 콘텐츠를 교체하여 
                  몇 분 만에 완성된 동영상을 만들 수 있습니다.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <Globe className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-lg">다국어 지원</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-sm">
                  한국어, 영어, 일본어 등 다양한 언어로 
                  자동 번역 및 자막 생성이 가능합니다.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
                  <Shield className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle className="text-lg">상업적 사용</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-sm">
                  모든 템플릿은 상업적 사용이 가능하며, 
                  저작권 걱정 없이 자유롭게 활용할 수 있습니다.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Template Gallery */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-6">
              인기 템플릿 갤러리
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              사용자들이 가장 많이 선택한 인기 템플릿들을 
              미리보기로 확인해보세요.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "유튜브 썸네일", category: "마케팅", views: "12.5K", rating: 4.9, thumbnail: "🎨" },
              { title: "온라인 강의", category: "교육", views: "8.9K", rating: 4.8, thumbnail: "📚" },
              { title: "브랜드 스토리", category: "비즈니스", views: "6.7K", rating: 4.7, thumbnail: "💼" },
              { title: "게임 하이라이트", category: "엔터테인먼트", views: "15.2K", rating: 4.9, thumbnail: "🎮" },
              { title: "제품 리뷰", category: "마케팅", views: "9.3K", rating: 4.6, thumbnail: "📱" },
              { title: "회사 소개", category: "비즈니스", views: "7.1K", rating: 4.8, thumbnail: "🏢" }
            ].map((template, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer">
                <CardHeader className="pb-4">
                  <div className="relative">
                    <div className="w-full h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center text-4xl mb-3">
                      {template.thumbnail}
                    </div>
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium text-slate-700">
                      {template.category}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{template.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{template.rating}</span>
                    </div>
                    <span className="text-sm text-slate-500">{template.views} 사용</span>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    미리보기
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <Card className="border-0 shadow-2xl bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <CardHeader className="pb-8">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                지금 바로 템플릿을 시작하세요
              </h2>
              <p className="text-lg text-purple-100 max-w-2xl mx-auto">
                1000개 이상의 전문 템플릿으로 
                당신만의 독특한 동영상을 만들어보세요.
              </p>
            </CardHeader>
            <CardContent className="pb-8">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
                  무료 템플릿 시작하기
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                  프리미엄 템플릿 보기
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