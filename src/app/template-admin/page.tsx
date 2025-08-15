"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Video, Plus, Database, CheckCircle, XCircle, Loader2, RefreshCw } from 'lucide-react';
import Link from 'next/link';

interface TemplateData {
  Category: string;
  Name: string;
  Desc: string;
  아이디어: string;
  Duration?: string;
  Difficulty?: string;
  Thumbnail?: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  count?: number;
  templates?: TemplateData[];
  error?: string;
  batchInfo?: string;
  details?: string;
  suggestion?: string;
}

export default function TemplateAdminPage() {
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<ApiResponse | null>(null);

  // 템플릿 추가
  const handleAddTemplates = async () => {
    setIsAdding(true);
    setResult(null);

    try {
      const response = await fetch('/api/templates/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data: ApiResponse = await response.json();
      setResult(data);

      if (data.success) {
        console.log('✅ 템플릿 추가 성공:', data.message);
      } else {
        console.error('❌ 템플릿 추가 실패:', data.error);
      }
    } catch (error) {
      console.error('❌ API 호출 오류:', error);
      setResult({
        success: false,
        message: 'API 호출 중 오류가 발생했습니다.',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsAdding(false);
    }
  };

  // 테이블 구조 확인
  const handleCheckTable = async () => {
    setIsChecking(true);
    setResult(null);

    try {
      const response = await fetch('/api/templates/check-table', {
        method: 'GET',
      });

      const data: ApiResponse = await response.json();
      setResult(data);

      if (data.success) {
        console.log('✅ 테이블 구조 확인 성공:', data.message);
      } else {
        console.error('❌ 테이블 구조 확인 실패:', data.error);
      }
    } catch (error) {
      console.error('❌ API 호출 오류:', error);
      setResult({
        success: false,
        message: 'API 호출 중 오류가 발생했습니다.',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsChecking(false);
    }
  };

  // 템플릿 조회
  const handleLoadTemplates = async () => {
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/templates/add', {
        method: 'GET',
      });

      const data: ApiResponse = await response.json();
      setResult(data);

      if (data.success) {
        console.log('✅ 템플릿 조회 성공:', data.count, '개');
      } else {
        console.error('❌ 템플릿 조회 실패:', data.error);
      }
    } catch (error) {
      console.error('❌ API 호출 오류:', error);
      setResult({
        success: false,
        message: 'API 호출 중 오류가 발생했습니다.',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
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
              <span className="text-gray-500">/ 템플릿 관리</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/templates">
                <Button variant="ghost" size="sm">
                  템플릿 보기
                </Button>
              </Link>
              <Link href="/">
                <Button variant="ghost" size="sm">
                  홈으로
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              템플릿 관리
            </h1>
            <p className="text-lg text-slate-600">
              Airtable의 Templates 테이블에 동영상 템플릿을 추가하고 관리합니다.
            </p>
          </div>

          {/* Action Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Check Table Structure Card */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-yellow-600" />
                  테이블 확인
                </CardTitle>
                <CardDescription>
                  Airtable Templates 테이블 구조와 연결 상태를 확인합니다.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={handleCheckTable}
                  disabled={isChecking}
                  variant="outline"
                  className="w-full border-yellow-200 text-yellow-700 hover:bg-yellow-50"
                >
                  {isChecking ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      확인 중...
                    </>
                  ) : (
                    <>
                      <Database className="mr-2 h-4 w-4" />
                      테이블 구조 확인
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Add Templates Card */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5 text-green-600" />
                  템플릿 추가
                </CardTitle>
                <CardDescription>
                  12개의 기본 동영상 템플릿을 Airtable에 추가합니다. (Airtable 제한으로 10개씩 배치 처리)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={handleAddTemplates}
                  disabled={isAdding}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  {isAdding ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      추가 중...
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      템플릿 추가하기
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Load Templates Card */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-blue-600" />
                  템플릿 조회
                </CardTitle>
                <CardDescription>
                  Airtable에 저장된 모든 템플릿을 조회합니다.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={handleLoadTemplates}
                  disabled={isLoading}
                  variant="outline"
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      조회 중...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      템플릿 조회하기
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Result Display */}
          {result && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {result.success ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                  {result.success ? '성공' : '오류'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Alert className={result.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
                  <AlertDescription className={result.success ? 'text-green-800' : 'text-red-800'}>
                    <div className="font-medium mb-2">{result.message}</div>
                    {result.count && (
                      <div className="text-sm opacity-80">추가된 템플릿 수: {result.count}개</div>
                    )}
                    {result.batchInfo && (
                      <div className="text-sm opacity-80 text-blue-600">ℹ️ {result.batchInfo}</div>
                    )}
                    {result.error && (
                      <div className="text-sm opacity-80 mt-2">오류: {result.error}</div>
                    )}
                    {result.templates && result.templates.length > 0 && (
                      <div className="mt-4">
                        <div className="text-sm font-medium mb-2">추가된 템플릿:</div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {result.templates.map((template, index) => (
                            <div key={index} className="text-xs p-2 bg-white rounded border">
                              <div className="font-medium">{template.Name}</div>
                              <div className="text-gray-600">{template.Category}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          )}

          {/* Template List Preview */}
          <Card>
            <CardHeader>
              <CardTitle>추가될 템플릿 목록 (12개)</CardTitle>
              <CardDescription>
                Airtable Templates 테이블에 추가될 기본 템플릿들입니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* 교육 카테고리 */}
                <div className="p-4 border rounded-lg">
                  <div className="font-medium text-blue-600 mb-2">📚 교육</div>
                  <div className="space-y-1 text-sm">
                    <div>• 온라인 강의</div>
                    <div>• 튜토리얼</div>
                    <div>• 프레젠테이션</div>
                  </div>
                </div>
                
                {/* 마케팅 카테고리 */}
                <div className="p-4 border rounded-lg">
                  <div className="font-medium text-green-600 mb-2">📈 마케팅</div>
                  <div className="space-y-1 text-sm">
                    <div>• 제품 소개</div>
                    <div>• 브랜드 스토리</div>
                    <div>• 광고</div>
                  </div>
                </div>
                
                {/* 엔터테인먼트 카테고리 */}
                <div className="p-4 border rounded-lg">
                  <div className="font-medium text-purple-600 mb-2">🎮 엔터테인먼트</div>
                  <div className="space-y-1 text-sm">
                    <div>• 브이로그</div>
                    <div>• 게임 하이라이트</div>
                    <div>• 음악 비디오</div>
                  </div>
                </div>
                
                {/* 비즈니스 카테고리 */}
                <div className="p-4 border rounded-lg">
                  <div className="font-medium text-orange-600 mb-2">💼 비즈니스</div>
                  <div className="space-y-1 text-sm">
                    <div>• 회사 소개</div>
                    <div>• 회의 녹화</div>
                    <div>• 투자 피치</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 