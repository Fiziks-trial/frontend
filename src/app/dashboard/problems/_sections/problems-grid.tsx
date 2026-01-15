"use client";

import { Card, Grid, Text } from "@/design-system";
import { ProblemCard, type Problem } from "./problem-card";

interface ProblemsGridProps {
  problems: Problem[];
}

export function ProblemsGrid({ problems }: ProblemsGridProps) {
  if (problems.length === 0) {
    return (
      <Card className="text-center py-12">
        <Text variant="h3" color="muted" className="mb-2">
          No problems found
        </Text>
        <Text variant="body" color="muted">
          Try adjusting your search or filter criteria
        </Text>
      </Card>
    );
  }

  return (
    <Grid cols={1} colsMd={2} colsLg={2} gap="md">
      {problems.map((problem) => (
        <ProblemCard key={problem.id} problem={problem} />
      ))}
    </Grid>
  );
}
