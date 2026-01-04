import { forwardRef, type HTMLAttributes } from "react";
import { clsx } from "clsx";

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  orientation?: "horizontal" | "vertical";
}

export const Divider = forwardRef<HTMLHRElement, DividerProps>(
  ({ orientation = "horizontal", className, ...props }, ref) => {
    return (
      <hr
        ref={ref}
        className={clsx(
          "border-(--color-border-muted)",
          orientation === "horizontal" ? "w-full border-t" : "h-full border-l",
          className,
        )}
        {...props}
      />
    );
  },
);

Divider.displayName = "Divider";
