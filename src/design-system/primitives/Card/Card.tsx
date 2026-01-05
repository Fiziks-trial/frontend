import { clsx } from "clsx";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

export type CardVariant = "default" | "elevated" | "outlined";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: "none" | "sm" | "md" | "lg";
  children: ReactNode;
}

const variantStyles: Record<CardVariant, string> = {
  default: clsx(
    "bg-[var(--glass-bg-light)] backdrop-blur-lg",
    "border border-[var(--glass-border)]",
    "shadow-[var(--shadow-glass)]",
    "transition-all duration-300",
    "hover:border-[var(--glass-border-hover)]",
    "hover:shadow-[var(--shadow-glass-lg)]",
  ),
  elevated: clsx(
    "bg-[var(--glass-bg)] backdrop-blur-xl",
    "border border-[var(--glass-border-light)]",
    "shadow-xl",
    "transition-all duration-300",
    "hover:shadow-2xl",
    "hover:border-[var(--glass-border-hover)]",
  ),
  outlined: clsx(
    "bg-transparent backdrop-blur-sm",
    "border border-[var(--glass-border-light)]",
    "transition-all duration-300",
    "hover:bg-[var(--glass-bg-subtle)]",
    "hover:border-[var(--glass-border-hover)]",
  ),
};

const paddingStyles = {
  none: "",
  sm: "p-4",
  md: "p-5",
  lg: "p-6",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    { variant = "default", padding = "md", className, children, ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "rounded-2xl",
          variantStyles[variant],
          paddingStyles[padding],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";

// Card sub-components
export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={clsx("mb-4", className)} {...props}>
        {children}
      </div>
    );
  },
);

CardHeader.displayName = "CardHeader";

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={clsx(
          "text-lg font-semibold text-(--color-text-primary)",
          className,
        )}
        {...props}
      >
        {children}
      </h3>
    );
  },
);

CardTitle.displayName = "CardTitle";

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx("text-(--color-text-secondary)", className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

CardContent.displayName = "CardContent";

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "mt-4 pt-4 border-t border-(--glass-border)",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

CardFooter.displayName = "CardFooter";
