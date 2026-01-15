"use client";

import { Bell, Mail, Calendar, Trophy, Newspaper } from "lucide-react";
import { Card, Text, Stack, Switch, Divider } from "@/design-system";

interface NotificationPreferences {
  emailNotifications: boolean;
  matchReminders: boolean;
  leaderboardUpdates: boolean;
  weeklyDigest: boolean;
}

interface NotificationsSectionProps {
  preferences: NotificationPreferences;
  onPreferenceChange: (
    key: keyof NotificationPreferences,
    value: boolean,
  ) => void;
}

const NOTIFICATION_OPTIONS = [
  {
    key: "emailNotifications" as const,
    label: "Email Notifications",
    description: "Receive notifications via email",
    icon: Mail,
  },
  {
    key: "matchReminders" as const,
    label: "Match Reminders",
    description: "Get reminded about scheduled matches",
    icon: Calendar,
  },
  {
    key: "leaderboardUpdates" as const,
    label: "Leaderboard Updates",
    description: "Notify when your ranking changes",
    icon: Trophy,
  },
  {
    key: "weeklyDigest" as const,
    label: "Weekly Digest",
    description: "Weekly summary of your progress",
    icon: Newspaper,
  },
];

export function NotificationsSection({
  preferences,
  onPreferenceChange,
}: NotificationsSectionProps) {
  return (
    <Card>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-amber-500/10">
          <Bell size={20} className="text-amber-600" />
        </div>
        <Text variant="h3">Notification Preferences</Text>
      </div>
      <Stack gap="lg">
        {NOTIFICATION_OPTIONS.map((option, index) => {
          const Icon = option.icon;
          return (
            <div key={option.key}>
              {index > 0 && <Divider className="mb-6" />}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/10">
                    <Icon size={16} className="text-amber-600" />
                  </div>
                  <div>
                    <Text variant="body" className="font-medium">
                      {option.label}
                    </Text>
                    <Text variant="body-sm" color="muted">
                      {option.description}
                    </Text>
                  </div>
                </div>
                <Switch
                  checked={preferences[option.key]}
                  onChange={(e) =>
                    onPreferenceChange(option.key, e.target.checked)
                  }
                />
              </div>
            </div>
          );
        })}
      </Stack>
    </Card>
  );
}

export type { NotificationPreferences };
