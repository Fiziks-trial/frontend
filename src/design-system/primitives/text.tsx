import type { HTMLAttributes, ElementType } from "react";

type TextVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "body"
  | "body-sm"
  | "caption"
  | "label"
  | "mono";

type TextColor = "default" | "muted" | "success" | "warning" | "destructive";

export interface TextProps extends HTMLAttributes<HTMLElement> {
  variant?: TextVariant;
  color?: TextColor;
  as?: ElementType;
  serif?: boolean;
}

const variantStyles: Record<
  TextVariant,
  { element: ElementType; className: string }
> = {
  h1: {
    element: "h1",
    className: "text-2xl sm:text-3xl lg:text-4xl font-medium leading-tight",
  },
  h2: {
    element: "h2",
    className: "text-xl sm:text-2xl lg:text-3xl font-medium leading-tight",
  },
  h3: {
    element: "h3",
    className: "text-lg font-medium",
  },
  h4: {
    element: "h4",
    className: "text-base font-medium",
  },
  body: {
    element: "p",
    className: "text-sm leading-relaxed",
  },
  "body-sm": {
    element: "p",
    className: "text-xs leading-relaxed",
  },
  caption: {
    element: "span",
    className: "text-[10px] uppercase tracking-wide font-bold",
  },
  label: {
    element: "span",
    className: "text-xs font-medium uppercase tracking-wider",
  },
  mono: {
    element: "span",
    className: "font-mono text-sm font-bold",
  },
};

const colorStyles: Record<TextColor, string> = {
  default: "text-foreground",
  muted: "text-muted-foreground",
  success: "text-success",
  warning: "text-warning",
  destructive: "text-destructive",
};

export function Text({
  variant = "body",
  color = "default",
  as,
  serif = false,
  className = "",
  children,
  ...props
}: TextProps) {
  const { element: defaultElement, className: variantClass } =
    variantStyles[variant];
  const Component = as || defaultElement;

  return (
    <Component
      className={[
        variantClass,
        colorStyles[color],
        serif && "font-serif",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </Component>
  );
}
