"use client";

import { LogOut, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

import { deleteCookie } from "@/lib/auth";
import { useRouter } from "next/navigation";

export interface HeaderProps {
  title: string;
}

export default function Header(props: HeaderProps) {
  const router = useRouter();
  const { setTheme, theme } = useTheme();

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div className="w-fit">
          <span className="w-fit">{props.title}</span>
        </div>
        <div className="flex w-full justify-end gap-x-4">
          {theme == "light" ? (
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme("dark")}
            >
              <Sun />
            </Button>
          ) : (
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme("light")}
            >
              <Moon />
            </Button>
          )}
          <Button
            variant="outline"
            className="w-fit"
            onClick={() => {
              deleteCookie();
              router.push("/auth");
            }}
          >
            <LogOut /> Log Out
          </Button>
        </div>
      </header>
    </>
  );
}
