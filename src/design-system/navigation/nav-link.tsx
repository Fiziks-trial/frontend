"use client";

import Link from "next/link";
import { forwardRef, type AnchorHTMLAttributes } from "react";

type NavLinkVariant = "default" | "pill";

export interface NavLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  variant?: NavLinkVariant;
  active?: boolean;
}

const variants: Record<NavLinkVariant, { base: string; active: string }> = {
  default: {
    base: "text-sm font-medium text-gray-600 hover:text-black transition-colors px-3 py-1.5",
    active: "text-black",
  },
  pill: {
    base: "text-sm font-medium text-gray-600 hover:text-black transition-colors px-3 py-1.5 rounded-full hover:bg-gray-100",
    active: "text-black bg-gray-100",
  },
};

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  (
    {
      href,
      variant = "pill",
      active = false,
      className = "",
      children,
      ...props
    },
    ref,
  ) => {
    const styles = variants[variant];

    return (
      <Link
        ref={ref}
        href={href}
        className={[styles.base, active && styles.active, className]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {children}
      </Link>
    );
  },
);

NavLink.displayName = "NavLink";
