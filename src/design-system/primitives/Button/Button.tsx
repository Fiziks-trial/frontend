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
  "inline-flex items-center justify-center font-mono uppercase tracking-wider transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[#00ff00] text-black hover:bg-[#00cc00] hover:shadow-[0_0_20px_rgba(0,255,0,0.5)]",
  secondary:
    "bg-transparent border border-[#00ff00] text-[#00ff00] hover:bg-[#00ff0010] hover:shadow-[0_0_20px_rgba(0,255,0,0.3)]",
  ghost:
    "bg-transparent text-white border border-white/20 hover:border-white/40 hover:bg-white/5",
  link: "bg-transparent text-[#00ff00] hover:text-[#00cc00] hover:underline",
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
