import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export function middleware(request) {
  request.cookies.set("region", "asdasdasd");
  return NextResponse.next();
}

/* export function middleware(request) {
  const token = cookies().get("token");
  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  } else {
    return NextResponse.next();
  }

  try {
    const result = jwt.verify(token.value, process.env.JWT_SECRET);
    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/checkout/:path*",
    "/account/:path*",
    "/addressess/:path*",
    "/orders/:path*",
    "/change-password/:path*",
  ],
}; */
