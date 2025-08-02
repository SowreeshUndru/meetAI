"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/compo/Dashboardsidebar";
import { DashboardNavbar } from "@/compo/DashboardNavbar";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen bg-muted">
        <DashboardSidebar />
        <main className="flex flex-col flex-1 overflow-hidden">
          <DashboardNavbar />
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
