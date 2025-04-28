export const fetchCache = "default-no-store";

import { type NextRequest } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const users = await fetch(
      `https://jsonplaceholder.typicode.com/users/${params.id}/posts`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const res = await users.json();

    if (!res) {
      return Response.json({ message: "Post not found!" }, { status: 404 });
    }
    return Response.json(res, { status: 200 });
  } catch (e) {
    return Response.json(
      { message: "Internal Server Error", stacktrace: e },
      { status: 500 },
    );
  }
}
