import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const token = cookies().get("token");

  if (!token) {
    return NextResponse.json({ token: token });
  } else {
    return NextResponse.json({ token: null });
  }
}
