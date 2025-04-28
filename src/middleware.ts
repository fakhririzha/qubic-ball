import { verifyJwt } from "@/lib/auth";
import { parse } from "cookie";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const cookies = parse(request.headers.get("cookie") || "");
  const token = cookies.token as string;

  const verifiedToken = token && verifyJwt(token);

  if (!verifiedToken) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/users/:id*"],
};
