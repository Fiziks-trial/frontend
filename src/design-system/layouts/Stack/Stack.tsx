import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { clsx } from "clsx";

export type StackDirection = "horizontal" | "vertical";
export type StackSpacing = "none" | "xs" | "sm" | "md" | "lg" | "xl";
export type StackAlign = "start" | "center" | "end" | "stretch";

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  direction?: StackDirection;
  spacing?: StackSpacing;
  align?: StackAlign;
  children: ReactNode;
}

const spacingStyles: Record<StackSpacing, string> = {
  none: "gap-0",
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
};

const alignStyles: Record<StackAlign, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  (
    {
      direction = "vertical",
      spacing = "md",
      align = "stretch",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "flex",
          direction === "horizontal" ? "flex-row" : "flex-col",
          spacingStyles[spacing],
          alignStyles[align],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Stack.displayName = "Stack";
