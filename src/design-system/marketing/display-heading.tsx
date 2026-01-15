"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

type DisplayHeadingSize = "hero" | "section" | "subsection";
type DisplayHeadingAs = "h1" | "h2" | "h3" | "h4";

export interface DisplayHeadingProps
  extends Omit<HTMLAttributes<HTMLHeadingElement>, "children"> {
  children: ReactNode;
  size?: DisplayHeadingSize;
  as?: DisplayHeadingAs;
}

const sizeStyles: Record<DisplayHeadingSize, string> = {
  hero: "text-6xl sm:text-7xl lg:text-8xl",
  section: "text-4xl sm:text-5xl lg:text-6xl",
  subsection: "text-3xl sm:text-4xl lg:text-5xl",
};

export const DisplayHeading = forwardRef<
  HTMLHeadingElement,
  DisplayHeadingProps
>(
  (
    { children, size = "hero", as: Tag = "h1", className = "", ...props },
    ref,
  ) => {
    return (
      <Tag
        ref={ref}
        className={[
          "font-serif text-black leading-[0.95] tracking-tight",
          sizeStyles[size],
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {children}
      </Tag>
    );
  },
);

DisplayHeading.displayName = "DisplayHeading";

// Muted text helper for use inside DisplayHeading
export interface DisplayHeadingMutedProps
  extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
}

export const DisplayHeadingMuted = forwardRef<
  HTMLSpanElement,
  DisplayHeadingMutedProps
>(({ children, className = "", ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={["italic text-gray-400", className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </span>
  );
});

DisplayHeadingMuted.displayName = "DisplayHeadingMuted";
