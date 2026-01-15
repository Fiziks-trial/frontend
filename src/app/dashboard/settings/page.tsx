"use client";

import { useState } from "react";
import { LogOut } from "lucide-react";
import { Button, DashboardPageHeader } from "@/design-system";
import {
  SettingsNav,
  AccountSection,
  NotificationsSection,
  AppearanceSection,
  PrivacySection,
  type SettingsSection,
  type NotificationPreferences,
  type AppearancePreferences,
  type PrivacyPreferences,
  type Theme,
} from "./_sections";

const USER_DATA = {
  name: "Tushar Banik",
  initials: "TB",
  email: "tushar@example.com",
  memberSince: "January 2024",
  displayName: "Tushar B.",
};

const CONNECTED_ACCOUNTS = [
  { provider: "Google", email: "tushar@gmail.com", connected: true },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] =
    useState<SettingsSection>("account");

  // Notification preferences
  const [notificationPrefs, setNotificationPrefs] =
    useState<NotificationPreferences>({
      emailNotifications: true,
      matchReminders: true,
      leaderboardUpdates: false,
      weeklyDigest: true,
    });

  // Appearance preferences
  const [appearancePrefs, setAppearancePrefs] = useState<AppearancePreferences>(
    {
      theme: "light",
      reduceMotion: false,
      soundEffects: true,
    },
  );

  // Privacy preferences
  const [privacyPrefs, setPrivacyPrefs] = useState<PrivacyPreferences>({
    profileVisible: true,
    showOnLeaderboard: true,
    allowChallenges: true,
  });

  const handleNotificationChange = (
    key: keyof NotificationPreferences,
    value: boolean,
  ) => {
    setNotificationPrefs((prev) => ({ ...prev, [key]: value }));
  };

  const handleAppearanceChange = (
    key: "reduceMotion" | "soundEffects",
    value: boolean,
  ) => {
    setAppearancePrefs((prev) => ({ ...prev, [key]: value }));
  };

  const handleThemeChange = (theme: Theme) => {
    setAppearancePrefs((prev) => ({ ...prev, theme }));
  };

  const handlePrivacyChange = (
    key: keyof PrivacyPreferences,
    value: boolean,
  ) => {
    setPrivacyPrefs((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <DashboardPageHeader
        title="Settings"
        subtitle="Manage your account and preferences"
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <SettingsNav
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        <div className="lg:col-span-3">
          {activeSection === "account" && (
            <AccountSection
              user={USER_DATA}
              connectedAccounts={CONNECTED_ACCOUNTS}
            />
          )}

          {activeSection === "notifications" && (
            <NotificationsSection
              preferences={notificationPrefs}
              onPreferenceChange={handleNotificationChange}
            />
          )}

          {activeSection === "appearance" && (
            <AppearanceSection
              preferences={appearancePrefs}
              onThemeChange={handleThemeChange}
              onPreferenceChange={handleAppearanceChange}
            />
          )}

          {activeSection === "privacy" && (
            <PrivacySection
              preferences={privacyPrefs}
              onPreferenceChange={handlePrivacyChange}
            />
          )}
        </div>
      </div>

      {/* Sign Out Button */}
      <div className="mt-8 pt-8 border-t border-border">
        <Button
          variant="ghost"
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <LogOut size={18} />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
