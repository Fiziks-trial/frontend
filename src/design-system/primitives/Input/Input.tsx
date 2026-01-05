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
  sm: "px-3.5 py-2 text-sm",
  md: "px-4 py-2.5 text-base",
  lg: "px-5 py-3.5 text-lg",
};

const iconPaddingLeft: Record<InputSize, string> = {
  sm: "pl-9",
  md: "pl-11",
  lg: "pl-13",
};

const iconPaddingRight: Record<InputSize, string> = {
  sm: "pr-9",
  md: "pr-11",
  lg: "pr-13",
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
            className="block mb-2 text-sm font-medium text-(--color-text-primary)"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-(--color-text-muted)">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={clsx(
              // Base styles
              "w-full rounded-xl",
              "bg-[var(--glass-bg)] backdrop-blur-md",
              "border border-[var(--glass-border)]",
              "text-(--color-text-primary)",
              "placeholder:text-(--color-text-muted)",
              "transition-all duration-200",
              // Focus styles (subtle, not neon)
              "focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]/30",
              "focus:border-[var(--color-primary-400)]",
              "focus:bg-[var(--glass-bg-light)]",
              // Size
              sizeStyles[size],
              // Icon padding
              leftIcon && iconPaddingLeft[size],
              rightIcon && iconPaddingRight[size],
              // States
              disabled && "opacity-50 cursor-not-allowed",
              error &&
                "border-[var(--color-error-500)]/50 focus:ring-[var(--color-error-500)]/30 focus:border-[var(--color-error-400)]",
              className,
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-(--color-text-muted)">
              {rightIcon}
            </div>
          )}
        </div>
        {(error || hint) && (
          <p
            className={clsx(
              "mt-2 text-sm",
              error ? "text-(--color-error-400)" : "text-(--color-text-muted)",
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
