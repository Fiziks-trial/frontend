"use client";

import { Palette, Sun, Moon, Monitor, Sparkles, Volume2 } from "lucide-react";
import { Card, Text, Stack, Switch, Divider } from "@/design-system";

type Theme = "light" | "dark" | "system";

interface AppearancePreferences {
  theme: Theme;
  reduceMotion: boolean;
  soundEffects: boolean;
}

interface AppearanceSectionProps {
  preferences: AppearancePreferences;
  onThemeChange: (theme: Theme) => void;
  onPreferenceChange: (
    key: "reduceMotion" | "soundEffects",
    value: boolean,
  ) => void;
}

const THEME_OPTIONS: {
  id: Theme;
  label: string;
  previewClass: string;
  icon: typeof Sun;
}[] = [
  {
    id: "light",
    label: "Light",
    previewClass: "bg-white border border-border shadow-sm",
    icon: Sun,
  },
  {
    id: "dark",
    label: "Dark",
    previewClass: "bg-gray-900 border border-gray-700",
    icon: Moon,
  },
  {
    id: "system",
    label: "System",
    previewClass: "bg-linear-to-br from-white to-gray-900 border border-border",
    icon: Monitor,
  },
];

export function AppearanceSection({
  preferences,
  onThemeChange,
  onPreferenceChange,
}: AppearanceSectionProps) {
  return (
    <Card>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-purple-500/10">
          <Palette size={20} className="text-purple-600" />
        </div>
        <Text variant="h3">Appearance Settings</Text>
      </div>
      <Stack gap="lg">
        <div>
          <Text variant="body" className="font-medium mb-3">
            Theme
          </Text>
          <div className="flex gap-3">
            {THEME_OPTIONS.map((theme) => {
              const isSelected = preferences.theme === theme.id;
              const Icon = theme.icon;
              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => onThemeChange(theme.id)}
                  className={[
                    "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-colors",
                    isSelected
                      ? "border-purple-500 bg-purple-500/5"
                      : "border-border hover:border-purple-500/50",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "size-12 rounded-lg flex items-center justify-center",
                      theme.previewClass,
                    ].join(" ")}
                  >
                    <Icon
                      size={20}
                      className={
                        isSelected ? "text-purple-600" : "text-muted-foreground"
                      }
                    />
                  </div>
                  <Text
                    variant="body-sm"
                    className={isSelected ? "font-medium text-purple-600" : ""}
                    color={isSelected ? undefined : "muted"}
                  >
                    {theme.label}
                  </Text>
                </button>
              );
            })}
          </div>
        </div>

        <Divider />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/10">
              <Sparkles size={16} className="text-purple-600" />
            </div>
            <div>
              <Text variant="body" className="font-medium">
                Reduce Motion
              </Text>
              <Text variant="body-sm" color="muted">
                Minimize animations throughout the app
              </Text>
            </div>
          </div>
          <Switch
            checked={preferences.reduceMotion}
            onChange={(e) =>
              onPreferenceChange("reduceMotion", e.target.checked)
            }
          />
        </div>

        <Divider />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/10">
              <Volume2 size={16} className="text-purple-600" />
            </div>
            <div>
              <Text variant="body" className="font-medium">
                Sound Effects
              </Text>
              <Text variant="body-sm" color="muted">
                Play sounds for match events
              </Text>
            </div>
          </div>
          <Switch
            checked={preferences.soundEffects}
            onChange={(e) =>
              onPreferenceChange("soundEffects", e.target.checked)
            }
          />
        </div>
      </Stack>
    </Card>
  );
}

export type { AppearancePreferences, Theme };
