import { clsx } from "clsx";
import { type ElementType, forwardRef, type HTMLAttributes } from "react";

export type TextVariant =
  | "display"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "body"
  | "bodySmall"
  | "caption"
  | "label"
  | "status"
  | "nav";

export type TextColor =
  | "primary"
  | "secondary"
  | "muted"
  | "accent"
  | "neon"
  | "purple"
  | "success"
  | "error"
  | "warning";

export type TextFont = "sans" | "display" | "mono";

export interface TextProps extends HTMLAttributes<HTMLElement> {
  variant?: TextVariant;
  color?: TextColor;
  font?: TextFont;
  as?: ElementType;
  weight?: "normal" | "medium" | "semibold" | "bold" | "extrabold";
  uppercase?: boolean;
  truncate?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<TextVariant, string> = {
  display:
    "text-6xl md:text-7xl lg:text-8xl font-extrabold leading-none tracking-wide font-cyber",
  h1: "text-4xl md:text-5xl font-bold leading-tight tracking-wide font-display",
  h2: "text-3xl md:text-4xl font-bold leading-tight tracking-wide font-display",
  h3: "text-xl md:text-2xl font-bold leading-snug font-display",
  h4: "text-lg md:text-xl font-semibold leading-snug font-display",
  body: "text-base leading-relaxed",
  bodySmall: "text-sm leading-relaxed",
  caption: "text-xs leading-normal",
  label: "text-sm font-medium leading-normal tracking-wide",
  status:
    "text-xs font-semibold leading-normal tracking-widest uppercase font-terminal",
  nav: "text-sm font-medium leading-normal tracking-wider uppercase font-nav",
};

/**
 * Text color styles following Hacker House design system
 */
const colorStyles: Record<TextColor, string> = {
  primary: "text-white",
  secondary: "text-[#cccccc]",
  muted: "text-[#999999]",
  accent: "text-[#22c55e]",
  neon: "text-[#22c55e]",
  purple: "text-[#a855f7]",
  success: "text-[#22c55e]",
  error: "text-[#ef4444]",
  warning: "text-[#d4a574]",
};

const fontStyles: Record<TextFont, string> = {
  sans: "",
  display: "font-display",
  mono: "font-terminal",
};

const weightStyles = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
};

const defaultElements: Record<TextVariant, ElementType> = {
  display: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  body: "p",
  bodySmall: "p",
  caption: "span",
  label: "span",
  status: "span",
  nav: "span",
};

export const Text = forwardRef<HTMLElement, TextProps>(
  (
    {
      variant = "body",
      color = "primary",
      font,
      as,
      weight,
      uppercase = false,
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
          font && fontStyles[font],
          weight && weightStyles[weight],
          uppercase && "uppercase",
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
