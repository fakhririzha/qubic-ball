// export const fetchCache = "default-no-store";

import { User } from "@/types/user.types";
import { type NextRequest } from "next/server";

export async function PUT(request: Request) {
  try {
    const req = (await request.json()) as User;

    const users = await fetch(
      `https://jsonplaceholder.typicode.com/users/${req.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(req),
      },
    );

    const res = await users.json();

    if (!res) {
      return Response.json(
        { message: "Gagal memperbarui users!" },
        { status: 400 },
      );
    }
    return Response.json(
      {
        message: "Sukses memperbarui users!",
      },
      { status: 200 },
    );
  } catch (e) {
    return Response.json(
      { message: "Internal Server Error", stacktrace: e },
      { status: 500 },
    );
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const users = await fetch(
      `https://jsonplaceholder.typicode.com/users/${params.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const res = await users.json();

    if (!res) {
      return Response.json({ message: "User not found!" }, { status: 404 });
    }
    return Response.json(res, { status: 200 });
  } catch (e) {
    return Response.json(
      { message: "Internal Server Error", stacktrace: e },
      { status: 500 },
    );
  }
}
