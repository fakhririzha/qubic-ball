import { signJwt } from "@/lib/auth";
import { serialize } from "cookie";
import { type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (username === "testuser" && password === "testpass") {
      const token = signJwt({ username });

      const response = Response.json({ message: "Logged in!" });

      response.headers.set(
        "Set-Cookie",
        serialize("token", token, {
          // httpOnly: true,
          path: "/",
          maxAge: 60 * 60,
          // sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
        }),
      );

      return response;
    }

    return Response.json({ message: "Invalid credentials" }, { status: 400 });
  } catch (e) {
    return Response.json(
      { message: typeof e === "string" ? e : JSON.stringify(e) },
      { status: 500 },
    );
  }
}
