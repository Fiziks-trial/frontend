"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import {
  Card,
  DashboardPageHeader,
  EmptyState,
  Text,
  type Subject,
} from "@/design-system";
import { StatsSummary, FiltersSection, MatchList } from "./_sections";

type SubjectFilter = "all" | Subject;
type GameMode = "all" | "ranked" | "casual" | "practice";
type Result = "all" | "win" | "loss";

export interface MatchEntry {
  id: string;
  subject: Subject;
  opponent: {
    name: string;
    initials: string;
    rating: number;
  };
  result: "win" | "loss";
  ratingChange: number;
  yourScore: number;
  opponentScore: number;
  duration: string;
  date: string;
  time: string;
  mode: Exclude<GameMode, "all">;
}

const MOCK_MATCHES: MatchEntry[] = [
  {
    id: "1",
    subject: "physics",
    opponent: { name: "PhysicsWizard", initials: "PW", rating: 1842 },
    result: "win",
    ratingChange: 24,
    yourScore: 8,
    opponentScore: 5,
    duration: "12:34",
    date: "Today",
    time: "2:30 PM",
    mode: "ranked",
  },
  {
    id: "2",
    subject: "math",
    opponent: { name: "MathGenius", initials: "MG", rating: 1920 },
    result: "loss",
    ratingChange: -12,
    yourScore: 4,
    opponentScore: 8,
    duration: "10:21",
    date: "Today",
    time: "11:15 AM",
    mode: "ranked",
  },
  {
    id: "3",
    subject: "biology",
    opponent: { name: "BioMaster", initials: "BM", rating: 1756 },
    result: "win",
    ratingChange: 18,
    yourScore: 7,
    opponentScore: 6,
    duration: "14:52",
    date: "Yesterday",
    time: "8:45 PM",
    mode: "ranked",
  },
  {
    id: "4",
    subject: "chemistry",
    opponent: { name: "ChemKing", initials: "CK", rating: 1689 },
    result: "win",
    ratingChange: 32,
    yourScore: 9,
    opponentScore: 3,
    duration: "08:17",
    date: "Yesterday",
    time: "4:20 PM",
    mode: "ranked",
  },
  {
    id: "5",
    subject: "physics",
    opponent: { name: "QuantumLeap", initials: "QL", rating: 1801 },
    result: "win",
    ratingChange: 21,
    yourScore: 7,
    opponentScore: 5,
    duration: "11:43",
    date: "Yesterday",
    time: "1:00 PM",
    mode: "casual",
  },
  {
    id: "6",
    subject: "math",
    opponent: { name: "AlgebraAce", initials: "AA", rating: 1778 },
    result: "loss",
    ratingChange: -15,
    yourScore: 5,
    opponentScore: 7,
    duration: "13:28",
    date: "Jan 14",
    time: "7:30 PM",
    mode: "ranked",
  },
  {
    id: "7",
    subject: "chemistry",
    opponent: { name: "MoleculeMan", initials: "MM", rating: 1654 },
    result: "win",
    ratingChange: 28,
    yourScore: 8,
    opponentScore: 4,
    duration: "09:55",
    date: "Jan 14",
    time: "3:15 PM",
    mode: "ranked",
  },
  {
    id: "8",
    subject: "biology",
    opponent: { name: "GeneGenius", initials: "GG", rating: 1712 },
    result: "win",
    ratingChange: 19,
    yourScore: 6,
    opponentScore: 5,
    duration: "15:02",
    date: "Jan 13",
    time: "9:00 PM",
    mode: "practice",
  },
];

export default function HistoryPage() {
  const [selectedSubject, setSelectedSubject] = useState<SubjectFilter>("all");
  const [selectedMode, setSelectedMode] = useState<GameMode>("all");
  const [selectedResult, setSelectedResult] = useState<Result>("all");

  const filteredMatches = MOCK_MATCHES.filter((match) => {
    if (selectedSubject !== "all" && match.subject !== selectedSubject)
      return false;
    if (selectedMode !== "all" && match.mode !== selectedMode) return false;
    if (selectedResult !== "all" && match.result !== selectedResult)
      return false;
    return true;
  });

  const stats = {
    totalMatches: MOCK_MATCHES.length,
    wins: MOCK_MATCHES.filter((m) => m.result === "win").length,
    losses: MOCK_MATCHES.filter((m) => m.result === "loss").length,
    winRate: Math.round(
      (MOCK_MATCHES.filter((m) => m.result === "win").length /
        MOCK_MATCHES.length) *
        100,
    ),
    totalRatingChange: MOCK_MATCHES.reduce((acc, m) => acc + m.ratingChange, 0),
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <DashboardPageHeader
        title="Match History"
        subtitle="Review your past matches and performance"
        action={
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-success" />
              <Text variant="body-sm" color="muted">
                {stats.wins}W
              </Text>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-destructive" />
              <Text variant="body-sm" color="muted">
                {stats.losses}L
              </Text>
            </div>
            <div className="flex items-center gap-2">
              <Text variant="body-sm" className="font-medium">
                {stats.winRate}% WR
              </Text>
            </div>
          </div>
        }
      />

      <StatsSummary
        totalMatches={stats.totalMatches}
        wins={stats.wins}
        losses={stats.losses}
        totalRatingChange={stats.totalRatingChange}
      />

      <FiltersSection
        selectedSubject={selectedSubject}
        selectedMode={selectedMode}
        selectedResult={selectedResult}
        onSubjectChange={setSelectedSubject}
        onModeChange={setSelectedMode}
        onResultChange={setSelectedResult}
      />

      {filteredMatches.length === 0 ? (
        <Card>
          <EmptyState
            icon={<Search size={48} />}
            title="No matches found"
            description="No matches found with the selected filters. Try adjusting your filters to see more results."
          />
        </Card>
      ) : (
        <>
          <MatchList matches={filteredMatches} />
          <div className="mt-6 text-center">
            <button
              type="button"
              className="px-6 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Load more matches...
            </button>
          </div>
        </>
      )}
    </div>
  );
}
