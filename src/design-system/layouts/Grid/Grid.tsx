import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { clsx } from "clsx";

export type GridCols = 1 | 2 | 3 | 4 | 5 | 6 | 12;
export type GridGap = "none" | "sm" | "md" | "lg";

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  cols?: GridCols;
  gap?: GridGap;
  children: ReactNode;
}

const colStyles: Record<GridCols, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
  12: "grid-cols-12",
};

const gapStyles: Record<GridGap, string> = {
  none: "gap-0",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
};

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ cols = 1, gap = "md", className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx("grid", colStyles[cols], gapStyles[gap], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Grid.displayName = "Grid";
