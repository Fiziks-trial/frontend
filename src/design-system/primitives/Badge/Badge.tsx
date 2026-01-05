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
  default: "bg-[var(--color-neutral-700)] text-[var(--color-text-primary)]",
  success: "bg-[var(--color-success-500)]/20 text-[var(--color-success-500)]",
  warning: "bg-[var(--color-warning-500)]/20 text-[var(--color-warning-500)]",
  error: "bg-[var(--color-error-500)]/20 text-[var(--color-error-500)]",
  info: "bg-[var(--color-info-500)]/20 text-[var(--color-info-500)]",
  outline:
    "bg-transparent border border-[var(--color-border-default)] text-[var(--color-text-secondary)]",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-sm",
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
          "inline-flex items-center font-medium rounded-full",
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
