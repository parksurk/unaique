import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, ArrowLeft } from "lucide-react";
import UnaiqueLogo from "@/components/ui/logo";

// 이 페이지는 동적으로 렌더링되어야 함 (Clerk 인증 필요)
export const dynamic = 'force-dynamic';

export default function SignInPage() {
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
                          <UnaiqueLogo size="lg" />
                        </div>
            
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                홈으로 돌아가기
              </Link>
            </Button>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Unaique에 로그인
            </h1>
            <p className="text-xl text-gray-600">
              계정에 로그인하여 서비스를 이용하세요
            </p>
          </div>
          
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">로그인</CardTitle>
              <CardDescription>
                이메일과 비밀번호로 로그인하거나 소셜 계정을 사용하세요
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <SignIn
                  appearance={{
                    elements: {
                      formButtonPrimary: 'bg-blue-600 hover:bg-blue-700',
                      card: 'shadow-none border-0',
                      headerTitle: 'hidden',
                      headerSubtitle: 'hidden',
                      socialButtonsBlockButton: 'bg-gray-100 hover:bg-gray-200 text-gray-900 border-gray-300',
                      formFieldInput: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
                      formFieldLabel: 'text-gray-700',
                      footerActionLink: 'text-blue-600 hover:text-blue-700'
                    }
                  }}
                  afterSignInUrl="/dashboard"
                  redirectUrl="/dashboard"
                  signUpUrl="/sign-up"
                  routing="path"
                  path="/sign-in"
                />
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-8 text-center text-gray-600">
            <p>
              계정이 없으신가요?{" "}
              <Link href="/sign-up" className="text-blue-600 hover:text-blue-700 font-medium">
                회원가입하기
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 