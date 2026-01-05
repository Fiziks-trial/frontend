import { clsx } from "clsx";
import { forwardRef, type ReactNode } from "react";

export interface StatCardProps {
  label: string;
  value: string | number;
  change?: {
    value: string;
    type: "increase" | "decrease" | "neutral";
  };
  icon?: ReactNode;
  className?: string;
}

export const StatCard = forwardRef<HTMLDivElement, StatCardProps>(
  ({ label, value, change, icon, className }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "p-5 rounded-2xl",
          "bg-(--glass-bg-light) backdrop-blur-lg",
          "border border-(--glass-border)",
          "shadow-(--shadow-glass)",
          "transition-all duration-300",
          "hover:border-(--glass-border-hover)",
          "hover:shadow-(--shadow-glass-lg)",
          className,
        )}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-(--color-text-muted) mb-1">{label}</p>
            <p className="text-3xl font-bold text-(--color-text-primary)">
              {value}
            </p>
            {change && (
              <p
                className={clsx(
                  "text-sm mt-2 font-medium",
                  change.type === "increase" && "text-(--color-success-400)",
                  change.type === "decrease" && "text-(--color-error-400)",
                  change.type === "neutral" && "text-(--color-text-muted)",
                )}
              >
                {change.type === "increase" && "↑ "}
                {change.type === "decrease" && "↓ "}
                {change.value}
              </p>
            )}
          </div>
          {icon && (
            <div className="text-(--color-text-muted) p-2 rounded-xl bg-(--glass-bg-subtle)">
              {icon}
            </div>
          )}
        </div>
      </div>
    );
  },
);

StatCard.displayName = "StatCard";
