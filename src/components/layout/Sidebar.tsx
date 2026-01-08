import Link from "next/link";
import { usePathname } from "next/navigation";
import { Stack } from "@/design-system/layouts/Stack/Stack";
import { Avatar } from "@/design-system/primitives/Avatar/Avatar";
import { Text } from "@/design-system/primitives/Text/Text";

const NAV_ITEMS = [
  { label: "Overview", href: "/dashboard", icon: "📊" },
  { label: "My Battles", href: "/dashboard/battles", icon: "⚔️" },
  { label: "Leaderboard", href: "/dashboard/leaderboard", icon: "🏆" },
  { label: "Achievements", href: "/dashboard/achievements", icon: "⭐" },
  { label: "Settings", href: "/dashboard/settings", icon: "⚙️" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 border-r border-[var(--glass-border)] bg-[var(--color-bg-secondary)] flex flex-col z-50">
      {/* Logo Area */}
      <div className="p-6 border-b border-[var(--glass-border)]">
        <Text variant="h3" className="flex items-center gap-2">
          <span className="text-2xl">⚛️</span> Fiziks
        </Text>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-6 px-3">
        <Stack spacing="xs">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className="block">
                <div
                  className={`
                    flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200
                    ${
                      isActive
                        ? "bg-[var(--color-primary-500)]/10 text-[var(--color-primary-400)] border border-[var(--color-primary-500)]/20"
                        : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--glass-bg-hover)]"
                    }
                  `}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </Stack>
      </div>

      {/* User Profile Summary (Bottom) */}
      <div className="p-4 border-t border-[var(--glass-border)] bg-[var(--glass-bg-subtle)]">
        <div className="flex items-center gap-3">
          <Avatar size="sm" name="Dr. Physics" />
          <div className="flex-1 min-w-0">
            <Text
              variant="bodySmall"
              className="font-medium truncate text-[var(--color-text-primary)]"
            >
              Dr. Physics
            </Text>
            <Text
              variant="caption"
              className="truncate text-[var(--color-text-muted)]"
            >
              Lvl 42 • Grandmaster
            </Text>
          </div>
        </div>
      </div>
    </aside>
  );
}
