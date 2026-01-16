"use client";

import type { ReactNode } from "react";
import { DashboardLayout } from "@/design-system";
import { AuthGuard } from "@/lib/auth-guard";

export default function DashboardRootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <AuthGuard>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthGuard>
  );
}
