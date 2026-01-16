"use client";

import { Medal, TrendingUp, TrendingDown, Minus, Crown } from "lucide-react";
import { Card, Badge, Text, Avatar } from "@/design-system";

type Tier =
  | "bronze"
  | "silver"
  | "gold"
  | "platinum"
  | "diamond"
  | "grandmaster";

export interface LeaderboardEntry {
  rank: number;
  previousRank: number;
  userId: string;
  name: string;
  initials: string;
  rating: number;
  wins: number;
  losses: number;
  winStreak: number;
  tier: Tier;
}

const TIER_COLORS: Record<Tier, string> = {
  bronze: "text-amber-700 bg-amber-100",
  silver: "text-gray-500 bg-gray-100",
  gold: "text-yellow-600 bg-yellow-100",
  platinum: "text-cyan-600 bg-cyan-100",
  diamond: "text-blue-500 bg-blue-100",
  grandmaster: "text-purple-600 bg-purple-100",
};

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  onEntryClick?: (entry: LeaderboardEntry) => void;
}

function getRankIcon(rank: number) {
  if (rank === 1)
    return <Crown size={16} className="text-yellow-500 fill-yellow-500" />;
  if (rank === 2)
    return <Medal size={16} className="text-gray-400 fill-gray-400" />;
  if (rank === 3)
    return <Medal size={16} className="text-amber-600 fill-amber-600" />;
  return null;
}

function getRankChange(current: number, previous: number) {
  const diff = previous - current;
  if (diff > 0)
    return (
      <span className="flex items-center gap-0.5 text-success text-xs">
        <TrendingUp size={12} />
        {diff}
      </span>
    );
  if (diff < 0)
    return (
      <span className="flex items-center gap-0.5 text-destructive text-xs">
        <TrendingDown size={12} />
        {Math.abs(diff)}
      </span>
    );
  return (
    <span className="text-muted-foreground">
      <Minus size={12} />
    </span>
  );
}

export function LeaderboardTable({
  entries,
  onEntryClick,
}: LeaderboardTableProps) {
  return (
    <Card className="overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 px-4 sm:px-6 py-3 bg-muted/50 border-b border-border text-sm font-medium text-muted-foreground">
        <div className="col-span-1 text-center">#</div>
        <div className="col-span-5 sm:col-span-4">Player</div>
        <div className="col-span-2 text-center hidden sm:block">Tier</div>
        <div className="col-span-3 sm:col-span-2 text-center">Rating</div>
        <div className="col-span-3 text-center hidden sm:block">W/L</div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-border">
        {entries.map((entry) => (
          <button
            type="button"
            key={entry.userId}
            onClick={() => onEntryClick?.(entry)}
            className={[
              "grid grid-cols-12 gap-4 px-4 sm:px-6 py-4 items-center hover:bg-muted/30 transition-colors cursor-pointer w-full text-left",
              entry.rank <= 3 && "bg-muted/20",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {/* Rank */}
            <div className="col-span-1 flex flex-col items-center gap-1">
              <div className="flex items-center gap-1">
                {getRankIcon(entry.rank) || (
                  <Text variant="mono" className="text-muted-foreground">
                    {entry.rank}
                  </Text>
                )}
              </div>
              {getRankChange(entry.rank, entry.previousRank)}
            </div>

            {/* Player Info */}
            <div className="col-span-5 sm:col-span-4 flex items-center gap-3">
              <Avatar fallback={entry.initials} size="md" />
              <div className="min-w-0">
                <Text variant="body" className="font-medium truncate">
                  {entry.name}
                </Text>
                {entry.winStreak > 0 && (
                  <div className="flex items-center gap-1 text-success">
                    <TrendingUp size={12} />
                    <Text variant="caption" className="text-success">
                      {entry.winStreak} streak
                    </Text>
                  </div>
                )}
              </div>
            </div>

            {/* Tier */}
            <div className="col-span-2 text-center hidden sm:block">
              <Badge className={TIER_COLORS[entry.tier]} size="sm">
                {entry.tier}
              </Badge>
            </div>

            {/* Rating */}
            <div className="col-span-3 sm:col-span-2 text-center">
              <Text variant="mono" className="font-bold text-foreground">
                {entry.rating.toLocaleString()}
              </Text>
            </div>

            {/* Win/Loss */}
            <div className="col-span-3 text-center hidden sm:block">
              <Text variant="body-sm" color="muted">
                <span className="text-success font-medium">{entry.wins}</span>
                {" / "}
                <span className="text-destructive font-medium">
                  {entry.losses}
                </span>
              </Text>
            </div>
          </button>
        ))}
      </div>
    </Card>
  );
}

export { TIER_COLORS };
