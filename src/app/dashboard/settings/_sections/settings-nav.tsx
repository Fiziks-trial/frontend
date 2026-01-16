"use client";

import { User, Bell, Palette, Shield } from "lucide-react";
import { Card, Stack, Button } from "@/design-system";

type SettingsSection = "account" | "notifications" | "appearance" | "privacy";

const SETTINGS_SECTIONS = [
  { id: "account" as const, label: "Account", icon: User },
  { id: "notifications" as const, label: "Notifications", icon: Bell },
  { id: "appearance" as const, label: "Appearance", icon: Palette },
  { id: "privacy" as const, label: "Privacy", icon: Shield },
];

interface SettingsNavProps {
  activeSection: SettingsSection;
  onSectionChange: (section: SettingsSection) => void;
}

export function SettingsNav({
  activeSection,
  onSectionChange,
}: SettingsNavProps) {
  return (
    <div className="lg:col-span-1">
      <Card className="p-2">
        <Stack gap="xs">
          {SETTINGS_SECTIONS.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            return (
              <Button
                key={section.id}
                variant="ghost"
                onClick={() => onSectionChange(section.id)}
                className={[
                  "justify-start gap-3 w-full h-auto py-2.5 px-3",
                  isActive
                    ? "bg-blue-500/20 text-blue-600 hover:bg-blue-500/25"
                    : "hover:bg-muted",
                ].join(" ")}
              >
                <div
                  className={[
                    "p-2 rounded-lg shrink-0",
                    isActive ? "bg-blue-500/10" : "bg-muted",
                  ].join(" ")}
                >
                  <Icon size={16} className={isActive ? "text-blue-600" : ""} />
                </div>
                <span className="text-sm font-medium whitespace-nowrap">
                  {section.label}
                </span>
              </Button>
            );
          })}
        </Stack>
      </Card>
    </div>
  );
}

export type { SettingsSection };
