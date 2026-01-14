import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

type IconButtonVariant = "default" | "ghost" | "outline";
type IconButtonSize = "sm" | "md" | "lg";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  icon: ReactNode;
  label: string;
}

const variants: Record<IconButtonVariant, string> = {
  default: "bg-muted text-muted-foreground hover:bg-muted/80",
  ghost: "text-muted-foreground hover:bg-muted hover:text-foreground",
  outline: "border border-border text-muted-foreground hover:bg-muted",
};

const sizes: Record<IconButtonSize, string> = {
  sm: "size-8",
  md: "size-10",
  lg: "size-12",
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ variant = "default", size = "md", icon, label, className = "", ...props }, ref) => {
    return (
      <button
        ref={ref}
        aria-label={label}
        className={[
          "inline-flex items-center justify-center rounded-lg transition-colors",
          "disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className,
        ].join(" ")}
        {...props}
      >
        {icon}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";
