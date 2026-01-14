import { type ReactNode } from "react";
import { ProgressBar } from "../primitives/progress-bar";

type SubjectColor = "math" | "physics" | "chemistry" | "biology";

export interface SubjectRatingProps {
  icon: ReactNode;
  subject: string;
  rating: string | number;
  progress?: number;
  color: SubjectColor;
  onClick?: () => void;
}

const iconStyles: Record<SubjectColor, string> = {
  math: "bg-section-blue text-subject-math",
  physics: "bg-section-purple text-subject-physics",
  chemistry: "bg-section-amber text-subject-chemistry",
  biology: "bg-section-emerald text-subject-biology",
};

export function SubjectRating({
  icon,
  subject,
  rating,
  progress = 70,
  color,
  onClick,
}: SubjectRatingProps) {
  return (
    <div className="flex items-center gap-4 group cursor-pointer" onClick={onClick}>
      <div className={["p-2 rounded-lg shrink-0", iconStyles[color]].join(" ")}>{icon}</div>
      <div className="flex-1 py-1 min-w-0">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-foreground truncate">{subject}</span>
          <span className="font-mono font-bold text-foreground text-sm ml-2">{rating}</span>
        </div>
        <ProgressBar value={progress} color={color} size="md" className="mt-2" />
      </div>
    </div>
  );
}
