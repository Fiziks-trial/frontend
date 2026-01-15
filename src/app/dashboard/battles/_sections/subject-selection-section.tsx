"use client";

import {
  Card,
  Badge,
  Text,
  Grid,
  SUBJECT_LIST,
  type Subject,
} from "@/design-system";

type Difficulty = "easy" | "medium" | "hard" | "expert";

const DIFFICULTIES: { id: Difficulty; label: string; color: string }[] = [
  { id: "easy", label: "Easy", color: "bg-success/20 text-success" },
  { id: "medium", label: "Medium", color: "bg-warning/20 text-warning" },
  { id: "hard", label: "Hard", color: "bg-destructive/20 text-destructive" },
  { id: "expert", label: "Expert", color: "bg-purple-500/20 text-purple-600" },
];

const SUBJECT_DESCRIPTIONS: Record<Subject, string> = {
  physics: "Mechanics, Thermodynamics, Electromagnetism",
  math: "Algebra, Calculus, Geometry, Statistics",
  chemistry: "Organic, Inorganic, Physical Chemistry",
  biology: "Cell Biology, Genetics, Ecology",
};

interface SubjectSelectionSectionProps {
  selectedSubject: Subject | null;
  selectedDifficulty: Difficulty;
  onSubjectChange: (subject: Subject) => void;
  onDifficultyChange: (difficulty: Difficulty) => void;
}

export function SubjectSelectionSection({
  selectedSubject,
  selectedDifficulty,
  onSubjectChange,
  onDifficultyChange,
}: SubjectSelectionSectionProps) {
  return (
    <div className="lg:col-span-2">
      <Text variant="h3" className="mb-4">
        Select Subject
      </Text>
      <Grid cols={1} colsMd={2} gap="md">
        {SUBJECT_LIST.map((subject) => {
          const Icon = subject.icon;
          const isSelected = selectedSubject === subject.id;
          return (
            <Card
              key={subject.id}
              hover
              className={[
                "cursor-pointer transition-all",
                isSelected && "ring-2 ring-primary ring-offset-2",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => onSubjectChange(subject.id)}
            >
              <div className="flex items-start gap-4">
                <div
                  className={[
                    "p-3 rounded-xl",
                    subject.bgColor,
                    subject.color,
                  ].join(" ")}
                >
                  <Icon size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <Text variant="h4">{subject.label}</Text>
                    {isSelected && (
                      <Badge variant="info" size="sm">
                        Selected
                      </Badge>
                    )}
                  </div>
                  <Text
                    variant="body-sm"
                    color="muted"
                    className="mt-1 line-clamp-2"
                  >
                    {SUBJECT_DESCRIPTIONS[subject.id]}
                  </Text>
                </div>
              </div>
            </Card>
          );
        })}
      </Grid>

      {/* Difficulty Selection */}
      <div className="mt-8">
        <Text variant="h3" className="mb-4">
          Difficulty
        </Text>
        <div className="flex flex-wrap gap-2">
          {DIFFICULTIES.map((diff) => {
            const isSelected = selectedDifficulty === diff.id;
            return (
              <button
                key={diff.id}
                type="button"
                onClick={() => onDifficultyChange(diff.id)}
                className={[
                  "px-4 py-2 rounded-xl text-sm font-medium transition-all",
                  isSelected
                    ? `${diff.color} ring-2 ring-offset-2 ring-current`
                    : "bg-secondary text-muted-foreground hover:text-foreground",
                ].join(" ")}
              >
                {diff.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export type { Difficulty };
