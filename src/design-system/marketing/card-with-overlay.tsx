import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

type OverlayPosition =
  | "bottom-right"
  | "bottom-left"
  | "top-right"
  | "top-left";
type OverlayColor = "default" | "orange" | "blue" | "green" | "purple";
type CardVariant = "default" | "minimal";
type OverlayOffset = "sm" | "md" | "lg";

export interface OverlayItem {
  id: string;
  label: string;
  checked?: boolean;
}

export interface CardWithOverlayProps extends HTMLAttributes<HTMLDivElement> {
  /** Title displayed in the main card header */
  title?: string;
  /** Variant for the window dots size */
  variant?: CardVariant;
  /** Additional className for the main card (e.g., "ml-12" to shift right) */
  mainCardClassName?: string;

  /** Position of the floating overlay */
  overlayPosition?: OverlayPosition;
  /** Color theme of the floating overlay */
  overlayColor?: OverlayColor;
  /** Offset distance for overlay positioning */
  overlayOffset?: OverlayOffset;
  /** Additional className for the overlay card */
  overlayClassName?: string;

  /** Title for the overlay card */
  overlayTitle?: string;
  /** Checklist items for the overlay */
  overlayItems?: OverlayItem[];
  /** Description text for the overlay */
  overlayDescription?: string;
  /** Callback when a checklist item is toggled */
  onItemChange?: (id: string, checked: boolean) => void;

  /** Custom overlay content (overrides structured content) */
  overlay?: ReactNode;
}

const overlayOffsets: Record<OverlayOffset, Record<OverlayPosition, string>> = {
  sm: {
    "bottom-right": "absolute -bottom-4 -right-4",
    "bottom-left": "absolute -bottom-4 -left-4",
    "top-right": "absolute -top-4 -right-4",
    "top-left": "absolute -top-4 -left-4",
  },
  md: {
    "bottom-right": "absolute -bottom-8 -right-8",
    "bottom-left": "absolute -bottom-8 -left-8",
    "top-right": "absolute -top-8 -right-8",
    "top-left": "absolute -top-8 -left-8",
  },
  lg: {
    "bottom-right": "absolute -bottom-12 -right-12",
    "bottom-left": "absolute -bottom-12 -left-12",
    "top-right": "absolute -top-12 -right-12",
    "top-left": "absolute -top-12 -left-12",
  },
};

const overlayColors: Record<OverlayColor, string> = {
  default: "bg-white border-gray-100",
  orange: "bg-orange-50 border-orange-100",
  blue: "bg-sky-50 border-sky-100",
  green: "bg-emerald-50 border-emerald-100",
  purple: "bg-purple-50 border-purple-100",
};

export const CardWithOverlay = forwardRef<HTMLDivElement, CardWithOverlayProps>(
  (
    {
      title,
      variant = "default",
      mainCardClassName = "",
      overlayPosition = "bottom-right",
      overlayColor = "orange",
      overlayOffset = "md",
      overlayClassName = "",
      overlayTitle,
      overlayItems,
      overlayDescription,
      onItemChange,
      overlay,
      className = "",
      children,
      ...props
    },
    ref,
  ) => {
    const dotSize = variant === "default" ? "size-3" : "size-2";
    const dotColor = variant === "default" ? "bg-gray-200" : "bg-gray-300";

    const handleItemClick = (item: OverlayItem) => {
      onItemChange?.(item.id, !item.checked);
    };

    const renderOverlayContent = () => {
      if (overlay) return overlay;

      return (
        <>
          {overlayTitle && (
            <h4 className="font-semibold text-gray-900 mb-3">{overlayTitle}</h4>
          )}
          {overlayItems && overlayItems.length > 0 && (
            <ul className="space-y-2 text-sm text-gray-600">
              {overlayItems.map((item) => (
                <li key={item.id} className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleItemClick(item)}
                    className={[
                      "size-4 rounded border flex items-center justify-center transition-colors shrink-0",
                      item.checked
                        ? "bg-gray-900 border-gray-900"
                        : "border-gray-300 hover:border-gray-400",
                    ].join(" ")}
                    aria-pressed={item.checked}
                  >
                    {item.checked && (
                      <svg
                        className="size-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </button>
                  <span
                    className={item.checked ? "line-through text-gray-400" : ""}
                  >
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          )}
          {overlayDescription && (
            <p className="mt-4 text-sm text-gray-500 leading-relaxed">
              {overlayDescription}
            </p>
          )}
        </>
      );
    };

    return (
      <div
        ref={ref}
        className={["relative pb-12 pr-12", className]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {/* Main Card */}
        <div
          className={[
            "bg-white rounded-2xl shadow-xl p-6 relative z-10",
            mainCardClassName,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {/* Window Dots Header */}
          <div className="flex items-center gap-2 mb-4">
            <div className={`${dotSize} rounded-full ${dotColor}`} />
            <div className={`${dotSize} rounded-full ${dotColor}`} />
            <div className={`${dotSize} rounded-full ${dotColor}`} />
            {title && (
              <span className="ml-4 text-sm text-gray-500">{title}</span>
            )}
          </div>

          {/* Main Content */}
          {children}
        </div>

        {/* Floating Overlay Card */}
        <div
          className={[
            "rounded-2xl shadow-xl p-6 max-w-xs border z-20",
            overlayOffsets[overlayOffset][overlayPosition],
            overlayColors[overlayColor],
            overlayClassName,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {renderOverlayContent()}
        </div>
      </div>
    );
  },
);

CardWithOverlay.displayName = "CardWithOverlay";
