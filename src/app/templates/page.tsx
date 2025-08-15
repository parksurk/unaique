"use client";

import { useState, useEffect } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Video, 
  Sparkles, 
  Play,
  ArrowRight,
  CheckCircle,
  BookOpen,
  TrendingUp,
  Heart,
  Music,
  Target,
  Palette,
  Clock,
  Globe,
  Shield,
  Loader2,
  XCircle
} from "lucide-react";

interface TemplateData {
  id: string;
  fields: {
    Category: string;
    Name: string;
    Desc: string;
    아이디어: string;
    Duration?: string;
    Difficulty?: string;
    Thumbnail?: string;
  };
}

interface TemplateCategory {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  templates: TemplateData[];
}

export default function TemplatesPage() {
  const [templateCategories, setTemplateCategories] = useState<TemplateCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Airtable에서 템플릿 데이터 조회
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/api/templates/add', {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('템플릿 데이터를 불러올 수 없습니다.');
        }

        const data = await response.json();
        
        if (data.success && data.templates) {
          // 템플릿 데이터를 카테고리별로 그룹화
          const groupedTemplates = groupTemplatesByCategory(data.templates);
          setTemplateCategories(groupedTemplates);
        } else {
          throw new Error(data.message || '템플릿 데이터가 없습니다.');
        }
      } catch (err) {
        console.error('템플릿 조회 오류:', err);
        setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  // 템플릿을 카테고리별로 그룹화하는 함수
  const groupTemplatesByCategory = (templates: TemplateData[]): TemplateCategory[] => {
    const categoryMap = new Map<string, TemplateData[]>();
    
    // 각 템플릿을 카테고리별로 분류
    templates.forEach(template => {
      const category = template.fields.Category;
      if (!categoryMap.has(category)) {
        categoryMap.set(category, []);
      }
      categoryMap.get(category)!.push(template);
    });

    // 카테고리별 설명과 아이콘 매핑
    const categoryConfig = {
      '교육': {
        icon: BookOpen,
        description: '학습과 지식 공유를 위한 전문적인 교육 영상 템플릿'
      },
      '마케팅': {
        icon: TrendingUp,
        description: '브랜드 홍보와 제품 소개를 위한 매력적인 마케팅 영상 템플릿'
      },
      '엔터테인먼트': {
        icon: Music,
        description: '재미있고 매력적인 콘텐츠를 위한 엔터테인먼트 영상 템플릿'
      },
      '비즈니스': {
        icon: Target,
        description: '전문적이고 신뢰감 있는 비즈니스 콘텐츠를 위한 템플릿'
      }
    };

    // 카테고리별로 정렬된 배열 생성
    const orderedCategories = ['교육', '마케팅', '엔터테인먼트', '비즈니스'];
    
    return orderedCategories
      .filter(category => categoryMap.has(category))
      .map(category => ({
        name: category,
        icon: categoryConfig[category as keyof typeof categoryConfig]?.icon || Target,
        description: categoryConfig[category as keyof typeof categoryConfig]?.description || '',
        templates: categoryMap.get(category) || []
      }));
  };

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
            <span className="inline-flex items-center rounded-full bg-purple-50 px-3 py-1 text-sm font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
              <Palette className="mr-2 h-4 w-4" />
              1000+ 전문 템플릿
            </span>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
            전문가가 만든
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              동영상 템플릿
            </span>
          </h1>
          
          <p className="mt-6 text-lg leading-8 text-slate-600 max-w-3xl mx-auto">
            교육, 마케팅, 엔터테인먼트 등 다양한 목적에 맞는 전문적으로 디자인된 템플릿으로 
            빠르고 쉽게 전문적인 동영상을 제작하세요.
          </p>
          
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              템플릿 둘러보기
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg">
              <Play className="mr-2 h-4 w-4" />
              데모 영상 보기
            </Button>
          </div>
        </div>
      </section>

      {/* Template Categories */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-6">
              카테고리별 템플릿
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              목적과 장르에 맞는 최적의 템플릿을 선택하여 
              효율적으로 동영상을 제작할 수 있습니다.
            </p>
          </div>
          
          {/* 로딩 상태 */}
          {isLoading && (
            <div className="text-center py-12">
              <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-lg text-slate-600">템플릿을 불러오는 중...</p>
            </div>
          )}

          {/* 오류 상태 */}
          {error && (
            <div className="text-center py-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                <div className="text-red-600 mb-2">
                  <XCircle className="w-8 h-8 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-red-800 mb-2">템플릿 로드 실패</h3>
                <p className="text-sm text-red-700 mb-4">{error}</p>
                <Button 
                  onClick={() => window.location.reload()} 
                  variant="outline" 
                  size="sm"
                  className="border-red-200 text-red-700 hover:bg-red-50"
                >
                  다시 시도
                </Button>
              </div>
            </div>
          )}

          {/* 템플릿 카테고리 표시 */}
          {!isLoading && !error && (
            <div className="space-y-16">
              {templateCategories.map((category) => (
                <div key={category.name}>
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
                      <category.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">{category.name}</h3>
                      <p className="text-slate-600">{category.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {category.templates.map((template, templateIndex) => (
                      <Card key={template.id || templateIndex} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                        <CardHeader className="pb-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-3xl">{template.fields.Thumbnail || '🎬'}</span>
                            <div className="flex items-center space-x-2">
                              {template.fields.Difficulty && (
                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                  {template.fields.Difficulty}
                                </span>
                              )}
                              {template.fields.Duration && (
                                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                                  {template.fields.Duration}
                                </span>
                              )}
                            </div>
                          </div>
                          <CardTitle className="text-lg">{template.fields.Name}</CardTitle>
                          <CardDescription>
                            {template.fields.Desc || `${category.name} 분야에 특화된 전문 템플릿`}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <ul className="space-y-2 mb-6">
                            {template.fields.아이디어.split(',').map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-center space-x-2 text-sm text-slate-600">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span>{feature.trim()}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="flex space-x-2">
                            <Button size="sm" className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                              사용하기
                            </Button>
                            <Button size="sm" variant="outline">
                              <Heart className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Template Features */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-6">
              템플릿의 특별한 기능
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Unaique 템플릿만의 차별화된 기능들로 
              더욱 창의적이고 전문적인 동영상을 제작할 수 있습니다.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-lg text-center">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <Sparkles className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-lg">AI 최적화</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-sm">
                  AI가 자동으로 색상, 폰트, 레이아웃을 최적화하여 
                  완벽한 결과물을 만들어냅니다.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                  <Clock className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-lg">빠른 제작</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-sm">
                  드래그 앤 드롭으로 간단하게 콘텐츠를 교체하여 
                  몇 분 만에 완성된 동영상을 만들 수 있습니다.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <Globe className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-lg">다국어 지원</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-sm">
                  한국어, 영어, 일본어 등 다양한 언어로 
                  자동 번역 및 자막 생성이 가능합니다.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
                  <Shield className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle className="text-lg">상업적 사용</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-sm">
                  모든 템플릿은 상업적 사용이 가능하며, 
                  저작권 걱정 없이 자유롭게 활용할 수 있습니다.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <Card className="border-0 shadow-2xl bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <CardHeader className="pb-8">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                지금 바로 템플릿을 시작하세요
              </h2>
              <p className="text-lg text-purple-100 max-w-2xl mx-auto">
                1000개 이상의 전문 템플릿으로 
                당신만의 독특한 동영상을 만들어보세요.
              </p>
            </CardHeader>
            <CardContent className="pb-8">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
                  무료 템플릿 시작하기
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                  프리미엄 템플릿 보기
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
  );
} 