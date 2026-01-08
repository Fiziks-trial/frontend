import { clsx } from "clsx";
import { forwardRef, type HTMLAttributes } from "react";

export type SkeletonVariant =
  | "text"
  | "circular"
  | "rectangular"
  | "card"
  | "avatar";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  animated?: boolean;
  glow?: boolean;
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      variant = "text",
      width,
      height,
      animated = true,
      glow = false,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "bg-[#0a0a0a] border border-[#00ff0020]",
          animated && "animate-pulse",
          glow && "shadow-[0_0_10px_rgba(0,255,0,0.1)]",
          variant === "text" && "h-4 rounded-none",
          variant === "circular" && "rounded-full",
          variant === "rectangular" && "rounded-none",
          variant === "card" && "rounded-none min-h-32",
          variant === "avatar" && "rounded-full w-10 h-10",
          className,
        )}
        style={{
          width: width,
          height: height,
          ...style,
        }}
        {...props}
      />
    );
  },
);
Skeleton.displayName = "Skeleton";

/**
 * SkeletonText - Multiple lines of skeleton text
 */
export interface SkeletonTextProps extends HTMLAttributes<HTMLDivElement> {
  lines?: number;
  lastLineWidth?: string;
}

export const SkeletonText = forwardRef<HTMLDivElement, SkeletonTextProps>(
  ({ lines = 3, lastLineWidth = "60%", className, ...props }, ref) => {
    return (
      <div ref={ref} className={clsx("space-y-3", className)} {...props}>
        {Array.from({ length: lines }, (_, i) => ({
          id: `skeleton-line-${i}`,
          isLast: i === lines - 1,
        })).map((line) => (
          <Skeleton
            key={line.id}
            variant="text"
            width={line.isLast ? lastLineWidth : "100%"}
          />
        ))}
      </div>
    );
  },
);
SkeletonText.displayName = "SkeletonText";

/**
 * SkeletonCard - Card-shaped skeleton with optional header
 */
export interface SkeletonCardProps extends HTMLAttributes<HTMLDivElement> {
  showHeader?: boolean;
  showAvatar?: boolean;
}

export const SkeletonCard = forwardRef<HTMLDivElement, SkeletonCardProps>(
  ({ showHeader = true, showAvatar = false, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "bg-[#0a0a0a] border border-[#00ff0033] p-6 space-y-4",
          className,
        )}
        {...props}
      >
        {showHeader && (
          <div className="flex items-center gap-4">
            {showAvatar && <Skeleton variant="avatar" />}
            <div className="flex-1 space-y-2">
              <Skeleton variant="text" width="40%" />
              <Skeleton variant="text" width="20%" height={12} />
            </div>
          </div>
        )}
        <SkeletonText lines={3} />
      </div>
    );
  },
);
SkeletonCard.displayName = "SkeletonCard";
