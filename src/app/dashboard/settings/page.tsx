"use client";

import { useState } from "react";
import { LogOut } from "lucide-react";
import { Button, DashboardPageHeader } from "@/design-system";
import { useAuth } from "@/lib/auth-context";
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

function getInitials(name: string | null): string {
  if (!name) return "??";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function formatMemberSince(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] =
    useState<SettingsSection>("account");

  const userData = {
    name: user?.name ?? user?.username ?? "User",
    initials: getInitials(user?.name ?? user?.username ?? null),
    email: user?.email ?? "",
    memberSince: user?.createdAt
      ? formatMemberSince(user.createdAt)
      : "Unknown",
    displayName: user?.name ?? user?.username ?? "User",
    avatar: user?.avatar,
  };

  const connectedAccounts = user?.provider
    ? [{ provider: user.provider, email: user.email, connected: true }]
    : [];

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

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
              user={userData}
              connectedAccounts={connectedAccounts}
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
          onClick={handleLogout}
        >
          <LogOut size={18} />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
