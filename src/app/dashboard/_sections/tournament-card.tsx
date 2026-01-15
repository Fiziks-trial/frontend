"use client";

import { Crown, ChevronRight } from "lucide-react";
import { Card, Text } from "@/design-system";

interface TournamentCardProps {
  title: string;
  description: string;
  onRegister: () => void;
}

export function TournamentCard({
  title,
  description,
  onRegister,
}: TournamentCardProps) {
  return (
    <Card className="lg:col-span-4 bg-section-purple border-accent-purple/20 flex flex-col justify-center relative overflow-hidden">
      <div className="relative z-10">
        <div className="size-10 bg-card rounded-xl flex items-center justify-center text-accent-purple mb-4 shadow-sm">
          <Crown size={20} />
        </div>
        <Text variant="h3" serif className="mb-1">
          {title}
        </Text>
        <Text variant="caption" color="muted" className="mb-4">
          {description}
        </Text>
        <button
          type="button"
          onClick={onRegister}
          className="text-xs font-bold uppercase tracking-wide text-accent-purple flex items-center gap-1 hover:gap-2 transition-all"
        >
          Register Now <ChevronRight size={14} />
        </button>
      </div>
      <div className="absolute -bottom-10 -right-10 size-40 bg-section-purple rounded-full blur-2xl opacity-70" />
    </Card>
  );
}
