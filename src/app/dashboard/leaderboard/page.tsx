"use client";

import { Trophy, Crown } from "lucide-react";
import { useState } from "react";

import { Sidebar } from "@/components/layout/Sidebar";
import {
  SidebarProvider,
  useSidebar,
} from "@/components/layout/SidebarContext";
import { Avatar } from "@/design-system/primitives/Avatar/Avatar";
import { Badge } from "@/design-system/primitives/Badge/Badge";
import { Card } from "@/design-system/primitives/Card/Card";
import { Text } from "@/design-system/primitives/Text/Text";

interface LeaderboardPlayer {
  rank: number;
  username: string;
  avatar: string;
  level: number;
  problemsSolved: number;
  avgTime: string;
  streak: number;
  totalPoints: number;
}

interface UserStats {
  rank: number;
  problemsSolved: number;
  bestStreak: number;
  totalPoints: number;
}

const USER_STATS: UserStats = {
  rank: 10,
  problemsSolved: 60,
  bestStreak: 8,
  totalPoints: 10340,
};

const GLOBAL_LEADERBOARD: LeaderboardPlayer[] = [
  {
    rank: 1,
    username: "PhysicsWiz",
    avatar: "PW",
    level: 15,
    problemsSolved: 89,
    avgTime: "45s avg",
    streak: 23,
    totalPoints: 15420,
  },
  {
    rank: 2,
    username: "MathGenius",
    avatar: "MG",
    level: 14,
    problemsSolved: 95,
    avgTime: "48s avg",
    streak: 19,
    totalPoints: 14890,
  },
  {
    rank: 3,
    username: "SciencePro",
    avatar: "SP",
    level: 14,
    problemsSolved: 82,
    avgTime: "52s avg",
    streak: 18,
    totalPoints: 14230,
  },
  {
    rank: 4,
    username: "CodeCrusader",
    avatar: "CC",
    level: 13,
    problemsSolved: 78,
    avgTime: "41s avg",
    streak: 16,
    totalPoints: 13890,
  },
  {
    rank: 5,
    username: "QuantumLeap",
    avatar: "QL",
    level: 13,
    problemsSolved: 85,
    avgTime: "50s avg",
    streak: 21,
    totalPoints: 13450,
  },
];

const LEADERBOARD_FILTERS = ["Global", "Weekly", "Friends"];

function LeaderboardContent() {
  const { isCollapsed } = useSidebar();
  const [selectedFilter, setSelectedFilter] = useState("Global");

  const getLevelColor = (level: number) => {
    if (level >= 14) return "purple";
    if (level >= 12) return "warning";
    return "default";
  };

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Background Grid Pattern */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(#22c55e10 1px, transparent 1px), linear-gradient(90deg, #22c55e10 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <Sidebar />

      <main
        className={`relative z-10 min-h-screen transition-all duration-300 pl-16 ${
          isCollapsed ? "lg:pl-16" : "lg:pl-64"
        }`}
      >
        <div className="p-4 lg:p-6">
          {/* Header Section */}
          <header className="mb-4 lg:mb-6">
            <Text variant="status" color="muted" className="mb-1">
              /// RANKINGS
            </Text>
            <Text variant="h2" color="primary" className="mb-1">
              Leaderboard
            </Text>
            <Text variant="bodySmall" color="muted">
              Compete with players worldwide
            </Text>
          </header>

          {/* Stats Overview */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Trophy className="w-4 h-4 text-[#22c55e]" />
              <Text variant="caption" color="accent" uppercase font="mono">
                Your Stats
              </Text>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2 lg:gap-3">
              {/* Your Rank */}
              <Card variant="glow" className="p-3 lg:p-4">
                <Text
                  variant="caption"
                  color="muted"
                  className="mb-0.5 lg:mb-1 uppercase tracking-wider"
                  font="mono"
                >
                  Your Rank
                </Text>
                <Text variant="h3" color="accent" className="mb-1 lg:mb-2">
                  #{USER_STATS.rank}
                </Text>
              </Card>

              {/* Problems Solved */}
              <Card variant="glow" className="p-3 lg:p-4">
                <Text
                  variant="caption"
                  color="muted"
                  className="mb-0.5 lg:mb-1 uppercase tracking-wider"
                  font="mono"
                >
                  Problems Solved
                </Text>
                <Text variant="h3" color="accent" className="mb-1 lg:mb-2">
                  {USER_STATS.problemsSolved}
                </Text>
              </Card>

              {/* Best Streak */}
              <Card variant="glow" className="p-3 lg:p-4">
                <Text
                  variant="caption"
                  color="muted"
                  className="mb-0.5 lg:mb-1 uppercase tracking-wider"
                  font="mono"
                >
                  Best Streak
                </Text>
                <Text variant="h3" color="accent" className="mb-1 lg:mb-2">
                  {USER_STATS.bestStreak}x
                </Text>
              </Card>

              {/* Total Points */}
              <Card variant="glow" className="p-3 lg:p-4">
                <Text
                  variant="caption"
                  color="muted"
                  className="mb-0.5 lg:mb-1 uppercase tracking-wider"
                  font="mono"
                >
                  Total Points
                </Text>
                <Text variant="h3" color="accent" className="mb-1 lg:mb-2">
                  {USER_STATS.totalPoints.toLocaleString()}
                </Text>
              </Card>
            </div>
          </section>

          {/* Filter Tabs */}
          <section className="mb-4 lg:mb-6">
            <div className="flex gap-2 lg:gap-3">
              {LEADERBOARD_FILTERS.map((filter) => (
                <button
                  type="button"
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-3 lg:px-4 py-1.5 lg:py-2 transition-all ${
                    selectedFilter === filter
                      ? "bg-[#22c55e] border border-[#22c55e]"
                      : "bg-transparent border border-[rgba(255,255,255,0.1)] hover:border-[#22c55e40]"
                  }`}
                >
                  <Text
                    variant="label"
                    font="mono"
                    color={selectedFilter === filter ? "primary" : "muted"}
                    weight={selectedFilter === filter ? "semibold" : "medium"}
                  >
                    {filter}
                  </Text>
                </button>
              ))}
            </div>
          </section>

          {/* Leaderboard Section */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Trophy className="w-4 h-4 text-[#22c55e]" />
              <Text variant="caption" color="accent" uppercase font="mono">
                Top Players This Month
              </Text>
            </div>

            {/* Leaderboard List */}
            <div className="space-y-2 lg:space-y-3">
              {GLOBAL_LEADERBOARD.map((player) => (
                <Card
                  key={player.rank}
                  variant="glow"
                  className="p-3 lg:p-4 hover:shadow-[0_0_20px_rgba(34,197,94,0.2)] transition-all duration-200"
                >
                  <div className="flex items-center gap-3 lg:gap-4">
                    {/* Rank */}
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.3)] shrink-0">
                      {player.rank === 1 ? (
                        <Crown className="w-5 h-5 text-[#22c55e]" />
                      ) : (
                        <Text
                          variant="body"
                          font="mono"
                          weight="bold"
                          color="accent"
                        >
                          {player.rank}
                        </Text>
                      )}
                    </div>

                    {/* Player Info */}
                    <div className="flex items-center gap-2 lg:gap-3 flex-1 min-w-0">
                      <Avatar size="sm" name={player.avatar} bordered />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Text
                            variant="body"
                            color="primary"
                            className="font-semibold"
                          >
                            {player.username}
                          </Text>
                          <Badge variant={getLevelColor(player.level)}>
                            Lvl {player.level}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 lg:gap-3 mt-1 flex-wrap">
                          <Text
                            variant="caption"
                            color="muted"
                            className="text-[10px] uppercase tracking-wider"
                            font="mono"
                          >
                            ◉ {player.problemsSolved} solved
                          </Text>
                          <Text
                            variant="caption"
                            color="muted"
                            className="text-[10px] uppercase tracking-wider"
                            font="mono"
                          >
                            ⏱ {player.avgTime}
                          </Text>
                          <Text
                            variant="caption"
                            color="accent"
                            className="text-[10px] uppercase tracking-wider"
                            font="mono"
                          >
                            🔥 {player.streak}x
                          </Text>
                        </div>
                      </div>
                    </div>

                    {/* Points */}
                    <div className="text-right shrink-0">
                      <Text variant="h4" color="accent" className="font-mono">
                        💰 {player.totalPoints.toLocaleString()}
                      </Text>
                      <Text
                        variant="caption"
                        color="muted"
                        className="uppercase tracking-wider"
                        font="mono"
                      >
                        pts
                      </Text>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default function LeaderboardPage() {
  return (
    <SidebarProvider>
      <LeaderboardContent />
    </SidebarProvider>
  );
}
