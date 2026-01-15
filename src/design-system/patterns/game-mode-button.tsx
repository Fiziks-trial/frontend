import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { Badge } from "../primitives/badge";
import { Text } from "../primitives/text";

export interface GameModeButtonProps {
  icon: ReactNode;
  label: string;
  description: string;
  badge?: string;
  isSelected: boolean;
  onClick: () => void;
}

export function GameModeButton({
  icon,
  label,
  description,
  badge,
  isSelected,
  onClick,
}: GameModeButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "w-full p-4 rounded-xl text-left transition-all",
        "border-2",
        isSelected
          ? "border-primary bg-primary/5"
          : "border-border bg-card hover:border-primary/30",
      ].join(" ")}
    >
      <div className="flex items-start gap-3">
        <div
          className={[
            "p-2 rounded-lg",
            isSelected
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground",
          ].join(" ")}
        >
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Text
              variant="body"
              className={["font-medium", isSelected && "text-primary"]
                .filter(Boolean)
                .join(" ")}
            >
              {label}
            </Text>
            {badge && (
              <Badge variant="default" size="sm">
                {badge}
              </Badge>
            )}
          </div>
          <Text variant="body-sm" color="muted" className="mt-1">
            {description}
          </Text>
        </div>
        {isSelected && <ChevronRight size={18} className="text-primary mt-1" />}
      </div>
    </button>
  );
}
