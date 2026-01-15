"use client";

import Link from "next/link";
import { Clock, Target } from "lucide-react";
import {
  Card,
  Badge,
  Text,
  Stack,
  SUBJECTS,
  type Subject,
} from "@/design-system";

type Difficulty = "easy" | "medium" | "hard";

export interface Problem {
  id: string;
  title: string;
  subject: Subject;
  difficulty: Difficulty;
  topic: string;
  points: number;
  timeLimit: number;
  solvedCount: number;
}

const DIFFICULTY_COLORS: Record<
  Difficulty,
  "success" | "warning" | "destructive"
> = {
  easy: "success",
  medium: "warning",
  hard: "destructive",
};

interface ProblemCardProps {
  problem: Problem;
}

export function ProblemCard({ problem }: ProblemCardProps) {
  const subject = SUBJECTS[problem.subject];
  const SubjectIcon = subject.icon;

  return (
    <Link href={`/dashboard/problems/${problem.id}`}>
      <Card hover className="h-full">
        <Stack gap="md">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className={[
                  "p-2 rounded-lg",
                  subject.bgColor,
                  subject.color,
                ].join(" ")}
              >
                <SubjectIcon size={18} />
              </div>
              <div>
                <Text variant="caption" color="muted">
                  {problem.topic}
                </Text>
                <Text variant="h4" className="line-clamp-1">
                  {problem.title}
                </Text>
              </div>
            </div>
            <Badge variant={DIFFICULTY_COLORS[problem.difficulty]} size="sm">
              {problem.difficulty}
            </Badge>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Clock size={14} />
                <Text variant="body-sm" color="muted">
                  {Math.floor(problem.timeLimit / 60)} min
                </Text>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Target size={14} />
                <Text variant="body-sm" color="muted">
                  {problem.solvedCount.toLocaleString()} solved
                </Text>
              </div>
            </div>
            <div className="flex items-center gap-1 text-success">
              <Text variant="mono" className="text-success font-bold">
                +{problem.points}
              </Text>
              <Text variant="body-sm" color="muted">
                pts
              </Text>
            </div>
          </div>
        </Stack>
      </Card>
    </Link>
  );
}
