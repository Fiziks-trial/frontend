import { clsx } from "clsx";
import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from "react";

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
    "bg-[var(--color-primary-500)] text-white",
    "hover:bg-[var(--color-primary-400)]",
    "shadow-md hover:shadow-lg hover:shadow-[var(--color-primary-500)]/20",
    "focus:ring-[var(--color-primary-400)]",
    "active:bg-[var(--color-primary-600)] active:scale-[0.98]",
  ),
  secondary: clsx(
    "bg-[var(--glass-bg-light)] backdrop-blur-md text-[var(--color-text-primary)]",
    "border border-[var(--glass-border)]",
    "hover:bg-[var(--glass-bg-lighter)] hover:border-[var(--glass-border-hover)]",
    "shadow-md hover:shadow-lg",
    "focus:ring-[var(--color-secondary-500)]",
    "active:scale-[0.98]",
  ),
  outline: clsx(
    "border-2 border-[var(--color-primary-400)] text-[var(--color-primary-400)]",
    "bg-transparent backdrop-blur-sm",
    "hover:bg-[var(--color-primary-500)]/10 hover:border-[var(--color-primary-300)]",
    "focus:ring-[var(--color-primary-400)]",
    "active:bg-[var(--color-primary-500)]/15 active:scale-[0.98]",
  ),
  ghost: clsx(
    "bg-transparent text-[var(--color-text-secondary)]",
    "hover:bg-[var(--glass-bg-subtle)] hover:text-[var(--color-text-primary)]",
    "hover:backdrop-blur-sm",
    "focus:ring-[var(--color-neutral-500)]",
    "active:bg-[var(--glass-bg-light)] active:scale-[0.98]",
  ),
  danger: clsx(
    "bg-[var(--color-error-500)] text-white",
    "hover:bg-[var(--color-error-400)]",
    "shadow-md hover:shadow-lg hover:shadow-[var(--color-error-500)]/20",
    "focus:ring-[var(--color-error-400)]",
    "active:bg-[var(--color-error-600)] active:scale-[0.98]",
  ),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-5 py-2.5 text-base gap-2",
  lg: "px-7 py-3.5 text-lg gap-2.5",
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
          "font-semibold rounded-xl",
          "transition-all duration-200 ease-out",
          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-(--color-bg-primary)",
          // Variant and size
          variantStyles[variant],
          sizeStyles[size],
          // States
          isDisabled && "opacity-50 cursor-not-allowed pointer-events-none",
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
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
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
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <svg
      className={clsx("animate-spin", sizeClasses[size])}
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
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
