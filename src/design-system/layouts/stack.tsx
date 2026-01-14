import type { HTMLAttributes } from "react";

type StackDirection = "vertical" | "horizontal";
type StackAlign = "start" | "center" | "end" | "stretch";
type StackJustify = "start" | "center" | "end" | "between" | "around";
type StackGap = "none" | "xs" | "sm" | "md" | "lg" | "xl";

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  direction?: StackDirection;
  align?: StackAlign;
  justify?: StackJustify;
  gap?: StackGap;
  wrap?: boolean;
}

const directions: Record<StackDirection, string> = {
  vertical: "flex-col",
  horizontal: "flex-row",
};

const alignments: Record<StackAlign, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

const justifications: Record<StackJustify, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
};

const gaps: Record<StackGap, string> = {
  none: "gap-0",
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
};

export function Stack({
  direction = "vertical",
  align = "stretch",
  justify = "start",
  gap = "md",
  wrap = false,
  className = "",
  children,
  ...props
}: StackProps) {
  return (
    <div
      className={[
        "flex",
        directions[direction],
        alignments[align],
        justifications[justify],
        gaps[gap],
        wrap && "flex-wrap",
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
