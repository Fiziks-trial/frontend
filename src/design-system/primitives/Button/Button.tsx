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
  "inline-flex items-center justify-center font-medium uppercase tracking-wider transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-[#22c55e] text-black hover:bg-[#16a34a] active:bg-[#15803d]",
  secondary:
    "bg-transparent border border-[rgba(255,255,255,0.2)] text-white hover:bg-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.3)]",
  ghost:
    "bg-transparent text-white border border-white/20 hover:border-white/40 hover:bg-white/5",
  link: "bg-transparent text-[#22c55e] hover:text-[#16a34a] hover:underline",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

/**
 * Button component following Hacker House design system
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
 * Used for actions like "INITIATE >"
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
        className={className}
        {...props}
      >
        {children} <span className="ml-2">&gt;</span>
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
        className={className}
        {...props}
      >
        {iconPosition === "left" && icon && (
          <span className="mr-2">{icon}</span>
        )}
        {children}
        {iconPosition === "right" && icon && (
          <span className="ml-2">{icon}</span>
        )}
      </Button>
    );
  },
);
IconButton.displayName = "IconButton";
