import { forwardRef, type HTMLAttributes } from "react";
import { clsx } from "clsx";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular";
  width?: string | number;
  height?: string | number;
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ variant = "text", width, height, className, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "animate-pulse bg-[var(--color-neutral-700)]",
          variant === "text" && "h-4 rounded",
          variant === "circular" && "rounded-full",
          variant === "rectangular" && "rounded-lg",
          className
        )}
        style={{
          width: width,
          height: height,
          ...style,
        }}
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";
