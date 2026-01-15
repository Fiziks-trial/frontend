import type { ReactNode } from "react";
import { Card } from "../primitives/card";
import { Button } from "../primitives/button";
import { Text } from "../primitives/text";

export interface SearchingStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  onCancel: () => void;
  cancelLabel?: string;
}

export function SearchingState({
  icon,
  title,
  description,
  onCancel,
  cancelLabel = "Cancel",
}: SearchingStateProps) {
  return (
    <Card className="border-primary/30 bg-primary/5">
      <div className="flex flex-col items-center py-8">
        <div className="relative mb-6">
          <div className="size-20 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
            {icon}
          </div>
          <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
        <Text variant="h3" className="mb-2">
          {title}
        </Text>
        <Text variant="body" color="muted" className="mb-4 text-center">
          {description}
        </Text>
        <Button variant="secondary" onClick={onCancel}>
          {cancelLabel}
        </Button>
      </div>
    </Card>
  );
}
