import type { HTMLAttributes } from "react";

type BadgeVariant =
  | "default"
  | "success"
  | "warning"
  | "destructive"
  | "info"
  | "math"
  | "physics"
  | "chemistry"
  | "biology";

type BadgeSize = "sm" | "md";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
}

const variants: Record<BadgeVariant, string> = {
  default: "bg-muted text-muted-foreground border-border",
  success: "bg-success/10 text-success border-success/20",
  warning: "bg-warning/10 text-warning border-warning/20",
  destructive: "bg-destructive/10 text-destructive border-destructive/20",
  info: "bg-info/10 text-info border-info/20",
  math: "bg-section-blue text-subject-math border-subject-math/30",
  physics: "bg-section-purple text-subject-physics border-subject-physics/30",
  chemistry:
    "bg-section-amber text-subject-chemistry border-subject-chemistry/30",
  biology: "bg-section-emerald text-subject-biology border-subject-biology/30",
};

const sizes: Record<BadgeSize, string> = {
  sm: "px-1.5 py-0.5 text-[10px]",
  md: "px-2 py-0.5 text-xs",
};

export function Badge({
  variant = "default",
  size = "md",
  className = "",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-md border font-bold uppercase tracking-wider",
        variants[variant],
        sizes[size],
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </span>
  );
}
