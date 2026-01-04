import { forwardRef, type HTMLAttributes } from "react";
import { clsx } from "clsx";

export type SpinnerSize = "sm" | "md" | "lg";

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: SpinnerSize;
}

const sizeStyles: Record<SpinnerSize, string> = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
};

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ size = "md", className, ...props }, ref) => {
    return (
      <div ref={ref} className={clsx("inline-flex", className)} {...props}>
        <svg
          className={clsx("animate-spin text-current", sizeStyles[size])}
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      </div>
    );
  },
);

Spinner.displayName = "Spinner";
