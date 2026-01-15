import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

type WindowVariant = "default" | "minimal";

export interface WindowMockupProps extends HTMLAttributes<HTMLDivElement> {
  variant?: WindowVariant;
  title?: string;
  toolbar?: ReactNode;
}

export const WindowMockup = forwardRef<HTMLDivElement, WindowMockupProps>(
  (
    { variant = "default", title, toolbar, className = "", children, ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={[
          "bg-white rounded-2xl shadow-2xl shadow-black/10 overflow-hidden border border-gray-100",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {/* Window Chrome */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 bg-gray-50/50">
          <div className="flex gap-1.5">
            <div className="size-3 rounded-full bg-red-400" />
            <div className="size-3 rounded-full bg-yellow-400" />
            <div className="size-3 rounded-full bg-green-400" />
          </div>

          {title && (
            <div className="flex-1 flex justify-center">
              <div className="bg-white rounded-full px-4 py-1 text-xs text-gray-400 border border-gray-200">
                {title}
              </div>
            </div>
          )}

          {toolbar && !title && (
            <div className="flex-1 flex justify-center">{toolbar}</div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">{children}</div>
      </div>
    );
  },
);

WindowMockup.displayName = "WindowMockup";
