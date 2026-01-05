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
        className={clsx("p-4 rounded-xl bg-(--color-bg-card)", className)}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-(--color-text-muted) mb-1">{label}</p>
            <p className="text-2xl font-bold text-(--color-text-primary)">
              {value}
            </p>
            {change && (
              <p
                className={clsx(
                  "text-sm mt-1",
                  change.type === "increase" && "text-(--color-success-500)",
                  change.type === "decrease" && "text-(--color-error-500)",
                  change.type === "neutral" && "text-(--color-text-muted)",
                )}
              >
                {change.type === "increase" && "↑ "}
                {change.type === "decrease" && "↓ "}
                {change.value}
              </p>
            )}
          </div>
          {icon && <div className="text-(--color-text-muted)">{icon}</div>}
        </div>
      </div>
    );
  },
);

StatCard.displayName = "StatCard";
