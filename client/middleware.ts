// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  let isLogin = request.cookies.get("TOKEN");
  if (!isLogin) {
    if (url.pathname === "/") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  if (isLogin) {
    if (url.pathname === "/login" || url.pathname === "/signup") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  //   return NextResponse.redirect(new URL("/about-2", request.url));
}

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: "/about/:path*",
// };
