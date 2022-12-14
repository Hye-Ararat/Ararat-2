import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
        if (!request.headers.get("Authorization")) {
          if (!request.cookies.has("authorization")) {
            return NextResponse.redirect(new URL("/auth/login", request.url));
          }
        }
    return NextResponse.next();
  }
  export const config = {
    matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - api (API routes)
       * - _next/static (static files)
       * - favicon.ico (favicon file)
       */
      '/((?!api|_next/static|favicon.ico|auth).*)',
    ],
  }