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
import { useAuth } from "@/lib/auth-context";
import { useUserMatches } from "@/hooks/api";
import type { MatchHistoryItem } from "@/lib/types";
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

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function formatDate(dateString: string): { date: string; time: string } {
  const date = new Date(dateString);
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);

  let dateStr: string;
  if (date.toDateString() === now.toDateString()) {
    dateStr = "Today";
  } else if (date.toDateString() === yesterday.toDateString()) {
    dateStr = "Yesterday";
  } else {
    dateStr = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }

  const timeStr = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return { date: dateStr, time: timeStr };
}

function calculateDuration(start: string, end: string | null): string {
  if (!end) return "--:--";
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffMs = endDate.getTime() - startDate.getTime();
  const minutes = Math.floor(diffMs / 60000);
  const seconds = Math.floor((diffMs % 60000) / 1000);
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

// Map subject name to slug for UI
function getSubjectSlug(name: string): Subject {
  const lower = name.toLowerCase();
  if (lower.includes("physics")) return "physics";
  if (lower.includes("math")) return "math";
  if (lower.includes("chem")) return "chemistry";
  if (lower.includes("bio")) return "biology";
  return "physics";
}

function transformMatch(match: MatchHistoryItem): MatchEntry {
  const { date, time } = formatDate(match.createdAt);
  return {
    id: match.id,
    subject: getSubjectSlug(match.subject.name),
    opponent: {
      name: match.opponent.username || "Unknown",
      initials: getInitials(match.opponent.username || "??"),
      rating: match.player.ratingBefore,
    },
    result: match.result === "draw" ? "loss" : match.result,
    ratingChange: match.player.ratingChange,
    yourScore: match.player.score,
    opponentScore: match.opponent.score,
    duration: calculateDuration(match.createdAt, match.endedAt),
    date,
    time,
    mode: "ranked",
  };
}

export default function HistoryPage() {
  const { user } = useAuth();
  const { data, isLoading } = useUserMatches(user?.id ?? "");

  const [selectedSubject, setSelectedSubject] = useState<SubjectFilter>("all");
  const [selectedMode, setSelectedMode] = useState<GameMode>("all");
  const [selectedResult, setSelectedResult] = useState<Result>("all");

  const matches = (data?.matches ?? []).map(transformMatch);

  const filteredMatches = matches.filter((match) => {
    if (selectedSubject !== "all" && match.subject !== selectedSubject)
      return false;
    if (selectedMode !== "all" && match.mode !== selectedMode) return false;
    if (selectedResult !== "all" && match.result !== selectedResult)
      return false;
    return true;
  });

  const stats = {
    totalMatches: matches.length,
    wins: matches.filter((m) => m.result === "win").length,
    losses: matches.filter((m) => m.result === "loss").length,
    winRate:
      matches.length > 0
        ? Math.round(
            (matches.filter((m) => m.result === "win").length /
              matches.length) *
              100,
          )
        : 0,
    totalRatingChange: matches.reduce((acc, m) => acc + m.ratingChange, 0),
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="animate-pulse space-y-6">
          <div className="h-12 bg-muted rounded-lg w-1/3" />
          <div className="h-24 bg-muted rounded-lg" />
          <div className="h-64 bg-muted rounded-lg" />
        </div>
      </div>
    );
  }

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
            description={
              matches.length === 0
                ? "Play some matches to see your history here."
                : "No matches found with the selected filters."
            }
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
