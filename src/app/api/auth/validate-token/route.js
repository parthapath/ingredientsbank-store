import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  const token = cookies().get("token");

  if (!token) {
    return NextResponse.json({ message: "Unauthorized 1" }, { status: 401 });
  }

  try {
    jwt.verify(token.value, process.env.JWT_SECRET);
    return NextResponse.json({ message: "Authorized" });
  } catch (err) {
    return NextResponse.json({ message: "Unauthorized 2" }, { status: 401 });
  }
}
