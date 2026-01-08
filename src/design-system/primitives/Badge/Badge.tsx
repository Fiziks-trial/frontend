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
  default: "bg-[#0a0a0a] border-[#00ff0066] text-[#00ff00]",
  success: "bg-[#00ff0020] border-[#00ff00] text-[#00ff00]",
  warning: "bg-[#ffaa0020] border-[#ffaa00] text-[#ffaa00]",
  error: "bg-[#ff000020] border-[#ff0000] text-[#ff0000]",
  purple: "bg-[#9945ff20] border-[#9945ff] text-[#9945ff]",
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
          "inline-flex items-center px-3 py-1 text-xs font-mono uppercase tracking-wider border",
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
  active: "bg-[#00ff00]",
  inactive: "bg-[#666666]",
  pending: "bg-[#ffaa00]",
};

export const StatusBadge = forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ status = "active", className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={clsx(
          "inline-flex items-center gap-2 px-3 py-1 text-xs font-mono uppercase tracking-wider border border-[#00ff0066] bg-[#0a0a0a] text-white",
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
        "inline-flex items-center px-2 py-1 text-xs font-mono border border-[#00ff0033] text-[#00ff00]",
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
          "inline-flex items-center justify-center min-w-5 h-5 px-1.5 text-xs font-mono bg-[#00ff00] text-black rounded-full",
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
