"use client";

import Link from "next/link";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

type PillButtonVariant = "primary" | "secondary" | "outline" | "dark";
type PillButtonSize = "sm" | "md" | "lg";

export interface PillButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: PillButtonVariant;
  size?: PillButtonSize;
  href?: string;
  icon?: ReactNode;
  iconRight?: ReactNode;
}

const variants: Record<PillButtonVariant, string> = {
  primary:
    "bg-white text-black shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/15",
  secondary: "bg-gray-100 text-black hover:bg-gray-200",
  outline:
    "bg-white text-black border border-gray-200 shadow-lg shadow-black/10 hover:shadow-xl",
  dark: "bg-black text-white hover:bg-gray-800",
};

const sizes: Record<PillButtonSize, string> = {
  sm: "px-5 py-2 text-sm",
  md: "px-8 py-4 text-base",
  lg: "px-10 py-5 text-lg",
};

export const PillButton = forwardRef<HTMLButtonElement, PillButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      href,
      icon,
      iconRight,
      className = "",
      children,
      ...props
    },
    ref,
  ) => {
    const baseStyles = [
      "inline-flex items-center justify-center font-medium rounded-full transition-all",
      variants[variant],
      sizes[size],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const content = (
      <>
        {icon && <span className="mr-2">{icon}</span>}
        {children}
        {iconRight && <span className="ml-2">{iconRight}</span>}
      </>
    );

    if (href) {
      return (
        <Link href={href} className={baseStyles}>
          {content}
        </Link>
      );
    }

    return (
      <button ref={ref} className={baseStyles} {...props}>
        {content}
      </button>
    );
  },
);

PillButton.displayName = "PillButton";
