import { clsx } from "clsx";
import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

export type InputSize = "sm" | "md" | "lg";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: InputSize;
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

const sizeStyles: Record<InputSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-4 py-3 text-lg",
};

const iconPaddingLeft: Record<InputSize, string> = {
  sm: "pl-8",
  md: "pl-10",
  lg: "pl-12",
};

const iconPaddingRight: Record<InputSize, string> = {
  sm: "pr-8",
  md: "pr-10",
  lg: "pr-12",
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = "md",
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      className,
      id,
      ...props
    },
    ref,
  ) => {
    const inputId = id || props.name;

    return (
      <div className={clsx(fullWidth && "w-full")}>
        {label && (
          <label
            htmlFor={inputId}
            className="block mb-1.5 text-sm font-medium text-[var(--color-text-primary)]"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={clsx(
              // Base styles
              "w-full rounded-lg",
              "bg-[var(--color-bg-secondary)]",
              "border border-[var(--color-border-default)]",
              "text-[var(--color-text-primary)]",
              "placeholder:text-[var(--color-text-muted)]",
              "transition-all duration-200",
              // Focus styles
              "focus:outline-none focus:ring-2 focus:ring-[var(--color-border-focus)] focus:border-transparent",
              // Size
              sizeStyles[size],
              // Icon padding
              leftIcon && iconPaddingLeft[size],
              rightIcon && iconPaddingRight[size],
              // States
              disabled && "opacity-50 cursor-not-allowed",
              error &&
                "border-[var(--color-error-500)] focus:ring-[var(--color-error-500)]",
              className,
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">
              {rightIcon}
            </div>
          )}
        </div>
        {(error || hint) && (
          <p
            className={clsx(
              "mt-1.5 text-sm",
              error
                ? "text-[var(--color-error-500)]"
                : "text-[var(--color-text-muted)]",
            )}
          >
            {error || hint}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
