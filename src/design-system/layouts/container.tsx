import type { HTMLAttributes } from "react";

type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
  centered?: boolean;
}

const sizes: Record<ContainerSize, string> = {
  sm: "max-w-2xl",
  md: "max-w-4xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  full: "max-w-full",
};

export function Container({
  size = "lg",
  centered = true,
  className = "",
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={[
        "w-full px-4 sm:px-6 lg:px-8",
        sizes[size],
        centered && "mx-auto",
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
