"use client";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Video, TestTube, Database, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface TestResult {
  success: boolean;
  message: string;
  data?: Record<string, unknown>;
  error?: string;
  timestamp?: string;
}

export default function WebhookTestPage() {
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [testData, setTestData] = useState({
    name: '테스트 사용자',
    email: 'test@example.com',
    phone: '010-1234-5678'
  });

  const testAirtableConnection = async () => {
    setIsLoading(true);
    setTestResult(null);

    try {
      const response = await fetch('/api/test-airtable', {
        method: 'GET',
      });

      const result = await response.json();
      setTestResult(result);
    } catch (error) {
      setTestResult({
        success: false,
        message: '연결 테스트 중 오류 발생',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testCustomerSync = async () => {
    setIsLoading(true);
    setTestResult(null);

    try {
      const response = await fetch('/api/test-airtable', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
      });

      const result = await response.json();
      setTestResult(result);
    } catch (error) {
      setTestResult({
        success: false,
        message: '고객 동기화 테스트 중 오류 발생',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTestData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Webhook & Airtable 테스트
            </h1>
            <p className="text-xl text-gray-600">
              Clerk Webhook과 Airtable 동기화 기능을 테스트해보세요
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Airtable 연결 테스트 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-blue-600" />
                  Airtable 연결 테스트
                </CardTitle>
                <CardDescription>
                  Airtable API 연결 상태를 확인합니다
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={testAirtableConnection}
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      테스트 중...
                    </>
                  ) : (
                    <>
                      <TestTube className="mr-2 h-4 w-4" />
                      연결 테스트
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* 고객 동기화 테스트 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  고객 동기화 테스트
                </CardTitle>
                <CardDescription>
                  테스트 고객 데이터로 Airtable 동기화를 테스트합니다
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">이름</Label>
                  <Input
                    id="name"
                    name="name"
                    value={testData.name}
                    onChange={handleInputChange}
                    placeholder="테스트 사용자"
                  />
                </div>
                <div>
                  <Label htmlFor="email">이메일</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={testData.email}
                    onChange={handleInputChange}
                    placeholder="test@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">전화번호</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={testData.phone}
                    onChange={handleInputChange}
                    placeholder="010-1234-5678"
                  />
                </div>
                <Button 
                  onClick={testCustomerSync}
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      동기화 중...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      고객 동기화 테스트
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* 테스트 결과 표시 */}
          {testResult && (
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {testResult.success ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                  테스트 결과
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Alert className={testResult.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
                  <AlertDescription className={testResult.success ? 'text-green-800' : 'text-red-800'}>
                    <div className="font-medium mb-2">{testResult.message}</div>
                    {testResult.error && (
                      <div className="text-sm opacity-80">오류: {testResult.error}</div>
                    )}
                    {testResult.data && (
                      <div className="text-sm opacity-80 mt-2">
                        <pre className="whitespace-pre-wrap">
                          {JSON.stringify(testResult.data, null, 2)}
                        </pre>
                      </div>
                    )}
                    {testResult.timestamp && (
                      <div className="text-xs opacity-60 mt-2">
                        테스트 시간: {new Date(testResult.timestamp).toLocaleString('ko-KR')}
                      </div>
                    )}
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          )}

          {/* 사용법 안내 */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>사용법</CardTitle>
              <CardDescription>
                Clerk Webhook과 Airtable 동기화 테스트 방법
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">1. Airtable 연결 테스트</h4>
                <p className="text-sm text-gray-600">
                  Airtable API 키와 Base ID가 올바르게 설정되었는지 확인합니다.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">2. 고객 동기화 테스트</h4>
                <p className="text-sm text-gray-600">
                  테스트 데이터로 고객 정보를 Airtable에 동기화합니다.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">3. Clerk Webhook 설정</h4>
                <p className="text-sm text-gray-600">
                  Clerk Dashboard에서 webhook URL을 <code>/api/webhooks/clerk</code>로 설정하고
                  <code>user.created</code>와 <code>user.updated</code> 이벤트를 활성화하세요.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 