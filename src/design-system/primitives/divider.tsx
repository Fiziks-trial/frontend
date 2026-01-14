import { type HTMLAttributes } from "react";

type DividerOrientation = "horizontal" | "vertical";

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: DividerOrientation;
  label?: string;
}

export function Divider({
  orientation = "horizontal",
  label,
  className = "",
  ...props
}: DividerProps) {
  if (orientation === "vertical") {
    return <div className={["w-px h-full bg-border", className].join(" ")} {...props} />;
  }

  if (label) {
    return (
      <div className={["flex items-center gap-4", className].join(" ")} {...props}>
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted-foreground font-medium">{label}</span>
        <div className="flex-1 h-px bg-border" />
      </div>
    );
  }

  return <div className={["h-px w-full bg-border", className].join(" ")} {...props} />;
}
