import { forwardRef, type HTMLAttributes } from "react";

type CardVariant = "default" | "elevated" | "outlined" | "ghost";
type CardColor =
  | "default"
  | "blue"
  | "purple"
  | "yellow"
  | "emerald"
  | "amber"
  | "pink"
  | "indigo";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  color?: CardColor;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const colorStyles: Record<CardColor, string> = {
  default: "bg-card border-border",
  blue: "bg-section-blue border-white/50",
  purple: "bg-section-purple border-accent-purple/20",
  yellow: "bg-section-yellow border-warning/20",
  emerald: "bg-section-emerald border-success/20",
  amber: "bg-section-amber border-warning/20",
  pink: "bg-section-pink border-pink-200/50",
  indigo: "bg-section-indigo border-accent-indigo/20",
};

const variantStyles: Record<CardVariant, string> = {
  default: "shadow-sm",
  elevated: "shadow-lg",
  outlined: "shadow-none",
  ghost: "border-transparent shadow-none bg-transparent",
};

const paddingStyles = {
  none: "",
  sm: "p-4 sm:p-5",
  md: "p-5 sm:p-6",
  lg: "p-6 sm:p-8",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = "default",
      color = "default",
      hover = false,
      padding = "md",
      className = "",
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={[
          "rounded-2xl sm:rounded-3xl border",
          colorStyles[color],
          variantStyles[variant],
          paddingStyles[padding],
          hover && "hover:shadow-md transition-shadow cursor-pointer",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";
