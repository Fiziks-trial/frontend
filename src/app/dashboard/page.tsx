"use client";

import { useAuth } from "@/lib/auth-context";
import { useUserStats } from "@/hooks/api";
import {
  HeaderSection,
  HeroCard,
  GlobalRankCard,
  AnalysisCard,
  SubjectRatingsCard,
  TournamentCard,
} from "./_sections";
import type { Subject } from "@/design-system";
import type { UserSubjectStats } from "@/lib/types";

function getInitials(name: string | null): string {
  if (!name) return "??";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function calculateProgress(elo: number): number {
  const minElo = 1000;
  const maxElo = 2000;
  return Math.min(100, Math.max(0, ((elo - minElo) / (maxElo - minElo)) * 100));
}

function getTier(elo: number): string {
  if (elo >= 2200) return "Grandmaster";
  if (elo >= 2000) return "Diamond";
  if (elo >= 1800) return "Platinum";
  if (elo >= 1600) return "Gold";
  if (elo >= 1400) return "Silver";
  return "Bronze";
}

const ANALYSIS_ITEMS = [
  {
    id: "1",
    text: "Review 3 missed organic chemistry reactions",
    completed: false,
  },
  {
    id: "2",
    text: "Calculus integration speed improved by 15%",
    completed: true,
  },
];

const TOURNAMENT_DATA = {
  title: "Weekly Tournament",
  description: '"Science Olympiad" starts in 2 hours.',
};

export default function DashboardPage() {
  const { user } = useAuth();
  const { data: stats, isLoading } = useUserStats(user?.id ?? "");

  const handleFindMatch = () => {
    // Navigate to battles page
  };

  const handleRegisterTournament = () => {
    // Navigate to tournament registration
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="animate-pulse space-y-6">
          <div className="h-12 bg-muted rounded-lg w-1/3" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6">
            <div className="lg:col-span-8 h-48 bg-muted rounded-lg" />
            <div className="lg:col-span-4 h-48 bg-muted rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  const subjectStats = stats ?? [];
  const totalElo = subjectStats.reduce(
    (sum: number, s: UserSubjectStats) => sum + s.elo,
    0,
  );
  const avgElo = subjectStats.length
    ? Math.round(totalElo / subjectStats.length)
    : 1200;

  const userData = {
    seasonInfo: "Season 4 • Week 2",
    userName: user?.name?.split(" ")[0] ?? user?.username ?? "Player",
    userInitials: getInitials(user?.name ?? user?.username ?? null),
    level: Math.floor((user?.xp ?? 0) / 100) + 1,
    xp: (user?.xp ?? 0) % 100,
    league: `${getTier(avgElo)} League`,
    levelProgress: (user?.xp ?? 0) % 100,
  };

  const heroData = {
    badge: `Win Streak: ${subjectStats[0]?.currentStreak ?? 0}`,
    title: "Your Physics Rating is peaking.",
    description:
      "You are 20 points away from the Diamond League. A win in Quantum Mechanics topics will secure your promotion.",
    playersOnline: 1204,
  };

  const rankData = {
    rank: 42,
    percentile: "Top 1%",
    tier: getTier(avgElo),
    progress: calculateProgress(avgElo),
  };

  const subjectRatings = subjectStats.map((stat: UserSubjectStats) => ({
    subject: stat.subject.slug as Subject,
    rating: stat.elo.toLocaleString(),
    progress: calculateProgress(stat.elo),
  }));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <HeaderSection {...userData} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6">
        <HeroCard {...heroData} onFindMatch={handleFindMatch} />
        <GlobalRankCard {...rankData} />

        <AnalysisCard items={ANALYSIS_ITEMS} />
        <SubjectRatingsCard ratings={subjectRatings} />
        <TournamentCard
          {...TOURNAMENT_DATA}
          onRegister={handleRegisterTournament}
        />
      </div>
    </div>
  );
}
