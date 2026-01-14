import { type ReactNode } from "react";

type TimelineColor = "math" | "physics" | "chemistry" | "biology";

export interface TimelineNodeProps {
  result: "W" | "L";
  delta: string;
  icon: ReactNode;
  subject: string;
  color: TimelineColor;
  opponent?: string;
}

const colorStyles: Record<TimelineColor, string> = {
  physics: "text-subject-physics bg-section-purple border-subject-physics/30",
  math: "text-subject-math bg-section-blue border-subject-math/30",
  biology: "text-subject-biology bg-section-emerald border-subject-biology/30",
  chemistry: "text-subject-chemistry bg-section-amber border-subject-chemistry/30",
};

const mobileColorStyles: Record<TimelineColor, string> = {
  physics: "bg-section-purple text-subject-physics",
  math: "bg-section-blue text-subject-math",
  biology: "bg-section-emerald text-subject-biology",
  chemistry: "bg-section-amber text-subject-chemistry",
};

export function TimelineNode({ result, delta, icon, subject, color, opponent }: TimelineNodeProps) {
  const isWin = result === "W";

  return (
    <div className="group relative flex flex-col items-center cursor-pointer">
      {/* Subject label - shows on hover */}
      <div className="absolute bottom-full mb-3 opacity-0 group-hover:opacity-100 transition-all duration-200">
        <span
          className={[
            "text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md",
            "shadow-sm border whitespace-nowrap",
            colorStyles[color],
          ].join(" ")}
        >
          {subject}
        </span>
      </div>

      {/* Node circle */}
      <div
        className={[
          "size-10 rounded-full bg-card border-2 flex items-center justify-center",
          "relative z-10 transition-all duration-200 group-hover:scale-110 shadow-sm",
          isWin ? "border-border" : "border-destructive/30 bg-destructive/5",
        ].join(" ")}
      >
        <div className={isWin ? "text-foreground" : "text-destructive"}>{icon}</div>
      </div>

      {/* Result info */}
      <div className="mt-3 text-center">
        <div className="text-lg font-serif text-foreground font-bold">{result}</div>
        <span
          className={[
            "font-mono text-xs font-bold",
            delta.includes("+") ? "text-success" : "text-destructive",
          ].join(" ")}
        >
          {delta}
        </span>
        {opponent && (
          <div className="text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
            vs {opponent}
          </div>
        )}
      </div>
    </div>
  );
}

export function MobileTimelineNode({
  result,
  delta,
  icon,
  subject,
  color,
  opponent,
}: TimelineNodeProps) {
  const isWin = result === "W";

  return (
    <div className="flex items-center gap-4">
      {/* Node */}
      <div
        className={[
          "size-8 rounded-full bg-card border-2 flex items-center justify-center shrink-0 -ml-4",
          isWin ? "border-border" : "border-destructive/30 bg-destructive/5",
        ].join(" ")}
      >
        <div className={isWin ? "text-foreground" : "text-destructive"}>{icon}</div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-between bg-card rounded-xl p-3 border border-border">
        <div className="flex items-center gap-3">
          <span className={["text-xs font-bold px-2 py-0.5 rounded", mobileColorStyles[color]].join(" ")}>
            {subject}
          </span>
          {opponent && <span className="text-sm text-muted-foreground">vs {opponent}</span>}
        </div>
        <div className="flex items-center gap-2">
          <span
            className={[
              "font-mono text-sm font-bold",
              delta.includes("+") ? "text-success" : "text-destructive",
            ].join(" ")}
          >
            {delta}
          </span>
          <span className={["text-sm font-bold", isWin ? "text-foreground" : "text-destructive"].join(" ")}>
            {result}
          </span>
        </div>
      </div>
    </div>
  );
}
