import { type HTMLAttributes } from "react";

type ProgressColor = "default" | "success" | "warning" | "math" | "physics" | "chemistry" | "biology";
type ProgressSize = "sm" | "md" | "lg";

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  color?: ProgressColor;
  size?: ProgressSize;
  showValue?: boolean;
}

const colors: Record<ProgressColor, string> = {
  default: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  math: "bg-subject-math",
  physics: "bg-subject-physics",
  chemistry: "bg-subject-chemistry",
  biology: "bg-subject-biology",
};

const sizes: Record<ProgressSize, string> = {
  sm: "h-1",
  md: "h-1.5",
  lg: "h-2",
};

export function ProgressBar({
  value,
  max = 100,
  color = "default",
  size = "md",
  showValue = false,
  className = "",
  ...props
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={className}>
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        className={["w-full bg-muted rounded-full overflow-hidden", sizes[size]].join(" ")}
        {...props}
      >
        <div
          className={[sizes[size], "rounded-full transition-all duration-300", colors[color]].join(
            " "
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showValue && (
        <span className="text-xs text-muted-foreground mt-1">{Math.round(percentage)}%</span>
      )}
    </div>
  );
}
