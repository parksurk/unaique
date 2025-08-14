import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, ArrowLeft } from "lucide-react";

export default function SignUpPage() {
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
              Unaique에 가입하기
            </h1>
            <p className="text-xl text-gray-600">
              AI 기반 비디오 제작 서비스를 시작해보세요
            </p>
          </div>
          
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">회원가입</CardTitle>
              <CardDescription>
                이메일과 비밀번호로 가입하거나 소셜 계정을 사용하세요
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <SignUp
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
                  afterSignUpUrl="/dashboard"
                  redirectUrl="/dashboard"
                  signInUrl="/sign-in"
                  routing="path"
                  path="/sign-up"
                />
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-8 text-center text-gray-600">
            <p>
              이미 계정이 있으신가요?{" "}
              <Link href="/sign-in" className="text-blue-600 hover:text-blue-700 font-medium">
                로그인하기
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 