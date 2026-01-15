import {
  forwardRef,
  useState,
  useCallback,
  type InputHTMLAttributes,
  type ReactNode,
  type ChangeEvent,
} from "react";
import { Check } from "lucide-react";

type CheckboxSize = "sm" | "md" | "lg";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  size?: CheckboxSize;
  label?: ReactNode;
  description?: string;
  error?: boolean;
}

const sizes: Record<CheckboxSize, { box: string; icon: number; text: string }> =
  {
    sm: { box: "size-4", icon: 10, text: "text-sm" },
    md: { box: "size-5", icon: 12, text: "text-sm" },
    lg: { box: "size-6", icon: 14, text: "text-base" },
  };

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      size = "md",
      label,
      description,
      error,
      className = "",
      checked: controlledChecked,
      defaultChecked = false,
      disabled,
      onChange,
      ...props
    },
    ref,
  ) => {
    const isControlled = controlledChecked !== undefined;
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const isChecked = isControlled ? controlledChecked : internalChecked;

    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        if (!isControlled) {
          setInternalChecked(e.target.checked);
        }
        onChange?.(e);
      },
      [isControlled, onChange],
    );

    const sizeConfig = sizes[size];

    const inputElement = (
      <input
        ref={ref}
        type="checkbox"
        checked={isChecked}
        disabled={disabled}
        onChange={handleChange}
        className="sr-only peer"
        {...props}
      />
    );

    const checkboxVisual = (
      <div
        className={[
          sizeConfig.box,
          "border-2 rounded transition-colors flex items-center justify-center pointer-events-none",
          "peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2",
          "peer-disabled:opacity-50 peer-disabled:cursor-not-allowed",
          isChecked
            ? "bg-primary border-primary"
            : error
              ? "border-destructive bg-transparent"
              : "border-gray-300 bg-transparent group-hover:border-gray-400",
        ].join(" ")}
      >
        {isChecked && (
          <Check
            size={sizeConfig.icon}
            className="text-primary-foreground"
            strokeWidth={3}
          />
        )}
      </div>
    );

    if (!label && !description) {
      return (
        // biome-ignore lint/a11y/noLabelWithoutControl: Input is rendered inside label
        <label
          className={[
            "relative inline-flex cursor-pointer group",
            disabled && "cursor-not-allowed opacity-50",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {inputElement}
          {checkboxVisual}
        </label>
      );
    }

    return (
      // biome-ignore lint/a11y/noLabelWithoutControl: Input is rendered inside label
      <label
        className={[
          "flex items-start gap-3 cursor-pointer group",
          disabled && "cursor-not-allowed opacity-50",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="relative mt-0.5">
          {inputElement}
          {checkboxVisual}
        </div>
        <div className="flex flex-col">
          {label && (
            <span
              className={[sizeConfig.text, "text-foreground leading-snug"].join(
                " ",
              )}
            >
              {label}
            </span>
          )}
          {description && (
            <span className="text-sm text-muted-foreground mt-0.5">
              {description}
            </span>
          )}
        </div>
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";
