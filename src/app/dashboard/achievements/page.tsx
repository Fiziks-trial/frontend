"use client";

import { Award, Star, Zap, Lock, Trophy, Target } from "lucide-react";
import { useState } from "react";

import { Sidebar } from "@/components/layout/Sidebar";
import {
  SidebarProvider,
  useSidebar,
} from "@/components/layout/SidebarContext";
import { Badge } from "@/design-system/primitives/Badge/Badge";
import { Card } from "@/design-system/primitives/Card/Card";
import { Text } from "@/design-system/primitives/Text/Text";

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  difficulty: "Easy" | "Medium" | "Hard" | "Legend";
  status: "unlocked" | "locked";
  progress: number;
  maxProgress: number;
  reward: number;
  unlockedDate?: string;
}

interface UserStats {
  totalAchievements: number;
  unlockedCount: number;
  completionPercentage: number;
  totalRewards: number;
}

const USER_STATS: UserStats = {
  totalAchievements: 32,
  unlockedCount: 18,
  completionPercentage: 56,
  totalRewards: 4200,
};

const ACHIEVEMENTS: Achievement[] = [
  {
    id: "1",
    name: "First Steps",
    description: "Complete your first problem",
    icon: <Target className="w-6 h-6" />,
    difficulty: "Easy",
    status: "unlocked",
    progress: 1,
    maxProgress: 1,
    reward: 100,
    unlockedDate: "Jan 5, 2026",
  },
  {
    id: "2",
    name: "Problem Solver",
    description: "Solve 25 problems",
    icon: <Star className="w-6 h-6" />,
    difficulty: "Easy",
    status: "unlocked",
    progress: 25,
    maxProgress: 25,
    reward: 250,
    unlockedDate: "Jan 8, 2026",
  },
  {
    id: "3",
    name: "Speed Demon",
    description: "Solve a problem in under 30 seconds",
    icon: <Zap className="w-6 h-6" />,
    difficulty: "Medium",
    status: "unlocked",
    progress: 1,
    maxProgress: 1,
    reward: 300,
    unlockedDate: "Jan 9, 2026",
  },
  {
    id: "4",
    name: "Perfect Streak",
    description: "Maintain a 7-day win streak",
    icon: <Trophy className="w-6 h-6" />,
    difficulty: "Medium",
    status: "unlocked",
    progress: 1,
    maxProgress: 1,
    reward: 400,
    unlockedDate: "Jan 10, 2026",
  },
  {
    id: "5",
    name: "Master Physicist",
    description: "Reach level 10 in Physics",
    icon: <Award className="w-6 h-6" />,
    difficulty: "Hard",
    status: "unlocked",
    progress: 1,
    maxProgress: 1,
    reward: 500,
    unlockedDate: "Jan 6, 2026",
  },
  {
    id: "6",
    name: "Century Club",
    description: "Solve 100 problems",
    icon: <Star className="w-6 h-6" />,
    difficulty: "Hard",
    status: "locked",
    progress: 67,
    maxProgress: 100,
    reward: 750,
  },
  {
    id: "7",
    name: "Battle Master",
    description: "Win 25 battles",
    icon: <Trophy className="w-6 h-6" />,
    difficulty: "Hard",
    status: "locked",
    progress: 12,
    maxProgress: 25,
    reward: 600,
  },
  {
    id: "8",
    name: "Legendary Status",
    description: "Reach level 15 in any subject",
    icon: <Award className="w-6 h-6" />,
    difficulty: "Legend",
    status: "locked",
    progress: 0,
    maxProgress: 1,
    reward: 1000,
  },
  {
    id: "9",
    name: "Consistency King",
    description: "Maintain a 30-day win streak",
    icon: <Zap className="w-6 h-6" />,
    difficulty: "Legend",
    status: "locked",
    progress: 10,
    maxProgress: 30,
    reward: 1500,
  },
  {
    id: "10",
    name: "Mind Master",
    description: "Reach rank 1 on the leaderboard",
    icon: <Trophy className="w-6 h-6" />,
    difficulty: "Legend",
    status: "locked",
    progress: 0,
    maxProgress: 1,
    reward: 2000,
  },
];

const ACHIEVEMENT_FILTERS = ["All", "Unlocked", "Locked"];

function AchievementsContent() {
  const { isCollapsed } = useSidebar();
  const [selectedFilter, setSelectedFilter] = useState("All");

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "success";
      case "Medium":
        return "warning";
      case "Hard":
        return "error";
      case "Legend":
        return "purple";
      default:
        return "default";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    return status === "unlocked" ? "success" : "default";
  };

  const filteredAchievements = ACHIEVEMENTS.filter((achievement) => {
    if (selectedFilter === "Unlocked") return achievement.status === "unlocked";
    if (selectedFilter === "Locked") return achievement.status === "locked";
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
          <header className="mb-4 lg:mb-6">
            <Text variant="status" color="muted" className="mb-1">
              /// ACHIEVEMENTS
            </Text>
            <Text variant="h2" color="primary" className="mb-1">
              Achievements
            </Text>
            <Text variant="bodySmall" color="muted">
              Unlock achievements and earn rewards
            </Text>
          </header>

          {/* Stats Overview */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Trophy className="w-4 h-4 text-[#22c55e]" />
              <Text variant="caption" color="accent" uppercase font="mono">
                Your Progress
              </Text>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2 lg:gap-3">
              {/* Total Achievements */}
              <Card variant="glow" className="p-3 lg:p-4">
                <Text
                  variant="caption"
                  color="muted"
                  className="mb-0.5 lg:mb-1 uppercase tracking-wider"
                  font="mono"
                >
                  Total Achievements
                </Text>
                <Text variant="h3" color="primary" className="mb-1 lg:mb-2">
                  {USER_STATS.unlockedCount}/{USER_STATS.totalAchievements}
                </Text>
              </Card>

              {/* Completion Rate */}
              <Card variant="glow" className="p-3 lg:p-4">
                <Text
                  variant="caption"
                  color="muted"
                  className="mb-0.5 lg:mb-1 uppercase tracking-wider"
                  font="mono"
                >
                  Completion Rate
                </Text>
                <Text variant="h3" color="accent" className="mb-1 lg:mb-2">
                  {USER_STATS.completionPercentage}%
                </Text>
              </Card>

              {/* Unlocked Count */}
              <Card variant="glow" className="p-3 lg:p-4">
                <Text
                  variant="caption"
                  color="muted"
                  className="mb-0.5 lg:mb-1 uppercase tracking-wider"
                  font="mono"
                >
                  Unlocked
                </Text>
                <Text variant="h3" color="accent" className="mb-1 lg:mb-2">
                  {USER_STATS.unlockedCount}
                </Text>
              </Card>

          {/* Total Rewards */}
          <Card variant="glow" className="p-6">
            <div className="mb-4">
              <Zap className="w-8 h-8 mb-3" />
              <span className="text-[10px] font-mono text-[#999999] uppercase tracking-wider">
                Total Rewards
              </span>
            </div>
            <p className="text-4xl font-mono font-bold text-white">
              {USER_STATS.totalRewards.toLocaleString()}
            </p>
          </Card>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-3 mb-8">
          {ACHIEVEMENT_FILTERS.map((filter) => (
            <button
              type="button"
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-6 py-2 rounded-full transition-all ${
                selectedFilter === filter
                  ? "bg-[#22c55e]"
                  : "bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)]"
              }`}
            >
              <span
                className={`text-xs font-mono ${selectedFilter === filter ? "text-white font-semibold" : "text-[#999999] font-medium"}`}
              >
                {filter}
              </span>
            </button>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredAchievements.map((achievement) => (
            <Card
              key={achievement.id}
              variant="glow"
              className={`p-6 flex flex-col h-full hover:shadow-[0_0_20px_rgba(34,197,94,0.2)] transition-all duration-200 ${
                achievement.status === "locked" ? "opacity-60" : ""
              }`}
            >
              {/* Status Badge */}
              <div className="flex items-center justify-between mb-4">
                <Badge variant={getStatusBadgeColor(achievement.status)}>
                  {achievement.status === "unlocked" ? "Unlocked" : "Locked"}
                </Badge>
                <Badge variant={getDifficultyColor(achievement.difficulty)}>
                  {achievement.difficulty}
                </Badge>
              </div>

              {/* Icon */}
              <div className="mb-4">
                <div className="w-12 h-12 rounded-lg bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.3)] flex items-center justify-center">
                  {achievement.icon}
                </div>
              </div>

              {/* Achievement Info */}
              <div className="flex-1">
                <p className="text-base font-mono font-semibold text-white mb-2">
                  {achievement.name}
                </p>
                <p className="text-[10px] font-mono text-[#999999] mb-4 block uppercase tracking-wider">
                  {achievement.description}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-[#999999] uppercase tracking-wider">
                    Progress
                  </span>
                  <span className="text-[10px] font-mono text-[#22c55e] uppercase tracking-wider">
                    {achievement.progress}/{achievement.maxProgress}
                  </span>
                </div>
                <div className="w-full h-2 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#22c55e] transition-all duration-300"
                    style={{
                      width: `${(achievement.progress / achievement.maxProgress) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Reward */}
              <div className="flex items-center justify-between pt-4 border-t border-[rgba(255,255,255,0.1)]">
                <span className="text-[10px] font-mono text-[#999999] uppercase tracking-wider">
                  Reward
                </span>
                <p className="text-base font-mono font-bold text-[#22c55e]">
                  +{achievement.reward}
                </p>
              </div>

              {/* Unlocked Date */}
              {achievement.status === "unlocked" &&
                achievement.unlockedDate && (
                  <p className="text-[10px] font-mono text-[#999999] mt-3 pt-3 border-t border-[rgba(255,255,255,0.1)] uppercase tracking-wider">
                    Unlocked: {achievement.unlockedDate}
                  </p>
                )}
            </Card>
          ))}
            </div>
          </section>

          {/* Empty State */}
          {filteredAchievements.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16">
              <Lock className="w-12 h-12 mb-4 text-[#999999]" />
              <Text variant="h2" color="muted" className="mb-2">
                No achievements found
              </Text>
              <Text variant="body" color="muted">
                Keep solving problems to unlock achievements
              </Text>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function AchievementsPage() {
  return (
    <SidebarProvider>
      <AchievementsContent />
    </SidebarProvider>
  );
}
