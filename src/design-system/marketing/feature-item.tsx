import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

type FeatureItemSize = "sm" | "md" | "lg";

export interface FeatureItemProps extends HTMLAttributes<HTMLDivElement> {
  icon: ReactNode;
  label: string;
  size?: FeatureItemSize;
}

const sizes: Record<
  FeatureItemSize,
  { icon: string; text: string; gap: string }
> = {
  sm: {
    icon: "text-gray-600",
    text: "text-sm font-medium text-gray-800",
    gap: "gap-2",
  },
  md: {
    icon: "text-gray-700",
    text: "text-base font-medium text-gray-900",
    gap: "gap-3",
  },
  lg: {
    icon: "text-gray-800",
    text: "text-lg font-semibold text-gray-900",
    gap: "gap-4",
  },
};

export const FeatureItem = forwardRef<HTMLDivElement, FeatureItemProps>(
  ({ icon, label, size = "md", className = "", ...props }, ref) => {
    const styles = sizes[size];

    return (
      <div
        ref={ref}
        className={["flex items-center", styles.gap, className]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        <div className={styles.icon}>{icon}</div>
        <span className={styles.text}>{label}</span>
      </div>
    );
  },
);

FeatureItem.displayName = "FeatureItem";
