"use client";

import {
  ChevronRight,
  Shield,
  Eye,
  Trophy,
  Swords,
  Download,
  FileText,
} from "lucide-react";
import { Card, Text, Stack, Switch, Divider } from "@/design-system";

interface PrivacyPreferences {
  profileVisible: boolean;
  showOnLeaderboard: boolean;
  allowChallenges: boolean;
}

interface PrivacySectionProps {
  preferences: PrivacyPreferences;
  onPreferenceChange: (key: keyof PrivacyPreferences, value: boolean) => void;
  onDownloadData?: () => void;
  onViewPrivacyPolicy?: () => void;
}

const PRIVACY_OPTIONS = [
  {
    key: "profileVisible" as const,
    label: "Public Profile",
    description: "Allow others to view your profile",
    icon: Eye,
  },
  {
    key: "showOnLeaderboard" as const,
    label: "Show on Leaderboard",
    description: "Display your name on public leaderboards",
    icon: Trophy,
  },
  {
    key: "allowChallenges" as const,
    label: "Allow Challenges",
    description: "Let other players challenge you directly",
    icon: Swords,
  },
];

export function PrivacySection({
  preferences,
  onPreferenceChange,
  onDownloadData,
  onViewPrivacyPolicy,
}: PrivacySectionProps) {
  return (
    <Stack gap="lg">
      <Card>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-emerald-500/10">
            <Shield size={20} className="text-emerald-600" />
          </div>
          <Text variant="h3">Privacy Settings</Text>
        </div>
        <Stack gap="lg">
          {PRIVACY_OPTIONS.map((option, index) => {
            const Icon = option.icon;
            return (
              <div key={option.key}>
                {index > 0 && <Divider className="mb-6" />}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/10">
                      <Icon size={16} className="text-emerald-600" />
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

      <Card>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-emerald-500/10">
            <FileText size={20} className="text-emerald-600" />
          </div>
          <Text variant="h3">Data & Privacy</Text>
        </div>
        <Stack gap="md">
          <button
            type="button"
            onClick={onDownloadData}
            className="flex items-center justify-between w-full p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20 hover:bg-emerald-500/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <Download size={16} className="text-emerald-600" />
              </div>
              <div className="text-left">
                <Text variant="body" className="font-medium">
                  Download Your Data
                </Text>
                <Text variant="body-sm" color="muted">
                  Get a copy of all your data
                </Text>
              </div>
            </div>
            <ChevronRight size={18} className="text-emerald-600" />
          </button>
          <button
            type="button"
            onClick={onViewPrivacyPolicy}
            className="flex items-center justify-between w-full p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20 hover:bg-emerald-500/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <FileText size={16} className="text-emerald-600" />
              </div>
              <div className="text-left">
                <Text variant="body" className="font-medium">
                  Privacy Policy
                </Text>
                <Text variant="body-sm" color="muted">
                  Read our privacy policy
                </Text>
              </div>
            </div>
            <ChevronRight size={18} className="text-emerald-600" />
          </button>
        </Stack>
      </Card>
    </Stack>
  );
}

export type { PrivacyPreferences };
