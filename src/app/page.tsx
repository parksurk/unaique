"use client";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import UnaiqueLogo from "@/components/ui/logo"

// 이 페이지는 동적으로 렌더링되어야 함 (Clerk 인증 상태 확인 필요)
export const dynamic = 'force-dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { 
  Video, 
  Mic, 
  Sparkles, 
  Users,
  Play,
  ArrowRight,
  CheckCircle,
  Headphones
} from "lucide-react"
import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Home() {
  const { isSignedIn, isLoaded } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
                                    <div className="flex items-center space-x-4">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                            <Video className="h-5 w-5 text-white" />
                          </div>
                          <UnaiqueLogo size="lg" />
                        </div>

            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/" className={navigationMenuTriggerStyle()}>
                      홈
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>서비스</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <div className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href="/features"
                          >
                            <Video className="h-6 w-6" />
                            <div className="mb-2 mt-4 text-lg font-medium">
                              AI 동영상 제작
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              생성형 AI로 전문적인 동영상을 쉽게 제작하세요.
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </div>
                      <div className="text-sm">
                        <div className="grid grid-cols-2 gap-3">
                          <a
                            className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            href="/templates"
                          >
                            <div className="text-sm font-medium leading-none">템플릿</div>
                            <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                              다양한 장르별 템플릿으로 빠른 제작
                            </p>
                          </a>
                          <a
                            className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            href="/pricing"
                          >
                            <div className="text-sm font-medium leading-none">가격</div>
                            <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                              합리적인 가격으로 시작하세요
                            </p>
                          </a>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/features" className={navigationMenuTriggerStyle()}>
                      기능
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/templates" className={navigationMenuTriggerStyle()}>
                      템플릿
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/pricing" className={navigationMenuTriggerStyle()}>
                      가격
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/contact" className={navigationMenuTriggerStyle()}>
                      문의
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/webhook-test" className={navigationMenuTriggerStyle()}>
                      Webhook 테스트
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center space-x-4">
              {isLoaded && (
                <>
                  {isSignedIn ? (
                    <>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href="/dashboard">대시보드</Link>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={handleSignOut}
                        className="hover:bg-red-50 hover:text-red-600 hover:border-red-300"
                      >
                        로그아웃
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href="/sign-in">로그인</Link>
                      </Button>
                      <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" asChild>
                        <Link href="/sign-up">시작하기</Link>
                      </Button>
                    </>
                  )}
                </>
              )}
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
              AI 기반 동영상 제작
            </span>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
            One-man Creator를 위한
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI 동영상 제작 서비스
            </span>
          </h1>
          
          <p className="mt-6 text-lg leading-8 text-slate-600 max-w-3xl mx-auto">
            혼자서도 전문적인 동영상을 만들 수 있습니다. AI가 도와주는 스마트한 제작 도구로 
            창의성을 마음껏 발휘하세요.
          </p>
          
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" asChild>
              <Link href="/sign-up">
                무료로 시작하기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contact">
                <Play className="mr-2 h-4 w-4" />
                데모 보기
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Voice Agent Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              음성으로 대화하는 AI 어시스턴트
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              ElevenLabs Voice Agent와 자연스럽게 대화하며 CS 문의와 영상 제작을 요청하세요
            </p>
          </div>
          
          <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-slate-50">
            <CardHeader className="text-center pb-8">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                <Headphones className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Unaique AI 어시스턴트</CardTitle>
              <CardDescription className="text-lg">
                음성으로 CS 문의와 영상 제작을 도와드립니다
              </CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <Card className="border-blue-200 bg-blue-50">
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <Mic className="h-5 w-5 text-blue-600" />
                      <CardTitle className="text-lg">CS 문의</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-700">
                      계정 문제, 결제 문의, 기술 지원 등 모든 고객 서비스를 음성으로 해결
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-purple-200 bg-purple-50">
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <Video className="h-5 w-5 text-purple-600" />
                      <CardTitle className="text-lg">영상 제작 요청</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-700">
                      음성으로 영상 주제, 스타일, 길이 등을 설명하면 AI가 자동으로 제작
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="text-center">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Mic className="mr-2 h-5 w-5" />
                  음성 어시스턴트 시작하기
                </Button>
                <p className="mt-3 text-sm text-slate-500">마이크 버튼을 누르고 말씀해주세요</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              주요 기능
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Unaique만의 차별화된 AI 기술로 동영상 제작을 혁신하세요
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <Sparkles className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle>AI 스크립트 생성</CardTitle>
                <CardDescription>
                  키워드만 입력하면 AI가 자동으로 스크립트와 스토리보드를 생성합니다
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>자연스러운 한국어 스크립트</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>장르별 맞춤형 스토리</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>실시간 수정 및 개선</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                  <Video className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle>스마트 편집 도구</CardTitle>
                <CardDescription>
                  전문적인 편집 도구와 템플릿으로 쉽고 빠른 편집이 가능합니다
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>드래그 앤 드롭 편집</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>1000+ 전문 템플릿</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>자동 자막 생성</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle>실시간 협업</CardTitle>
                <CardDescription>
                  팀원들과 실시간으로 협업하고 피드백을 주고받을 수 있습니다
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>실시간 편집 공유</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>댓글 및 피드백</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>버전 관리</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-4xl font-bold text-slate-900 mb-2 group-hover:scale-110 transition-transform duration-300">10,000+</div>
              <div className="text-slate-600">활성 사용자</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-slate-900 mb-2 group-hover:scale-110 transition-transform duration-300">50,000+</div>
              <div className="text-slate-600">제작된 동영상</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-slate-900 mb-2 group-hover:scale-110 transition-transform duration-300">95%</div>
              <div className="text-slate-600">사용자 만족도</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-slate-900 mb-2 group-hover:scale-110 transition-transform duration-300">24/7</div>
              <div className="text-slate-600">AI 지원</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="mx-auto max-w-4xl">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6">
              지금 바로 시작하세요
            </h2>
            <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
              AI의 힘으로 당신만의 독특한 동영상을 만들어보세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/sign-up">무료 체험하기</Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">상담 문의</Link>
              </Button>
            </div>
          </div>
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
