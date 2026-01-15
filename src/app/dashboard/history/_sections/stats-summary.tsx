"use client";

import { Card, Text } from "@/design-system";

interface StatsSummaryProps {
  totalMatches: number;
  wins: number;
  losses: number;
  totalRatingChange: number;
}

export function StatsSummary({
  totalMatches,
  wins,
  losses,
  totalRatingChange,
}: StatsSummaryProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
      <Card className="text-center">
        <Text variant="h2" serif className="text-primary">
          {totalMatches}
        </Text>
        <Text variant="body-sm" color="muted">
          Total Matches
        </Text>
      </Card>
      <Card className="text-center">
        <Text variant="h2" serif className="text-success">
          {wins}
        </Text>
        <Text variant="body-sm" color="muted">
          Victories
        </Text>
      </Card>
      <Card className="text-center">
        <Text variant="h2" serif className="text-destructive">
          {losses}
        </Text>
        <Text variant="body-sm" color="muted">
          Defeats
        </Text>
      </Card>
      <Card className="text-center">
        <Text
          variant="h2"
          serif
          className={
            totalRatingChange >= 0 ? "text-success" : "text-destructive"
          }
        >
          {totalRatingChange >= 0 ? "+" : ""}
          {totalRatingChange}
        </Text>
        <Text variant="body-sm" color="muted">
          Rating Change
        </Text>
      </Card>
    </div>
  );
}
