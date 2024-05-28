import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request) {
  const response = NextResponse.json({ message: "Logged out successfully" });

  // Expire the cookie by setting a maxAge of -1
  cookies().set("token", "", {
    httpOnly: true,
    secure: true,
    maxAge: -1, // Expire the cookie
    sameSite: "strict",
    path: "/",
  });

  return response;
}
