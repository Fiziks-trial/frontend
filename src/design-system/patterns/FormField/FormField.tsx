import { clsx } from "clsx";
import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  type ReactElement,
  type ReactNode,
  useId,
} from "react";

export interface FormFieldProps {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
  id?: string;
}

export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  (
    { label, error, hint, required, children, className, id: providedId },
    ref,
  ) => {
    const generatedId = useId();
    const fieldId = providedId || generatedId;

    const childrenWithId = Children.map(children, (child) => {
      if (isValidElement(child)) {
        return cloneElement(child as ReactElement<{ id?: string }>, {
          id: fieldId,
        });
      }
      return child;
    });

    return (
      <div ref={ref} className={clsx("space-y-1.5", className)}>
        {label && (
          <label
            htmlFor={fieldId}
            className="block text-sm font-medium text-(--color-text-primary)"
          >
            {label}
            {required && (
              <span className="text-(--color-error-500) ml-1">*</span>
            )}
          </label>
        )}
        {childrenWithId}
        {(error || hint) && (
          <p
            className={clsx(
              "text-sm",
              error
                ? "text-(--color-error-500)"
                : "text-(--color-text-muted)",
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
