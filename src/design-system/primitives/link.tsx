import NextLink from "next/link";
import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react";

type LinkVariant = "default" | "muted" | "underline";

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: LinkVariant;
  external?: boolean;
  icon?: ReactNode;
  iconRight?: ReactNode;
}

const variants: Record<LinkVariant, string> = {
  default: "text-primary hover:text-primary-hover",
  muted: "text-muted-foreground hover:text-foreground",
  underline:
    "text-foreground underline underline-offset-4 decoration-muted-foreground/50 hover:decoration-foreground",
};

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      href,
      variant = "default",
      external,
      icon,
      iconRight,
      className = "",
      children,
      ...props
    },
    ref,
  ) => {
    const linkClasses = [
      "inline-flex items-center gap-1.5 font-medium transition-colors",
      variants[variant],
      className,
    ].join(" ");

    const content = (
      <>
        {icon}
        {children}
        {iconRight}
      </>
    );

    if (external) {
      return (
        <a
          ref={ref}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClasses}
          {...props}
        >
          {content}
        </a>
      );
    }

    return (
      <NextLink ref={ref} href={href} className={linkClasses} {...props}>
        {content}
      </NextLink>
    );
  },
);

Link.displayName = "Link";
