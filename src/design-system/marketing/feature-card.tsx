import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

type FeatureCardColor =
  | "default"
  | "indigo"
  | "emerald"
  | "amber"
  | "rose"
  | "purple";

export interface FeatureCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  icon?: ReactNode;
  color?: FeatureCardColor;
}

const colorStyles: Record<FeatureCardColor, string> = {
  default: "bg-white",
  indigo: "bg-indigo-100",
  emerald: "bg-emerald-50",
  amber: "bg-amber-50",
  rose: "bg-rose-50",
  purple: "bg-purple-50",
};

export const FeatureCard = forwardRef<HTMLDivElement, FeatureCardProps>(
  (
    { title, description, icon, color = "default", className = "", ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={[
          "rounded-3xl p-8 shadow-lg shadow-black/5 border border-gray-100",
          colorStyles[color],
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {icon && (
          <div className="size-12 bg-white rounded-xl flex items-center justify-center mb-4 mx-auto shadow-sm">
            {icon}
          </div>
        )}
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    );
  },
);

FeatureCard.displayName = "FeatureCard";
