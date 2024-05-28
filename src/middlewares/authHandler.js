import { NextResponse } from "next/server";

export function authHandler(request) {
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
};
