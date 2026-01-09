import { clsx } from "clsx";
import { forwardRef, type HTMLAttributes } from "react";

export type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";
export type SpinnerVariant = "default" | "dots" | "pulse" | "terminal";

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  label?: string;
}

const sizeStyles: Record<SpinnerSize, string> = {
  xs: "w-3 h-3",
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
  xl: "w-12 h-12",
};

const dotSizeStyles: Record<SpinnerSize, string> = {
  xs: "w-1 h-1",
  sm: "w-1.5 h-1.5",
  md: "w-2 h-2",
  lg: "w-2.5 h-2.5",
  xl: "w-3 h-3",
};

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ size = "md", variant = "default", label, className, ...props }, ref) => {
    if (variant === "dots") {
      return (
        <div
          ref={ref}
          className={clsx("inline-flex items-center gap-1", className)}
          {...props}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={clsx(
                "bg-[#22c55e] rounded-full animate-bounce",
                dotSizeStyles[size],
              )}
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
          {label && (
            <span className="ml-2 text-sm font-mono text-[#22c55e]">
              {label}
            </span>
          )}
        </div>
      );
    }

    if (variant === "pulse") {
      return (
        <div
          ref={ref}
          className={clsx("inline-flex items-center gap-2", className)}
          {...props}
        >
          <span
            className={clsx(
              "bg-[#22c55e] rounded-full animate-pulse",
              sizeStyles[size],
            )}
          />
          {label && (
            <span className="text-sm font-mono text-[#22c55e]">{label}</span>
          )}
        </div>
      );
    }

    if (variant === "terminal") {
      return (
        <div
          ref={ref}
          className={clsx(
            "inline-flex items-center gap-2 font-mono text-[#22c55e]",
            className,
          )}
          {...props}
        >
          <span className="animate-pulse">_</span>
          {label && <span className="text-sm">{label}</span>}
        </div>
      );
    }

    // Default spinner
    return (
      <div
        ref={ref}
        className={clsx("inline-flex items-center gap-2", className)}
        {...props}
      >
        <svg
          className={clsx("animate-spin text-[#22c55e]", sizeStyles[size])}
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-20"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            className="opacity-100"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
        {label && (
          <span className="text-sm font-mono text-[#22c55e]">{label}</span>
        )}
      </div>
    );
  },
);
Spinner.displayName = "Spinner";

/**
 * LoadingOverlay - Full-screen or container loading state
 */
export interface LoadingOverlayProps extends HTMLAttributes<HTMLDivElement> {
  text?: string;
  fullScreen?: boolean;
}

export const LoadingOverlay = forwardRef<HTMLDivElement, LoadingOverlayProps>(
  ({ text = "LOADING...", fullScreen = false, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "flex flex-col items-center justify-center gap-4",
          "bg-black/90 backdrop-blur-sm",
          fullScreen ? "fixed inset-0 z-50" : "absolute inset-0",
          className,
        )}
        {...props}
      >
        <Spinner size="lg" />
        <span className="text-sm font-mono text-[#22c55e] tracking-wider animate-pulse">
          {text}
        </span>
      </div>
    );
  },
);
LoadingOverlay.displayName = "LoadingOverlay";
