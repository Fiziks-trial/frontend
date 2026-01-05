import { clsx } from "clsx";
import { forwardRef, type ReactNode } from "react";

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
          "flex flex-col items-center justify-center text-center py-16 px-8",
          className,
        )}
      >
        {icon && (
          <div className="mb-5 text-(--color-text-muted) p-4 rounded-2xl bg-(--glass-bg-subtle)">
            {icon}
          </div>
        )}
        <h3 className="text-xl font-semibold text-(--color-text-primary) mb-2">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-(--color-text-secondary) max-w-sm mb-8">
            {description}
          </p>
        )}
        {action && <div>{action}</div>}
      </div>
    );
  },
);

EmptyState.displayName = "EmptyState";
