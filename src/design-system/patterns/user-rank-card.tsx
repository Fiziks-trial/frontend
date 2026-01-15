import type { ReactNode } from "react";
import { Card } from "../primitives/card";
import { Text } from "../primitives/text";
import { Avatar } from "../primitives/avatar";

export interface UserRankCardProps {
  rank: number | string;
  name: string;
  initials: string;
  tier: ReactNode;
  rating: string | number;
  className?: string;
}

export function UserRankCard({
  rank,
  name,
  initials,
  tier,
  rating,
  className = "",
}: UserRankCardProps) {
  return (
    <Card className={["border-primary/20 bg-primary/5", className].join(" ")}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center">
            <Text variant="caption" color="muted">
              Your Rank
            </Text>
            <Text variant="h2" serif className="text-primary">
              #{rank}
            </Text>
          </div>
          <div className="h-12 w-px bg-border" />
          <div className="flex items-center gap-3">
            <Avatar fallback={initials} size="lg" />
            <div>
              <Text variant="body" className="font-medium">
                {name}
              </Text>
              {tier}
            </div>
          </div>
        </div>
        <div className="text-right">
          <Text variant="caption" color="muted">
            Rating
          </Text>
          <Text variant="h3" className="font-mono text-primary">
            {rating}
          </Text>
        </div>
      </div>
    </Card>
  );
}
