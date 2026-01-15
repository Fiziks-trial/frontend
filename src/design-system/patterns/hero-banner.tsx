import type { ReactNode } from "react";
import { Card } from "../primitives/card";
import { Badge } from "../primitives/badge";
import { Text } from "../primitives/text";

export interface HeroBannerProps {
  badge?: string;
  title: string;
  description: string;
  action: ReactNode;
  secondaryContent?: ReactNode;
  gradient?: "blue-purple" | "purple-pink" | "blue-green";
  className?: string;
}

const gradientStyles = {
  "blue-purple": "bg-linear-to-br from-section-blue to-section-purple",
  "purple-pink": "bg-linear-to-br from-section-purple to-section-pink",
  "blue-green": "bg-linear-to-br from-section-blue to-section-emerald",
};

export function HeroBanner({
  badge,
  title,
  description,
  action,
  secondaryContent,
  gradient = "blue-purple",
  className = "",
}: HeroBannerProps) {
  return (
    <Card
      className={[
        gradientStyles[gradient],
        "border-white/50 relative overflow-hidden group cursor-pointer transition-transform hover:scale-[1.005] duration-300",
        className,
      ].join(" ")}
    >
      <div className="cloud-blur w-64 h-64 -mr-16 -mt-16 top-0 right-0" />

      <div className="relative z-10">
        {badge && (
          <Badge className="bg-white/60 backdrop-blur-sm text-accent-indigo border-white/20 mb-4">
            {badge}
          </Badge>
        )}
        <h2 className="headline-serif text-xl sm:text-2xl lg:text-3xl mb-2 leading-tight">
          {title}
        </h2>
        <Text variant="body" color="muted" className="mb-6 sm:mb-8 max-w-md">
          {description}
        </Text>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {action}
          {secondaryContent}
        </div>
      </div>
    </Card>
  );
}
