import { Avatar } from "../primitives/avatar";
import { Badge } from "../primitives/badge";
import { Text } from "../primitives/text";

export interface RecentOpponentItemProps {
  name: string;
  initials: string;
  timeAgo: string;
  result: "win" | "loss";
  onClick?: () => void;
}

export function RecentOpponentItem({
  name,
  initials,
  timeAgo,
  result,
  onClick,
}: RecentOpponentItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-between p-3 rounded-lg bg-card border border-border hover:bg-muted/30 transition-colors text-left"
    >
      <div className="flex items-center gap-3">
        <Avatar fallback={initials} size="sm" />
        <div>
          <Text variant="body-sm" className="font-medium">
            {name}
          </Text>
          <Text variant="caption" color="muted">
            {timeAgo}
          </Text>
        </div>
      </div>
      <Badge variant={result === "win" ? "success" : "destructive"} size="sm">
        {result === "win" ? "Won" : "Lost"}
      </Badge>
    </button>
  );
}
