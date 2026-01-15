import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

export interface FeatureRowProps extends HTMLAttributes<HTMLDivElement> {
  icon: ReactNode;
  title: string;
  description: string;
}

export const FeatureRow = forwardRef<HTMLDivElement, FeatureRowProps>(
  ({ icon, title, description, className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={[
          "flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        <div className="size-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-900 shrink-0">
          {icon}
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-1">{title}</h4>
          <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
        </div>
      </div>
    );
  },
);

FeatureRow.displayName = "FeatureRow";
