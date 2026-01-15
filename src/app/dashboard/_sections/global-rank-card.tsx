"use client";

import { Trophy } from "lucide-react";
import { Card, Text, ProgressRing } from "@/design-system";

interface GlobalRankCardProps {
  rank: number;
  percentile: string;
  tier: string;
  progress: number;
}

export function GlobalRankCard({
  rank,
  percentile,
  tier,
  progress,
}: GlobalRankCardProps) {
  return (
    <Card className="lg:col-span-4 flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <Text variant="h3" serif>
          Global Rank
        </Text>
        <div className="p-2 bg-muted rounded-lg">
          <Trophy size={18} className="text-muted-foreground" />
        </div>
      </div>

      <div className="flex items-center justify-center py-4">
        <ProgressRing value={progress} size="lg" color="var(--warning)">
          <div className="flex flex-col items-center">
            <Text variant="h1" serif>
              #{rank}
            </Text>
            <Text
              variant="caption"
              color="muted"
              className="uppercase tracking-wide font-bold"
            >
              {percentile}
            </Text>
          </div>
        </ProgressRing>
      </div>

      <div className="text-center">
        <Text variant="body-sm" color="muted">
          Tier: <span className="text-warning font-bold">{tier}</span>
        </Text>
      </div>
    </Card>
  );
}
