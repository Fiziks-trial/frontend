"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Atom,
  Beaker,
  Calculator,
  Dna,
  Layout,
  Settings,
  Swords,
  Trophy,
  History,
  Target,
} from "lucide-react";
import { SidebarItem } from "../sidebar-item";

const arenaItems = [
  { icon: Layout, label: "Overview", href: "/dashboard" },
  { icon: Target, label: "Problems", href: "/dashboard/problems" },
  { icon: Swords, label: "Find Match", href: "/dashboard/battles" },
  { icon: Trophy, label: "Leaderboards", href: "/dashboard/leaderboard" },
  { icon: History, label: "Match History", href: "/dashboard/history" },
];

const subjectItems = [
  { icon: Calculator, label: "Mathematics", href: "/dashboard/subjects/math" },
  { icon: Atom, label: "Physics", href: "/dashboard/subjects/physics" },
  { icon: Beaker, label: "Chemistry", href: "/dashboard/subjects/chemistry" },
  { icon: Dna, label: "Biology", href: "/dashboard/subjects/biology" },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="flex flex-col h-full pt-8 pb-6 px-4">
      {/* Brand */}
      <Link href="/dashboard" className="flex items-center gap-2 px-2 mb-8">
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground shadow-sm">
          <Swords size={16} />
        </div>
        <span className="font-bold text-lg tracking-tight">MindSport</span>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 space-y-8 overflow-y-auto">
        <div>
          <div className="section-label px-2 mb-2">Arena</div>
          <ul className="space-y-1">
            {arenaItems.map((item) => (
              <SidebarItem
                key={item.href}
                icon={<item.icon size={18} />}
                label={item.label}
                href={item.href}
                active={isActive(item.href)}
              />
            ))}
          </ul>
        </div>

        <div>
          <div className="section-label px-2 mb-2">Subject Leagues</div>
          <ul className="space-y-1">
            {subjectItems.map((item) => (
              <SidebarItem
                key={item.href}
                icon={<item.icon size={18} />}
                label={item.label}
                href={item.href}
                active={isActive(item.href)}
              />
            ))}
          </ul>
        </div>
      </nav>

      {/* Footer */}
      <div className="pt-4 border-t border-border">
        <SidebarItem
          icon={<Settings size={18} />}
          label="Settings"
          href="/dashboard/settings"
          active={isActive("/dashboard/settings")}
        />
      </div>
    </div>
  );
}
