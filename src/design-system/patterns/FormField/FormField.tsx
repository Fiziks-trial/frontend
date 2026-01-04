import { forwardRef, type ReactNode } from "react";
import { clsx } from "clsx";

export interface FormFieldProps {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}

export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  ({ label, error, hint, required, children, className }, ref) => {
    return (
      <div ref={ref} className={clsx("space-y-1.5", className)}>
        {label && (
          <label className="block text-sm font-medium text-[var(--color-text-primary)]">
            {label}
            {required && (
              <span className="text-[var(--color-error-500)] ml-1">*</span>
            )}
          </label>
        )}
        {children}
        {(error || hint) && (
          <p
            className={clsx(
              "text-sm",
              error
                ? "text-[var(--color-error-500)]"
                : "text-[var(--color-text-muted)]",
            )}
          >
            {error || hint}
          </p>
        )}
      </div>
    );
  },
);

FormField.displayName = "FormField";
