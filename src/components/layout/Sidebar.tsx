"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Medal,
  Settings,
  Sparkles,
  Swords,
  Trophy,
} from "lucide-react";

import { Avatar } from "@/design-system/primitives/Avatar/Avatar";

import { useSidebar } from "./SidebarContext";

const NAV_ITEMS = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Battles", href: "/dashboard/battles", icon: Swords },
  { label: "Practice Problems", href: "/dashboard/practice", icon: BookOpen },
  { label: "Leaderboard", href: "/dashboard/leaderboard", icon: Trophy },
  { label: "Achievements", href: "/dashboard/achievements", icon: Medal },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isCollapsed, toggle } = useSidebar();

  const showExpanded = !isCollapsed;

  return (
    <aside
      className={`h-screen fixed left-0 top-0 bg-[#18181b]/80 backdrop-blur-xl border-r border-white/[0.08] flex flex-col z-50 transition-all duration-300 ease-out w-16 ${
        showExpanded ? "lg:w-72" : "lg:w-16"
      }`}
    >
      {/* Logo Area */}
      <div
        className={`border-b border-white/[0.08] p-3 ${showExpanded ? "lg:p-5" : "lg:p-3"}`}
      >
        <Link
          href="/dashboard"
          className={`flex items-center group justify-center ${showExpanded ? "lg:justify-start lg:gap-3" : "lg:justify-center"}`}
        >
          <div
            className={`bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 transition-all duration-300 group-hover:shadow-indigo-500/30 group-hover:scale-105 w-10 h-10 ${
              showExpanded ? "lg:w-11 lg:h-11" : "lg:w-10 lg:h-10"
            }`}
          >
            <Sparkles
              className={`w-5 h-5 text-white ${showExpanded ? "lg:w-6 lg:h-6" : "lg:w-5 lg:h-5"}`}
            />
          </div>
          <div className={`hidden ${showExpanded ? "lg:block" : ""}`}>
            <span className="text-white font-semibold text-lg tracking-tight block">
              Fiziks
            </span>
            <span className="text-indigo-400 text-xs font-medium">
              Physics Arena
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-4 overflow-y-auto">
        <nav
          className={`space-y-1 px-2 ${showExpanded ? "lg:px-3" : "lg:px-2"}`}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="block group">
                <div
                  className={`flex items-center text-sm font-medium transition-all duration-200 justify-center p-2.5 rounded-xl ${
                    showExpanded
                      ? "lg:justify-start lg:gap-3 lg:px-4 lg:py-3"
                      : "lg:justify-center lg:p-2.5"
                  } ${
                    isActive
                      ? "bg-white/[0.08] text-white shadow-sm"
                      : "text-zinc-400 hover:bg-white/[0.05] hover:text-white"
                  }`}
                  title={item.label}
                >
                  <Icon
                    className={`w-[18px] h-[18px] shrink-0 transition-colors ${
                      isActive
                        ? "text-indigo-400"
                        : "text-zinc-500 group-hover:text-indigo-400"
                    }`}
                  />
                  <span
                    className={`tracking-tight hidden ${showExpanded ? "lg:inline" : ""}`}
                  >
                    {item.label}
                  </span>
                  {isActive && showExpanded && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400 hidden lg:block" />
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Quick Stats Section */}
        <div className={`mt-6 px-3 hidden ${showExpanded ? "lg:block" : ""}`}>
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-5" />
          <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider px-3">
            Quick Stats
          </span>
          <div className="mt-4 space-y-1">
            <QuickStatItem
              label="Win Rate"
              value="68%"
              color="text-emerald-400"
            />
            <QuickStatItem
              label="Global Rank"
              value="#42"
              color="text-purple-400"
            />
            <QuickStatItem
              label="Active Streak"
              value="7 days"
              color="text-amber-400"
              badge
            />
          </div>
        </div>
      </div>

      {/* User Profile Summary */}
      <div className="border-t border-white/[0.08]">
        <div
          className={`p-3 flex justify-center ${
            showExpanded
              ? "lg:p-4 lg:justify-start"
              : "lg:p-3 lg:justify-center"
          }`}
        >
          <div
            className={`flex items-center ${showExpanded ? "lg:gap-3" : ""}`}
          >
            <Avatar size="sm" name="Dr. Physics" bordered />
            <div
              className={`flex-1 min-w-0 hidden ${showExpanded ? "lg:block" : ""}`}
            >
              <span className="text-sm font-medium text-white truncate block">
                Dr. Physics
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-purple-400 font-medium">
                  Grandmaster
                </span>
                <span className="text-zinc-600">•</span>
                <span className="text-xs text-zinc-400">Lvl 42</span>
              </div>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div
          className={`px-3 pb-3 ${showExpanded ? "lg:px-4 lg:pb-4" : "lg:px-3 lg:pb-3"}`}
        >
          <button
            type="button"
            className={`w-full flex items-center justify-center rounded-xl text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 p-2.5 ${
              showExpanded ? "lg:gap-2 lg:px-4 lg:py-2.5" : "lg:p-2.5"
            }`}
            title="Sign out"
          >
            <LogOut className="w-[18px] h-[18px]" />
            <span
              className={`text-sm font-medium hidden ${showExpanded ? "lg:inline" : ""}`}
            >
              Sign out
            </span>
          </button>
        </div>
      </div>

      {/* Collapse Toggle Button */}
      <button
        type="button"
        onClick={toggle}
        className="absolute -right-3 top-20 w-6 h-6 bg-[#18181b] border border-white/[0.1] rounded-full hidden lg:flex items-center justify-center text-zinc-500 hover:border-indigo-500/50 hover:text-indigo-400 transition-all duration-200 shadow-lg"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? (
          <ChevronRight className="w-3 h-3" />
        ) : (
          <ChevronLeft className="w-3 h-3" />
        )}
      </button>
    </aside>
  );
}

function QuickStatItem({
  label,
  value,
  color,
  badge = false,
}: {
  label: string;
  value: string;
  color: string;
  badge?: boolean;
}) {
  return (
    <div className="flex justify-between items-center px-3 py-2 rounded-lg hover:bg-white/[0.03] transition-colors">
      <span className="text-sm text-zinc-500">{label}</span>
      {badge ? (
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full bg-amber-500/10 ${color}`}
        >
          {value}
        </span>
      ) : (
        <span className={`text-sm font-semibold ${color}`}>{value}</span>
      )}
    </div>
  );
}
