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
  Lightbulb
} from "lucide-react"

export default function FeaturesPage() {
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
            <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
              <Sparkles className="mr-2 h-4 w-4" />
              강력한 AI 기능
            </span>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
            Unaique의
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              핵심 기능
            </span>
          </h1>
          
          <p className="mt-6 text-lg leading-8 text-slate-600 max-w-3xl mx-auto">
            AI 기술의 최전선에서 동영상 제작을 혁신하는 Unaique만의 특별한 기능들을 만나보세요.
            혼자서도 전문가 수준의 동영상을 제작할 수 있습니다.
          </p>
        </div>
      </section>

      {/* AI Script Generation */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-6">
                AI 스크립트 생성
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                키워드만 입력하면 AI가 자동으로 완벽한 스크립트와 스토리보드를 생성합니다. 
                자연스러운 한국어로 작성되며, 장르별 맞춤형 스토리 구조를 제공합니다.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-900">자연스러운 한국어 스크립트</span>
                    <p className="text-slate-600 text-sm mt-1">GPT 기반 AI가 한국어의 뉘앙스를 완벽하게 이해하여 자연스러운 대화체로 작성</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-900">장르별 맞춤형 스토리</span>
                    <p className="text-slate-600 text-sm mt-1">교육, 엔터테인먼트, 비즈니스 등 목적에 맞는 최적화된 스토리 구조</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-900">실시간 수정 및 개선</span>
                    <p className="text-slate-600 text-sm mt-1">AI가 피드백을 학습하여 점진적으로 더 나은 스크립트 생성</p>
                  </div>
                </li>
              </ul>
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                스크립트 생성 시작하기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="relative">
              <Card className="border-0 shadow-2xl bg-gradient-to-br from-blue-50 to-purple-50 p-8">
                <div className="text-center mb-6">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">AI 스크립트 예시</h3>
                </div>
                <div className="space-y-4 text-sm">
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <p className="text-slate-800 font-medium">입력: "유튜브용 교육 영상, AI 기술 소개, 5분"</p>
                  </div>
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-4">
                    <p className="font-medium">AI 생성 결과:</p>
                    <p className="mt-2">🎬 제목: "AI 기술이 바꾸는 우리의 미래"</p>
                    <p>📝 구조: 도입(30초) → AI 정의(1분) → 실제 활용사례(2분) → 미래 전망(1분) → 마무리(30초)</p>
                    <p>💡 핵심 포인트: 시청자 참여 유도, 구체적 예시 포함, 쉬운 용어 사용</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Editing Tools */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative">
                <Card className="border-0 shadow-2xl bg-gradient-to-br from-purple-50 to-pink-50 p-8">
                  <div className="text-center mb-6">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-600">
                      <Palette className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900">편집 도구 미리보기</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-3 border border-purple-200">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700">드래그 앤 드롭</span>
                        <span className="text-xs text-green-600">✓ 지원</span>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-purple-200">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700">자동 자막 생성</span>
                        <span className="text-xs text-green-600">✓ 지원</span>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-purple-200">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700">1000+ 템플릿</span>
                        <span className="text-xs text-green-600">✓ 지원</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-6">
                스마트 편집 도구
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                전문적인 편집 도구와 템플릿으로 쉽고 빠른 편집이 가능합니다. 
                드래그 앤 드롭 방식의 직관적인 인터페이스와 AI 자동화 기능을 제공합니다.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-900">드래그 앤 드롭 편집</span>
                    <p className="text-slate-600 text-sm mt-1">마우스로 간단하게 영상 요소를 배치하고 편집할 수 있는 직관적인 인터페이스</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-900">1000+ 전문 템플릿</span>
                    <p className="text-slate-600 text-sm mt-1">교육, 마케팅, 엔터테인먼트 등 다양한 목적에 맞는 전문적으로 디자인된 템플릿</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-900">자동 자막 생성</span>
                    <p className="text-slate-600 text-sm mt-1">AI가 음성을 인식하여 자동으로 자막을 생성하고 동기화</p>
                  </div>
                </li>
              </ul>
              <Button size="lg" variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white">
                편집 도구 체험하기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Voice Agent Features */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-6">
              ElevenLabs Voice Agent
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              음성으로 자연스럽게 대화하며 CS 문의와 영상 제작을 요청할 수 있는 
              혁신적인 AI 어시스턴트 기능을 제공합니다.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <Mic className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle>음성 인식</CardTitle>
                <CardDescription>
                  고품질 음성 인식으로 정확한 명령 전달
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>99.9% 정확도</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>다국어 지원</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>노이즈 제거</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                  <Headphones className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle>자연스러운 응답</CardTitle>
                <CardDescription>
                  ElevenLabs의 고품질 음성 합성 기술
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>감정 표현</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>자연스러운 억양</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>실시간 대화</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <Lightbulb className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle>스마트 추천</CardTitle>
                <CardDescription>
                  AI가 사용자 패턴을 학습하여 맞춤형 제안
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>개인화된 추천</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>트렌드 분석</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>최적화 제안</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-6">
              고급 기능
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              전문가들이 필요로 하는 고급 기능들을 제공하여 
              더욱 정교하고 창의적인 동영상 제작이 가능합니다.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                    <BarChart3 className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle>실시간 분석 대시보드</CardTitle>
                    <CardDescription>동영상 성과를 실시간으로 모니터링</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">
                  시청자 참여도, 재생 시간, 클릭률 등 다양한 지표를 실시간으로 분석하여 
                  동영상 최적화에 필요한 인사이트를 제공합니다.
                </p>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>시청자 행동 분석</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>트렌드 예측</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>성과 리포트</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                    <Shield className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle>보안 및 권한 관리</CardTitle>
                    <CardDescription>팀 협업을 위한 안전한 환경</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">
                  역할 기반 접근 제어와 암호화를 통해 프로젝트의 보안을 보장하며, 
                  팀원별로 적절한 권한을 부여할 수 있습니다.
                </p>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>암호화 저장</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>권한 관리</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>감사 로그</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <Card className="border-0 shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardHeader className="pb-8">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                지금 바로 기능을 체험해보세요
              </h2>
              <p className="text-lg text-blue-100 max-w-2xl mx-auto">
                Unaique의 강력한 AI 기능들을 무료로 체험하고, 
                전문가 수준의 동영상을 제작해보세요.
              </p>
            </CardHeader>
            <CardContent className="pb-8">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                  무료 체험 시작하기
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
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