"use client";

import {
  HeaderSection,
  HeroCard,
  GlobalRankCard,
  AnalysisCard,
  SubjectRatingsCard,
  TournamentCard,
} from "./_sections";

const USER_DATA = {
  seasonInfo: "Season 4 • Week 2",
  userName: "Tushar",
  userInitials: "TB",
  level: 42,
  xp: 240,
  league: "Grandmaster League",
  levelProgress: 78,
};

const HERO_DATA = {
  badge: "Win Streak: 5",
  title: "Your Physics Rating is peaking.",
  description:
    "You are 20 points away from the Diamond League. A win in Quantum Mechanics topics will secure your promotion.",
  playersOnline: 1204,
};

const RANK_DATA = {
  rank: 42,
  percentile: "Top 1%",
  tier: "Grandmaster",
  progress: 90,
};

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

const SUBJECT_RATINGS = [
  { subject: "math" as const, rating: "1,450", progress: 80 },
  { subject: "physics" as const, rating: "1,320", progress: 72 },
  { subject: "chemistry" as const, rating: "1,105", progress: 58 },
  { subject: "biology" as const, rating: "1,180", progress: 65 },
];

const TOURNAMENT_DATA = {
  title: "Weekly Tournament",
  description: '"Science Olympiad" starts in 2 hours.',
};

export default function DashboardPage() {
  const handleFindMatch = () => {
    // Navigate to battles page or open matchmaking
  };

  const handleRegisterTournament = () => {
    // Navigate to tournament registration
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <HeaderSection {...USER_DATA} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Row 1: Hero + Stats */}
        <HeroCard {...HERO_DATA} onFindMatch={handleFindMatch} />
        <GlobalRankCard {...RANK_DATA} />

        {/* Row 2: Analysis + Ratings + Tournament */}
        <AnalysisCard items={ANALYSIS_ITEMS} />
        <SubjectRatingsCard ratings={SUBJECT_RATINGS} />
        <TournamentCard
          {...TOURNAMENT_DATA}
          onRegister={handleRegisterTournament}
        />
      </div>
    </div>
  );
}
