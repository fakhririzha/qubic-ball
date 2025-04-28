"use client";

import { ColumnDef } from "@tanstack/react-table";

import type { Post } from "@/types/post.types";

export const columns: ColumnDef<Post>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  // Not actually needed since it's already filtered via API
  // {
  //   accessorKey: "userId",
  //   header: "User ID",
  // },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "body",
    header: "Body",
  },
];
