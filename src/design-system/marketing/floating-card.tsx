import { forwardRef, type HTMLAttributes } from "react";

type FloatingPosition =
  | "bottom-right"
  | "bottom-left"
  | "top-right"
  | "top-left";
type FloatingColor = "default" | "orange" | "blue" | "green" | "purple";

export interface FloatingCardProps extends HTMLAttributes<HTMLDivElement> {
  position?: FloatingPosition;
  color?: FloatingColor;
  offset?: "sm" | "md" | "lg";
}

const positions: Record<FloatingPosition, string> = {
  "bottom-right": "absolute -bottom-8 -right-8",
  "bottom-left": "absolute -bottom-8 -left-8",
  "top-right": "absolute -top-8 -right-8",
  "top-left": "absolute -top-8 -left-8",
};

const colors: Record<FloatingColor, string> = {
  default: "bg-white border-gray-100",
  orange: "bg-orange-50 border-orange-100",
  blue: "bg-sky-50 border-sky-100",
  green: "bg-emerald-50 border-emerald-100",
  purple: "bg-purple-50 border-purple-100",
};

const offsets: Record<string, string> = {
  sm: "-bottom-4 -right-4",
  md: "-bottom-8 -right-8",
  lg: "-bottom-12 -right-12",
};

export const FloatingCard = forwardRef<HTMLDivElement, FloatingCardProps>(
  (
    {
      position = "bottom-right",
      color = "default",
      offset,
      className = "",
      children,
      ...props
    },
    ref,
  ) => {
    const positionClass = offset
      ? `absolute ${offsets[offset]}`
      : positions[position];

    return (
      <div
        ref={ref}
        className={[
          "rounded-2xl shadow-xl p-6 max-w-xs border",
          positionClass,
          colors[color],
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {children}
      </div>
    );
  },
);

FloatingCard.displayName = "FloatingCard";
