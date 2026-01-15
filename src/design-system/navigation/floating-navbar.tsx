"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

export interface FloatingNavbarProps extends HTMLAttributes<HTMLElement> {
  logo?: ReactNode;
  links?: ReactNode;
  actions?: ReactNode;
}

export const FloatingNavbar = forwardRef<HTMLElement, FloatingNavbarProps>(
  ({ logo, links, actions, className = "", children, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        className={["fixed top-4 left-1/2 -translate-x-1/2 z-50", className]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        <div className="bg-white rounded-full shadow-lg shadow-black/5 px-4 py-2 flex items-center gap-6">
          {logo && <div className="flex items-center gap-2 px-2">{logo}</div>}

          {links && (
            <div className="hidden md:flex items-center gap-1">{links}</div>
          )}

          {actions && (
            <div className="flex items-center gap-2 ml-4">{actions}</div>
          )}

          {children}
        </div>
      </nav>
    );
  },
);

FloatingNavbar.displayName = "FloatingNavbar";
