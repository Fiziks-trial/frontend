import { forwardRef, type TextareaHTMLAttributes } from "react";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  resize?: "none" | "vertical" | "horizontal" | "both";
}

const resizeStyles = {
  none: "resize-none",
  vertical: "resize-y",
  horizontal: "resize-x",
  both: "resize",
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, resize = "vertical", className = "", ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={[
          "w-full min-h-24 px-4 py-3 rounded-xl border bg-background transition-colors",
          "placeholder:text-muted-foreground text-sm",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          error ? "border-destructive" : "border-input",
          resizeStyles[resize],
          className,
        ].join(" ")}
        {...props}
      />
    );
  },
);

Textarea.displayName = "Textarea";
