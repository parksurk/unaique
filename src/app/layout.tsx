import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Clerk 설정을 위한 환경 변수 확인
const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Unaique - AI 기반 비디오 제작 서비스",
  description: "Unaique는 AI 기반 비디오 제작 서비스로, 원맨 크리에이터를 위한 생성형 AI 기반 비디오 제작 서비스를 제공합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Clerk 설정이 없는 경우 기본 레이아웃만 렌더링
  if (!clerkPublishableKey) {
    return (
      <html lang="ko">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    );
  }

  return (
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <html lang="ko">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
