"use client";

import { User, Bell, Palette, Shield } from "lucide-react";
import { Card, Stack } from "@/design-system";

type SettingsSection = "account" | "notifications" | "appearance" | "privacy";

const SETTINGS_SECTIONS = [
  {
    id: "account" as const,
    label: "Account",
    icon: User,
    color: "text-blue-600",
    bgColor: "bg-blue-500/10",
    activeColor: "bg-blue-500/20 text-blue-600",
  },
  {
    id: "notifications" as const,
    label: "Notifications",
    icon: Bell,
    color: "text-amber-600",
    bgColor: "bg-amber-500/10",
    activeColor: "bg-amber-500/20 text-amber-600",
  },
  {
    id: "appearance" as const,
    label: "Appearance",
    icon: Palette,
    color: "text-purple-600",
    bgColor: "bg-purple-500/10",
    activeColor: "bg-purple-500/20 text-purple-600",
  },
  {
    id: "privacy" as const,
    label: "Privacy & Security",
    icon: Shield,
    color: "text-emerald-600",
    bgColor: "bg-emerald-500/10",
    activeColor: "bg-emerald-500/20 text-emerald-600",
  },
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
              <button
                key={section.id}
                type="button"
                onClick={() => onSectionChange(section.id)}
                className={[
                  "flex items-center gap-3 w-full p-3 rounded-lg text-left transition-all",
                  isActive
                    ? section.activeColor
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                ].join(" ")}
              >
                <div
                  className={[
                    "p-2 rounded-lg transition-colors",
                    isActive ? section.bgColor : "bg-muted",
                  ].join(" ")}
                >
                  <Icon size={16} className={isActive ? section.color : ""} />
                </div>
                <span className="text-sm font-medium">{section.label}</span>
              </button>
            );
          })}
        </Stack>
      </Card>
    </div>
  );
}

export type { SettingsSection };
