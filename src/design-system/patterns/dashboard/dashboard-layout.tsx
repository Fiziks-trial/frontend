"use client";

import type { ReactNode } from "react";
import { SidebarLayout } from "../../layouts/sidebar-layout";
import { DashboardSidebar } from "./dashboard-sidebar";

export interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarLayout sidebar={<DashboardSidebar />}>{children}</SidebarLayout>
  );
}
