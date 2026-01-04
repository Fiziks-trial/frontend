import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { clsx } from "clsx";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: clsx(
    "bg-[var(--color-primary-600)] text-white",
    "hover:bg-[var(--color-primary-700)]",
    "focus:ring-[var(--color-primary-500)]",
    "active:bg-[var(--color-primary-800)]",
  ),
  secondary: clsx(
    "bg-[var(--color-secondary-600)] text-white",
    "hover:bg-[var(--color-secondary-700)]",
    "focus:ring-[var(--color-secondary-500)]",
    "active:bg-[var(--color-secondary-800)]",
  ),
  outline: clsx(
    "border-2 border-[var(--color-primary-500)] text-[var(--color-primary-400)]",
    "bg-transparent",
    "hover:bg-[var(--color-primary-500)]/10",
    "focus:ring-[var(--color-primary-500)]",
    "active:bg-[var(--color-primary-500)]/20",
  ),
  ghost: clsx(
    "bg-transparent text-[var(--color-text-secondary)]",
    "hover:bg-[var(--color-neutral-800)] hover:text-[var(--color-text-primary)]",
    "focus:ring-[var(--color-neutral-600)]",
    "active:bg-[var(--color-neutral-700)]",
  ),
  danger: clsx(
    "bg-[var(--color-error-500)] text-white",
    "hover:bg-[var(--color-error-600)]",
    "focus:ring-[var(--color-error-500)]",
    "active:bg-[var(--color-error-600)]",
  ),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm gap-1.5",
  md: "px-4 py-2 text-base gap-2",
  lg: "px-6 py-3 text-lg gap-2.5",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={clsx(
          // Base styles
          "inline-flex items-center justify-center",
          "font-medium rounded-lg",
          "transition-all duration-200 ease-in-out",
          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--color-bg-primary)]",
          // Variant and size
          variantStyles[variant],
          sizeStyles[size],
          // States
          isDisabled && "opacity-50 cursor-not-allowed",
          fullWidth && "w-full",
          className,
        )}
        {...props}
      >
        {isLoading ? (
          <>
            <Spinner size={size} />
            <span>Loading...</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

// Simple spinner component for loading state
function Spinner({ size }: { size: ButtonSize }) {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <svg
      className={clsx("animate-spin", sizeClasses[size])}
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}
