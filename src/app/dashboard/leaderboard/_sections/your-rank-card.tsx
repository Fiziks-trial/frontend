"use client";

import { Card, Badge, Text, Avatar } from "@/design-system";
import { TIER_COLORS, type Tier } from "./leaderboard-table";

interface YourRankCardProps {
  rank: number;
  name: string;
  initials: string;
  tier: Tier;
  rating: number;
}

export function YourRankCard({
  rank,
  name,
  initials,
  tier,
  rating,
}: YourRankCardProps) {
  return (
    <Card className="mt-6 border-primary/20 bg-primary/5">
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
              <Badge className={TIER_COLORS[tier]} size="sm">
                {tier}
              </Badge>
            </div>
          </div>
        </div>
        <div className="text-right">
          <Text variant="caption" color="muted">
            Rating
          </Text>
          <Text variant="h3" className="font-mono text-primary">
            {rating.toLocaleString()}
          </Text>
        </div>
      </div>
    </Card>
  );
}
