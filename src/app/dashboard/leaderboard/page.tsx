"use client";

import { Trophy, Target, Zap, TrendingUp, Crown } from "lucide-react";
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
    <div
      className={`flex-1 transition-all duration-300 ${isCollapsed ? "lg:ml-16" : "lg:ml-64"} ml-16`}
    >
      <div className="min-h-screen bg-[#0a0a0a] p-4 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-mono font-bold tracking-wide text-[#22c55e] mb-2">
            Leaderboard
          </h1>
          <p className="text-base font-mono text-[#999999]">
            Compete with players worldwide
          </p>
        </div>

        {/* User Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Your Rank */}
          <Card variant="glow" className="p-6">
            <div className="mb-4">
              <Trophy className="w-8 h-8 mb-3" />
              <span className="text-[10px] font-mono text-[#999999] uppercase tracking-wider">
                Your Rank
              </span>
            </div>
            <p className="text-4xl font-mono font-bold text-[#22c55e]">
              #{USER_STATS.rank}
            </p>
          </Card>

          {/* Problems Solved */}
          <Card variant="glow" className="p-6">
            <div className="mb-4">
              <Target className="w-8 h-8 mb-3" />
              <span className="text-[10px] font-mono text-[#999999] uppercase tracking-wider">
                Problems Solved
              </span>
            </div>
            <p className="text-4xl font-mono font-bold text-[#22c55e]">
              {USER_STATS.problemsSolved}
            </p>
          </Card>

          {/* Best Streak */}
          <Card variant="glow" className="p-6">
            <div className="mb-4">
              <Zap className="w-8 h-8 mb-3" />
              <span className="text-[10px] font-mono text-[#999999] uppercase tracking-wider">
                Best Streak
              </span>
            </div>
            <p className="text-4xl font-mono font-bold text-[#22c55e]">
              {USER_STATS.bestStreak}x
            </p>
          </Card>

          {/* Total Points */}
          <Card variant="glow" className="p-6">
            <div className="mb-4">
              <TrendingUp className="w-8 h-8 mb-3" />
              <span className="text-[10px] font-mono text-[#999999] uppercase tracking-wider">
                Total Points
              </span>
            </div>
            <p className="text-4xl font-mono font-bold text-[#22c55e]">
              {USER_STATS.totalPoints.toLocaleString()}
            </p>
          </Card>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-3 mb-8">
          {LEADERBOARD_FILTERS.map((filter) => (
            <button
              type="button"
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-6 py-2 rounded-full transition-all ${
                selectedFilter === filter
                  ? "bg-[#3b82f6]"
                  : "bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)]"
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

        {/* Leaderboard Section */}
        <div>
          <Text variant="h2" font="mono" color="primary" className="mb-6">
            Top Players This Month
          </Text>

          {/* Leaderboard List */}
          <div className="space-y-4">
            {GLOBAL_LEADERBOARD.map((player) => (
              <Card
                key={player.rank}
                variant="glow"
                className="p-4 lg:p-6 hover:shadow-[0_0_20px_rgba(34,197,94,0.2)] transition-all duration-200"
              >
                <div className="flex items-center gap-4 lg:gap-6">
                  {/* Rank */}
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.3)]">
                    {player.rank === 1 ? (
                      <Crown className="w-6 h-6" />
                    ) : (
                      <Text
                        variant="h3"
                        font="mono"
                        weight="bold"
                        color="accent"
                      >
                        {player.rank}
                      </Text>
                    )}
                  </div>

                  {/* Player Info */}
                  <div className="flex items-center gap-4 flex-1">
                    <Avatar size="md" name={player.avatar} bordered />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-base font-mono font-semibold text-white">
                          {player.username}
                        </p>
                        <Badge variant={getLevelColor(player.level)}>
                          Lvl {player.level}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] font-mono text-[#999999] uppercase tracking-wider">
                            ◉ {player.problemsSolved} solved
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] font-mono text-[#999999] uppercase tracking-wider">
                            ⏱ {player.avgTime}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] font-mono text-[#22c55e] uppercase tracking-wider">
                            🔥 {player.streak}x streak
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Points */}
                  <div className="text-right">
                    <p className="text-2xl font-mono font-bold text-[#22c55e]">
                      💰 {player.totalPoints.toLocaleString()}
                    </p>
                    <p className="text-[10px] font-mono text-[#999999] uppercase tracking-wider">
                      points
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LeaderboardPage() {
  return (
    <SidebarProvider>
      <div className="flex bg-[#0a0a0a]">
        <Sidebar />
        <LeaderboardContent />
      </div>
    </SidebarProvider>
  );
}
