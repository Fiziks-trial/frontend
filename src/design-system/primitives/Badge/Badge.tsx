import { clsx } from "clsx";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

export type BadgeVariant =
  | "default"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "outline";
export type BadgeSize = "sm" | "md";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: clsx(
    "bg-[var(--glass-bg-light)] backdrop-blur-sm",
    "text-(--color-text-primary)",
    "border border-[var(--glass-border)]",
  ),
  success: clsx(
    "bg-[var(--color-success-500)]/15 text-[var(--color-success-400)]",
    "border border-[var(--color-success-500)]/20",
  ),
  warning: clsx(
    "bg-[var(--color-warning-500)]/15 text-[var(--color-warning-400)]",
    "border border-[var(--color-warning-500)]/20",
  ),
  error: clsx(
    "bg-[var(--color-error-500)]/15 text-[var(--color-error-400)]",
    "border border-[var(--color-error-500)]/20",
  ),
  info: clsx(
    "bg-[var(--color-primary-500)]/15 text-[var(--color-primary-400)]",
    "border border-[var(--color-primary-500)]/20",
  ),
  outline: clsx(
    "bg-transparent backdrop-blur-sm",
    "border border-[var(--glass-border-light)]",
    "text-(--color-text-secondary)",
  ),
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-2.5 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    { variant = "default", size = "sm", className, children, ...props },
    ref,
  ) => {
    return (
      <span
        ref={ref}
        className={clsx(
          "inline-flex items-center font-medium rounded-lg",
          "transition-all duration-200",
          variantStyles[variant],
          sizeStyles[size],
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
