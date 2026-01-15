"use client";

import { SidebarTrigger, ProgressRing, Badge } from "@/design-system";

interface HeaderSectionProps {
  seasonInfo: string;
  userName: string;
  userInitials: string;
  level: number;
  xp: number;
  league: string;
  levelProgress: number;
}

export function HeaderSection({
  seasonInfo,
  userName,
  userInitials,
  level,
  xp,
  league,
  levelProgress,
}: HeaderSectionProps) {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8 sm:mb-10">
      <div className="flex items-start gap-4 w-full sm:w-auto">
        <SidebarTrigger className="-ml-2" />

        <div>
          <p className="text-muted-foreground font-medium mb-1 flex items-center gap-2 text-sm">
            <span className="size-2 rounded-full bg-success animate-pulse" />
            {seasonInfo}
          </p>
          <h1 className="headline-serif text-2xl sm:text-3xl lg:text-4xl">
            Welcome back, {userName}.
          </h1>
        </div>
      </div>

      {/* Level Capsule */}
      <div className="bg-card pl-1 pr-4 sm:pr-6 py-1 rounded-full border border-border shadow-sm flex items-center gap-3 sm:gap-4 hover:shadow-md transition-shadow cursor-pointer w-full sm:w-auto">
        <ProgressRing value={levelProgress} size="sm" strokeWidth={3}>
          <div className="size-7 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold">
            {userInitials}
          </div>
        </ProgressRing>

        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-foreground">
              Level {level}
            </span>
            <Badge variant="default" size="sm">
              {xp} XP
            </Badge>
          </div>
          <span className="text-xs text-muted-foreground font-serif italic truncate">
            {league}
          </span>
        </div>
      </div>
    </header>
  );
}
