"use client";

import { Search, Trophy, Target, Users } from "lucide-react";
import { Card, MatchCard, EmptyState, type Subject } from "@/design-system";

interface MatchEntry {
  id: string;
  subject: Subject;
  opponent: {
    name: string;
    rating: number;
  };
  result: "win" | "loss";
  ratingChange: number;
  yourScore: number;
  opponentScore: number;
  duration: string;
  date: string;
  mode: "ranked" | "casual" | "practice";
}

interface MatchListProps {
  matches: MatchEntry[];
  onMatchClick?: (matchId: string) => void;
  onLoadMore?: () => void;
}

const modeConfig = {
  ranked: { icon: <Trophy size={12} />, label: "Ranked" },
  casual: { icon: <Users size={12} />, label: "Casual" },
  practice: { icon: <Target size={12} />, label: "Practice" },
};

export function MatchList({
  matches,
  onMatchClick,
  onLoadMore,
}: MatchListProps) {
  if (matches.length === 0) {
    return (
      <Card>
        <EmptyState
          icon={<Search size={48} />}
          title="No matches found"
          description="No matches found with the selected filters. Try adjusting your filters to see more results."
        />
      </Card>
    );
  }

  return (
    <>
      <div className="space-y-3">
        {matches.map((match) => (
          <MatchCard
            key={match.id}
            subject={match.subject}
            result={match.result}
            opponent={match.opponent}
            yourScore={match.yourScore}
            opponentScore={match.opponentScore}
            ratingChange={match.ratingChange}
            date={match.date}
            duration={match.duration}
            mode={modeConfig[match.mode]}
            onClick={() => onMatchClick?.(match.id)}
          />
        ))}
      </div>

      {onLoadMore && (
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={onLoadMore}
            className="px-6 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Load more matches...
          </button>
        </div>
      )}
    </>
  );
}
