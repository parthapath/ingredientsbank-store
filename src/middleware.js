import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export function middleware(request) {
  const token = cookies().get("token");
  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/checkout/:path*",
    "/account/:path*",
    "/addressess/:path*",
    "/orders/:path*",
    "/change-password/:path*",
  ],
};
