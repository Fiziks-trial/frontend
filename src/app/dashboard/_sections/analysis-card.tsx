"use client";

import { FileText, MoreHorizontal, Zap } from "lucide-react";
import { Card, Text } from "@/design-system";

interface AnalysisItem {
  id: string;
  text: string;
  completed?: boolean;
}

interface AnalysisCardProps {
  items: AnalysisItem[];
  onMoreClick?: () => void;
}

export function AnalysisCard({ items, onMoreClick }: AnalysisCardProps) {
  return (
    <Card className="lg:col-span-4 bg-section-yellow border-warning/20 group hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-4">
        <Text variant="h3" serif className="flex items-center gap-2">
          <FileText size={18} className="text-warning/70" />
          Analysis
        </Text>
        <button
          type="button"
          onClick={onMoreClick}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-warning/20 rounded"
        >
          <MoreHorizontal size={16} className="text-warning" />
        </button>
      </div>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.id} className="flex items-start gap-3">
            <div className="mt-1 min-w-4 h-4 border-2 border-warning/30 rounded flex items-center justify-center shrink-0">
              {item.completed && <Zap size={12} className="text-warning" />}
            </div>
            <Text
              variant="body-sm"
              className={
                item.completed
                  ? "text-muted-foreground leading-snug"
                  : "text-foreground/80 leading-snug"
              }
            >
              {item.text}
            </Text>
          </li>
        ))}
      </ul>
    </Card>
  );
}
