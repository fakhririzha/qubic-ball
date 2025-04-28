import type { Metadata } from "next";
import localFont from "next/font/local";

import { ThemeProvider } from "@/components/ThemeProvider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";

import { AppSidebar } from "@/components/Sidebar";
import ReactQueryProvider from "@/lib/ReactQuery";

import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "QubicBall",
  description: "QubicBall technical tests.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset>
                <main>{children}</main>
                <Toaster />
              </SidebarInset>
            </SidebarProvider>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}