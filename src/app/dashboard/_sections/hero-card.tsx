"use client";

import { Swords } from "lucide-react";
import { Card, Button, Text, Badge } from "@/design-system";

interface HeroCardProps {
  badge: string;
  title: string;
  description: string;
  onFindMatch: () => void;
  playersOnline: number;
}

export function HeroCard({
  badge,
  title,
  description,
  onFindMatch,
  playersOnline,
}: HeroCardProps) {
  return (
    <Card className="md:col-span-2 lg:col-span-8 bg-linear-to-br from-section-blue to-section-purple border-white/50 relative overflow-hidden group cursor-pointer transition-transform hover:scale-[1.005] duration-300">
      <div className="cloud-blur w-64 h-64 -mr-16 -mt-16 top-0 right-0" />

      <div className="relative z-10">
        <Badge className="bg-white/60 backdrop-blur-sm text-accent-indigo border-white/20 mb-4">
          {badge}
        </Badge>
        <h2 className="headline-serif text-xl sm:text-2xl lg:text-3xl mb-2 leading-tight">
          {title}
        </h2>
        <Text variant="body" color="muted" className="mb-6 sm:mb-8 max-w-md">
          {description}
        </Text>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Button onClick={onFindMatch}>
            <Swords size={16} />
            Find Ranked Match
          </Button>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <div className="size-8 rounded-full bg-card border-2 border-section-blue flex items-center justify-center text-[10px] font-bold text-muted-foreground">
                You
              </div>
              <div className="size-8 rounded-full bg-section-indigo border-2 border-section-blue" />
              <div className="size-8 rounded-full bg-section-pink border-2 border-section-blue" />
            </div>
            <Text variant="caption" color="muted" className="font-medium">
              {playersOnline.toLocaleString()} online
            </Text>
          </div>
        </div>
      </div>
    </Card>
  );
}
