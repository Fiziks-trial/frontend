import { clsx } from "clsx";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

export type DividerVariant = "solid" | "dashed" | "dotted" | "gradient";

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  variant?: DividerVariant;
  label?: ReactNode;
  glow?: boolean;
}

export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      orientation = "horizontal",
      variant = "solid",
      label,
      glow = false,
      className,
      ...props
    },
    ref,
  ) => {
    const isHorizontal = orientation === "horizontal";

    const lineStyles = clsx(
      "flex-1",
      isHorizontal ? "h-px" : "w-px",
      variant === "solid" && "bg-[#00ff0033]",
      variant === "dashed" && "bg-transparent border-0",
      variant === "dotted" && "bg-transparent border-0",
      variant === "gradient" &&
        (isHorizontal
          ? "bg-gradient-to-r from-transparent via-[#00ff00] to-transparent"
          : "bg-gradient-to-b from-transparent via-[#00ff00] to-transparent"),
      glow && "shadow-[0_0_10px_rgba(0,255,0,0.3)]",
    );

    // For dashed/dotted, use border instead
    const dashedStyles =
      variant === "dashed"
        ? isHorizontal
          ? "border-t border-dashed border-[#00ff0033]"
          : "border-l border-dashed border-[#00ff0033]"
        : "";

    const dottedStyles =
      variant === "dotted"
        ? isHorizontal
          ? "border-t border-dotted border-[#00ff0033]"
          : "border-l border-dotted border-[#00ff0033]"
        : "";

    if (label && isHorizontal) {
      return (
        <div
          ref={ref}
          className={clsx("flex items-center gap-4", className)}
          {...props}
        >
          <div className={clsx(lineStyles, dashedStyles, dottedStyles)} />
          <span className="text-xs font-mono text-[#00ff00] uppercase tracking-wider whitespace-nowrap">
            {label}
          </span>
          <div className={clsx(lineStyles, dashedStyles, dottedStyles)} />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={clsx(
          isHorizontal ? "w-full" : "h-full",
          lineStyles,
          dashedStyles,
          dottedStyles,
          className,
        )}
        {...props}
      />
    );
  },
);
Divider.displayName = "Divider";

/**
 * TerminalDivider - A decorative divider with terminal styling
 */
export interface TerminalDividerProps extends HTMLAttributes<HTMLDivElement> {
  text?: string;
}

export const TerminalDivider = forwardRef<HTMLDivElement, TerminalDividerProps>(
  ({ text = "//", className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx("flex items-center gap-2 py-4", className)}
        {...props}
      >
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#00ff0033]" />
        <span className="text-xs font-mono text-[#00ff00]">{text}</span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#00ff0033]" />
      </div>
    );
  },
);
TerminalDivider.displayName = "TerminalDivider";
