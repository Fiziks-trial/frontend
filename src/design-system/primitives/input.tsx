import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

type InputSize = "sm" | "md" | "lg";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: InputSize;
  icon?: ReactNode;
  iconRight?: ReactNode;
  error?: boolean;
}

const sizes: Record<InputSize, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-4 text-base",
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ size = "md", icon, iconRight, error, className = "", ...props }, ref) => {
    if (icon || iconRight) {
      return (
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={[
              "w-full rounded-xl border bg-background transition-colors",
              "placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              error ? "border-destructive" : "border-input",
              sizes[size],
              icon && "pl-10",
              iconRight && "pr-10",
              className,
            ].join(" ")}
            {...props}
          />
          {iconRight && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {iconRight}
            </div>
          )}
        </div>
      );
    }

    return (
      <input
        ref={ref}
        className={[
          "w-full rounded-xl border bg-background transition-colors",
          "placeholder:text-muted-foreground",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          error ? "border-destructive" : "border-input",
          sizes[size],
          className,
        ].join(" ")}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
