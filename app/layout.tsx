import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { Providers } from "@/lib/providers/providers";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MCN Blog",
  description: "MCN Blog Dashboard",
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
        <NextTopLoader
          color="linear-gradient(90deg, #7F27FF 0%, #A668FF 100%)"
          height={5}
          speed={200}
          shadow="0 0 10px #7F27FF,0 0 5px #7F27FF"
        />
        <Providers>
          {children}
          <Toaster position="top-right" richColors duration={1200} />
        </Providers>
      </body>
    </html>
  );
} 