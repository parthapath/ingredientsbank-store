import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request) {
  const { token } = await request.json();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  cookies().set("token", token, {
    httpOnly: false,
    secure: true,
    expires: expiresAt,
    sameSite: "strict",
    path: "/",
  });

  return NextResponse.json({ success: true }, { status: 200 });
}
