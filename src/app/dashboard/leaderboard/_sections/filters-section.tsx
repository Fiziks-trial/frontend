"use client";

import { Trophy } from "lucide-react";
import {
  Stack,
  ToggleGroup,
  SUBJECT_LIST,
  type Subject,
  type ToggleOption,
} from "@/design-system";

type SubjectFilter = "all" | Subject;
type TimeRange = "weekly" | "monthly" | "all-time";

const SUBJECT_FILTER_OPTIONS: ToggleOption<SubjectFilter>[] = [
  { id: "all", label: "Overall", icon: <Trophy size={16} /> },
  ...SUBJECT_LIST.map((subject) => ({
    id: subject.id as SubjectFilter,
    label: subject.shortLabel,
    icon: <subject.icon size={16} />,
  })),
];

const TIME_RANGE_OPTIONS: ToggleOption<TimeRange>[] = [
  { id: "weekly", label: "This Week" },
  { id: "monthly", label: "This Month" },
  { id: "all-time", label: "All Time" },
];

interface FiltersSectionProps {
  selectedSubject: SubjectFilter;
  selectedTimeRange: TimeRange;
  onSubjectChange: (subject: SubjectFilter) => void;
  onTimeRangeChange: (range: TimeRange) => void;
}

export function FiltersSection({
  selectedSubject,
  selectedTimeRange,
  onSubjectChange,
  onTimeRangeChange,
}: FiltersSectionProps) {
  return (
    <Stack gap="md" className="mb-8">
      <ToggleGroup
        options={SUBJECT_FILTER_OPTIONS}
        value={selectedSubject}
        onChange={onSubjectChange}
      />

      <ToggleGroup
        options={TIME_RANGE_OPTIONS}
        value={selectedTimeRange}
        onChange={onTimeRangeChange}
        variant="subtle"
        size="sm"
      />
    </Stack>
  );
}

export type { SubjectFilter, TimeRange };
