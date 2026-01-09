import { ChevronRight, Clock, Swords } from "lucide-react";

import { Avatar } from "@/design-system/primitives/Avatar/Avatar";
import { Badge } from "@/design-system/primitives/Badge/Badge";
import { Button } from "@/design-system/primitives/Button/Button";
import { Card } from "@/design-system/primitives/Card/Card";
import { Text } from "@/design-system/primitives/Text/Text";

interface Game {
  id: number;
  opponent: string;
  result: "win" | "loss";
  score: string;
  mode: string;
  date: string;
  eloChange: string;
}

const RECENT_GAMES: Game[] = [
  {
    id: 1,
    opponent: "NewtonianMaster",
    result: "win",
    score: "1200 - 950",
    mode: "Ranked",
    date: "2h ago",
    eloChange: "+24",
  },
  {
    id: 2,
    opponent: "QuantumCat",
    result: "loss",
    score: "800 - 1050",
    mode: "Casual",
    date: "5h ago",
    eloChange: "-12",
  },
  {
    id: 3,
    opponent: "EntropyKing",
    result: "win",
    score: "1500 - 1420",
    mode: "Tournament",
    date: "1d ago",
    eloChange: "+45",
  },
  {
    id: 4,
    opponent: "SpeedOfLight",
    result: "win",
    score: "1100 - 800",
    mode: "Ranked",
    date: "2d ago",
    eloChange: "+18",
  },
];

export function RecentGames() {
  return (
    <Card variant="default" className="p-0">
      {/* Header */}
      <div className="p-3 lg:p-4 border-b border-[rgba(255,255,255,0.1)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Swords className="w-4 h-4 text-[#22c55e]" />
            <Text variant="label" color="accent" uppercase className="text-sm">
              Recent Battles
            </Text>
          </div>
          <Button variant="link" size="sm" className="text-xs">
            View All
            <ChevronRight className="w-3 h-3 ml-1" />
          </Button>
        </div>
      </div>

      {/* Games List */}
      <div className="divide-y divide-[rgba(255,255,255,0.06)]">
        {RECENT_GAMES.map((game, index) => (
          <GameItem key={game.id} game={game} isFirst={index === 0} />
        ))}
      </div>

      {/* Footer */}
      <div className="p-3 lg:p-4 border-t border-[rgba(255,255,255,0.1)]">
        <div className="flex items-center justify-between">
          <Text variant="caption" color="muted" className="text-xs">
            {RECENT_GAMES.filter((g) => g.result === "win").length} wins today
          </Text>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-[#22c55e] rounded-full animate-pulse" />
            <Text
              variant="caption"
              color="success"
              font="mono"
              className="text-xs"
            >
              LIVE
            </Text>
          </div>
        </div>
      </div>
    </Card>
  );
}

function GameItem({ game, isFirst }: { game: Game; isFirst: boolean }) {
  const isWin = game.result === "win";

  return (
    <div
      className={`p-3 lg:p-4 hover:bg-[#22c55e08] transition-colors cursor-pointer ${
        isFirst ? "bg-[#22c55e05]" : ""
      }`}
    >
      {/* Top Row: Avatar, Name, Result */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 lg:gap-3 min-w-0">
          <div className="relative shrink-0">
            <Avatar size="xs" name={game.opponent} />
            {isFirst && (
              <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-[#22c55e] border border-[#0a0a0a] rounded-full" />
            )}
          </div>
          <div className="min-w-0">
            <Text
              variant="caption"
              color="primary"
              weight="medium"
              className="truncate block text-xs"
            >
              vs {game.opponent}
            </Text>
            <div className="flex items-center gap-1 mt-0.5">
              <Clock className="w-3 h-3 text-[#666666] shrink-0" />
              <Text variant="caption" color="muted" className="text-xs">
                {game.date}
              </Text>
              <span className="text-[#333] mx-0.5">|</span>
              <Text
                variant="caption"
                color={game.mode === "Tournament" ? "purple" : "muted"}
                font="mono"
                className="text-xs"
              >
                {game.mode}
              </Text>
            </div>
          </div>
        </div>
        <Badge
          variant={isWin ? "success" : "error"}
          className="text-[10px] shrink-0"
        >
          {game.result.toUpperCase()}
        </Badge>
      </div>

      {/* Bottom Row: Score and ELO Change */}
      <div className="flex items-center justify-between pl-6 lg:pl-9">
        <Text
          variant="caption"
          color="secondary"
          font="mono"
          className="text-xs"
        >
          {game.score}
        </Text>
        <div
          className={`flex items-center gap-1 px-1.5 py-0.5 ${
            isWin ? "bg-[#22c55e15]" : "bg-[#ef444415]"
          }`}
        >
          <Text
            variant="caption"
            color={isWin ? "success" : "error"}
            font="mono"
            weight="medium"
            className="text-xs"
          >
            {game.eloChange}
          </Text>
          <Text variant="caption" color="muted" className="text-[10px]">
            ELO
          </Text>
        </div>
      </div>
    </div>
  );
}
