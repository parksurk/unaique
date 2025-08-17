"use client";

import { useState } from 'react';
import Link from "next/link";
import { useClerk, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { Check, X, Star, Zap, Crown, Building, ArrowRight, CreditCard, Clock, Sparkles, Video, Music, Globe, LogOut } from "lucide-react";
import UnaiqueLogo from "@/components/ui/logo";

interface PricingPlan {
  name: string;
  price: string;
  annualPrice: string;
  credits: string;
  description: string;
  features: string[];
  limitations: string[];
  icon: React.ComponentType<{ className?: string }>;
  popular?: boolean;
  enterprise?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    name: "기본 (무료)",
    price: "₩0",
    annualPrice: "₩0",
    credits: "125 크레딧",
    description: "개인 사용자를 위한 기본 기능",
    features: [
      "최대 3개 프로젝트",
      "5GB 저장 공간",
      "720p 내보내기",
      "기본 AI 템플릿",
      "커뮤니티 지원"
    ],
    limitations: [
      "워터마크 포함",
      "제한된 해상도",
      "기본 기능만 사용 가능"
    ],
    icon: Star
  },
  {
    name: "스탠다드",
    price: "₩19,900",
    annualPrice: "₩15,900",
    credits: "625 크레딧",
    description: "크리에이터를 위한 필수 기능",
    features: [
      "워터마크 제거",
      "HD (1080p) 내보내기",
      "고급 AI 템플릿",
      "무제한 프로젝트",
      "우선 지원"
    ],
    limitations: [
      "고급 기능 제한",
      "API 기능 없음"
    ],
    icon: Zap
  },
  {
    name: "프로",
    price: "₩44,900",
    annualPrice: "₩35,900",
    credits: "2,250 크레딧",
    description: "전문가를 위한 고급 기능",
    features: [
      "고급 영상 생성",
      "4K 내보내기",
      "API 접근",
      "전용 지원"
    ],
    limitations: [
      "무제한 탐색 모드 없음",
      "엔터프라이즈 기능 제한"
    ],
    icon: Crown
  },
  {
    name: "무제한",
    price: "₩119,900",
    annualPrice: "₩95,900",
    credits: "무제한 탐색 + 2,250 크레딧",
    description: "대량 제작을 위한 최고급 플랜",
    features: [
      "무제한 탐색 모드",
      "실험 및 작업 분리",
      "대량 콘텐츠 제작",
      "전 기능 무제한 사용",
      "24/7 우선 지원"
    ],
    limitations: [
      "가장 높은 월 비용",
      "개인 사용자에게는 과도할 수 있음"
    ],
    icon: Sparkles
  },
  {
    name: "엔터프라이즈",
    price: "맞춤 견적",
    annualPrice: "맞춤 견적",
    credits: "맞춤 크레딧",
    description: "대기업 및 기관 전용",
    features: [
      "맞춤형 크레딧 할당",
      "SSO (Single Sign-On)",
      "전용 저장 공간",
      "맞춤형 보안 설정",
      "전담 계정 매니저",
      "SLA 보장"
    ],
    limitations: [
      "최소 계약 기간",
      "맞춤 견적 필요"
    ],
    icon: Building,
    enterprise: true
  }
];

export default function PricingPage() {
  const { isSignedIn, isLoaded } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const [isAnnual, setIsAnnual] = useState(false);

  // 로그아웃 처리
  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    }
  };

  const getPrice = (plan: PricingPlan) => {
    return isAnnual ? plan.annualPrice : plan.price;
  };

  const getSavings = (plan: PricingPlan) => {
    if (plan.price === "₩0" || plan.price === "맞춤 견적") return null;
    const monthly = parseInt(plan.price.replace(/[₩,]/g, ''));
    const annual = parseInt(plan.annualPrice.replace(/[₩,]/g, ''));
    const savings = Math.round(((monthly - annual) / monthly) * 100);
    return savings;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
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
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
              <CreditCard className="mr-2 h-4 w-4" />
              투명한 가격 정책
            </span>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
            합리적인
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              가격으로 시작하세요
            </span>
          </h1>
          
          <p className="mt-6 text-lg leading-8 text-slate-600 max-w-3xl mx-auto">
            크레딧 기반의 투명한 가격 정책으로 필요에 맞는 플랜을 선택하세요.
            연간 결제 시 최대 20% 할인을 제공합니다.
          </p>
        </div>
      </section>

      {/* Pricing Toggle */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center items-center space-x-4">
          <span className={`text-sm ${!isAnnual ? 'text-slate-900 font-medium' : 'text-slate-500'}`}>
            월간 결제
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isAnnual ? 'bg-blue-600' : 'bg-slate-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isAnnual ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={`text-sm ${isAnnual ? 'text-slate-900 font-medium' : 'text-slate-500'}`}>
            연간 결제
            {isAnnual && (
              <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                최대 20% 할인
              </span>
            )}
          </span>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {pricingPlans.map((plan) => (
              <Card 
                key={plan.name} 
                className={`relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                  plan.popular ? 'ring-2 ring-blue-500' : ''
                } ${plan.enterprise ? 'bg-gradient-to-br from-slate-900 to-slate-800 text-white' : ''}`}
              >
                                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-600 text-white px-3 py-1 py-1 rounded-full text-sm font-medium">
                        인기
                      </span>
                    </div>
                  )}
                
                <CardHeader className="text-center pb-6">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                    <plan.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className={`text-xl ${plan.enterprise ? 'text-white' : 'text-slate-900'}`}>
                    {plan.name}
                  </CardTitle>
                  <CardDescription className={`${plan.enterprise ? 'text-slate-300' : 'text-slate-600'}`}>
                    {plan.description}
                  </CardDescription>
                  
                  <div className="mt-4">
                    <div className="text-3xl font-bold text-blue-600">
                      {getPrice(plan)}
                    </div>
                    <div className={`text-sm ${plan.enterprise ? 'text-slate-400' : 'text-slate-500'}`}>
                      {plan.price === "₩0" ? "무료" : plan.price === "맞춤 견적" ? "문의 필요" : isAnnual ? "월" : "월"}
                    </div>
                                         {getSavings(plan) && (
                       <span className="mt-2 inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                         {getSavings(plan)}% 절약
                       </span>
                     )}
                  </div>
                  
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <div className="text-sm font-medium text-blue-900">
                      {plan.credits}
                    </div>
                    <div className="text-xs text-blue-700">
                      크레딧 할당
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2 text-slate-900">포함 기능</h4>
                      <ul className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center space-x-2 text-sm">
                            <Check className="h-4 w-4 text-green-500" />
                            <span className={plan.enterprise ? 'text-slate-300' : 'text-slate-600'}>
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2 text-slate-900">제한사항</h4>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, index) => (
                          <li key={index} className="flex items-center space-x-2 text-sm">
                            <X className="h-4 w-4 text-red-500" />
                            <span className={plan.enterprise ? 'text-slate-400' : 'text-slate-500'}>
                              {limitation}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    {plan.enterprise ? (
                      <Button className="w-full" variant="outline">
                        문의하기
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button 
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
      
                      >
                        {plan.price === "₩0" ? "무료로 시작" : "플랜 선택"}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cost Analysis */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-6">
              비용 분석
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              크레딧 기반 가격 정책으로 투명하고 예측 가능한 비용을 제공합니다.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                         <div>
               <h3 className="text-2xl font-bold text-slate-900 mb-6">영상 길이별 크레딧 사용량</h3>
               <div className="space-y-4">
                 <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                   <div>
                     <div className="font-medium">쇼츠 영상</div>
                     <div className="text-sm text-slate-600">15초 ~ 1분</div>
                   </div>
                   <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-700">3-5 크레딧</span>
                 </div>
                 <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                   <div>
                     <div className="font-medium">1분 영상</div>
                     <div className="text-sm text-slate-600">정확히 1분</div>
                   </div>
                   <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-700">5-8 크레딧</span>
                 </div>
                 <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                   <div>
                     <div className="font-medium">3분 영상</div>
                     <div className="text-sm text-slate-600">정확히 3분</div>
                   </div>
                   <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-700">15-20 크레딧</span>
                 </div>
                 <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                   <div>
                     <div className="font-medium">10분 영상</div>
                     <div className="text-sm text-slate-600">정확히 10분</div>
                   </div>
                   <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-700">50-70+ 크레딧</span>
                 </div>
               </div>
             </div>
            
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">월간 비용 계산</h3>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="font-medium text-blue-900">스탠다드 플랜</div>
                  <div className="text-sm text-blue-700 mb-2">625 크레딧 / 월</div>
                  <div className="text-2xl font-bold text-blue-900">₩19,900</div>
                  <div className="text-xs text-blue-600">1 크레딧 = ₩31.8</div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="font-medium text-purple-900">프로 플랜</div>
                  <div className="text-sm text-purple-700 mb-2">2,250 크레딧 / 월</div>
                  <div className="text-2xl font-bold text-purple-900">₩44,900</div>
                  <div className="text-xs text-purple-600">1 크레딧 = ₩20.0</div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="font-medium text-green-900">무제한 플랜</div>
                  <div className="text-sm text-green-700 mb-2">무제한 탐색 + 2,250 크레딧</div>
                  <div className="text-2xl font-bold text-green-900">₩119,900</div>
                  <div className="text-xs text-green-600">대량 제작에 최적</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

             {/* Pricing Components (Reference) */}
       <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
         <div className="mx-auto max-w-6xl">
           <div className="text-center mb-16">
             <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-6">
               영상 서비스별 비용 구성
             </h2>
             <p className="text-lg text-slate-600 max-w-3xl mx-auto">
               각 영상 서비스의 상세한 비용 구성 요소를 확인하세요.
             </p>
           </div>
           
           <div className="space-y-8">
             {/* 쇼츠 영상 서비스 */}
             <Card className="border-0 shadow-lg">
               <CardHeader>
                 <div className="flex items-center space-x-3">
                   <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                     <Clock className="h-6 w-6 text-blue-600" />
                   </div>
                   <div>
                     <CardTitle className="text-xl">쇼츠 영상 서비스</CardTitle>
                     <CardDescription>15초 ~ 1분</CardDescription>
                   </div>
                 </div>
               </CardHeader>
               <CardContent>
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                   <div>
                     <h4 className="font-semibold text-slate-900 mb-3">비용 구성</h4>
                     <div className="space-y-3">
                       <div className="flex justify-between items-center py-2 border-b border-slate-100">
                         <span className="text-sm text-slate-700">ShotStack 렌더링</span>
                         <div className="text-right">
                           <div className="text-sm font-medium text-slate-900">3-5 크레딧</div>
                           <div className="text-xs text-slate-500">약 $0.30~0.75</div>
                         </div>
                       </div>
                       <div className="flex justify-between items-center py-2 border-b border-slate-100">
                         <span className="text-sm text-slate-700">AI 모델 사용</span>
                         <div className="text-right">
                           <div className="text-sm font-medium text-slate-900">최소화</div>
                           <div className="text-xs text-slate-500">짧은 영상으로 비용 절약</div>
                         </div>
                       </div>
                       <div className="flex justify-between items-center py-2 border-b border-slate-100">
                         <span className="text-sm text-slate-700">데이터 관리</span>
                         <div className="text-right">
                           <div className="text-sm font-medium text-slate-900">기본</div>
                           <div className="text-xs text-slate-500">Pinecone, Airtable 포함</div>
                         </div>
                       </div>
                       <div className="flex justify-between items-center py-2 border-b border-slate-100">
                         <span className="text-sm text-slate-700">서버 비용</span>
                         <div className="text-right">
                           <div className="text-sm font-medium text-slate-900">낮음</div>
                           <div className="text-xs text-slate-500">API 호출 횟수 적음</div>
                         </div>
                       </div>
                     </div>
                   </div>
                   <div>
                     <h4 className="font-semibold text-slate-900 mb-3">적합한 용도</h4>
                     <p className="text-sm text-slate-600 mb-4">소셜미디어 마케팅, 빠른 홍보 영상</p>
                     
                     <h4 className="font-semibold text-slate-900 mb-3">주요 특징</h4>
                     <ul className="space-y-2 text-sm text-slate-600">
                       <li className="flex items-center space-x-2">
                         <Check className="h-3 w-3 text-green-500" />
                         <span>ShotStack 렌더링 (3-5 크레딧)</span>
                       </li>
                       <li className="flex items-center space-x-2">
                         <Check className="h-3 w-3 text-green-500" />
                         <span>AI 스크립트 생성 (Gemini)</span>
                       </li>
                       <li className="flex items-center space-x-2">
                         <Check className="h-3 w-3 text-green-500" />
                         <span>AI 음성 합성 (ElevenLabs)</span>
                       </li>
                       <li className="flex items-center space-x-2">
                         <Check className="h-3 w-3 text-green-500" />
                         <span>기본 템플릿 제공</span>
                       </li>
                     </ul>
                   </div>
                 </div>
               </CardContent>
             </Card>

             {/* 1분 영상 서비스 */}
             <Card className="border-0 shadow-lg">
               <CardHeader>
                 <div className="flex items-center space-x-3">
                   <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                     <Clock className="h-6 w-6 text-purple-600" />
                   </div>
                   <div>
                     <CardTitle className="text-xl">1분 영상 서비스</CardTitle>
                     <CardDescription>1분</CardDescription>
                   </div>
                 </div>
               </CardHeader>
               <CardContent>
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                   <div>
                     <h4 className="font-semibold text-slate-900 mb-3">비용 구성</h4>
                     <div className="space-y-3">
                       <div className="flex justify-between items-center py-2 border-b border-slate-100">
                         <span className="text-sm text-slate-700">ShotStack 렌더링</span>
                         <div className="text-right">
                           <div className="text-sm font-medium text-slate-900">5-8 크레딧</div>
                           <div className="text-xs text-slate-500">약 $0.50~1.20</div>
                         </div>
                       </div>
                       <div className="flex justify-between items-center py-2 border-b border-slate-100">
                         <span className="text-sm text-slate-700">AI 텍스트 생성</span>
                         <div className="text-right">
                           <div className="text-sm font-medium text-slate-900">중간</div>
                           <div className="text-xs text-slate-500">Gemini 토큰 비용</div>
                         </div>
                       </div>
                       <div className="flex justify-between items-center py-2 border-b border-slate-100">
                         <span className="text-sm text-slate-700">AI 음성 합성</span>
                         <div className="text-right">
                           <div className="text-sm font-medium text-slate-900">1분 TTS</div>
                           <div className="text-xs text-slate-500">ElevenLabs 비용</div>
                         </div>
                       </div>
                       <div className="flex justify-between items-center py-2 border-b border-slate-100">
                         <span className="text-sm text-slate-700">데이터베이스</span>
                         <div className="text-right">
                           <div className="text-sm font-medium text-slate-900">일부 할당</div>
                           <div className="text-xs text-slate-500">Airtable, Pinecone</div>
                         </div>
                       </div>
                     </div>
                   </div>
                   <div>
                     <h4 className="font-semibold text-slate-900 mb-3">적합한 용도</h4>
                     <p className="text-sm text-slate-600 mb-4">제품 소개, 교육 콘텐츠, 브랜드 메시지</p>
                     
                     <h4 className="font-semibold text-slate-900 mb-3">주요 특징</h4>
                     <ul className="space-y-2 text-sm text-slate-600">
                       <li className="flex items-center space-x-2">
                         <Check className="h-3 w-3 text-green-500" />
                         <span>ShotStack 렌더링 (5-8 크레딧)</span>
                       </li>
                       <li className="flex items-center space-x-2">
                         <Check className="h-3 w-3 text-green-500" />
                         <span>AI 스크립트 생성 (Gemini)</span>
                       </li>
                       <li className="flex items-center space-x-2">
                         <Check className="h-3 w-3 text-green-500" />
                         <span>AI 음성 합성 (ElevenLabs)</span>
                       </li>
                       <li className="flex items-center space-x-2">
                         <Check className="h-3 w-3 text-green-500" />
                         <span>고급 템플릿 선택</span>
                       </li>
                     </ul>
                   </div>
                 </div>
               </CardContent>
             </Card>

             {/* 3분 영상 서비스 */}
             <Card className="border-0 shadow-lg">
               <CardHeader>
                 <div className="flex items-center space-x-3">
                   <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                     <Clock className="h-6 w-6 text-green-600" />
                   </div>
                   <div>
                     <CardTitle className="text-xl">3분 영상 서비스</CardTitle>
                     <CardDescription>3분</CardDescription>
                   </div>
                 </div>
               </CardHeader>
               <CardContent>
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                   <div>
                     <h4 className="font-semibold text-slate-900 mb-3">비용 구성</h4>
                     <div className="space-y-3">
                       <div className="flex justify-between items-center py-2 border-b border-slate-100">
                         <span className="text-sm text-slate-700">ShotStack 렌더링</span>
                         <div className="text-right">
                           <div className="text-sm font-medium text-slate-900">15-20 크레딧</div>
                           <div className="text-xs text-slate-500">약 $1.50~3.00</div>
                         </div>
                       </div>
                       <div className="flex justify-between items-center py-2 border-b border-slate-100">
                         <span className="text-sm text-slate-700">AI 모델 사용량</span>
                         <div className="text-right">
                           <div className="text-sm font-medium text-slate-900">증가</div>
                           <div className="text-xs text-slate-500">텍스트, 음성, 이미지 생성</div>
                         </div>
                       </div>
                       <div className="flex justify-between items-center py-2 border-b border-slate-100">
                         <span className="text-sm text-slate-700">API 호출량</span>
                         <div className="text-right">
                           <div className="text-sm font-medium text-slate-900">상승</div>
                           <div className="text-xs text-slate-500">데이터 처리 비용 증가</div>
                         </div>
                       </div>
                       <div className="flex justify-between items-center py-2 border-b border-slate-100">
                         <span className="text-sm text-slate-700">서버 및 관리</span>
                         <div className="text-right">
                           <div className="text-sm font-medium text-slate-900">포함</div>
                           <div className="text-xs text-slate-500">안정적 서비스 보장</div>
                         </div>
                       </div>
                     </div>
                   </div>
                   <div>
                     <h4 className="font-semibold text-slate-900 mb-3">적합한 용도</h4>
                     <p className="text-sm text-slate-600 mb-4">상세 제품 설명, 교육 강의, 회사 소개</p>
                     
                     <h4 className="font-semibold text-slate-900 mb-3">주요 특징</h4>
                     <ul className="space-y-2 text-sm text-slate-600">
                       <li className="flex items-center space-x-2">
                         <Check className="h-3 w-3 text-green-500" />
                         <span>ShotStack 렌더링 (15-20 크레딧)</span>
                       </li>
                       <li className="flex items-center space-x-2">
                         <Check className="h-3 w-3 text-green-500" />
                         <span>AI 스크립트 생성 (Gemini)</span>
                       </li>
                       <li className="flex items-center space-x-2">
                         <Check className="h-3 w-3 text-green-500" />
                         <span>AI 음성 합성 (ElevenLabs)</span>
                       </li>
                       <li className="flex items-center space-x-2">
                         <Check className="h-3 w-3 text-green-500" />
                         <span>프리미엄 템플릿 선택</span>
                       </li>
                     </ul>
                   </div>
                 </div>
               </CardContent>
             </Card>

             {/* 10분 영상 서비스 */}
             <Card className="border-0 shadow-lg">
               <CardHeader>
                 <div className="flex items-center space-x-3">
                   <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                     <Clock className="h-6 w-6 text-orange-600" />
                   </div>
                   <div>
                     <CardTitle className="text-xl">10분 영상 서비스</CardTitle>
                     <CardDescription>10분</CardDescription>
                   </div>
                 </div>
               </CardHeader>
               <CardContent>
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                   <div>
                     <h4 className="font-semibold text-slate-900 mb-3">비용 구성</h4>
                     <div className="space-y-3">
                       <div className="flex justify-between items-center py-2 border-b border-slate-100">
                         <span className="text-sm text-slate-700">ShotStack 렌더링</span>
                         <div className="text-right">
                           <div className="text-sm font-medium text-slate-900">50-70+ 크레딧</div>
                           <div className="text-xs text-slate-500">약 $5.00~10.50</div>
                         </div>
                       </div>
                       <div className="flex justify-between items-center py-2 border-b border-slate-100">
                         <span className="text-sm text-slate-700">AI 모델 사용량</span>
                         <div className="text-right">
                           <div className="text-sm font-medium text-slate-900">대폭 증가</div>
                           <div className="text-xs text-slate-500">고급 모델 사용</div>
                         </div>
                       </div>
                       <div className="flex justify-between items-center py-2 border-b border-slate-100">
                         <span className="text-sm text-slate-700">벡터 DB 및 관리</span>
                         <div className="text-right">
                           <div className="text-sm font-medium text-slate-900">증가</div>
                           <div className="text-xs text-slate-500">Pinecone Pro, Airtable</div>
                         </div>
                       </div>
                       <div className="flex justify-between items-center py-2 border-b border-slate-100">
                         <span className="text-sm text-slate-700">프리미엄 지원</span>
                         <div className="text-right">
                           <div className="text-sm font-medium text-slate-900">포함</div>
                           <div className="text-xs text-slate-500">전용 매니저, 우선 지원</div>
                         </div>
                       </div>
                     </div>
                   </div>
                   <div>
                     <h4 className="font-semibold text-slate-900 mb-3">적합한 용도</h4>
                     <p className="text-sm text-slate-600 mb-4">상세 교육 콘텐츠, 프리미엄 브랜드 영상, 전문 강의</p>
                     
                     <h4 className="font-semibold text-slate-900 mb-3">주요 특징</h4>
                     <ul className="space-y-2 text-sm text-slate-600">
                       <li className="flex items-center space-x-2">
                         <Check className="h-3 w-3 text-green-500" />
                         <span>ShotStack 렌더링 (50-70+ 크레딧)</span>
                       </li>
                       <li className="flex items-center space-x-2">
                         <Check className="h-3 w-3 text-green-500" />
                         <span>AI 스크립트 생성 (Gemini)</span>
                       </li>
                       <li className="flex items-center space-x-2">
                         <Check className="h-3 w-3 text-green-500" />
                         <span>AI 음성 합성 (ElevenLabs)</span>
                       </li>
                       <li className="flex items-center space-x-2">
                         <Check className="h-3 w-3 text-green-500" />
                         <span>커스텀 템플릿 디자인</span>
                       </li>
                     </ul>
                   </div>
                 </div>
               </CardContent>
             </Card>
           </div>
         </div>
       </section>

             {/* Additional Services (Reference) */}
       <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-slate-50">
         <div className="mx-auto max-w-6xl">
           <div className="text-center mb-16">
             <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-6">
               추가 서비스
             </h2>
             <p className="text-lg text-slate-600 max-w-3xl mx-auto">
               필요에 따라 추가할 수 있는 서비스들입니다.
             </p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <Card className="border-0 shadow-lg">
               <CardHeader>
                 <div className="flex items-center space-x-3">
                   <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                     <Music className="h-6 w-6 text-blue-600" />
                   </div>
                   <div>
                     <CardTitle className="text-lg">AI 음성 커스터마이징</CardTitle>
                     <CardDescription>브랜드에 맞는 고유한 음성 톤 설정</CardDescription>
                   </div>
                 </div>
               </CardHeader>
               <CardContent>
                 <div className="flex items-center justify-between">
                   <div className="text-2xl font-bold text-slate-900">₩5,000</div>
                   <div className="text-sm text-slate-500">/ 프로젝트</div>
                 </div>
                 <Button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                   추가하기
                 </Button>
               </CardContent>
             </Card>
             
             <Card className="border-0 shadow-lg">
               <CardHeader>
                 <div className="flex items-center space-x-3">
                   <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                     <Globe className="h-6 w-6 text-purple-600" />
                   </div>
                   <div>
                     <CardTitle className="text-lg">다국어 자막 생성</CardTitle>
                     <CardDescription>한국어, 영어, 일본어 등 다국어 자막</CardDescription>
                   </div>
                 </div>
               </CardHeader>
               <CardContent>
                 <div className="flex items-center justify-between">
                   <div className="text-2xl font-bold text-slate-900">₩3,000</div>
                   <div className="text-sm text-slate-500">/ 언어</div>
                 </div>
                 <Button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                   추가하기
                 </Button>
               </CardContent>
             </Card>
             
             <Card className="border-0 shadow-lg">
               <CardHeader>
                 <div className="flex items-center space-x-3">
                   <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                     <Music className="h-6 w-6 text-green-600" />
                   </div>
                   <div>
                     <CardTitle className="text-lg">프리미엄 음악 라이브러리</CardTitle>
                     <CardDescription>저작권 걱정 없는 고품질 음악</CardDescription>
                   </div>
                 </div>
               </CardHeader>
               <CardContent>
                 <div className="flex items-center justify-between">
                   <div className="text-2xl font-bold text-slate-900">₩2,000</div>
                   <div className="text-sm text-slate-500">/ 프로젝트</div>
                 </div>
                 <Button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                   추가하기
                 </Button>
               </CardContent>
             </Card>
             
             <Card className="border-0 shadow-lg">
               <CardHeader>
                 <div className="flex items-center space-x-3">
                   <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                     <Clock className="h-6 w-6 text-orange-600" />
                   </div>
                   <div>
                     <CardTitle className="text-lg">긴급 제작 서비스</CardTitle>
                     <CardDescription>24시간 내 완성 보장</CardDescription>
                   </div>
                 </div>
               </CardHeader>
               <CardContent>
                 <div className="flex items-center justify-between">
                   <div className="text-2xl font-bold text-slate-900">기본 가격의 50%</div>
                   <div className="text-sm text-slate-500">추가</div>
                 </div>
                 <Button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                   추가하기
                 </Button>
               </CardContent>
             </Card>
           </div>
         </div>
       </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-6">
              자주 묻는 질문
            </h2>
            <p className="text-lg text-slate-600">
              가격 정책에 대한 궁금한 점들을 확인하세요.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-medium text-slate-900 mb-2">크레딧은 언제 만료되나요?</h3>
              <p className="text-slate-600">크레딧은 매월 1일에 새로 할당되며, 사용하지 않은 크레딧은 다음 달로 이월되지 않습니다.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-medium text-slate-900 mb-2">플랜 변경은 언제든 가능한가요?</h3>
              <p className="text-slate-600">네, 언제든지 플랜을 업그레이드하거나 다운그레이드할 수 있습니다. 변경은 즉시 적용됩니다.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-medium text-slate-900 mb-2">환불 정책은 어떻게 되나요?</h3>
              <p className="text-slate-600">첫 7일 내에는 무조건 환불을 제공합니다. 그 이후에는 사용하지 않은 크레딧에 대해서만 환불이 가능합니다.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-medium text-slate-900 mb-2">팀 계정은 어떻게 설정하나요?</h3>
              <p className="text-slate-600">프로 플랜 이상에서 팀 기능을 사용할 수 있습니다. 팀장이 멤버를 초대하고 권한을 관리할 수 있습니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <Card className="border-0 shadow-2xl bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <CardHeader className="pb-8">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                지금 바로 시작하세요
              </h2>
              <p className="text-lg text-purple-100 max-w-2xl mx-auto">
                무료 플랜으로 Unaique의 강력한 AI 비디오 제작 기능을 체험해보세요.
              </p>
            </CardHeader>
            <CardContent className="pb-8">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
                  무료로 시작하기
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                  가격 상담 문의
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
              <UnaiqueLogo size="md" />
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
  );
} 