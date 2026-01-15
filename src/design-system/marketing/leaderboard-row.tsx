import { forwardRef, type HTMLAttributes } from "react";

export interface LeaderboardRowProps extends HTMLAttributes<HTMLDivElement> {
  rank: string | number;
  name: string;
  score: string | number;
  highlight?: boolean;
}

export const LeaderboardRow = forwardRef<HTMLDivElement, LeaderboardRowProps>(
  ({ rank, name, score, highlight = false, className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={[
          "flex items-center justify-between p-3 rounded-lg",
          highlight ? "bg-gray-100 border border-gray-200" : "hover:bg-gray-50",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        <div className="flex items-center gap-4">
          <span
            className={[
              "font-mono text-sm",
              highlight ? "text-gray-900" : "text-gray-500",
            ].join(" ")}
          >
            {rank}
          </span>
          <span
            className={[
              "text-sm font-medium",
              highlight ? "text-gray-900" : "text-gray-600",
            ].join(" ")}
          >
            {name}
          </span>
        </div>
        <span className="font-mono text-sm font-bold text-gray-400">
          {score}
        </span>
      </div>
    );
  },
);

LeaderboardRow.displayName = "LeaderboardRow";
