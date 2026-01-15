import { forwardRef, type HTMLAttributes } from "react";

export interface SectionLabelProps extends HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export const SectionLabel = forwardRef<HTMLSpanElement, SectionLabelProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={[
          "text-sm font-medium text-gray-500 tracking-wider uppercase",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {children}
      </span>
    );
  },
);

SectionLabel.displayName = "SectionLabel";
