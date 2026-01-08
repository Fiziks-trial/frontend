import { clsx } from "clsx";
import { forwardRef, type HTMLAttributes } from "react";

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

/**
 * Display Text - Large hero text
 * Used for major headlines and hero sections
 */
export const Display = forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ children, className, ...props }, ref) => (
    <h1
      ref={ref}
      className={clsx(
        "text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight",
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  ),
);
Display.displayName = "Display";

/**
 * Heading 1 - Major headings
 */
export const H1 = forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ children, className, ...props }, ref) => (
    <h1
      ref={ref}
      className={clsx(
        "text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight",
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  ),
);
H1.displayName = "H1";

/**
 * Heading 2 - Section headings
 */
export const H2 = forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ children, className, ...props }, ref) => (
    <h2
      ref={ref}
      className={clsx(
        "text-3xl md:text-4xl uppercase tracking-tight",
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  ),
);
H2.displayName = "H2";

/**
 * Heading 3 - Subsection headings
 */
export const H3 = forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ children, className, ...props }, ref) => (
    <h3
      ref={ref}
      className={clsx(
        "text-2xl md:text-3xl uppercase tracking-tight",
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  ),
);
H3.displayName = "H3";

/**
 * Heading 4 - Small headings
 */
export const H4 = forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ children, className, ...props }, ref) => (
    <h4
      ref={ref}
      className={clsx("text-xl md:text-2xl uppercase tracking-wide", className)}
      {...props}
    >
      {children}
    </h4>
  ),
);
H4.displayName = "H4";

/**
 * Body text - Standard paragraph text
 */
export const Body = forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ children, className, ...props }, ref) => (
    <p ref={ref} className={clsx("text-base", className)} {...props}>
      {children}
    </p>
  ),
);
Body.displayName = "Body";

/**
 * Small text - Secondary/caption text
 */
export const Small = forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ children, className, ...props }, ref) => (
    <p ref={ref} className={clsx("text-sm", className)} {...props}>
      {children}
    </p>
  ),
);
Small.displayName = "Small";

/**
 * Code/Terminal text - Monospace styled text
 */
export const Code = forwardRef<HTMLElement, TypographyProps>(
  ({ children, className, ...props }, ref) => (
    <code ref={ref} className={clsx("font-mono text-sm", className)} {...props}>
      {children}
    </code>
  ),
);
Code.displayName = "Code";

/**
 * System message - Green terminal style badge/text
 * Used for system status messages like "/// SYSTEM_READY"
 */
export const SystemMessage = forwardRef<HTMLDivElement, TypographyProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx(
        "text-[#00ff00] text-sm font-mono border border-[#00ff0033] px-3 py-1 inline-block",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
);
SystemMessage.displayName = "SystemMessage";

/**
 * Label text - Display labels and small headings
 * Note: For form labels that need to be associated with inputs, use the label from Input components
 */
export const Label = forwardRef<HTMLSpanElement, TypographyProps>(
  ({ children, className, ...props }, ref) => (
    <span
      ref={ref}
      className={clsx("text-sm uppercase tracking-wider block", className)}
      {...props}
    >
      {children}
    </span>
  ),
);
Label.displayName = "Label";

/**
 * Accent text - Hacker green colored text
 */
export const AccentText = forwardRef<HTMLSpanElement, TypographyProps>(
  ({ children, className, ...props }, ref) => (
    <span ref={ref} className={clsx("text-[#00ff00]", className)} {...props}>
      {children}
    </span>
  ),
);
AccentText.displayName = "AccentText";

/**
 * Purple accent text - Secondary highlight color
 */
export const PurpleText = forwardRef<HTMLSpanElement, TypographyProps>(
  ({ children, className, ...props }, ref) => (
    <span ref={ref} className={clsx("text-[#9945ff]", className)} {...props}>
      {children}
    </span>
  ),
);
PurpleText.displayName = "PurpleText";

/**
 * Muted text - Subdued gray text
 */
export const MutedText = forwardRef<HTMLSpanElement, TypographyProps>(
  ({ children, className, ...props }, ref) => (
    <span ref={ref} className={clsx("text-[#999999]", className)} {...props}>
      {children}
    </span>
  ),
);
MutedText.displayName = "MutedText";
