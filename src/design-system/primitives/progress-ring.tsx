import { type HTMLAttributes, type ReactNode } from "react";

type ProgressRingSize = "sm" | "md" | "lg" | "xl";

export interface ProgressRingProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  size?: ProgressRingSize;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  children?: ReactNode;
}

const dimensions: Record<ProgressRingSize, number> = {
  sm: 40,
  md: 80,
  lg: 112,
  xl: 128,
};

const defaultStrokes: Record<ProgressRingSize, number> = {
  sm: 3,
  md: 8,
  lg: 10,
  xl: 12,
};

export function ProgressRing({
  value,
  max = 100,
  size = "md",
  strokeWidth,
  color = "var(--primary)",
  trackColor = "var(--muted)",
  className = "",
  children,
  ...props
}: ProgressRingProps) {
  const dimension = dimensions[size];
  const stroke = strokeWidth ?? defaultStrokes[size];
  const radius = (dimension - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      className={["relative inline-flex items-center justify-center", className].join(" ")}
      style={{ width: dimension, height: dimension }}
      {...props}
    >
      <svg className="transform -rotate-90" width={dimension} height={dimension}>
        <circle
          cx={dimension / 2}
          cy={dimension / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={stroke}
          fill="transparent"
        />
        <circle
          cx={dimension / 2}
          cy={dimension / 2}
          r={radius}
          stroke={color}
          strokeWidth={stroke}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
      </svg>
      {children && <div className="absolute inset-0 flex items-center justify-center">{children}</div>}
    </div>
  );
}
