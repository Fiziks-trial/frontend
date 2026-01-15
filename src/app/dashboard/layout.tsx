"use client";

import type { ReactNode } from "react";
import { DashboardLayout } from "@/design-system";

export default function DashboardRootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
