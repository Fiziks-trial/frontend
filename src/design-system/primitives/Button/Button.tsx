import { clsx } from "clsx";
import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "link";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

const baseStyles =
  "inline-flex items-center justify-center font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30",
  secondary:
    "bg-white/[0.05] border border-white/[0.08] text-zinc-300 hover:bg-white/[0.08] hover:text-white hover:border-white/[0.12]",
  ghost: "bg-transparent text-zinc-400 hover:text-white hover:bg-white/[0.05]",
  link: "bg-transparent text-indigo-400 hover:text-indigo-300 hover:underline underline-offset-4",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs rounded-lg",
  md: "px-5 py-2.5 text-sm rounded-xl",
  lg: "px-6 py-3 text-base rounded-xl",
};

/**
 * Button component following Craft-inspired design system
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", className, children, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={clsx(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";

/**
 * Arrow Button - CTA style button with arrow suffix
 */
export const ArrowButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", className, children, ...props },
    ref,
  ) => {
    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={clsx("gap-2", className)}
        {...props}
      >
        {children}
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </Button>
    );
  },
);
ArrowButton.displayName = "ArrowButton";

/**
 * Icon Button - Button with icon support
 */
export interface IconButtonProps extends ButtonProps {
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      className,
      icon,
      iconPosition = "left",
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={clsx("gap-2", className)}
        {...props}
      >
        {iconPosition === "left" && icon}
        {children}
        {iconPosition === "right" && icon}
      </Button>
    );
  },
);
IconButton.displayName = "IconButton";
