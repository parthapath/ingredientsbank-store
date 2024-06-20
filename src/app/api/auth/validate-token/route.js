import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  const token = cookies().get("token");

  if (!token) {
    console.log("a");
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    jwt.verify(token.value, process.env.JWT_SECRET);
    console.log("b");
    return NextResponse.json({ message: "Authorized" });
  } catch (err) {
    console.log("c");
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
