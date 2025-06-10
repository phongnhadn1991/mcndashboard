import type { Metadata } from "next"
import "@/app/globals.css";
import { ThemeProvider } from "@/components/ThemeProvider"

export const metadata: Metadata = {
  title: "MCN Blog - Authentication",
  description: "MCN Blog - Authentication",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <main>{children}</main>
    </ThemeProvider>
  )
} 