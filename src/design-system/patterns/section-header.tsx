import type { ReactNode } from "react";

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export function SectionHeader({ title, subtitle, action }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6 sm:mb-8">
      <div>
        <h3 className="font-serif text-lg text-foreground">{title}</h3>
        {subtitle && (
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mt-1">
            {subtitle}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}
