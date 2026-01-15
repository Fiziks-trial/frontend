import type { ReactNode } from "react";
import { SidebarTrigger } from "../../layouts/sidebar-layout";
import { Text } from "../../primitives/text";

export interface DashboardPageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export function DashboardPageHeader({
  title,
  subtitle,
  action,
}: DashboardPageHeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <SidebarTrigger className="-ml-2" />
        <div>
          <Text variant="h1" serif>
            {title}
          </Text>
          {subtitle && (
            <Text variant="body" color="muted" className="mt-1">
              {subtitle}
            </Text>
          )}
        </div>
      </div>
      {action}
    </header>
  );
}
