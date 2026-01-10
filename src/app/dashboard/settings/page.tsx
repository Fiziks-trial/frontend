"use client";

import { Bell, Shield, Users, Zap, Eye, LogOut } from "lucide-react";
import { useState } from "react";

import { Sidebar } from "@/components/layout/Sidebar";
import {
  SidebarProvider,
  useSidebar,
} from "@/components/layout/SidebarContext";
import { Avatar } from "@/design-system/primitives/Avatar/Avatar";
import { Card } from "@/design-system/primitives/Card/Card";
import { Button } from "@/design-system/primitives/Button/Button";
import { Input } from "@/design-system/primitives/Input/Input";

interface UserProfile {
  username: string;
  email: string;
  bio: string;
  level: number;
  avatar: string;
  joinDate: string;
  totalPoints: number;
}

const USER_PROFILE: UserProfile = {
  username: "QuantumLeap",
  email: "quantumleap@fiziks.com",
  bio: "Physics enthusiast and problem solver",
  level: 13,
  avatar: "QL",
  joinDate: "January 2024",
  totalPoints: 13450,
};

function SettingsContent() {
  const { isCollapsed } = useSidebar();
  const [profile, setProfile] = useState(USER_PROFILE);
  const [editingBio, setEditingBio] = useState(false);

  const [settings, setSettings] = useState({
    public: true,
    showFriends: true,
    friendRequests: true,
    notifications: true,
    emailUpdates: false,
    darkMode: true,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleBioChange = (value: string) => {
    setProfile((prev) => ({
      ...prev,
      bio: value,
    }));
  };

  const settingGroups = [
    {
      title: "Profile Visibility",
      icon: Eye,
      color: "text-[#3b82f6]",
      items: [
        {
          id: "public",
          label: "Make Profile Public",
          description: "Allow other users to see your profile and stats",
          value: settings.public,
        },
        {
          id: "showFriends",
          label: "Show Friends List",
          description: "Display your friends list publicly",
          value: settings.showFriends,
        },
      ],
    },
    {
      title: "Friends & Social",
      icon: Users,
      color: "text-[#ec4899]",
      items: [
        {
          id: "friendRequests",
          label: "Allow Friend Requests",
          description: "Let other users send you friend requests",
          value: settings.friendRequests,
        },
      ],
    },
    {
      title: "Notifications",
      icon: Bell,
      color: "text-[#f97316]",
      items: [
        {
          id: "notifications",
          label: "In-Game Notifications",
          description: "Receive notifications for battles and messages",
          value: settings.notifications,
        },
        {
          id: "emailUpdates",
          label: "Email Updates",
          description: "Receive weekly progress and achievement emails",
          value: settings.emailUpdates,
        },
      ],
    },
    {
      title: "Preferences",
      icon: Zap,
      color: "text-[#22c55e]",
      items: [
        {
          id: "darkMode",
          label: "Dark Mode",
          description: "Always use dark theme",
          value: settings.darkMode,
        },
      ],
    },
  ];

  return (
    <div className="flex h-screen bg-black">
      <Sidebar />

      {/* Main Content */}
      <main
        className={`flex-1 overflow-auto transition-all duration-300 ${
          isCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        <div className="min-h-screen bg-gradient-to-b from-black via-black to-[#0a0a0a]">
          {/* Header */}
          <div className="px-8 py-12 border-b border-[rgba(255,255,255,0.1)]">
            <h1 className="text-4xl md:text-5xl font-mono font-bold tracking-wide text-white mb-2">
              Settings
            </h1>
            <p className="text-base font-mono text-[#999999]">
              Manage your account and preferences
            </p>
          </div>

          <div className="px-8 py-8 max-w-6xl">
            {/* Profile Section */}
            <Card variant="glow" className="p-8 mb-8">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Avatar */}
                <div className="flex flex-col items-center">
                  <Avatar
                    size="lg"
                    name={profile.avatar}
                    bordered
                    className="w-32 h-32"
                  />
                  <Button
                    variant="secondary"
                    size="sm"
                    className="rounded mt-4"
                  >
                    Change Avatar
                  </Button>
                </div>

                {/* User Info */}
                <div className="flex-1">
                  <div className="mb-6">
                    <p className="text-[10px] font-mono text-[#999999] uppercase tracking-wider mb-2">
                      Username
                    </p>
                    <p className="text-2xl font-mono font-bold text-white">
                      {profile.username}
                    </p>
                  </div>

                  <div className="mb-6">
                    <p className="text-[10px] font-mono text-[#999999] uppercase tracking-wider mb-2">
                      Email
                    </p>
                    <p className="text-base font-mono text-[#999999]">
                      {profile.email}
                    </p>
                  </div>

                  <div className="mb-6">
                    <p className="text-[10px] font-mono text-[#999999] uppercase tracking-wider mb-2">
                      Bio
                    </p>
                    {editingBio ? (
                      <div className="flex gap-2">
                        <Input
                          type="text"
                          value={profile.bio}
                          onChange={(e) => handleBioChange(e.target.value)}
                          placeholder="Tell us about yourself"
                          className="flex-1"
                        />
                        <Button
                          variant="primary"
                          size="sm"
                          className="rounded"
                          onClick={() => setEditingBio(false)}
                        >
                          Save
                        </Button>
                      </div>
                    ) : (
                      <div className="flex justify-between items-center">
                        <p className="text-base font-mono text-[#999999]">
                          {profile.bio}
                        </p>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="rounded"
                          onClick={() => setEditingBio(true)}
                        >
                          Edit
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[rgba(255,255,255,0.1)]">
                    <div>
                      <p className="text-[10px] font-mono text-[#999999] uppercase tracking-wider mb-1">
                        Level
                      </p>
                      <p className="text-xl font-mono font-bold text-[#22c55e]">
                        {profile.level}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-[#999999] uppercase tracking-wider mb-1">
                        Member Since
                      </p>
                      <p className="text-xs font-mono text-[#999999]">
                        {profile.joinDate}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-[#999999] uppercase tracking-wider mb-1">
                        Total Points
                      </p>
                      <p className="text-xl font-mono font-bold text-[#22c55e]">
                        {profile.totalPoints.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Settings Groups */}
            {settingGroups.map((group) => {
              const IconComponent = group.icon;
              return (
                <Card key={group.title} variant="glow" className="p-6 mb-6">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[rgba(255,255,255,0.1)]">
                    <IconComponent className={`w-5 h-5 ${group.color}`} />
                    <h2 className="text-lg font-mono font-bold text-white">
                      {group.title}
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {group.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start justify-between py-3 border-b border-[rgba(255,255,255,0.05)] last:border-0"
                      >
                        <div className="flex-1">
                          <p className="text-base font-mono text-white mb-1">
                            {item.label}
                          </p>
                          <p className="text-xs font-mono text-[#999999]">
                            {item.description}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            handleToggle(item.id as keyof typeof settings)
                          }
                          className={`relative w-12 h-6 rounded-full transition-all ml-4 flex-shrink-0 ${
                            item.value
                              ? "bg-[#22c55e]"
                              : "bg-[rgba(255,255,255,0.1)]"
                          }`}
                        >
                          <div
                            className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                              item.value ? "translate-x-6" : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })}

            {/* Security Section */}
            <Card variant="glow" className="p-6 mb-6">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[rgba(255,255,255,0.1)]">
                <Shield className="w-5 h-5 text-[#ef4444]" />
                <h2 className="text-lg font-mono font-bold text-white">
                  Security
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-base font-mono text-white mb-2">
                    Password
                  </p>
                  <Button variant="secondary" size="md" className="rounded">
                    Change Password
                  </Button>
                </div>
                <div className="pt-4 border-t border-[rgba(255,255,255,0.1)]">
                  <p className="text-base font-mono text-white mb-2">
                    Two-Factor Authentication
                  </p>
                  <p className="text-xs font-mono text-[#999999] mb-3">
                    Add an extra layer of security to your account
                  </p>
                  <Button variant="secondary" size="md" className="rounded">
                    Enable 2FA
                  </Button>
                </div>
              </div>
            </Card>

            {/* Danger Zone */}
            <Card
              variant="glow"
              className="p-6 border-[#ef4444]/30 bg-[#ef4444]/5 mb-8"
            >
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#ef4444]/20">
                <LogOut className="w-5 h-5 text-[#ef4444]" />
                <h2 className="text-lg font-mono font-bold text-[#ef4444]">
                  Danger Zone
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-base font-mono text-white mb-2">
                    Sign Out
                  </p>
                  <p className="text-xs font-mono text-[#999999] mb-3">
                    Sign out from all devices
                  </p>
                  <Button variant="secondary" size="md" className="rounded">
                    Sign Out
                  </Button>
                </div>
                <div className="pt-4 border-t border-[#ef4444]/20">
                  <p className="text-base font-mono text-[#ef4444] mb-2">
                    Delete Account
                  </p>
                  <p className="text-xs font-mono text-[#999999] mb-3">
                    Permanently delete your account and all associated data
                  </p>
                  <Button
                    variant="secondary"
                    size="md"
                    className="rounded border border-[#ef4444] text-[#ef4444] hover:bg-[#ef4444]/10"
                  >
                    Delete Account
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function Settings() {
  return (
    <SidebarProvider>
      <SettingsContent />
    </SidebarProvider>
  );
}
