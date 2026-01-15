import type { ReactNode } from "react";

export interface ToggleOption<T extends string> {
  id: T;
  label: string;
  icon?: ReactNode;
}

export interface ToggleGroupProps<T extends string> {
  options: ToggleOption<T>[];
  value: T;
  onChange: (value: T) => void;
  size?: "sm" | "md";
  variant?: "primary" | "subtle";
  className?: string;
}

const sizeStyles = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
};

const activeStyles = {
  primary: "bg-primary text-primary-foreground shadow-sm",
  subtle: "bg-muted text-foreground",
};

const inactiveStyles = {
  primary:
    "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary-hover",
  subtle: "text-muted-foreground hover:text-foreground",
};

export function ToggleGroup<T extends string>({
  options,
  value,
  onChange,
  size = "md",
  variant = "primary",
  className = "",
}: ToggleGroupProps<T>) {
  return (
    <div className={["flex flex-wrap gap-2", className].join(" ")}>
      {options.map((option) => {
        const isActive = value === option.id;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            className={[
              "flex items-center gap-2 rounded-xl font-medium transition-all",
              sizeStyles[size],
              isActive ? activeStyles[variant] : inactiveStyles[variant],
            ].join(" ")}
          >
            {option.icon}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
