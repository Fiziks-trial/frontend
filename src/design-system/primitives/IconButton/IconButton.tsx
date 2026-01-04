import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { clsx } from "clsx";

export type IconButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type IconButtonSize = "sm" | "md" | "lg";

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  icon: ReactNode;
  "aria-label": string;
}

const variantStyles: Record<IconButtonVariant, string> = {
  primary:
    "bg-[var(--color-primary-600)] text-white hover:bg-[var(--color-primary-700)]",
  secondary:
    "bg-[var(--color-secondary-600)] text-white hover:bg-[var(--color-secondary-700)]",
  ghost:
    "bg-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-neutral-800)]",
  danger:
    "bg-[var(--color-error-500)] text-white hover:bg-[var(--color-error-600)]",
};

const sizeStyles: Record<IconButtonSize, string> = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    { variant = "ghost", size = "md", icon, disabled, className, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={clsx(
          "inline-flex items-center justify-center rounded-lg transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--color-bg-primary)]",
          variantStyles[variant],
          sizeStyles[size],
          disabled && "opacity-50 cursor-not-allowed",
          className,
        )}
        {...props}
      >
        {icon}
      </button>
    );
  },
);

IconButton.displayName = "IconButton";
