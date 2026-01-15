"use client";

import { Zap, Sparkles } from "lucide-react";
import { Card, Text, Button } from "@/design-system";

interface QuickMatchSectionProps {
  onQuickMatch: () => void;
}

export function QuickMatchSection({ onQuickMatch }: QuickMatchSectionProps) {
  return (
    <Card className="mb-8 bg-linear-to-br from-section-blue to-section-purple border-white/50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Zap size={18} className="text-warning" />
            <Text variant="h3" className="text-foreground">
              Quick Match
            </Text>
          </div>
          <Text variant="body" color="muted">
            Jump straight into a ranked match with random subject
          </Text>
        </div>
        <Button onClick={onQuickMatch}>
          <Sparkles size={16} />
          Quick Match
        </Button>
      </div>
    </Card>
  );
}
