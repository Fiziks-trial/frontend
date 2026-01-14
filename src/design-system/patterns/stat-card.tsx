import type { ReactNode } from "react";
import { Card, type CardProps } from "../primitives/card";
import { Text } from "../primitives/text";

export interface StatCardProps extends Omit<CardProps, "children"> {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  trend?: {
    value: string;
    positive?: boolean;
  };
}

export function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  ...cardProps
}: StatCardProps) {
  return (
    <Card {...cardProps}>
      <div className="flex justify-between items-start">
        <Text variant="h3" serif className="text-foreground">
          {title}
        </Text>
        {icon && <div className="p-2 bg-muted rounded-lg">{icon}</div>}
      </div>

      <div className="mt-4">
        <Text variant="h1" serif className="text-foreground">
          {value}
        </Text>
        {subtitle && (
          <Text variant="body-sm" color="muted" className="mt-1">
            {subtitle}
          </Text>
        )}
        {trend && (
          <div className="mt-2 flex items-center gap-1">
            <span
              className={[
                "text-xs font-bold",
                trend.positive ? "text-success" : "text-destructive",
              ].join(" ")}
            >
              {trend.positive ? "↑" : "↓"} {trend.value}
            </span>
          </div>
        )}
      </div>
    </Card>
  );
}
