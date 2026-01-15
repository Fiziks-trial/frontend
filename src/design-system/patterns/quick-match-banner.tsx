import type { ReactNode } from "react";
import { Zap } from "lucide-react";
import { Card } from "../primitives/card";
import { Text } from "../primitives/text";

export interface QuickMatchBannerProps {
  title?: string;
  description?: string;
  action: ReactNode;
  className?: string;
}

export function QuickMatchBanner({
  title = "Quick Match",
  description = "Jump straight into a ranked match with random subject",
  action,
  className = "",
}: QuickMatchBannerProps) {
  return (
    <Card
      className={[
        "bg-linear-to-br from-section-blue to-section-purple border-white/50 relative overflow-hidden",
        className,
      ].join(" ")}
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Zap size={18} className="text-warning" />
            <Text variant="h3" className="text-foreground">
              {title}
            </Text>
          </div>
          <Text variant="body" color="muted">
            {description}
          </Text>
        </div>
        {action}
      </div>
    </Card>
  );
}
