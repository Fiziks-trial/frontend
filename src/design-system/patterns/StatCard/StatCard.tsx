import { forwardRef, type ReactNode } from "react";
import { clsx } from "clsx";

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
        className={clsx("p-4 rounded-xl bg-[var(--color-bg-card)]", className)}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-[var(--color-text-muted)] mb-1">
              {label}
            </p>
            <p className="text-2xl font-bold text-[var(--color-text-primary)]">
              {value}
            </p>
            {change && (
              <p
                className={clsx(
                  "text-sm mt-1",
                  change.type === "increase" &&
                    "text-[var(--color-success-500)]",
                  change.type === "decrease" && "text-[var(--color-error-500)]",
                  change.type === "neutral" && "text-[var(--color-text-muted)]",
                )}
              >
                {change.type === "increase" && "↑ "}
                {change.type === "decrease" && "↓ "}
                {change.value}
              </p>
            )}
          </div>
          {icon && <div className="text-[var(--color-text-muted)]">{icon}</div>}
        </div>
      </div>
    );
  },
);

StatCard.displayName = "StatCard";
