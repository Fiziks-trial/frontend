"use client";

import { Swords, ChevronRight } from "lucide-react";
import { useState } from "react";

import { Sidebar } from "@/components/layout/Sidebar";
import {
  SidebarProvider,
  useSidebar,
} from "@/components/layout/SidebarContext";
import { Avatar } from "@/design-system/primitives/Avatar/Avatar";
import { Badge } from "@/design-system/primitives/Badge/Badge";
import { Button } from "@/design-system/primitives/Button/Button";
import { Card } from "@/design-system/primitives/Card/Card";
import { Text } from "@/design-system/primitives/Text/Text";

interface Battle {
  id: string;
  opponent: {
    name: string;
    avatar: string;
    level: number;
    rating: number;
  };
  subject: string;
  difficulty: "Easy" | "Medium" | "Hard";
  status: "in-progress" | "pending" | "completed";
  yourProgress: number;
  opponentProgress: number;
  timeRemaining: string;
  wager: number;
  imageUrl: string;
}

const USER_STATS = {
  victories: 15,
  winRate: "62.5%",
  defeats: 7,
  defeatRate: "29.2%",
  currentWinStreak: 4,
  pointsWon: 12450,
};

const BATTLES: Battle[] = [
  {
    id: "1",
    opponent: {
      name: "Sarah Chen",
      avatar: "SC",
      level: 12,
      rating: 1854,
    },
    subject: "Physics",
    difficulty: "Medium",
    status: "in-progress",
    yourProgress: 3,
    opponentProgress: 2,
    timeRemaining: "23:45",
    wager: 500,
    imageUrl: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
  },
  {
    id: "2",
    opponent: {
      name: "Alex Rivera",
      avatar: "AR",
      level: 10,
      rating: 1723,
    },
    subject: "Mathematics",
    difficulty: "Hard",
    status: "in-progress",
    yourProgress: 2,
    opponentProgress: 1,
    timeRemaining: "45:12",
    wager: 750,
    imageUrl: "linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)",
  },
  {
    id: "3",
    opponent: {
      name: "Jordan Lee",
      avatar: "JL",
      level: 11,
      rating: 1920,
    },
    subject: "Physics",
    difficulty: "Medium",
    status: "pending",
    yourProgress: 0,
    opponentProgress: 0,
    timeRemaining: "Awaiting opponent...",
    wager: 400,
    imageUrl: "linear-gradient(135deg, #f97316 0%, #ef4444 100%)",
  },
  {
    id: "4",
    opponent: {
      name: "Morgan Smith",
      avatar: "MS",
      level: 13,
      rating: 2001,
    },
    subject: "Chemistry",
    difficulty: "Hard",
    status: "pending",
    yourProgress: 0,
    opponentProgress: 0,
    timeRemaining: "Awaiting opponent...",
    wager: 600,
    imageUrl: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
  },
];

const STATUS_FILTER = ["Active (2)", "Pending (2)", "History"];

function MyBattlesContent() {
  const { isCollapsed } = useSidebar();
  const [selectedFilter, setSelectedFilter] = useState("Active (2)");

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "success";
      case "Medium":
        return "warning";
      case "Hard":
        return "error";
      default:
        return "default";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "in-progress":
        return "warning";
      case "pending":
        return "default";
      case "completed":
        return "success";
      default:
        return "default";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "in-progress":
        return "● BATTLE IN PROGRESS";
      case "pending":
        return "PENDING";
      case "completed":
        return "COMPLETED";
      default:
        return status;
    }
  };

  const filteredBattles = BATTLES.filter((battle) => {
    if (selectedFilter === "Active (2)") return battle.status === "in-progress";
    if (selectedFilter === "Pending (2)") return battle.status === "pending";
    return true;
  });

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
          <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3 lg:gap-4 mb-4 lg:mb-6">
            <div>
              <Text variant="status" color="muted" className="mb-1">
                /// BATTLES
              </Text>
              <Text variant="h2" color="primary" className="mb-1">
                My Battles
              </Text>
              <Text variant="bodySmall" color="muted">
                Challenge others and prove your mastery
              </Text>
            </div>
            <Button variant="primary" size="sm">
              Find Opponent
            </Button>
          </header>

          {/* Stats Overview */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Swords className="w-4 h-4 text-[#22c55e]" />
              <Text variant="caption" color="accent" uppercase font="mono">
                Performance
              </Text>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2 lg:gap-3">
          <Card variant="glow" className="p-3 lg:p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <Text
                  variant="caption"
                  color="muted"
                  className="mb-0.5 lg:mb-1 uppercase tracking-wider"
                  font="mono"
                >
                  Win Rate
                </Text>
                <Text variant="h3" color="accent" className="mb-1 lg:mb-2">
                  {USER_STATS.winRate}
                </Text>
                <Text
                  variant="caption"
                  color="muted"
                  className="uppercase tracking-wider"
                  font="mono"
                >
                  {USER_STATS.victories} Victories
                </Text>
              </div>
            </div>
          </Card>

          <Card variant="glow" className="p-3 lg:p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <Text
                  variant="caption"
                  color="muted"
                  className="mb-0.5 lg:mb-1 uppercase tracking-wider"
                  font="mono"
                >
                  Defeat Rate
                </Text>
                <Text variant="h3" color="accent" className="mb-1 lg:mb-2">
                  {USER_STATS.defeatRate}
                </Text>
                <Text
                  variant="caption"
                  color="muted"
                  className="uppercase tracking-wider"
                  font="mono"
                >
                  {USER_STATS.defeats} Defeats
                </Text>
              </div>
            </div>
          </Card>

          <Card variant="glow" className="p-3 lg:p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <Text
                  variant="caption"
                  color="muted"
                  className="mb-0.5 lg:mb-1 uppercase tracking-wider"
                  font="mono"
                >
                  Win Streak
                </Text>
                <Text variant="h3" color="accent" className="mb-1 lg:mb-2">
                  {USER_STATS.currentWinStreak}
                </Text>
                <Text
                  variant="caption"
                  color="muted"
                  className="uppercase tracking-wider"
                  font="mono"
                >
                  Active
                </Text>
              </div>
            </div>
          </Card>

          <Card variant="glow" className="p-3 lg:p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <Text
                  variant="caption"
                  color="muted"
                  className="mb-0.5 lg:mb-1 uppercase tracking-wider"
                  font="mono"
                >
                  Points Won
                </Text>
                <Text variant="h3" color="accent" className="mb-1 lg:mb-2">
                  {USER_STATS.pointsWon.toLocaleString()}
                </Text>
                <Text
                  variant="caption"
                  color="muted"
                  className="uppercase tracking-wider"
                  font="mono"
                >
                  All Time
                </Text>
              </div>
            </div>
          </Card>
            </div>
          </section>

          {/* Filter Tabs */}
          <section className="mb-4 lg:mb-6">
            <div className="flex gap-2 lg:gap-3">
              {STATUS_FILTER.map((filter) => (
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

          {/* Battles List */}
          <section className="space-y-3 lg:space-y-4">
          {filteredBattles.map((battle) => (
            <Card
              key={battle.id}
              variant="glow"
              className="p-0 overflow-hidden hover:shadow-[0_0_20px_rgba(34,197,94,0.2)] transition-all duration-200"
            >
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">
                {/* Image */}
                <div
                  className="h-48 lg:h-full rounded-lg relative min-h-[200px]"
                  style={{ background: battle.imageUrl }}
                >
                  <div className="absolute inset-0 rounded-lg" />
                </div>

                {/* Battle Info */}
                <div className="lg:col-span-3 flex flex-col justify-between">
                  {/* Header with Status */}
                  <div className="mb-4">
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                      <Badge variant={getStatusBadgeColor(battle.status)}>
                        {getStatusLabel(battle.status)}
                      </Badge>
                      <Badge variant={getDifficultyColor(battle.difficulty)}>
                        {battle.difficulty}
                      </Badge>
                      <Badge variant="default">{battle.subject}</Badge>
                    </div>

                    {/* Opponent Info */}
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar
                        size="sm"
                        name={battle.opponent.avatar}
                        bordered
                      />
                      <div>
                        <p className="text-base font-mono font-semibold text-white">
                          {battle.opponent.name}
                        </p>
                        <p className="text-[10px] font-mono text-[#999999] uppercase tracking-wider">
                          Level {battle.opponent.level} •{" "}
                          {battle.opponent.rating} rating
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Progress and Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4 pb-6 border-b border-[rgba(255,255,255,0.1)]">
                    {/* Your Progress */}
                    <div>
                      <p className="text-[10px] font-mono text-[#999999] uppercase tracking-wider mb-2">
                        Your Progress
                      </p>
                      <p className="text-2xl font-mono font-bold text-white">
                        {battle.yourProgress}/5
                      </p>
                    </div>

                    {/* Opponent Progress */}
                    <div>
                      <p className="text-[10px] font-mono text-[#999999] uppercase tracking-wider mb-2">
                        Opponent Progress
                      </p>
                      <p className="text-2xl font-mono font-bold text-[#ef4444]">
                        {battle.opponentProgress}/5
                      </p>
                    </div>

                    {/* Wager */}
                    <div>
                      <p className="text-[10px] font-mono text-[#999999] uppercase tracking-wider mb-2">
                        Wager
                      </p>
                      <p className="text-2xl font-mono font-bold text-[#22c55e]">
                        {battle.wager} pts
                      </p>
                    </div>
                  </div>

                  {/* Time and Action */}
                  <div className="flex items-center justify-between">
                    {battle.status === "in-progress" && (
                      <div>
                        <p className="text-[10px] font-mono text-[#999999] uppercase tracking-wider block mb-1">
                          Time Remaining
                        </p>
                        <p className="text-xl font-mono font-bold text-[#22c55e]">
                          {battle.timeRemaining}
                        </p>
                      </div>
                    )}
                    {battle.status === "pending" && (
                      <div>
                        <p className="text-[10px] font-mono text-[#999999] uppercase tracking-wider block mb-1">
                          Time to Accept
                        </p>
                        <p className="text-xl font-mono font-bold text-[#f97316]">
                          {battle.timeRemaining}
                        </p>
                      </div>
                    )}
                    {battle.status === "in-progress" && (
                      <Button
                        variant="primary"
                        size="md"
                        className="rounded flex items-center gap-2"
                      >
                        Continue Battle
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    )}
                    {battle.status === "pending" && (
                      <Button
                        variant="secondary"
                        size="md"
                        className="rounded"
                        disabled
                      >
                        Awaiting Opponent
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
          </section>

          {/* Empty State */}
          {filteredBattles.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16">
              <Swords className="w-12 h-12 mb-4 text-[#999999]" />
              <Text variant="h2" color="muted" className="mb-2">
                No battles found
              </Text>
              <Text variant="body" color="muted">
                Challenge someone to start your first battle
              </Text>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function MyBattlesPage() {
  return (
    <SidebarProvider>
      <MyBattlesContent />
    </SidebarProvider>
  );
}
