"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown, Eye } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import type { User } from "@/types/user.types";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          {!column.getIsSorted() ? (
            <ArrowUpDown className="h-4 w-4" />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowUp className="h-4 w-4" />
          ) : (
            <ArrowDown className="h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("id")}</div>;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          {!column.getIsSorted() ? (
            <ArrowUpDown className="h-4 w-4" />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowUp className="h-4 w-4" />
          ) : (
            <ArrowDown className="h-4 w-4" />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Username
          {!column.getIsSorted() ? (
            <ArrowUpDown className="h-4 w-4" />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowUp className="h-4 w-4" />
          ) : (
            <ArrowDown className="h-4 w-4" />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          {!column.getIsSorted() ? (
            <ArrowUpDown className="h-4 w-4" />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowUp className="h-4 w-4" />
          ) : (
            <ArrowDown className="h-4 w-4" />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Phone
          {!column.getIsSorted() ? (
            <ArrowUpDown className="h-4 w-4" />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowUp className="h-4 w-4" />
          ) : (
            <ArrowDown className="h-4 w-4" />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: "website",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Website
          {!column.getIsSorted() ? (
            <ArrowUpDown className="h-4 w-4" />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowUp className="h-4 w-4" />
          ) : (
            <ArrowDown className="h-4 w-4" />
          )}
        </Button>
      );
    },
  },
  {
    accessorKey: "detail",
    header: "Detail",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    cell: ({ row }) => {
      // console.log(row.getValue('transactionId'));
      // return row.getValue('transactionId');
      // return <pre className="border-slate-400 border bg-slate-200 p-2 rounded-md m-2 font-mono max-w-full">{JSON.stringify(JSON.parse(row.getValue('data')), null, 2)}</pre>
      return (
        <Button variant="outline" size="icon" asChild>
          <Link href={`/users/${row.getValue("id")}`}>
            <Eye />
          </Link>
        </Button>
      );
    },
  },
];
