"use client";

import { Filter } from "lucide-react";
import { Card, Text, SUBJECT_LIST, type Subject } from "@/design-system";

type SubjectFilter = "all" | Subject;
type GameMode = "all" | "ranked" | "casual" | "practice";
type Result = "all" | "win" | "loss";

interface FiltersSectionProps {
  selectedSubject: SubjectFilter;
  selectedMode: GameMode;
  selectedResult: Result;
  onSubjectChange: (subject: SubjectFilter) => void;
  onModeChange: (mode: GameMode) => void;
  onResultChange: (result: Result) => void;
}

const modeOptions = [
  { id: "all" as const, label: "All" },
  { id: "ranked" as const, label: "Ranked" },
  { id: "casual" as const, label: "Casual" },
  { id: "practice" as const, label: "Practice" },
];

const resultOptions = [
  { id: "all" as const, label: "All" },
  { id: "win" as const, label: "Wins" },
  { id: "loss" as const, label: "Losses" },
];

export function FiltersSection({
  selectedSubject,
  selectedMode,
  selectedResult,
  onSubjectChange,
  onModeChange,
  onResultChange,
}: FiltersSectionProps) {
  return (
    <Card className="mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter size={16} className="text-muted-foreground" />
        <Text variant="body" className="font-medium">
          Filters
        </Text>
      </div>

      <div className="flex flex-wrap gap-6">
        {/* Subject Filter */}
        <div>
          <Text variant="caption" color="muted" className="mb-2 block">
            Subject
          </Text>
          <div className="flex flex-wrap gap-2">
            <FilterButton
              active={selectedSubject === "all"}
              onClick={() => onSubjectChange("all")}
            >
              All
            </FilterButton>
            {SUBJECT_LIST.map((subject) => (
              <FilterButton
                key={subject.id}
                active={selectedSubject === subject.id}
                onClick={() => onSubjectChange(subject.id)}
              >
                {subject.label}
              </FilterButton>
            ))}
          </div>
        </div>

        {/* Mode Filter */}
        <div>
          <Text variant="caption" color="muted" className="mb-2 block">
            Mode
          </Text>
          <div className="flex flex-wrap gap-2">
            {modeOptions.map((mode) => (
              <FilterButton
                key={mode.id}
                active={selectedMode === mode.id}
                onClick={() => onModeChange(mode.id)}
              >
                {mode.label}
              </FilterButton>
            ))}
          </div>
        </div>

        {/* Result Filter */}
        <div>
          <Text variant="caption" color="muted" className="mb-2 block">
            Result
          </Text>
          <div className="flex flex-wrap gap-2">
            {resultOptions.map((result) => (
              <FilterButton
                key={result.id}
                active={selectedResult === result.id}
                onClick={() => onResultChange(result.id)}
              >
                {result.label}
              </FilterButton>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
        active
          ? "bg-primary text-primary-foreground"
          : "bg-secondary text-muted-foreground hover:text-foreground",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
