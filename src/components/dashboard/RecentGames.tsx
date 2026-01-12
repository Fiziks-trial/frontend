import { ChevronRight, Clock, Swords, Trophy } from "lucide-react";

import { Avatar } from "@/design-system/primitives/Avatar/Avatar";

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
    <div className="bg-[#18181b]/60 rounded-2xl border border-white/[0.08] backdrop-blur-sm overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-white/[0.06]">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <Swords className="w-4 h-4 text-indigo-400" />
            Recent Battles
          </h3>
          <button
            type="button"
            className="text-sm text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            View All
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Games List */}
      <div className="divide-y divide-white/[0.04]">
        {RECENT_GAMES.map((game, index) => (
          <GameItem key={game.id} game={game} isFirst={index === 0} />
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/[0.06] bg-white/[0.02]">
        <div className="flex items-center justify-between">
          <span className="text-xs text-zinc-500">
            {RECENT_GAMES.filter((g) => g.result === "win").length} wins today
          </span>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs font-medium text-emerald-400">LIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function GameItem({ game, isFirst }: { game: Game; isFirst: boolean }) {
  const isWin = game.result === "win";

  return (
    <div
      className={`p-4 hover:bg-white/[0.02] transition-colors cursor-pointer group ${
        isFirst ? "bg-indigo-500/[0.03]" : ""
      }`}
    >
      {/* Top Row */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative shrink-0">
            <Avatar size="sm" name={game.opponent} />
            {isFirst && (
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#18181b] rounded-full" />
            )}
          </div>
          <div className="min-w-0">
            <span className="text-sm font-medium text-white truncate block">
              vs {game.opponent}
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="flex items-center gap-1 text-zinc-500">
                <Clock className="w-3 h-3" />
                <span className="text-xs">{game.date}</span>
              </div>
              <span className="text-zinc-700">•</span>
              <span
                className={`text-xs font-medium ${
                  game.mode === "Tournament"
                    ? "text-purple-400"
                    : game.mode === "Ranked"
                      ? "text-indigo-400"
                      : "text-zinc-500"
                }`}
              >
                {game.mode}
              </span>
            </div>
          </div>
        </div>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-lg ${
            isWin
              ? "bg-emerald-500/10 text-emerald-400"
              : "bg-red-500/10 text-red-400"
          }`}
        >
          {game.result.toUpperCase()}
        </span>
      </div>

      {/* Bottom Row */}
      <div className="flex items-center justify-between pl-11">
        <span className="text-xs text-zinc-500 font-mono">{game.score}</span>
        <div
          className={`flex items-center gap-1.5 px-2 py-1 rounded-lg ${
            isWin ? "bg-emerald-500/10" : "bg-red-500/10"
          }`}
        >
          {isWin && <Trophy className="w-3 h-3 text-emerald-400" />}
          <span
            className={`text-xs font-semibold ${
              isWin ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {game.eloChange}
          </span>
          <span className="text-[10px] text-zinc-500">ELO</span>
        </div>
      </div>
    </div>
  );
}
