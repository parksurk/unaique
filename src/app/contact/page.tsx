"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  Clock, 
  MapPin, 
  HelpCircle,
  Users,
  Star,
  Headphones,
  ExternalLink,
  Video
} from "lucide-react"
import { useEffect, useState, useRef } from "react"
import UnaiqueLogo from "@/components/ui/logo"
import { useClerk, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function ContactPage() {
  const { isSignedIn, isLoaded } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const [elevenLabsUrl, setElevenLabsUrl] = useState<string>("")
  const [widgetLoaded, setWidgetLoaded] = useState(false)
  const [useIframe, setUseIframe] = useState(true)
  const [iframeError, setIframeError] = useState(false)
  const [widgetKey, setWidgetKey] = useState(0)
  const widgetRef = useRef<HTMLDivElement>(null)

  // 로그아웃 처리
  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    // Generate unique IDs for ElevenLabs
    const timestamp = Date.now()
    const randomId = Math.random().toString(36).substr(2, 9)
    
    // Create base URL with required parameters
    const baseUrl = "https://elevenlabs.io/app/talk-to"
    const params = new URLSearchParams({
      agent_id: "agent_5101k21dq20kffnt34dfzn5sw5tc",
      var_system_conversation_id: `conv_${timestamp}_${randomId}`,
      var_conversation_id: `conv_${timestamp}_${randomId}`,
      var_session_id: `session_${timestamp}_${randomId}`,
      var_user_id: `user_${timestamp}_${randomId}`,
      demo: "false",
      test: "false",
      mode: "chat",
      theme: "light"
    })
    
    setElevenLabsUrl(`${baseUrl}?${params.toString()}`)
  }, [])

  useEffect(() => {
    // Try to load ElevenLabs widget directly if iframe fails
    if (!useIframe && !widgetLoaded) {
      const loadWidget = async () => {
        try {
          // Create and load ElevenLabs script
          const script = document.createElement('script')
          script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed'
          script.async = true
          script.type = 'text/javascript'
          
          script.onload = () => {
            if (widgetRef.current) {
              createWidget()
            }
          }
          
          script.onerror = () => {
            console.error('Failed to load ElevenLabs script')
            setUseIframe(true)
            setIframeError(true)
          }
          
          document.head.appendChild(script)
        } catch (error) {
          console.error('Error loading ElevenLabs widget:', error)
          setUseIframe(true)
          setIframeError(true)
        }
      }
      
      loadWidget()
    }
  }, [useIframe, widgetLoaded])

  const createWidget = () => {
    if (!widgetRef.current) return
    
    try {
      const timestamp = Date.now()
      const randomId = Math.random().toString(36).substr(2, 9)
      
      const widget = document.createElement('elevenlabs-convai')
      widget.setAttribute('agent-id', 'agent_5101k21dq20kffnt34dfzn5sw5tc')
      widget.setAttribute('system-conversation-id', `conv_${timestamp}_${randomId}`)
      widget.setAttribute('conversation-id', `conv_${timestamp}_${randomId}`)
      widget.setAttribute('session-id', `session_${timestamp}_${randomId}`)
      widget.setAttribute('user-id', `user_${timestamp}_${randomId}`)
      widget.setAttribute('demo', 'false')
      widget.setAttribute('test', 'false')
      widget.setAttribute('mode', 'chat')
      widget.setAttribute('theme', 'light')
      widget.style.width = '100%'
      widget.style.height = '500px'
      widget.style.borderRadius = '8px'
      
      // Clear existing content safely
      if (widgetRef.current) {
        widgetRef.current.innerHTML = ''
        widgetRef.current.appendChild(widget)
        setWidgetLoaded(true)
        console.log('ElevenLabs widget created successfully')
      }
    } catch (error) {
      console.error('Error creating widget:', error)
      setUseIframe(true)
      setIframeError(true)
    }
  }

  const handleIframeError = () => {
    // If iframe fails, try direct widget
    setIframeError(true)
    setUseIframe(false)
  }

  const handleIframeLoad = () => {
    // If iframe loads successfully, reset error state
    setIframeError(false)
    console.log('ElevenLabs iframe loaded successfully')
  }

  const retryWidget = () => {
    // Reset all states and try again
    setWidgetLoaded(false)
    setIframeError(false)
    setWidgetKey(prev => prev + 1) // Force re-render
    
    if (useIframe) {
      setUseIframe(false)
    } else {
      setUseIframe(true)
    }
  }

  // Auto-fallback if iframe has error
  useEffect(() => {
    if (iframeError && useIframe) {
      const timer = setTimeout(() => {
        setUseIframe(false)
      }, 3000) // Wait 3 seconds before auto-fallback
      
      return () => clearTimeout(timer)
    }
  }, [iframeError, useIframe])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                  <Video className="h-5 w-5 text-white" />
                </div>
                <UnaiqueLogo size="lg" />
              </Link>
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
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            문의하기
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Unaique 서비스에 대한 문의사항이나 궁금한 점이 있으시면 언제든 연락주세요.<br/>
            빠르고 정확한 답변을 드리겠습니다.
          </p>
        </div>
      </section>

      {/* Contact Methods Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              다양한 연락 방법
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              편하신 방법으로 언제든 연락주세요. 빠른 응답을 약속드립니다.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Email Contact */}
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Mail className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl">이메일 문의</CardTitle>
                <CardDescription>
                  자세한 내용을 작성하여 문의하실 수 있습니다
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold text-blue-600 mb-4">
                  contact@unaique.com
                </p>
                <p className="text-gray-600 mb-6">
                  일반적으로 24시간 이내에 답변드립니다
                </p>
                <Button asChild className="w-full">
                  <Link href="mailto:contact@unaique.com">
                    이메일 보내기
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Phone Contact */}
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Phone className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl">전화 문의</CardTitle>
                <CardDescription>
                  긴급하거나 복잡한 문의사항이 있으시면 전화로 연락주세요
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold text-green-600 mb-4">
                  02-1234-5678
                </p>
                <p className="text-gray-600 mb-6">
                  평일 9:00 - 18:00 (점심시간 12:00 - 13:00)
                </p>
                <Button asChild className="w-full" variant="outline">
                  <Link href="tel:02-1234-5678">
                    전화하기
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Live Chat */}
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <MessageCircle className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-2xl">실시간 채팅</CardTitle>
                <CardDescription>
                  빠른 답변이 필요하시면 실시간 채팅을 이용해보세요
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold text-purple-600 mb-4">
                  평일 9:00 - 18:00
                </p>
                <p className="text-gray-600 mb-6">
                  실시간으로 전문가와 상담하실 수 있습니다
                </p>
                <Button asChild className="w-full" variant="outline">
                  <Link href="#">
                    채팅 시작하기
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ElevenLabs AI Voice Agent Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              AI 음성 에이전트와 상담하기
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              ElevenLabs AI 음성 에이전트와 실시간으로 대화하며 빠르고 정확한 답변을 받아보세요.<br/>
              영상 제작 문의부터 기술 지원까지, 모든 것을 음성으로 해결합니다.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="p-8 shadow-xl">
              <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-6">
                  <Headphones className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  ElevenLabs AI 음성 에이전트
                </h3>
                <p className="text-gray-600 mb-6">
                  아래 버튼을 클릭하여 ElevenLabs AI 음성 에이전트와 상담을 시작하세요
                </p>
              </div>

              {/* ElevenLabs Widget Container */}
              <div className="w-full h-[600px] bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl border-2 border-dashed border-blue-300 flex items-center justify-center">
                {useIframe && elevenLabsUrl ? (
                  <iframe
                    src={elevenLabsUrl}
                    title="ElevenLabs AI Voice Agent"
                    className="w-full h-full border-0 rounded-lg"
                    allow="microphone; camera"
                    onError={handleIframeError}
                    onLoad={handleIframeLoad}
                  />
                ) : (
                  <div 
                    key={widgetKey}
                    ref={widgetRef} 
                    className="w-full h-full"
                  >
                    {!widgetLoaded && (
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                          <Headphones className="w-8 h-8 text-blue-600" />
                        </div>
                        <p className="text-gray-600 mb-4">
                          {iframeError 
                            ? 'iframe 로딩에 실패했습니다. 직접 위젯을 시도합니다...' 
                            : elevenLabsUrl 
                              ? 'ElevenLabs AI 음성 에이전트를 준비하고 있습니다...' 
                              : 'ElevenLabs AI 음성 에이전트를 초기화하고 있습니다...'
                          }
                        </p>
                        <div className="w-8 h-8 mx-auto border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Fallback Options */}
              {elevenLabsUrl && (
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600 mb-4">
                    {iframeError 
                      ? 'iframe 로딩에 실패했습니다. 아래 옵션을 시도해보세요:' 
                      : '위젯이 로드되지 않는 경우 아래 옵션을 시도해보세요:'
                    }
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={retryWidget}
                    >
                      {useIframe ? '직접 위젯 시도' : 'iframe 시도'}
                    </Button>
                    <Button 
                      asChild 
                      variant="outline" 
                      size="sm"
                    >
                      <a 
                        href={elevenLabsUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        새 창에서 열기
                      </a>
                    </Button>
                  </div>
                  {iframeError && (
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        <strong>참고:</strong> Vercel 환경에서는 iframe 제한으로 인해 로딩이 실패할 수 있습니다. 
                        &ldquo;직접 위젯 시도&rdquo; 버튼을 클릭하거나 &ldquo;새 창에서 열기&rdquo;를 사용해보세요.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              자주 묻는 질문
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              고객님들이 자주 문의하시는 내용들을 정리해드렸습니다
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-blue-600" />
                  서비스 이용 방법이 궁금해요
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Unaique는 AI 기반 비디오 제작 서비스입니다. 
                  간단한 텍스트 입력만으로 전문적인 비디오를 제작할 수 있습니다.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-green-600" />
                  비디오 제작에 얼마나 걸리나요?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  일반적으로 5-10분 내에 완성됩니다. 
                  복잡한 요청사항이 있는 경우 더 오래 걸릴 수 있습니다.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-600" />
                  무료 체험이 가능한가요?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  네, 신규 사용자를 위한 무료 체험을 제공합니다. 
                  제한된 기능이지만 서비스의 품질을 체험해보실 수 있습니다.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  팀 단위로 이용할 수 있나요?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  네, 팀 플랜을 제공합니다. 
                  여러 명이 함께 사용할 수 있는 협업 기능을 포함하고 있습니다.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Office Info Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              오시는 길
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Unaique 본사에 방문하시려면 아래 정보를 참고해주세요
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Card className="p-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">주소</h3>
                      <p className="text-gray-600">
                        서울특별시 강남구 테헤란로 123<br/>
                        Unaique 빌딩 15층
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">운영시간</h3>
                      <p className="text-gray-600">
                        평일: 9:00 - 18:00<br/>
                        토요일: 9:00 - 13:00<br/>
                        일요일 및 공휴일 휴무
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-purple-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">대표전화</h3>
                      <p className="text-gray-600">
                        02-1234-5678<br/>
                        팩스: 02-1234-5679
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="text-center">
              <div className="bg-gray-200 rounded-lg p-8 h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">지도가 여기에 표시됩니다</p>
                  <p className="text-sm text-gray-400">Google Maps API 연동 예정</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            지금 바로 시작하세요
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Unaique와 함께 AI 기반 비디오 제작의 새로운 경험을 시작해보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Link href="/pricing">
                무료 체험하기
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Link href="#">
                상담 문의
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
} 