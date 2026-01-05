import { clsx } from "clsx";
import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from "react";

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
  primary: clsx(
    "bg-[var(--color-primary-500)] text-white",
    "hover:bg-[var(--color-primary-400)]",
    "shadow-md hover:shadow-lg",
  ),
  secondary: clsx(
    "bg-[var(--glass-bg-light)] backdrop-blur-md text-(--color-text-primary)",
    "border border-[var(--glass-border)]",
    "hover:bg-[var(--glass-bg-lighter)] hover:border-[var(--glass-border-hover)]",
  ),
  ghost: clsx(
    "bg-transparent text-(--color-text-secondary)",
    "hover:bg-[var(--glass-bg-subtle)] hover:text-(--color-text-primary)",
  ),
  danger: clsx(
    "bg-[var(--color-error-500)] text-white",
    "hover:bg-[var(--color-error-400)]",
    "shadow-md hover:shadow-lg",
  ),
};

const sizeStyles: Record<IconButtonSize, string> = {
  sm: "w-9 h-9",
  md: "w-11 h-11",
  lg: "w-13 h-13",
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
          "inline-flex items-center justify-center rounded-xl",
          "transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-(--color-bg-primary)",
          "focus:ring-(--color-primary-400)/50",
          "active:scale-95",
          variantStyles[variant],
          sizeStyles[size],
          disabled && "opacity-50 cursor-not-allowed pointer-events-none",
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
