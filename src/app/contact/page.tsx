"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Video, 
  Mic, 
  Headphones,
  MessageCircle,
  Phone,
  Mail,
  Clock,
  User,
  Settings,
  HelpCircle,
  FileText,
  Zap,
  Sparkles,
  ArrowRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  Heart,
  Star,
  CheckCircle,
  AlertCircle,
  Info
} from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
  const [isListening, setIsListening] = useState(false)
  const [isAgentSpeaking, setIsAgentSpeaking] = useState(false)
  const [conversationHistory, setConversationHistory] = useState([
    {
      type: 'agent',
      message: '안녕하세요! Unaique AI 어시스턴트입니다. 무엇을 도와드릴까요?',
      timestamp: new Date().toLocaleTimeString()
    }
  ])

  const contactMethods = [
    {
      icon: Mic,
      title: "음성 AI 어시스턴트",
      description: "ElevenLabs Voice Agent와 자연스럽게 대화하며 CS 문의",
      features: ["24/7 실시간 응답", "다국어 지원", "감정 인식", "맞춤형 해결책"],
      primary: true,
      action: "음성 대화 시작하기"
    },
    {
      icon: MessageCircle,
      title: "실시간 채팅",
      description: "AI 챗봇과 텍스트로 빠른 문의 해결",
      features: ["즉시 응답", "이력 저장", "파일 첨부", "스크린샷 공유"],
      primary: false,
      action: "채팅 시작하기"
    },
    {
      icon: Phone,
      title: "전화 상담",
      description: "전문 상담사와 직접 통화",
      features: ["평일 9AM-6PM", "한국어 상담", "기술 지원", "상세 상담"],
      primary: false,
      action: "전화 연결하기"
    },
    {
      icon: Mail,
      title: "이메일 문의",
      description: "상세한 내용을 이메일로 문의",
      features: ["24시간 접수", "첨부파일 지원", "상세 답변", "이력 관리"],
      primary: false,
      action: "이메일 작성하기"
    }
  ]

  const faqCategories = [
    {
      category: "계정 및 결제",
      icon: User,
      questions: [
        {
          question: "계정을 어떻게 생성하나요?",
          answer: "홈페이지의 '시작하기' 버튼을 클릭하여 간단한 가입 절차를 진행할 수 있습니다."
        },
        {
          question: "결제 방법은 어떤 것이 있나요?",
          answer: "신용카드, 계좌이체, 간편결제 등 다양한 결제 방법을 지원합니다."
        }
      ]
    },
    {
      category: "기술 지원",
      icon: Settings,
      questions: [
        {
          question: "AI 모델이 제대로 작동하지 않아요",
          answer: "브라우저 캐시를 삭제하고 페이지를 새로고침해보세요. 문제가 지속되면 음성 어시스턴트에게 문의해주세요."
        },
        {
          question: "영상 렌더링이 실패해요",
          answer: "인터넷 연결 상태를 확인하고, 파일 크기가 제한을 초과하지 않았는지 확인해주세요."
        }
      ]
    },
    {
      category: "서비스 이용",
      icon: HelpCircle,
      questions: [
        {
          question: "무료 체험 기간은 얼마나 되나요?",
          answer: "신규 사용자에게는 7일간 무료 체험을 제공합니다. 모든 기능을 제한 없이 사용할 수 있습니다."
        },
        {
          question: "템플릿을 커스터마이징할 수 있나요?",
          answer: "네, 모든 템플릿은 자유롭게 수정하고 커스터마이징할 수 있습니다."
        }
      ]
    }
  ]

  const startVoiceConversation = () => {
    setIsListening(true)
    // 실제 구현에서는 음성 인식 시작
    setTimeout(() => {
      setIsListening(false)
      const newMessage = {
        type: 'user',
        message: '안녕하세요, AI 동영상 제작에 대해 문의하고 싶습니다.',
        timestamp: new Date().toLocaleTimeString()
      }
      setConversationHistory(prev => [...prev, newMessage])
      
      // AI 응답 시뮬레이션
      setTimeout(() => {
        const aiResponse = {
          type: 'agent',
          message: '안녕하세요! AI 동영상 제작에 대해 어떤 부분이 궁금하신가요? 구체적으로 말씀해주시면 더 정확한 답변을 드릴 수 있습니다.',
          timestamp: new Date().toLocaleTimeString()
        }
        setConversationHistory(prev => [...prev, aiResponse])
      }, 1000)
    }, 2000)
  }

  const stopVoiceConversation = () => {
    setIsListening(false)
  }

  const toggleAgentVoice = () => {
    setIsAgentSpeaking(!isAgentSpeaking)
  }

  const resetConversation = () => {
    setConversationHistory([
      {
        type: 'agent',
        message: '안녕하세요! Unaique AI 어시스턴트입니다. 무엇을 도와드릴까요?',
        timestamp: new Date().toLocaleTimeString()
      }
    ])
  }

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
              <Headphones className="mr-2 h-4 w-4" />
              AI 기반 고객 지원
            </span>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
            음성으로 대화하는
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI 고객 지원
            </span>
          </h1>
          
          <p className="mt-6 text-lg leading-8 text-slate-600 max-w-3xl mx-auto">
            ElevenLabs Voice Agent와 자연스럽게 대화하며 모든 문의를 해결하세요.
            음성, 채팅, 전화, 이메일 등 다양한 방법으로 언제든지 도움을 받을 수 있습니다.
          </p>
        </div>
      </section>

      {/* Voice Agent Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-6">
                Unaique AI 음성 어시스턴트
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                최첨단 AI 기술로 구현된 음성 어시스턴트가 24시간 언제든지 
                고객님의 문의에 답변하고 문제를 해결해드립니다.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <span className="text-slate-700">자연스러운 한국어 음성 대화</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <span className="text-slate-700">감정 인식 및 맞춤형 응답</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <span className="text-slate-700">실시간 문제 해결 및 가이드</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <span className="text-slate-700">다국어 지원 (한국어, 영어, 일본어)</span>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  onClick={startVoiceConversation}
                  disabled={isListening}
                >
                  {isListening ? (
                    <>
                      <Pause className="mr-2 h-5 w-5" />
                      듣는 중...
                    </>
                  ) : (
                    <>
                      <Mic className="mr-2 h-5 w-5" />
                      음성 대화 시작
                    </>
                  )}
                </Button>
                
                {isListening && (
                  <Button 
                    size="lg" 
                    variant="outline"
                    onClick={stopVoiceConversation}
                  >
                    <RotateCcw className="mr-2 h-5 w-5" />
                    중지
                  </Button>
                )}
              </div>
            </div>

            <div className="relative">
              <Card className="border-0 shadow-2xl bg-gradient-to-br from-blue-50 to-purple-50 p-8">
                <div className="text-center mb-6">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                    <Headphones className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-900">실시간 음성 대화</h3>
                  <p className="text-slate-600 mt-2">AI와 자연스럽게 대화하세요</p>
                </div>

                {/* Voice Controls */}
                <div className="flex justify-center space-x-4 mb-6">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={toggleAgentVoice}
                    className={isAgentSpeaking ? "bg-green-100 border-green-300" : ""}
                  >
                    {isAgentSpeaking ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={resetConversation}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>

                {/* Conversation Display */}
                <div className="bg-white rounded-lg p-4 h-64 overflow-y-auto">
                  {conversationHistory.map((message, index) => (
                    <div key={index} className={`mb-3 ${message.type === 'agent' ? 'text-left' : 'text-right'}`}>
                      <div className={`inline-block p-3 rounded-lg max-w-xs ${
                        message.type === 'agent' 
                          ? 'bg-blue-100 text-slate-800' 
                          : 'bg-purple-100 text-slate-800'
                      }`}>
                        <p className="text-sm">{message.message}</p>
                        <p className="text-xs text-slate-500 mt-1">{message.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-6">
              다양한 문의 방법
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              상황과 선호도에 맞는 최적의 문의 방법을 선택하세요.
              모든 방법으로 24시간 언제든지 도움을 받을 수 있습니다.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {contactMethods.map((method, index) => (
              <Card 
                key={index} 
                className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                  method.primary 
                    ? 'ring-2 ring-blue-500 bg-gradient-to-br from-blue-50 to-purple-50' 
                    : 'bg-white'
                }`}
              >
                {method.primary && (
                  <div className="absolute -top-3 left-4">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      추천
                    </span>
                  </div>
                )}
                
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${
                      method.primary 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
                        : 'bg-slate-100'
                    }`}>
                      <method.icon className={`h-6 w-6 ${
                        method.primary ? 'text-white' : 'text-slate-600'
                      }`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{method.title}</CardTitle>
                      <CardDescription>{method.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {method.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2 text-sm text-slate-600">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${
                      method.primary 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' 
                        : 'bg-slate-900 hover:bg-slate-800'
                    }`}
                  >
                    {method.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-6">
              자주 묻는 질문
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              고객님들이 자주 문의하시는 내용들을 미리 확인해보세요.
              더 자세한 답변이 필요하시면 언제든지 음성 어시스턴트에게 문의하세요.
            </p>
          </div>
          
          <div className="space-y-8">
            {faqCategories.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                      <category.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">{category.category}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.questions.map((faq, faqIndex) => (
                      <div key={faqIndex} className="border-l-4 border-blue-200 pl-4">
                        <h4 className="font-semibold text-slate-900 mb-2">{faq.question}</h4>
                        <p className="text-slate-600 text-sm">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Support Stats */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-6">
              고객 지원 현황
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Unaique의 고객 지원 서비스가 얼마나 효과적인지 확인해보세요.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-4xl font-bold text-slate-900 mb-2 group-hover:scale-110 transition-transform duration-300">99.8%</div>
              <div className="text-slate-600">고객 만족도</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-slate-900 mb-2 group-hover:scale-110 transition-transform duration-300">24/7</div>
              <div className="text-slate-600">지원 시간</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-slate-900 mb-2 group-hover:scale-110 transition-transform duration-300">2.3분</div>
              <div className="text-slate-600">평균 응답 시간</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-slate-900 mb-2 group-hover:scale-110 transition-transform duration-300">15개</div>
              <div className="text-slate-600">지원 언어</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <Card className="border-0 shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardHeader className="pb-8">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                지금 바로 AI 어시스턴트와 대화하세요
              </h2>
              <p className="text-lg text-blue-100 max-w-2xl mx-auto">
                음성으로 자연스럽게 문의하고, 즉시 답변을 받아보세요.
                Unaique의 혁신적인 AI 고객 지원을 체험해보세요.
              </p>
            </CardHeader>
            <CardContent className="pb-8">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Mic className="mr-2 h-5 w-5" />
                  음성 대화 시작하기
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  채팅 시작하기
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