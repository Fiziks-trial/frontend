import { forwardRef, type ReactNode } from "react";
import { clsx } from "clsx";

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ icon, title, description, action, className }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "flex flex-col items-center justify-center text-center py-12 px-6",
          className
        )}
      >
        {icon && (
          <div className="mb-4 text-[var(--color-text-muted)]">{icon}</div>
        )}
        <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-[var(--color-text-secondary)] max-w-sm mb-6">
            {description}
          </p>
        )}
        {action && <div>{action}</div>}
      </div>
    );
  }
);

EmptyState.displayName = "EmptyState";
