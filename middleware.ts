import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

// middleware가 동작할 경로 패턴 지정 (보호할 경로만)
export const config = {
  matcher: [
    // 보호할 경로만 지정
    "/dashboard(.*)",
    "/profile(.*)",
    "/admin(.*)",
    "/webhook-test(.*)",
    // API 경로 중 webhook은 제외
    "/(api|trpc)(?!/webhooks/clerk)(.*)"
  ],
}; 