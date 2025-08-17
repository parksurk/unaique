"use client";

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Video, Lightbulb, Type, FileText, ArrowLeft, Clock, Zap } from 'lucide-react';
import { UnaiqueLogo } from '@/components/ui/logo';
import Link from 'next/link';
import { useCustomerSession } from '@/hooks/useCustomerSession';

export const dynamic = 'force-dynamic';

// useSearchParams를 사용하는 컴포넌트
function CreateVideoForm() {
  const { user } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { customerData, isLoading } = useCustomerSession();
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    아이디어: '',
    자막: '',
    '배경 설명': ''
  });
  const [error, setError] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<{
    id: string;
    name: string;
    아이디어: string;
    자막: string;
    '배경 설명': string;
    duration?: string;
    difficulty?: string;
    thumbnail?: string;
    description?: string;
    like?: number;
  } | null>(null);

  // URL 파라미터에서 템플릿 ID를 읽어와서 Airtable에서 전체 정보를 가져옴
  useEffect(() => {
    const templateId = searchParams.get('templateId');

    console.log('URL 파라미터 읽기:', { templateId });

    if (templateId) {
      // Airtable에서 전체 템플릿 정보를 가져옴
      fetchTemplateDetails(templateId);
    }
  }, [searchParams]);

  // Airtable에서 템플릿 상세 정보를 가져오는 함수
  const fetchTemplateDetails = async (templateId: string) => {
    try {
      console.log('템플릿 상세 정보 조회 중:', templateId);
      
      const response = await fetch('/api/templates/add', {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('템플릿 정보를 가져올 수 없습니다.');
      }

      const data = await response.json();
      
      if (data.success && data.templates) {
        // templateId로 해당 템플릿 찾기
        const template = data.templates.find((t: { id: string; fields: Record<string, unknown> }) => t.id === templateId);
        
        if (template) {
          console.log('찾은 템플릿:', template);
          
          const templateData = {
            id: template.id,
            name: template.fields.Name || '선택된 템플릿',
            아이디어: template.fields.아이디어 || '',
            자막: template.fields.자막 || '',
            '배경 설명': template.fields['배경 설명'] || '',
            duration: template.fields.Duration || '3-5분',
            difficulty: template.fields.Difficulty || '중급',
            thumbnail: template.fields.Thumbnail || '🎬',
            description: template.fields.Desc || '',
            like: template.fields.like || 0
          };

          setSelectedTemplate(templateData);

          // 폼 데이터에 템플릿 정보 설정
          setFormData({
            아이디어: templateData.아이디어,
            자막: templateData.자막,
            '배경 설명': templateData['배경 설명']
          });
        } else {
          console.error('템플릿을 찾을 수 없습니다:', templateId);
        }
      }
    } catch (error) {
      console.error('템플릿 정보 조회 실패:', error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setError('로그인이 필요합니다.');
      return;
    }

    if (isLoading) {
      setError('세션 정보를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    if (!customerData || !customerData.businessId) {
      setError('세션 정보를 찾을 수 없습니다. 로그인 후 다시 시도해주세요.');
      return;
    }

    if (!formData.아이디어.trim() || !formData.자막.trim() || !formData['배경 설명'].trim()) {
      setError('모든 필드를 입력해주세요.');
      return;
    }

    setIsCreating(true);
    setError(null);

    try {
      // 1. 세션에서 Business ID 가져오기
      if (!customerData || !customerData.businessId) {
        throw new Error('세션 정보를 찾을 수 없습니다. 로그인 후 다시 시도해주세요.');
      }

      const businessId = customerData.businessId;
      console.log('세션에서 가져온 Business ID:', businessId);

      // 2. Content Ideas 테이블에 아이디어 추가
      const contentResponse = await fetch('/api/content-ideas/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          businessId: businessId,
          아이디어: formData.아이디어,
          자막: formData.자막,
          '배경 설명': formData['배경 설명'],
          자동화: '자동화 시작'
        }),
      });

      if (!contentResponse.ok) {
        throw new Error('Content Idea 생성에 실패했습니다.');
      }

      const contentData = await contentResponse.json();
      console.log('Content Idea 생성 성공:', contentData);

                        // 3. Orders 테이블에 주문 추가 (생성중 상태)
                  const orderResponse = await fetch('/api/orders/create', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      businessId: businessId,
                      contentIdeaId: contentData.id,
                      status: '생성중'
                    }),
                  });

      if (!orderResponse.ok) {
        throw new Error('주문 생성에 실패했습니다.');
      }

      const orderData = await orderResponse.json();
      console.log('주문 생성 성공:', orderData);

                        // 4. n8n 파이프라인 호출
                  const n8nResponse = await fetch('/api/n8n/trigger-pipeline', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      pipelineName: 'Unaique-VG-Pipeline',
                      orderId: orderData.orderNumber,
                      businessId: businessId,
                      contentIdeaId: contentData.id,
                      additionalData: {
                        ...formData
                      }
                    }),
                  });

      if (!n8nResponse.ok) {
        throw new Error('n8n 파이프라인 호출에 실패했습니다.');
      }

      const n8nData = await n8nResponse.json();
      console.log('n8n 파이프라인 호출 성공:', n8nData);

      // 5. n8n 파이프라인 결과에 따른 후속 처리
      // 실제 구현에서는 n8n 웹훅을 통해 결과를 받아야 함
      // 여기서는 임시로 성공으로 가정하고 처리
      
      // 성공 시 대시보드로 이동
      router.push('/dashboard?message=video-creation-started');

    } catch (error) {
      console.error('비디오 생성 실패:', error);
      setError(error instanceof Error ? error.message : '비디오 생성에 실패했습니다.');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <UnaiqueLogo />
              <nav className="hidden md:flex space-x-8">
                <Link href="/" className="text-gray-600 hover:text-gray-900">홈</Link>
                <Link href="/templates" className="text-gray-600 hover:text-gray-900">템플릿</Link>
                <Link href="/pricing" className="text-gray-600 hover:text-gray-900">가격</Link>
                <Link href="/contact" className="text-gray-600 hover:text-gray-900">문의</Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="outline">대시보드</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link href="/templates" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              템플릿으로 돌아가기
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">새 비디오 제작</h1>
            <p className="text-gray-600">아이디어를 입력하고 AI가 자동으로 비디오를 생성합니다</p>
          </div>

          {/* Selected Template Display */}
          {selectedTemplate && (
            <Card className="mb-8 border-2 border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-blue-900">
                  <Video className="h-6 w-6" />
                  <span>선택된 템플릿: {selectedTemplate.name}</span>
                </CardTitle>
                <CardDescription className="text-blue-700">
                  {selectedTemplate.description || '선택된 템플릿을 기반으로 영상을 제작합니다.'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* 템플릿 메타데이터 */}
                  <div className="flex items-center space-x-6 text-sm text-blue-600">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>{selectedTemplate.duration || '3-5분'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Zap className="h-4 w-4" />
                      <span>{selectedTemplate.difficulty || '중급'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{selectedTemplate.thumbnail || '🎬'}</span>
                    </div>
                  </div>

                  {/* 템플릿 설명 */}
                  <div className="bg-white p-4 rounded-lg border shadow-sm">
                    <p className="text-gray-700 leading-relaxed">
                      {selectedTemplate.description || '선택된 템플릿을 기반으로 영상을 제작합니다.'}
                    </p>
                  </div>

                  {/* 템플릿 필드 정보 */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg border shadow-sm">
                      <div className="flex items-center space-x-2 mb-2">
                        <Lightbulb className="h-4 w-4 text-yellow-500" />
                        <h4 className="font-medium text-gray-900">아이디어</h4>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {selectedTemplate.아이디어}
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border shadow-sm">
                      <div className="flex items-center space-x-2 mb-2">
                        <Type className="h-4 w-4 text-blue-500" />
                        <h4 className="font-medium text-gray-900">자막</h4>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {selectedTemplate.자막}
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border shadow-sm">
                      <div className="flex items-center space-x-2 mb-2">
                        <FileText className="h-4 w-4 text-green-500" />
                        <h4 className="font-medium text-gray-900">배경 설명</h4>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {selectedTemplate['배경 설명']}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Main Form */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Video className="h-6 w-6 text-teal-600" />
                <span>비디오 제작 정보</span>
              </CardTitle>
              <CardDescription>
                {selectedTemplate ? '템플릿 정보를 기반으로 영상을 제작합니다' : '아래 정보를 입력하면 AI가 자동으로 영상을 생성합니다'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* 세션 상태 표시 */}
              {isLoading && (
                <Alert className="mb-6">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <AlertDescription>
                    세션 정보를 불러오는 중입니다...
                  </AlertDescription>
                </Alert>
              )}

              {/* 세션 데이터가 없을 때 표시 */}
              {!isLoading && !customerData && (
                <Alert className="mb-6">
                  <AlertDescription>
                    세션 정보를 찾을 수 없습니다. 로그인 후 다시 시도해주세요.
                  </AlertDescription>
                </Alert>
              )}

              {/* 디버깅 도구들 */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
                <h4 className="text-sm font-medium text-gray-700 mb-3">디버깅 도구</h4>
                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={async () => {
                      try {
                        const response = await fetch('/api/orders/check-status-options');
                        const data = await response.json();
                        console.log('Status 옵션 확인 결과:', data);
                        if (data.success) {
                          if (data.statusField) {
                            alert(`✅ Orders 테이블 Status 필드 확인 완료!\n\nStatus 필드 값: ${data.statusField.value}\nStatus 필드 타입: ${data.statusField.type}\n\n추천사항: ${data.recommendation}`);
                          } else {
                            alert('✅ Orders 테이블이 존재하지만 레코드가 없습니다.');
                          }
                        } else {
                          alert(`❌ Status 필드 확인 실패: ${data.error}`);
                        }
                      } catch (error) {
                        console.error('Status 필드 확인 실패:', error);
                        alert('Status 필드 확인 중 오류가 발생했습니다.');
                      }
                    }}
                    variant="outline"
                    size="sm"
                  >
                    Status 옵션 확인
                  </Button>
                  
                  <Button
                    onClick={async () => {
                      try {
                        // 간단한 테스트 주문 생성 시도
                        const response = await fetch('/api/orders/create', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({
                            businessId: 'TEST',
                            contentIdeaId: 'TEST',
                            status: '생성중'
                          }),
                        });
                        
                        if (response.ok) {
                          alert('✅ Status "생성중" 테스트 성공! 이제 비디오 생성이 가능합니다.');
                        } else {
                          const errorData = await response.json();
                          alert(`❌ Status "생성중" 테스트 실패: ${errorData.error}`);
                        }
                      } catch (error) {
                        console.error('Status 테스트 실패:', error);
                        alert('Status 테스트 중 오류가 발생했습니다.');
                      }
                    }}
                    variant="outline"
                    size="sm"
                  >
                    Status &quot;생성중&quot; 테스트
                  </Button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 아이디어 입력 */}
                <div className="space-y-2">
                  <Label htmlFor="아이디어" className="flex items-center space-x-2">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    <span>아이디어 *</span>
                  </Label>
                  <Textarea
                    id="아이디어"
                    placeholder="만들고 싶은 영상의 핵심 아이디어를 설명해주세요..."
                    value={formData.아이디어}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('아이디어', e.target.value)}
                    className="min-h-[100px]"
                    required
                  />
                  <p className="text-sm text-gray-500">
                    예: &ldquo;우리 회사의 제품을 소개하는 1분 홍보 영상&rdquo;
                  </p>
                </div>

                {/* 자막 입력 */}
                <div className="space-y-2">
                  <Label htmlFor="자막" className="flex items-center space-x-2">
                    <Type className="h-5 w-5 text-blue-500" />
                    <span>자막 *</span>
                  </Label>
                  <Textarea
                    id="자막"
                    placeholder="영상에 들어갈 자막을 작성해주세요..."
                    value={formData.자막}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('자막', e.target.value)}
                    className="min-h-[100px]"
                    required
                  />
                  <p className="text-sm text-gray-500">
                    예: &ldquo;안녕하세요! 오늘은 우리 제품의 놀라운 기능을 소개합니다...&rdquo;
                  </p>
                </div>

                {/* 배경 설명 입력 */}
                <div className="space-y-2">
                  <Label htmlFor="배경 설명" className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-green-500" />
                    <span>배경 설명 *</span>
                  </Label>
                  <Textarea
                    id="배경 설명"
                    placeholder="영상의 배경, 톤앤매너, 스타일 등을 설명해주세요..."
                    value={formData['배경 설명']}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('배경 설명', e.target.value)}
                    className="min-h-[100px]"
                    required
                  />
                  <p className="text-sm text-gray-500">
                    예: &ldquo;친근하고 전문적인 톤으로, 밝고 현대적인 느낌의 영상&rdquo;
                  </p>
                </div>

                {/* 에러 메시지 */}
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {/* 제출 버튼 */}
                <div className="flex justify-center">
                  <Button
                    type="submit"
                    disabled={isCreating || isLoading || !customerData}
                    className="px-8 py-3 text-lg"
                    size="lg"
                  >
                    {isCreating ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        생성 중...
                      </>
                    ) : (
                      <>
                        <Video className="mr-2 h-5 w-5" />
                        비디오 생성하기
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                  <Lightbulb className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">아이디어 구체화</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-gray-600">
                <p>구체적인 아이디어를 제공하면 더 정확한 영상이 생성됩니다</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                  <Type className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">자막 최적화</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-gray-600">
                <p>명확하고 간결한 자막으로 시청자 이해도를 높입니다</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                  <FileText className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg">스타일 가이드</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-gray-600">
                <p>배경 설명으로 원하는 영상 스타일을 정확히 전달합니다</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// 로딩 컴포넌트
function CreateVideoLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">페이지를 불러오는 중...</p>
        </div>
      </div>
    </div>
  );
}

// 메인 페이지 컴포넌트
export default function CreateVideoPage() {
  return (
    <Suspense fallback={<CreateVideoLoading />}>
      <CreateVideoForm />
    </Suspense>
  );
} 