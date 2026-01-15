import { forwardRef, type HTMLAttributes } from "react";

type MockupCardVariant = "default" | "minimal";

export interface MockupCardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  variant?: MockupCardVariant;
}

export const MockupCard = forwardRef<HTMLDivElement, MockupCardProps>(
  ({ title, variant = "default", className = "", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={["bg-white rounded-2xl shadow-xl p-6", className]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {/* Window Dots Header */}
        <div className="flex items-center gap-2 mb-4">
          {variant === "default" ? (
            <>
              <div className="size-3 rounded-full bg-gray-200" />
              <div className="size-3 rounded-full bg-gray-200" />
              <div className="size-3 rounded-full bg-gray-200" />
            </>
          ) : (
            <>
              <div className="size-2 rounded-full bg-gray-300" />
              <div className="size-2 rounded-full bg-gray-300" />
              <div className="size-2 rounded-full bg-gray-300" />
            </>
          )}
          {title && <span className="ml-4 text-sm text-gray-500">{title}</span>}
        </div>

        {/* Content */}
        {children}
      </div>
    );
  },
);

MockupCard.displayName = "MockupCard";
