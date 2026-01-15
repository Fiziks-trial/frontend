"use client";

import { useState } from "react";
import { DashboardPageHeader } from "@/design-system";
import {
  FiltersSection,
  LeaderboardTable,
  YourRankCard,
  type SubjectFilter,
  type TimeRange,
  type LeaderboardEntry,
} from "./_sections";

const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  {
    rank: 1,
    previousRank: 1,
    userId: "1",
    name: "PhysicsWizard",
    initials: "PW",
    rating: 2450,
    wins: 342,
    losses: 58,
    winStreak: 12,
    tier: "grandmaster",
  },
  {
    rank: 2,
    previousRank: 3,
    userId: "2",
    name: "MathGenius",
    initials: "MG",
    rating: 2380,
    wins: 298,
    losses: 72,
    winStreak: 5,
    tier: "grandmaster",
  },
  {
    rank: 3,
    previousRank: 2,
    userId: "3",
    name: "ChemMaster",
    initials: "CM",
    rating: 2320,
    wins: 276,
    losses: 84,
    winStreak: 0,
    tier: "diamond",
  },
  {
    rank: 4,
    previousRank: 5,
    userId: "4",
    name: "BioExpert",
    initials: "BE",
    rating: 2280,
    wins: 254,
    losses: 96,
    winStreak: 3,
    tier: "diamond",
  },
  {
    rank: 5,
    previousRank: 4,
    userId: "5",
    name: "ScienceKing",
    initials: "SK",
    rating: 2240,
    wins: 232,
    losses: 108,
    winStreak: 0,
    tier: "diamond",
  },
  {
    rank: 6,
    previousRank: 8,
    userId: "6",
    name: "AtomSmasher",
    initials: "AS",
    rating: 2180,
    wins: 210,
    losses: 120,
    winStreak: 8,
    tier: "platinum",
  },
  {
    rank: 7,
    previousRank: 6,
    userId: "7",
    name: "QuantumLeap",
    initials: "QL",
    rating: 2150,
    wins: 198,
    losses: 132,
    winStreak: 0,
    tier: "platinum",
  },
  {
    rank: 8,
    previousRank: 7,
    userId: "8",
    name: "FormulaOne",
    initials: "FO",
    rating: 2120,
    wins: 186,
    losses: 144,
    winStreak: 2,
    tier: "platinum",
  },
  {
    rank: 9,
    previousRank: 10,
    userId: "9",
    name: "ElementalPro",
    initials: "EP",
    rating: 2080,
    wins: 174,
    losses: 156,
    winStreak: 4,
    tier: "gold",
  },
  {
    rank: 10,
    previousRank: 9,
    userId: "10",
    name: "NeuronNinja",
    initials: "NN",
    rating: 2040,
    wins: 162,
    losses: 168,
    winStreak: 0,
    tier: "gold",
  },
];

const CURRENT_USER = {
  rank: 42,
  name: "Tushar B.",
  initials: "TB",
  tier: "grandmaster" as const,
  rating: 1850,
};

export default function LeaderboardPage() {
  const [selectedSubject, setSelectedSubject] = useState<SubjectFilter>("all");
  const [selectedTimeRange, setSelectedTimeRange] =
    useState<TimeRange>("weekly");

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <DashboardPageHeader
        title="Leaderboards"
        subtitle="See how you stack up against other players"
      />

      <FiltersSection
        selectedSubject={selectedSubject}
        selectedTimeRange={selectedTimeRange}
        onSubjectChange={setSelectedSubject}
        onTimeRangeChange={setSelectedTimeRange}
      />

      <LeaderboardTable entries={MOCK_LEADERBOARD} />

      <YourRankCard {...CURRENT_USER} />
    </div>
  );
}
