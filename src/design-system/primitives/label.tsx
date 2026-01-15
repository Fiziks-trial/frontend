import { forwardRef, type LabelHTMLAttributes } from "react";

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  disabled?: boolean;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ required, disabled, className = "", children, ...props }, ref) => {
    return (
      // biome-ignore lint/a11y/noLabelWithoutControl: Consumer provides htmlFor
      <label
        ref={ref}
        className={[
          "text-sm font-medium text-foreground",
          disabled && "opacity-50 cursor-not-allowed",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {children}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
    );
  },
);

Label.displayName = "Label";
