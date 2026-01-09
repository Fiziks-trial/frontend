"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Medal,
  Settings,
  Swords,
  Terminal,
  Trophy,
} from "lucide-react";

import { Avatar } from "@/design-system/primitives/Avatar/Avatar";
import { Badge } from "@/design-system/primitives/Badge/Badge";
import { Divider } from "@/design-system/primitives/Divider/Divider";

import { useSidebar } from "./SidebarContext";

const NAV_ITEMS = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Battles", href: "/dashboard/battles", icon: Swords },
  { label: "Leaderboard", href: "/dashboard/leaderboard", icon: Trophy },
  { label: "Achievements", href: "/dashboard/achievements", icon: Medal },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isCollapsed, toggle } = useSidebar();

  // On mobile: always collapsed. On desktop: depends on state
  const showExpanded = !isCollapsed;

  return (
    <aside
      className={`h-screen fixed left-0 top-0 border-r border-[#00ff0033] bg-[#0a0a0a] flex flex-col z-50 transition-all duration-300 w-16 ${
        showExpanded ? "lg:w-64" : "lg:w-16"
      }`}
    >
      {/* Logo Area */}
      <div
        className={`border-b border-[#00ff0033] p-3 ${showExpanded ? "lg:p-6" : "lg:p-3"}`}
      >
        <Link
          href="/dashboard"
          className={`flex items-center group justify-center ${showExpanded ? "lg:justify-start lg:gap-3" : "lg:justify-center"}`}
        >
          <div
            className={`bg-[#00ff0020] border border-[#00ff00] flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(0,255,0,0.3)] transition-all w-9 h-9 ${
              showExpanded ? "lg:w-10 lg:h-10" : "lg:w-9 lg:h-9"
            }`}
          >
            <Terminal
              className={`w-4 h-4 text-[#00ff00] ${showExpanded ? "lg:w-5 lg:h-5" : "lg:w-4 lg:h-4"}`}
            />
          </div>
          <div className={`hidden ${showExpanded ? "lg:block" : ""}`}>
            <span className="text-white font-mono text-lg tracking-wider block">
              FIZIKS
            </span>
            <span className="text-[#00ff00] text-[10px] font-mono tracking-widest">
              {"/// PHYSICS_ARENA"}
            </span>
          </div>
        </Link>
      </div>

      {/* System Status */}
      <div
        className={`py-3 border-b border-[#00ff0033] px-3 flex justify-center ${
          showExpanded ? "lg:px-6 lg:justify-start" : "lg:px-3 lg:justify-center"
        }`}
      >
        <div
          className={`flex items-center ${showExpanded ? "lg:gap-2" : ""}`}
        >
          <span className="w-2 h-2 bg-[#00ff00] rounded-full animate-pulse" />
          <span
            className={`text-[10px] font-mono text-[#00ff00] tracking-wider hidden ${
              showExpanded ? "lg:inline" : ""
            }`}
          >
            SYSTEM_ONLINE
          </span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-4 overflow-y-auto">
        <div
          className={`px-3 mb-2 hidden ${showExpanded ? "lg:block" : ""}`}
        >
          <span className="text-[10px] font-mono text-[#666666] uppercase tracking-wider px-3">
            Main Menu
          </span>
        </div>
        <nav className={`space-y-1 px-2 ${showExpanded ? "lg:px-3" : "lg:px-2"}`}>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="block">
                <div
                  className={`flex items-center font-mono text-sm transition-all duration-200 justify-center p-2.5 ${
                    showExpanded
                      ? "lg:justify-start lg:gap-3 lg:px-3 lg:py-2.5 lg:border-l-2"
                      : "lg:justify-center lg:p-2.5"
                  } ${
                    isActive
                      ? `bg-[#00ff0015] text-[#00ff00] ${showExpanded ? "lg:border-[#00ff00]" : ""}`
                      : `text-[#999999] hover:bg-[#00ff0010] hover:text-[#00ff00] ${showExpanded ? "lg:border-transparent lg:hover:border-[#00ff0066]" : ""}`
                  }`}
                  title={item.label}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span
                    className={`tracking-wide hidden ${showExpanded ? "lg:inline" : ""}`}
                  >
                    {item.label}
                  </span>
                  {isActive && (
                    <span
                      className={`ml-auto text-[10px] opacity-60 hidden ${
                        showExpanded ? "lg:inline" : ""
                      }`}
                    >
                      {">"}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Quick Stats Section - Only when expanded on desktop */}
        <div className={`mt-6 px-3 hidden ${showExpanded ? "lg:block" : ""}`}>
          <Divider variant="dashed" className="mb-4" />
          <span className="text-[10px] font-mono text-[#666666] uppercase tracking-wider px-3">
            Quick Stats
          </span>
          <div className="mt-3 px-3 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono text-[#999999]">Win Rate</span>
              <span className="text-xs font-mono text-[#00ff00]">68%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono text-[#999999]">
                Global Rank
              </span>
              <span className="text-xs font-mono text-[#9945ff]">#42</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono text-[#999999]">
                Active Streak
              </span>
              <Badge variant="success" className="text-[10px] px-2 py-0.5">
                7 days
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* User Profile Summary (Bottom) */}
      <div className="border-t border-[#00ff0033]">
        <div
          className={`p-3 flex justify-center ${
            showExpanded ? "lg:p-4 lg:justify-start" : "lg:p-3 lg:justify-center"
          }`}
        >
          <div
            className={`flex items-center ${showExpanded ? "lg:gap-3" : ""}`}
          >
            <Avatar size="xs" name="Dr. Physics" bordered />
            <div className={`flex-1 min-w-0 hidden ${showExpanded ? "lg:block" : ""}`}>
              <span className="font-mono text-sm text-white truncate block">
                Dr. Physics
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-[#9945ff]">
                  GRANDMASTER
                </span>
                <span className="text-[10px] font-mono text-[#666666]">•</span>
                <span className="text-[10px] font-mono text-[#00ff00]">
                  Lvl 42
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className={`px-2 pb-3 ${showExpanded ? "lg:px-4 lg:pb-4" : "lg:px-2 lg:pb-3"}`}>
          <button
            type="button"
            className={`w-full flex items-center justify-center border border-[#ff000033] text-[#ff6666] font-mono uppercase tracking-wider hover:bg-[#ff000015] hover:border-[#ff0000] transition-all p-2 ${
              showExpanded ? "lg:gap-2 lg:px-3 lg:py-2 lg:text-xs" : "lg:p-2"
            }`}
            title="Disconnect"
          >
            <LogOut className={`w-3 h-3 ${showExpanded ? "lg:w-3.5 lg:h-3.5" : "lg:w-3 lg:h-3"}`} />
            <span className={`hidden ${showExpanded ? "lg:inline" : ""}`}>
              Disconnect
            </span>
          </button>
        </div>
      </div>

      {/* Collapse Toggle Button - Hidden on mobile */}
      <button
        type="button"
        onClick={toggle}
        className="absolute -right-3 top-20 w-6 h-6 bg-[#0a0a0a] border border-[#00ff0033] hidden lg:flex items-center justify-center text-[#00ff00] hover:border-[#00ff00] hover:shadow-[0_0_10px_rgba(0,255,0,0.3)] transition-all"
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
