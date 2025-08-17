"use client";
import { useUser, useClerk } from "@clerk/nextjs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import UnaiqueLogo from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useCustomerSession } from "@/hooks/useCustomerSession";
import { useEffect } from "react";
import {
  Video,
  Zap,
  Star,
  Users,
  ArrowRight,
  Play,
  Sparkles,
  User,
  Mail,
  Calendar,
  LogOut,
  Loader2,
  Phone
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

// 이 페이지는 동적으로 렌더링되어야 함 (Clerk 인증 필요)
export const dynamic = 'force-dynamic';

export default function DashboardPage() {
  const { isSignedIn, user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const { customerData, isLoading: sessionLoading, hasSession, isSessionValid } = useCustomerSession();


  // 세션 정보 디버깅
  useEffect(() => {
    console.log('=== 대시보드 세션 정보 디버깅 ===');
    console.log('customerData:', customerData);
    console.log('sessionLoading:', sessionLoading);
    console.log('hasSession:', hasSession);
    console.log('isSessionValid:', isSessionValid);
    console.log('user:', user);
  }, [customerData, sessionLoading, hasSession, isSessionValid, user]);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    }
  };



  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="w-8 h-8 mx-auto border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
            <User className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">로그인이 필요합니다</h1>
          <p className="text-gray-600 mb-8">대시보드를 보려면 먼저 로그인해주세요.</p>
          <Button asChild>
            <Link href="/sign-in">로그인하기</Link>
          </Button>
        </div>
      </div>
    );
  }

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
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard">대시보드</Link>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleSignOut}
                className="hover:bg-red-50 hover:text-red-600 hover:border-red-300"
              >
                <LogOut className="mr-2 h-4 w-4" />
                로그아웃
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Welcome Section */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              안녕하세요, {user.firstName || user.username}님! 👋
            </h1>
            <p className="text-xl text-blue-100">
              Unaique AI 비디오 제작 서비스를 이용해보세요
            </p>
          </div>
        </div>
      </section>

      {/* User Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                사용자 정보
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    console.log('수동 새로고침 시작');
                    window.location.reload();
                  }}
                  className="ml-auto text-xs"
                  title="고객 정보 새로고침"
                >
                  새로고침
                </Button>
              </CardTitle>
            </CardHeader>
                                    <CardContent className="space-y-4">
                          {/* 로딩 상태 표시 */}
                          {sessionLoading && (
                            <div className="flex items-center gap-3 text-blue-600">
                              <Loader2 className="w-5 h-5 animate-spin" />
                              <span>고객 정보를 불러오는 중...</span>
                            </div>
                          )}
                          
                          {/* 이메일 */}
                          <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-gray-500" />
                            <span className="text-gray-700">
                              {customerData?.email || user.primaryEmailAddress?.emailAddress}
                            </span>
                          </div>
                          
                          {/* 이름 */}
                          <div className="flex items-center gap-3">
                            <User className="w-5 h-5 text-gray-500" />
                            <span className="text-gray-700">
                              이름: {customerData?.name || user.firstName || user.lastName || '알 수 없음'}
                            </span>
                          </div>
                          
                          {/* Airtable Record ID (시스템 고유값) */}
                          <div className="flex items-center gap-3">
                            <div className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center">
                              <span className="text-blue-600 text-xs font-mono">RID</span>
                            </div>
                            <span className="text-gray-700 font-mono text-sm" title="Airtable 시스템 고유값 (불변)">
                              {customerData?.recordId || '알 수 없음'}
                            </span>
                          </div>
                          
                          {/* 비즈니스 ID (사용자 정의) */}
                          {customerData?.businessId && (
                            <div className="flex items-center gap-3">
                              <div className="w-5 h-5 bg-green-100 rounded flex items-center justify-center">
                                <span className="text-green-600 text-xs font-mono">BID</span>
                              </div>
                            <span className="text-gray-700 font-mono text-sm" title="비즈니스 식별값 (변경 가능)">
                              {customerData.businessId}
                            </span>
                          </div>
                          )}
                          
                          {/* Clerk 사용자 ID */}
                          <div className="flex items-center gap-3">
                            <div className="w-5 h-5 bg-purple-100 rounded flex items-center justify-center">
                              <span className="text-purple-600 text-xs font-mono">UID</span>
                            </div>
                            <span className="text-gray-700 font-mono text-sm">
                              {customerData?.clerkId || user.id || '알 수 없음'}
                            </span>
                          </div>
                          
                          {/* 전화번호 */}
                          <div className="flex items-center gap-3">
                            <Phone className="w-5 h-5 text-gray-500" />
                            <span className="text-gray-700">
                              전화번호: {customerData?.phone || '미입력'}
                            </span>
                          </div>
                          
                          {/* 등급 */}
                          <div className="flex items-center gap-3">
                            <Star className="w-5 h-5 text-gray-500" />
                            <span className="text-gray-700">
                              등급: {customerData?.tier || '일반'}
                            </span>
                          </div>
                          
                          {/* 선호 카테고리 */}
                          <div className="flex items-center gap-3">
                            <Video className="w-5 h-5 text-gray-500" />
                            <span className="text-gray-700">
                              선호 카테고리: {customerData?.favoriteCategory || '없음'}
                            </span>
                          </div>
                          
                          {/* 가입일 */}
                          <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-gray-500" />
                            <span className="text-gray-700">
                              가입일: {user.createdAt ? new Date(user.createdAt).toLocaleDateString('ko-KR') : '알 수 없음'}
                            </span>
                          </div>
                          
                          {/* 세션 상태 정보 (디버깅용) */}
                          {process.env.NODE_ENV === 'development' && (
                            <div className="mt-4 p-3 bg-gray-100 rounded-lg text-xs text-gray-600">
                              <div className="flex items-center gap-2">
                                <strong>세션 상태:</strong> 
                                <span className={`px-2 py-1 rounded text-xs font-medium ${
                                  hasSession ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                  {hasSession ? '✅ 있음' : '❌ 없음'}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <strong>세션 유효성:</strong> 
                                <span className={`px-2 py-1 rounded text-xs font-medium ${
                                  isSessionValid ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {isSessionValid ? '✅ 유효' : '⚠️ 만료'}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <strong>로딩 상태:</strong> 
                                <span className={`px-2 py-1 rounded text-xs font-medium ${
                                  sessionLoading ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {sessionLoading ? '🔄 로딩 중' : '✅ 완료'}
                                </span>
                              </div>
                              {customerData && (
                                <div className="mt-2 pt-2 border-t border-gray-200">
                                  <div className="text-xs text-gray-500">
                                    <strong>세션 데이터:</strong> {customerData.name} ({customerData.recordId})
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                          
                          {/* 세션 정보가 없을 때 안내 메시지 */}
                          {!sessionLoading && !customerData && (
                            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                              <div className="text-yellow-800 text-sm">
                                <strong>⚠️ 고객 정보를 불러올 수 없습니다</strong>
                                <p className="mt-1 text-xs">
                                  Airtable에서 고객 정보를 가져오는 중 문제가 발생했습니다. 
                                  새로고침 버튼을 클릭하거나 잠시 후 다시 시도해주세요.
                                </p>
                              </div>
                            </div>
                          )}
                        </CardContent>
          </Card>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">빠른 시작</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Video className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle>새 비디오 제작</CardTitle>
                <CardDescription>
                  AI를 사용하여 새로운 비디오를 제작하세요
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/create-video" className="w-full">
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    시작하기
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Play className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle>내 프로젝트</CardTitle>
                <CardDescription>
                  이전에 제작한 비디오들을 확인하세요
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/projects" className="w-full">
                  <Button variant="outline" className="w-full">
                    보기
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Sparkles className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle>템플릿 갤러리</CardTitle>
                <CardDescription>
                  다양한 템플릿을 둘러보고 영감을 얻으세요
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  둘러보기
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">사용 통계</h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <Video className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-blue-600">0</div>
                <p className="text-gray-600">제작된 비디오</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-3">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-green-600">0</div>
                <p className="text-gray-600">사용한 크레딧</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-3">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-purple-600">0</div>
                <p className="text-gray-600">저장된 템플릿</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-3">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <div className="text-2xl font-bold text-orange-600">0</div>
                <p className="text-gray-600">공유된 프로젝트</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
} 