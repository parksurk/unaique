"use client";

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Video, Calendar, Clock, Play, X, ExternalLink, ArrowLeft, LogOut } from 'lucide-react';
import { UnaiqueLogo } from '@/components/ui/logo';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { useCustomerSession } from '@/hooks/useCustomerSession';
import { useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface Project {
  orderNumber: number;
  status: string;
  orderDate: string;
  usedCredits: number;
  deliveryDate?: string;
  videoLink?: string;
  contentIdea?: {
    id: number;
    아이디어: string;
    자막: string;
    '배경 설명': string;
    자동화: string;
  };
}

export default function ProjectsPage() {
  const { customerData, isLoading } = useCustomerSession();
  const { signOut } = useClerk();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 프로젝트 목록 가져오기
  const fetchProjects = useCallback(async () => {
    if (!customerData?.businessId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/projects/list?businessId=${customerData.businessId}`);
      const data = await response.json();

      if (data.success) {
        setProjects(data.projects);
      } else {
        setError(data.error || '프로젝트 목록을 가져올 수 없습니다.');
      }
    } catch (error) {
      console.error('프로젝트 목록 조회 실패:', error);
      setError('프로젝트 목록을 가져오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }, [customerData?.businessId]);

  // 로그아웃 처리
  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    }
  };

  // 프로젝트 취소
  const handleCancelProject = async (orderNumber: number) => {
    if (!confirm('정말로 이 프로젝트를 취소하시겠습니까?')) return;

    try {
      const response = await fetch('/api/projects/cancel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderNumber }),
      });

      const data = await response.json();

      if (data.success) {
        alert('프로젝트가 성공적으로 취소되었습니다.');
        // 프로젝트 목록 새로고침
        fetchProjects();
      } else {
        alert(`프로젝트 취소 실패: ${data.error}`);
      }
    } catch (error) {
      console.error('프로젝트 취소 실패:', error);
      alert('프로젝트 취소 중 오류가 발생했습니다.');
    }
  };

  // 초기 로딩
  useEffect(() => {
    if (customerData?.businessId) {
      fetchProjects();
    }
  }, [customerData?.businessId]);

  // 상태별 배지 색상
  const getStatusBadge = (status: string) => {
    switch (status) {
      case '생성중':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">생성중</span>;
      case '완료':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">완료</span>;
      case '취소':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">취소</span>;
      case '에러종료':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">에러종료</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
            <p className="text-gray-600">세션 정보를 불러오는 중...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!customerData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4 py-8">
          <Alert>
            <AlertDescription>
              세션 정보를 찾을 수 없습니다. 로그인 후 다시 시도해주세요.
            </AlertDescription>
          </Alert>
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

      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <Link href="/dashboard" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              대시보드로 돌아가기
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">내 프로젝트</h1>
            <p className="text-gray-600">생성한 비디오 프로젝트들을 확인하고 관리하세요</p>
          </div>

          {/* 프로젝트 목록 */}
          <div className="space-y-6">
            {loading ? (
              <div className="text-center py-8">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
                <p className="text-gray-600">프로젝트 목록을 불러오는 중...</p>
              </div>
            ) : error ? (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : projects.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Video className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">아직 프로젝트가 없습니다</h3>
                  <p className="text-gray-600 mb-4">새로운 비디오를 생성해보세요!</p>
                  <Link href="/create-video">
                    <Button>새 비디오 제작하기</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              projects.map((project) => (
                <Card key={project.orderNumber} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Video className="h-6 w-6 text-blue-600" />
                        <div>
                          <CardTitle className="text-lg">프로젝트 #{project.orderNumber}</CardTitle>
                          <CardDescription>
                            {project.contentIdea?.아이디어 || '아이디어 정보 없음'}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(project.status)}
                        {project.status === '생성중' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCancelProject(project.orderNumber)}
                            className="text-red-600 border-red-300 hover:bg-red-50"
                          >
                            <X className="h-4 w-4 mr-1" />
                            취소
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* 프로젝트 정보 */}
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>주문일: {formatDate(project.orderDate)}</span>
                        </div>
                        {project.deliveryDate && (
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Clock className="h-4 w-4" />
                            <span>완료일: {formatDate(project.deliveryDate)}</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <span>사용된 크레딧: {project.usedCredits}</span>
                        </div>
                      </div>

                      {/* 콘텐츠 아이디어 정보 */}
                      {project.contentIdea && (
                        <div className="space-y-3">
                          <h4 className="font-medium text-gray-900">콘텐츠 아이디어</h4>
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="font-medium text-gray-700">아이디어:</span>
                              <p className="text-gray-600 mt-1">{project.contentIdea.아이디어}</p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">자막:</span>
                              <p className="text-gray-600 mt-1">{project.contentIdea.자막}</p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">배경 설명:</span>
                              <p className="text-gray-600 mt-1">{project.contentIdea['배경 설명']}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 비디오 링크 */}
                    {project.videoLink && (
                      <div className="mt-6 pt-4 border-t">
                        <div className="flex items-center space-x-2">
                          <Play className="h-5 w-5 text-green-600" />
                          <span className="font-medium text-gray-900">생성된 비디오</span>
                        </div>
                        <div className="mt-2">
                          <a
                            href={project.videoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 underline"
                          >
                            <span>{project.videoLink}</span>
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* 새로고침 버튼 */}
          {projects.length > 0 && (
            <div className="mt-8 text-center">
              <Button onClick={fetchProjects} variant="outline">
                <Loader2 className="h-4 w-4 mr-2" />
                새로고침
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 