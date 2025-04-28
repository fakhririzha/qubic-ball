/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useQuery } from "@tanstack/react-query";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useParams } from "next/navigation";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { columns } from "./columns";

import type { Post } from "@/types/post.types";

export default function PostList() {
  const params = useParams<{ id: string }>();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users", "posts", params.id],
    queryFn: async (): Promise<Post[]> => {
      const response = await fetch(`/api/posts/${params.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.json();
    },
  });

  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2">
      <h1 className="pb-4">Posts</h1>
      {isError && (
        <h1 className="pb-4 text-red-400">
          An error occured: {JSON.stringify(error)}
        </h1>
      )}
      {isLoading ? (
        <div className="flex flex-col gap-y-4">
          <Skeleton className="h-[20px] w-full rounded-full" />
          <Skeleton className="h-[20px] w-full rounded-full" />
          <Skeleton className="h-[20px] w-full rounded-full" />
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
