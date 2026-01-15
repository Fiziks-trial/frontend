"use client";

import { Swords } from "lucide-react";
import { Card, Text, Button, SUBJECTS, type Subject } from "@/design-system";

interface SearchingSectionProps {
  selectedSubject: Subject | null;
  onCancel: () => void;
}

export function SearchingSection({
  selectedSubject,
  onCancel,
}: SearchingSectionProps) {
  return (
    <Card className="mb-8 border-primary/30 bg-primary/5">
      <div className="flex flex-col items-center py-8">
        <div className="relative mb-6">
          <div className="size-20 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
            <Swords size={32} className="text-primary" />
          </div>
          <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
        <Text variant="h3" className="mb-2">
          Searching for opponent...
        </Text>
        <Text variant="body" color="muted" className="mb-4">
          Finding a worthy challenger in{" "}
          {selectedSubject ? SUBJECTS[selectedSubject].label : ""}
        </Text>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </Card>
  );
}
