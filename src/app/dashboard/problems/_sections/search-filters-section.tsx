"use client";

import { Search, BookOpen } from "lucide-react";
import { Input, Stack, SUBJECT_LIST, type Subject } from "@/design-system";

type SubjectFilter = "all" | Subject;

interface SearchFiltersSectionProps {
  searchQuery: string;
  selectedSubject: SubjectFilter;
  onSearchChange: (query: string) => void;
  onSubjectChange: (subject: SubjectFilter) => void;
}

export function SearchFiltersSection({
  searchQuery,
  selectedSubject,
  onSearchChange,
  onSubjectChange,
}: SearchFiltersSectionProps) {
  return (
    <Stack gap="md" className="mb-8">
      <Input
        placeholder="Search problems by title or topic..."
        icon={<Search size={18} />}
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="max-w-md"
      />

      {/* Subject Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        <button
          type="button"
          onClick={() => onSubjectChange("all")}
          className={[
            "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all",
            selectedSubject === "all"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary-hover",
          ].join(" ")}
        >
          <BookOpen size={16} />
          All
        </button>
        {SUBJECT_LIST.map((subject) => {
          const Icon = subject.icon;
          const isActive = selectedSubject === subject.id;
          return (
            <button
              key={subject.id}
              type="button"
              onClick={() => onSubjectChange(subject.id)}
              className={[
                "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary-hover",
              ].join(" ")}
            >
              <Icon size={16} />
              {subject.label}
            </button>
          );
        })}
      </div>
    </Stack>
  );
}

export type { SubjectFilter };
