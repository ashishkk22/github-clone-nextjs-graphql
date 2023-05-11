// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  let isLogin = request.cookies.get("TOKEN")?.value;
  if (!isLogin) {
    if (url.pathname !== "/login" && url.pathname !== "/signup") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else {
    if (url.pathname === "/login" || url.pathname === "/signup") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
