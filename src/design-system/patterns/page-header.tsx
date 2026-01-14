import type { ReactNode } from "react";

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  status?: ReactNode;
  action?: ReactNode;
}

export function PageHeader({ title, subtitle, status, action }: PageHeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8 sm:mb-10">
      <div>
        {(subtitle || status) && (
          <p className="text-muted-foreground font-medium mb-1 flex items-center gap-2 text-sm">
            {status}
            {subtitle}
          </p>
        )}
        <h1 className="headline-serif text-2xl sm:text-3xl lg:text-4xl">{title}</h1>
      </div>
      {action}
    </header>
  );
}
