import { forwardRef, type HTMLAttributes } from "react";

type ProblemCardColor =
  | "rose"
  | "sky"
  | "amber"
  | "emerald"
  | "purple"
  | "indigo";

export interface ProblemCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  items: string[];
  color?: ProblemCardColor;
}

const colorStyles: Record<ProblemCardColor, { bg: string; border: string }> = {
  rose: { bg: "bg-rose-100", border: "border-rose-200" },
  sky: { bg: "bg-sky-100", border: "border-sky-200" },
  amber: { bg: "bg-amber-100", border: "border-amber-200" },
  emerald: { bg: "bg-emerald-100", border: "border-emerald-200" },
  purple: { bg: "bg-purple-100", border: "border-purple-200" },
  indigo: { bg: "bg-indigo-100", border: "border-indigo-200" },
};

export const ProblemCard = forwardRef<HTMLDivElement, ProblemCardProps>(
  ({ title, items, color = "sky", className = "", ...props }, ref) => {
    const styles = colorStyles[color];

    return (
      <div
        ref={ref}
        className={[
          "border rounded-xl p-4",
          styles.bg,
          styles.border,
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        <h4 className="font-semibold text-gray-900 mb-3 text-sm">{title}</h4>
        <ul className="space-y-1.5 text-xs text-gray-600">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    );
  },
);

ProblemCard.displayName = "ProblemCard";
