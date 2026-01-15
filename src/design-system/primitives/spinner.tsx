import { forwardRef, type HTMLAttributes } from "react";

type SpinnerSize = "sm" | "md" | "lg";

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: SpinnerSize;
  label?: string;
}

const sizes: Record<SpinnerSize, string> = {
  sm: "size-4 border-2",
  md: "size-8 border-2",
  lg: "size-12 border-3",
};

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ size = "md", label, className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={["flex flex-col items-center gap-4", className]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        <div
          className={[
            "border-black border-t-transparent rounded-full animate-spin",
            sizes[size],
          ].join(" ")}
        />
        {label && <p className="text-gray-500 font-medium">{label}</p>}
      </div>
    );
  },
);

Spinner.displayName = "Spinner";
