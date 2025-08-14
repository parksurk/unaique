"use client";
import { useUser, useClerk } from "@clerk/nextjs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Video,
  Zap,
  Star,
  Users,
  CheckCircle,
  ArrowRight,
  Play,
  Camera,
  Mic,
  Sparkles,
  User,
  Mail,
  Calendar,
  LogOut,
  Loader2
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DashboardPage() {
  const { isSignedIn, user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const [isTriggeringPipeline, setIsTriggeringPipeline] = useState(false);
  const [pipelineStatus, setPipelineStatus] = useState<{
    success?: boolean;
    message?: string;
    error?: string;
  } | null>(null);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    }
  };

  const handleCreateVideo = async () => {
    setIsTriggeringPipeline(true);
    setPipelineStatus(null);

    try {
      console.log('n8n 파이프라인 트리거 시작...');
      
      const response = await fetch('/api/n8n/trigger-pipeline', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pipelineName: 'Unaique-VG-Pipeline',
          additionalData: {
            userEmail: user?.primaryEmailAddress?.emailAddress,
            userName: `${user?.firstName || ''} ${user?.lastName || ''}`.trim(),
            action: 'create_video',
            projectType: 'new_video'
          }
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        setPipelineStatus({
          success: true,
          message: result.message
        });
        console.log('✅ n8n 파이프라인 트리거 성공:', result);
      } else {
        setPipelineStatus({
          success: false,
          message: result.message,
          error: result.error
        });
        console.error('❌ n8n 파이프라인 트리거 실패:', result);
      }
    } catch (error) {
      setPipelineStatus({
        success: false,
        message: '파이프라인 트리거 중 오류가 발생했습니다',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      console.error('❌ n8n 파이프라인 트리거 중 오류:', error);
    } finally {
      setIsTriggeringPipeline(false);
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
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                <Video className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">Unaique</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">홈으로</Link>
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
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700">
                  {user.primaryEmailAddress?.emailAddress}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700">
                  가입일: {user.createdAt ? new Date(user.createdAt).toLocaleDateString('ko-KR') : '알 수 없음'}
                </span>
              </div>
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
              <CardContent className="space-y-4">
                {pipelineStatus && (
                  <div className={`p-3 rounded-lg text-sm ${
                    pipelineStatus.success 
                      ? 'bg-green-100 text-green-800 border border-green-200' 
                      : 'bg-red-100 text-red-800 border border-red-200'
                  }`}>
                    <div className="font-medium">{pipelineStatus.message}</div>
                    {pipelineStatus.error && (
                      <div className="text-xs opacity-80 mt-1">오류: {pipelineStatus.error}</div>
                    )}
                  </div>
                )}
                <Button 
                  className="w-full" 
                  onClick={handleCreateVideo}
                  disabled={isTriggeringPipeline}
                >
                  {isTriggeringPipeline ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      파이프라인 실행 중...
                    </>
                  ) : (
                    <>
                      시작하기
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
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
                <Button variant="outline" className="w-full">
                  보기
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
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