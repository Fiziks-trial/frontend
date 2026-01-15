import type { ReactNode } from "react";
import { TrendingUp, TrendingDown, Clock, Calendar } from "lucide-react";
import { Card } from "../primitives/card";
import { Badge } from "../primitives/badge";
import { Text } from "../primitives/text";
import { SUBJECTS, type Subject } from "../constants/subjects";

export interface MatchCardProps {
  subject: Subject;
  result: "win" | "loss";
  opponent: {
    name: string;
    rating: number;
  };
  yourScore: number;
  opponentScore: number;
  ratingChange: number;
  date: string;
  duration: string;
  mode?: {
    icon: ReactNode;
    label: string;
  };
  onClick?: () => void;
}

export function MatchCard({
  subject,
  result,
  opponent,
  yourScore,
  opponentScore,
  ratingChange,
  date,
  duration,
  mode,
  onClick,
}: MatchCardProps) {
  const subjectConfig = SUBJECTS[subject];
  const SubjectIcon = subjectConfig.icon;

  return (
    <Card hover className="cursor-pointer transition-all" onClick={onClick}>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Result Indicator + Subject */}
        <div className="flex items-center gap-4">
          <div
            className={[
              "size-12 rounded-xl flex items-center justify-center shrink-0",
              result === "win"
                ? "bg-success/10 text-success"
                : "bg-destructive/10 text-destructive",
            ].join(" ")}
          >
            {result === "win" ? (
              <TrendingUp size={24} />
            ) : (
              <TrendingDown size={24} />
            )}
          </div>

          <div
            className={[
              "p-2.5 rounded-lg shrink-0",
              subjectConfig.bgColor,
              subjectConfig.color,
            ].join(" ")}
          >
            <SubjectIcon size={18} />
          </div>
        </div>

        {/* Match Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <Badge variant={subjectConfig.badgeVariant} size="sm">
              {subjectConfig.label}
            </Badge>
            <Badge
              variant={result === "win" ? "success" : "destructive"}
              size="sm"
            >
              {result === "win" ? "Victory" : "Defeat"}
            </Badge>
            {mode && (
              <div className="flex items-center gap-1 text-muted-foreground">
                {mode.icon}
                <Text variant="caption">{mode.label}</Text>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Text variant="body" className="font-medium">
              vs {opponent.name}
            </Text>
            <Text variant="body-sm" color="muted">
              ({opponent.rating} ELO)
            </Text>
          </div>
        </div>

        {/* Score */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="text-center">
            <div className="flex items-center gap-2">
              <Text
                variant="h3"
                className={
                  yourScore > opponentScore
                    ? "text-success"
                    : "text-muted-foreground"
                }
              >
                {yourScore}
              </Text>
              <Text variant="body" color="muted">
                -
              </Text>
              <Text
                variant="h3"
                className={
                  opponentScore > yourScore
                    ? "text-destructive"
                    : "text-muted-foreground"
                }
              >
                {opponentScore}
              </Text>
            </div>
            <Text variant="caption" color="muted">
              Score
            </Text>
          </div>

          {/* Rating Change */}
          <div className="text-center min-w-16">
            <Text
              variant="h4"
              className={[
                "font-mono",
                ratingChange >= 0 ? "text-success" : "text-destructive",
              ].join(" ")}
            >
              {ratingChange >= 0 ? "+" : ""}
              {ratingChange}
            </Text>
            <Text variant="caption" color="muted">
              Rating
            </Text>
          </div>

          {/* Time Info */}
          <div className="text-right hidden sm:block">
            <div className="flex items-center gap-1 text-muted-foreground mb-1">
              <Calendar size={12} />
              <Text variant="body-sm">{date}</Text>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock size={12} />
              <Text variant="caption">{duration}</Text>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
