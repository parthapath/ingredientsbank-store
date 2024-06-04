import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export async function POST(request) {
  const { token } = await request.json();
  const jwtToken = jwtDecode(token);
  const expiresAt = new Date(jwtToken.exp * 1000);

  cookies().set("token", token, {
    httpOnly: false,
    secure: true,
    expires: expiresAt,
    sameSite: "strict",
    path: "/",
  });

  return NextResponse.json({ success: true }, { status: 200 });
}
