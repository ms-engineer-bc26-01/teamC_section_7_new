import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ message: "未ログイン" }, { status: 401 });
  }

  return NextResponse.json({ message: "OK" }, { status: 200 });
}
