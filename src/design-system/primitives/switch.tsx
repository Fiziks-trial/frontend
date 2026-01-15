import {
  forwardRef,
  useState,
  useCallback,
  type InputHTMLAttributes,
  type ReactNode,
  type ChangeEvent,
} from "react";

type SwitchSize = "sm" | "md" | "lg";

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  size?: SwitchSize;
  label?: ReactNode;
  description?: string;
}

const sizes: Record<
  SwitchSize,
  { track: string; thumb: string; translate: string }
> = {
  sm: { track: "w-8 h-4", thumb: "size-3", translate: "translate-x-4" },
  md: { track: "w-10 h-5", thumb: "size-4", translate: "translate-x-5" },
  lg: { track: "w-12 h-6", thumb: "size-5", translate: "translate-x-6" },
};

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      size = "md",
      label,
      description,
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
        role="switch"
        aria-checked={isChecked}
        checked={isChecked}
        disabled={disabled}
        onChange={handleChange}
        className="sr-only peer"
        {...props}
      />
    );

    const switchVisual = (
      <div
        className={[
          sizeConfig.track,
          "rounded-full transition-colors relative pointer-events-none",
          "peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2",
          "peer-disabled:opacity-50 peer-disabled:cursor-not-allowed",
          isChecked ? "bg-primary" : "bg-gray-200",
        ].join(" ")}
      >
        <div
          className={[
            sizeConfig.thumb,
            "absolute top-0.5 left-0.5 bg-white rounded-full shadow-sm transition-transform",
            isChecked && sizeConfig.translate,
          ]
            .filter(Boolean)
            .join(" ")}
        />
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
          {switchVisual}
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
          {switchVisual}
        </div>
        <div className="flex flex-col">
          {label && <span className="text-sm text-foreground">{label}</span>}
          {description && (
            <span className="text-sm text-muted-foreground">{description}</span>
          )}
        </div>
      </label>
    );
  },
);

Switch.displayName = "Switch";
