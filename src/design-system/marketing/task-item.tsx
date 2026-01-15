import { forwardRef, type HTMLAttributes } from "react";

type TagColor =
  | "rose"
  | "sky"
  | "amber"
  | "emerald"
  | "purple"
  | "indigo"
  | "gray";

export interface TaskItemProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  tag?: string;
  tagColor?: TagColor;
  checked?: boolean;
  onCheckChange?: (checked: boolean) => void;
}

const tagColors: Record<TagColor, string> = {
  rose: "bg-rose-100 text-rose-700",
  sky: "bg-sky-100 text-sky-700",
  amber: "bg-amber-100 text-amber-700",
  emerald: "bg-emerald-100 text-emerald-700",
  purple: "bg-purple-100 text-purple-700",
  indigo: "bg-indigo-100 text-indigo-700",
  gray: "bg-gray-100 text-gray-700",
};

export const TaskItem = forwardRef<HTMLDivElement, TaskItemProps>(
  (
    {
      label,
      tag,
      tagColor = "gray",
      checked = false,
      onCheckChange,
      className = "",
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={[
          "flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        <button
          type="button"
          onClick={() => onCheckChange?.(!checked)}
          className={[
            "size-4 rounded border border-gray-300 flex items-center justify-center",
            checked && "bg-black border-black",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {checked && (
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
          className={[
            "text-sm text-gray-700 flex-1",
            checked && "line-through text-gray-400",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {label}
        </span>
        {tag && (
          <span
            className={[
              "text-xs px-2 py-0.5 rounded-full",
              tagColors[tagColor],
            ].join(" ")}
          >
            {tag}
          </span>
        )}
      </div>
    );
  },
);

TaskItem.displayName = "TaskItem";
