import { clsx } from "clsx";
import { type ElementType, forwardRef, type HTMLAttributes } from "react";

export type TextVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "body"
  | "bodySmall"
  | "caption"
  | "label";

export type TextColor =
  | "primary"
  | "secondary"
  | "muted"
  | "success"
  | "error"
  | "warning";

export interface TextProps extends HTMLAttributes<HTMLElement> {
  variant?: TextVariant;
  color?: TextColor;
  as?: ElementType;
  weight?: "normal" | "medium" | "semibold" | "bold" | "extrabold";
  truncate?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<TextVariant, string> = {
  h1: "text-5xl font-extrabold leading-tight tracking-tight",
  h2: "text-4xl font-bold leading-tight tracking-tight",
  h3: "text-2xl font-bold leading-snug",
  h4: "text-xl font-semibold leading-snug",
  body: "text-base leading-relaxed",
  bodySmall: "text-sm leading-relaxed",
  caption: "text-xs leading-normal",
  label: "text-sm font-medium leading-normal",
};

const colorStyles: Record<TextColor, string> = {
  primary: "text-(--color-text-primary)",
  secondary: "text-(--color-text-secondary)",
  muted: "text-(--color-text-muted)",
  success: "text-[var(--color-success-400)]",
  error: "text-[var(--color-error-400)]",
  warning: "text-[var(--color-warning-400)]",
};

const weightStyles = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
};

const defaultElements: Record<TextVariant, ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  body: "p",
  bodySmall: "p",
  caption: "span",
  label: "span",
};

export const Text = forwardRef<HTMLElement, TextProps>(
  (
    {
      variant = "body",
      color = "primary",
      as,
      weight,
      truncate = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const Component = as || defaultElements[variant];

    return (
      <Component
        ref={ref}
        className={clsx(
          variantStyles[variant],
          colorStyles[color],
          weight && weightStyles[weight],
          truncate && "truncate",
          className,
        )}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Text.displayName = "Text";
