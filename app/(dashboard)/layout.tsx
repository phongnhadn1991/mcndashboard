import type { Metadata } from "next";
import { SidebarProvider } from "@/components/ui/sidebar"
import DashBoardSidebar from "@/components/common/DashBoardSidebar";
import DashNavBar from "@/components/common/DashNavbar"
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Dashboard - MCN Blog",
  description: "MCN Blog Dashboard",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      storageKey="theme"
      disableTransitionOnChange
    >
      <SidebarProvider>
        <aside>
          <DashBoardSidebar />
        </aside>
        <main className="w-full">
          <DashNavBar />
          <div className="px-4">
            {children}
          </div>
        </main>
      </SidebarProvider>
    </ThemeProvider>
  );
}
