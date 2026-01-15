"use client";

import { Trophy, Users, Target, ChevronRight, Swords } from "lucide-react";
import { Text, Button, Stack, Badge, Avatar } from "@/design-system";
import type { Subject } from "@/design-system";

type GameMode = "ranked" | "casual" | "practice";

const GAME_MODES: {
  id: GameMode;
  label: string;
  description: string;
  icon: typeof Trophy;
  badge?: string;
}[] = [
  {
    id: "ranked",
    label: "Ranked Match",
    description: "Compete for rating points and climb the leaderboard",
    icon: Trophy,
    badge: "Season 4",
  },
  {
    id: "casual",
    label: "Casual Match",
    description: "Practice without affecting your rating",
    icon: Users,
  },
  {
    id: "practice",
    label: "Solo Practice",
    description: "Train against AI opponents at your own pace",
    icon: Target,
  },
];

const RECENT_OPPONENTS = [
  {
    name: "PhysicsWizard",
    initials: "PW",
    timeAgo: "2 hours ago",
    result: "win" as const,
  },
  {
    name: "MathGenius",
    initials: "MG",
    timeAgo: "Yesterday",
    result: "loss" as const,
  },
];

interface GameModeSectionProps {
  selectedMode: GameMode;
  selectedSubject: Subject | null;
  avgWaitTime: string;
  onModeChange: (mode: GameMode) => void;
  onFindMatch: () => void;
}

export function GameModeSection({
  selectedMode,
  selectedSubject,
  avgWaitTime,
  onModeChange,
  onFindMatch,
}: GameModeSectionProps) {
  return (
    <div>
      <Text variant="h3" className="mb-4">
        Game Mode
      </Text>
      <Stack gap="sm">
        {GAME_MODES.map((mode) => {
          const Icon = mode.icon;
          const isSelected = selectedMode === mode.id;
          return (
            <button
              key={mode.id}
              type="button"
              onClick={() => onModeChange(mode.id)}
              className={[
                "w-full p-4 rounded-xl text-left transition-all",
                "border-2",
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card hover:border-primary/30",
              ].join(" ")}
            >
              <div className="flex items-start gap-3">
                <div
                  className={[
                    "p-2 rounded-lg",
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground",
                  ].join(" ")}
                >
                  <Icon size={18} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Text
                      variant="body"
                      className={["font-medium", isSelected && "text-primary"]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {mode.label}
                    </Text>
                    {mode.badge && (
                      <Badge variant="default" size="sm">
                        {mode.badge}
                      </Badge>
                    )}
                  </div>
                  <Text variant="body-sm" color="muted" className="mt-1">
                    {mode.description}
                  </Text>
                </div>
                {isSelected && (
                  <ChevronRight size={18} className="text-primary mt-1" />
                )}
              </div>
            </button>
          );
        })}
      </Stack>

      {/* Start Match Button */}
      <div className="mt-8">
        <Button
          className="w-full"
          size="lg"
          disabled={!selectedSubject}
          onClick={onFindMatch}
        >
          <Swords size={18} />
          {selectedSubject
            ? `Find ${selectedMode === "ranked" ? "Ranked" : selectedMode === "casual" ? "Casual" : "Practice"} Match`
            : "Select a Subject"}
        </Button>
        {selectedSubject && (
          <Text
            variant="caption"
            color="muted"
            className="mt-2 text-center block"
          >
            Estimated wait: {avgWaitTime}
          </Text>
        )}
      </div>

      {/* Recent Opponents */}
      <div className="mt-8">
        <Text variant="h4" className="mb-3">
          Recent Opponents
        </Text>
        <Stack gap="sm">
          {RECENT_OPPONENTS.map((opponent) => (
            <div
              key={opponent.name}
              className="flex items-center justify-between p-3 rounded-lg bg-card border border-border"
            >
              <div className="flex items-center gap-3">
                <Avatar fallback={opponent.initials} size="sm" />
                <div>
                  <Text variant="body-sm" className="font-medium">
                    {opponent.name}
                  </Text>
                  <Text variant="caption" color="muted">
                    {opponent.timeAgo}
                  </Text>
                </div>
              </div>
              <Badge
                variant={opponent.result === "win" ? "success" : "destructive"}
                size="sm"
              >
                {opponent.result === "win" ? "Won" : "Lost"}
              </Badge>
            </div>
          ))}
        </Stack>
      </div>
    </div>
  );
}

export type { GameMode };
