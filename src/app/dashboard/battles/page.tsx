"use client";

import { useState } from "react";
import { Clock } from "lucide-react";
import {
  Text,
  Grid,
  DashboardPageHeader,
  SUBJECT_LIST,
  type Subject,
} from "@/design-system";
import { useSubjects } from "@/hooks/api";
import {
  QuickMatchSection,
  SearchingSection,
  SubjectSelectionSection,
  GameModeSection,
  type Difficulty,
  type GameMode,
} from "./_sections";

const QUEUE_STATS = {
  playersOnline: 1204,
  avgWaitTime: "~30s",
  activeMatches: 342,
};

export default function BattlesPage() {
  const { data: apiSubjects } = useSubjects();

  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedMode, setSelectedMode] = useState<GameMode>("ranked");
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<Difficulty>("medium");
  const [isSearching, setIsSearching] = useState(false);

  const handleFindMatch = () => {
    if (!selectedSubject) return;
    setIsSearching(true);
    // TODO: Implement actual matchmaking via WebSocket
    setTimeout(() => setIsSearching(false), 3000);
  };

  const handleQuickMatch = () => {
    // Use API subjects if available, fallback to design-system list
    const subjects = apiSubjects?.length
      ? apiSubjects.map((s) => s.slug as Subject)
      : SUBJECT_LIST.map((s) => s.id);

    const randomSubject = subjects[Math.floor(Math.random() * subjects.length)];
    setSelectedSubject(randomSubject);
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <DashboardPageHeader
        title="Find Match"
        subtitle="Challenge opponents and test your knowledge"
        action={
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-success animate-pulse" />
              <Text variant="body-sm" color="muted">
                {QUEUE_STATS.playersOnline.toLocaleString()} online
              </Text>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-muted-foreground" />
              <Text variant="body-sm" color="muted">
                {QUEUE_STATS.avgWaitTime} avg wait
              </Text>
            </div>
          </div>
        }
      />

      {isSearching ? (
        <SearchingSection
          selectedSubject={selectedSubject}
          onCancel={() => setIsSearching(false)}
        />
      ) : (
        <>
          <QuickMatchSection onQuickMatch={handleQuickMatch} />

          <Grid cols={1} colsLg={3} gap="lg">
            <SubjectSelectionSection
              selectedSubject={selectedSubject}
              selectedDifficulty={selectedDifficulty}
              onSubjectChange={setSelectedSubject}
              onDifficultyChange={setSelectedDifficulty}
            />

            <GameModeSection
              selectedMode={selectedMode}
              selectedSubject={selectedSubject}
              avgWaitTime={QUEUE_STATS.avgWaitTime}
              onModeChange={setSelectedMode}
              onFindMatch={handleFindMatch}
            />
          </Grid>
        </>
      )}
    </div>
  );
}
