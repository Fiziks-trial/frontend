"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
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

const NAV_ITEMS = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Battles", href: "/dashboard/battles", icon: Swords },
  { label: "Leaderboard", href: "/dashboard/leaderboard", icon: Trophy },
  { label: "Achievements", href: "/dashboard/achievements", icon: Medal },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 border-r border-[#00ff0033] bg-[#0a0a0a] flex flex-col z-50">
      {/* Logo Area */}
      <div className="p-6 border-b border-[#00ff0033]">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-[#00ff0020] border border-[#00ff00] flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(0,255,0,0.3)] transition-all">
            <Terminal className="w-5 h-5 text-[#00ff00]" />
          </div>
          <div>
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
      <div className="px-6 py-3 border-b border-[#00ff0033]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#00ff00] rounded-full animate-pulse" />
          <span className="text-[10px] font-mono text-[#00ff00] tracking-wider">
            SYSTEM_ONLINE
          </span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-4 overflow-y-auto">
        <div className="px-3 mb-2">
          <span className="text-[10px] font-mono text-[#666666] uppercase tracking-wider px-3">
            Main Menu
          </span>
        </div>
        <nav className="space-y-1 px-3">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="block">
                <div
                  className={`
                    flex items-center gap-3 px-3 py-2.5 font-mono text-sm transition-all duration-200
                    border-l-2
                    ${
                      isActive
                        ? "bg-[#00ff0015] border-[#00ff00] text-[#00ff00]"
                        : "border-transparent text-[#999999] hover:bg-[#00ff0010] hover:text-[#00ff00] hover:border-[#00ff0066]"
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span className="tracking-wide">{item.label}</span>
                  {isActive && (
                    <span className="ml-auto text-[10px] opacity-60">{">"}</span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Quick Stats Section */}
        <div className="mt-6 px-3">
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
        <div className="p-4">
          <div className="flex items-center gap-3">
            <Avatar size="sm" name="Dr. Physics" bordered glow />
            <div className="flex-1 min-w-0">
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
        <div className="px-4 pb-4">
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 px-3 py-2 border border-[#ff000033] text-[#ff6666] text-xs font-mono uppercase tracking-wider hover:bg-[#ff000015] hover:border-[#ff0000] transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            Disconnect
          </button>
        </div>
      </div>
    </aside>
  );
}
