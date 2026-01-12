import { clsx } from "clsx";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

export type BadgeVariant =
  | "default"
  | "success"
  | "warning"
  | "error"
  | "purple"
  | "info";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-zinc-500/10 text-zinc-400",
  success: "bg-emerald-500/10 text-emerald-400",
  warning: "bg-amber-500/10 text-amber-400",
  error: "bg-red-500/10 text-red-400",
  purple: "bg-purple-500/10 text-purple-400",
  info: "bg-indigo-500/10 text-indigo-400",
};

/**
 * Badge component following Craft-inspired design system
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = "default", className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={clsx(
          "inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full",
          variantStyles[variant],
          className,
        )}
        {...props}
      >
        {children}
      </span>
    );
  },
);
Badge.displayName = "Badge";

/**
 * StatusBadge - Badge with pulsing dot indicator
 */
export interface StatusBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  status?: "active" | "inactive" | "pending";
  children: ReactNode;
}

const statusColors = {
  active: "bg-emerald-500",
  inactive: "bg-zinc-500",
  pending: "bg-amber-500",
};

export const StatusBadge = forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ status = "active", className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={clsx(
          "inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-full bg-white/[0.05] text-white",
          className,
        )}
        {...props}
      >
        <span
          className={clsx(
            "w-2 h-2 rounded-full",
            status === "active" && "animate-pulse",
            statusColors[status],
          )}
        />
        {children}
      </span>
    );
  },
);
StatusBadge.displayName = "StatusBadge";

/**
 * SystemBadge - Subtle system indicator badge
 */
export const SystemBadge = forwardRef<
  HTMLSpanElement,
  HTMLAttributes<HTMLSpanElement> & { children: ReactNode }
>(({ className, children, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={clsx(
        "inline-flex items-center px-2 py-1 text-xs font-medium text-zinc-500 bg-white/[0.03] rounded-md",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
});
SystemBadge.displayName = "SystemBadge";

/**
 * CounterBadge - Circular badge for displaying counts
 */
export interface CounterBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  count: number;
}

export const CounterBadge = forwardRef<HTMLSpanElement, CounterBadgeProps>(
  ({ count, className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={clsx(
          "inline-flex items-center justify-center min-w-5 h-5 px-1.5 text-xs font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full",
          className,
        )}
        {...props}
      >
        {count > 99 ? "99+" : count}
      </span>
    );
  },
);
CounterBadge.displayName = "CounterBadge";
