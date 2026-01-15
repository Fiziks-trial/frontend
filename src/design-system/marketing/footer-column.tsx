"use client";

import Link from "next/link";
import { forwardRef, type HTMLAttributes } from "react";

export interface FooterLink {
  label: string;
  href: string;
}

type FooterColumnVariant = "default" | "dark";

export interface FooterColumnProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  links: FooterLink[];
  variant?: FooterColumnVariant;
}

const variants: Record<
  FooterColumnVariant,
  { title: string; link: string; spacing: string }
> = {
  default: {
    title: "text-xs font-bold tracking-wider text-gray-400 mb-4",
    link: "text-sm text-gray-400 hover:text-white transition-colors",
    spacing: "space-y-2",
  },
  dark: {
    title: "font-serif font-bold text-white mb-6",
    link: "text-sm text-gray-400 hover:text-white transition-colors",
    spacing: "space-y-4",
  },
};

export const FooterColumn = forwardRef<HTMLDivElement, FooterColumnProps>(
  ({ title, links, variant = "default", className = "", ...props }, ref) => {
    const styles = variants[variant];

    return (
      <div ref={ref} className={className} {...props}>
        <h4 className={styles.title}>{title}</h4>
        <ul className={styles.spacing}>
          {links.map((link) => (
            <li key={link.label}>
              <Link href={link.href} className={styles.link}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  },
);

FooterColumn.displayName = "FooterColumn";
