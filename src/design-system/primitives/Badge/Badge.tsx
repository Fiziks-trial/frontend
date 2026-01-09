import { clsx } from "clsx";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

export type BadgeVariant =
  | "default"
  | "success"
  | "warning"
  | "error"
  | "purple";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-[#0a0a0a] border-[rgba(255,255,255,0.15)] text-[#cccccc]",
  success: "bg-[#22c55e15] border-[#22c55e66] text-[#22c55e]",
  warning: "bg-[#d4a57415] border-[#d4a57466] text-[#d4a574]",
  error: "bg-[#ef444415] border-[#ef444466] text-[#ef4444]",
  purple: "bg-[#a855f715] border-[#a855f766] text-[#a855f7]",
};

/**
 * Badge component following Hacker House design system
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = "default", className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={clsx(
          "inline-flex items-center px-3 py-1 text-xs font-medium uppercase tracking-wider border",
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
  active: "bg-[#22c55e]",
  inactive: "bg-[#666666]",
  pending: "bg-[#f59e0b]",
};

export const StatusBadge = forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ status = "active", className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={clsx(
          "inline-flex items-center gap-2 px-3 py-1 text-xs font-mono uppercase tracking-wider border border-[rgba(255,255,255,0.15)] bg-[#0a0a0a] text-white",
          className,
        )}
        {...props}
      >
        <span
          className={clsx(
            "w-2 h-2 rounded-full animate-pulse",
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
 * SystemBadge - Terminal-style system badge
 * Prefixed with "///"
 */
export const SystemBadge = forwardRef<
  HTMLSpanElement,
  HTMLAttributes<HTMLSpanElement> & { children: ReactNode }
>(({ className, children, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={clsx(
        "inline-flex items-center px-2 py-1 text-xs font-mono border border-[rgba(255,255,255,0.1)] text-[#999999]",
        className,
      )}
      {...props}
    >
      {"/// "}
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
          "inline-flex items-center justify-center min-w-5 h-5 px-1.5 text-xs font-mono bg-[#22c55e] text-black rounded-full",
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
