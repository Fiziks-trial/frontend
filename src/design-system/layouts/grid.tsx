import type { HTMLAttributes } from "react";

type GridCols = 1 | 2 | 3 | 4 | 6 | 12 | "auto";
type GridGap = "none" | "sm" | "md" | "lg";

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  cols?: GridCols;
  colsMd?: GridCols;
  colsLg?: GridCols;
  gap?: GridGap;
}

const colsMap: Record<GridCols, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  6: "grid-cols-6",
  12: "grid-cols-12",
  auto: "grid-cols-[repeat(auto-fit,minmax(280px,1fr))]",
};

const colsMdMap: Record<GridCols, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  6: "md:grid-cols-6",
  12: "md:grid-cols-12",
  auto: "md:grid-cols-[repeat(auto-fit,minmax(280px,1fr))]",
};

const colsLgMap: Record<GridCols, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  6: "lg:grid-cols-6",
  12: "lg:grid-cols-12",
  auto: "lg:grid-cols-[repeat(auto-fit,minmax(280px,1fr))]",
};

const gapMap: Record<GridGap, string> = {
  none: "gap-0",
  sm: "gap-2 sm:gap-3",
  md: "gap-4 sm:gap-6",
  lg: "gap-6 sm:gap-8",
};

export function Grid({
  cols = 1,
  colsMd,
  colsLg,
  gap = "md",
  className = "",
  children,
  ...props
}: GridProps) {
  return (
    <div
      className={[
        "grid",
        colsMap[cols],
        colsMd && colsMdMap[colsMd],
        colsLg && colsLgMap[colsLg],
        gapMap[gap],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}
