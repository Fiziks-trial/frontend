"use client";

import { RecentGames } from "@/components/dashboard/RecentGames";
import { Sidebar } from "@/components/layout/Sidebar";
import { Grid } from "@/design-system/layouts/Grid/Grid";
import { Stack } from "@/design-system/layouts/Stack/Stack";
import { Badge } from "@/design-system/primitives/Badge/Badge";
import { Button } from "@/design-system/primitives/Button/Button";
import { Card } from "@/design-system/primitives/Card/Card";
import { Text } from "@/design-system/primitives/Text/Text";

interface Subject {
  id: number;
  name: string;
  elo: number;
  trend: string;
  status: string;
}

// Mock Data
const USER_STATS = {
  name: "Dr. Physics",
  totalBattles: 142,
  winRate: "68%",
  globalRank: "#42",
  totalElo: 2150,
};

const SUBJECT_STATS = [
  {
    id: 1,
    name: "Classical Mechanics",
    elo: 1850,
    trend: "+12",
    status: "expert",
  },
  {
    id: 2,
    name: "Thermodynamics",
    elo: 1620,
    trend: "-5",
    status: "intermediate",
  },
  {
    id: 3,
    name: "Electromagnetism",
    elo: 1940,
    trend: "+24",
    status: "master",
  },
  { id: 4, name: "Optics", elo: 1450, trend: "+8", status: "intermediate" },
  { id: 5, name: "Modern Physics", elo: 2010, trend: "+15", status: "master" },
  {
    id: 6,
    name: "Quantum Mechanics",
    elo: 2200,
    trend: "+30",
    status: "grandmaster",
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-(--color-bg-primary) text-[var(--color-text-primary)]">
      {/* Background Grid */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, #333 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <Sidebar />

      <main className="relative z-10 pl-64 min-h-screen">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <Stack spacing="xl">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <Text
                  variant="h2"
                  className="text-3xl font-bold tracking-tight mb-1"
                >
                  Dashboard
                </Text>
                <Text
                  variant="bodySmall"
                  className="text-[var(--color-text-secondary)]"
                >
                  Welcome back, {USER_STATS.name}. Here is your physics
                  performance.
                </Text>
              </div>
              <div className="flex gap-3">
                <Button variant="secondary" size="sm">
                  Export Data
                </Button>
                <Button variant="primary" size="sm">
                  Start Battle
                </Button>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Left Column: Stats & Subjects */}
              <div className="lg:col-span-3 space-y-8">
                {/* Overview Stats */}
                <Grid cols={4} gap="md">
                  <StatsOverviewCard
                    label="Total ELO"
                    value={USER_STATS.totalElo}
                    trend="+45 this week"
                  />
                  <StatsOverviewCard
                    label="Win Rate"
                    value={USER_STATS.winRate}
                    trend="+2% this week"
                  />
                  <StatsOverviewCard
                    label="Battles"
                    value={USER_STATS.totalBattles}
                    trend="12 played today"
                  />
                  <StatsOverviewCard
                    label="Global Rank"
                    value={USER_STATS.globalRank}
                    trend="Top 5%"
                  />
                </Grid>

                {/* Subject Performance Section */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <Text variant="h4" className="text-lg font-semibold">
                      Subject Mastery
                    </Text>
                    <Button variant="ghost" size="sm">
                      View All
                    </Button>
                  </div>

                  <Grid cols={3} gap="md">
                    {SUBJECT_STATS.map((subject) => (
                      <SubjectCard key={subject.id} subject={subject} />
                    ))}
                  </Grid>
                </div>
              </div>

              {/* Right Column: Recent Games */}
              <div className="lg:col-span-1">
                <RecentGames />
              </div>
            </div>
          </Stack>
        </div>
      </main>
    </div>
  );
}

// Sub-components for this page
function StatsOverviewCard({
  label,
  value,
  trend,
}: {
  label: string;
  value: string | number;
  trend: string;
}) {
  return (
    <Card
      variant="default"
      className="p-5 border-(--glass-border) bg-(--color-bg-secondary)"
    >
      <Stack spacing="sm">
        <Text
          variant="caption"
          className="uppercase tracking-wider text-(--color-text-muted) font-medium"
        >
          {label}
        </Text>
        <Text variant="h3" className="text-2xl font-bold text-white">
          {value}
        </Text>
        <Text
          variant="caption"
          className="text-(--color-success-400) flex items-center gap-1"
        >
          <span className="text-[10px]">▲</span> {trend}
        </Text>
      </Stack>
    </Card>
  );
}

function SubjectCard({ subject }: { subject: Subject }) {
  const isPositive = subject.trend.startsWith("+");

  return (
    <Card
      variant="bordered"
      className="group hover:border-[var(--color-primary-500)] transition-colors duration-300"
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <Badge
            variant={subject.status === "grandmaster" ? "purple" : "default"}
          >
            {subject.status}
          </Badge>
          <span
            className={`text-xs font-mono ${isPositive ? "text-(--color-success-400)" : "text-(--color-error-400)"}`}
          >
            {subject.trend}
          </span>
        </div>

        <Text
          variant="body"
          className="font-medium mb-1 group-hover:text-[var(--color-primary-400)] transition-colors"
        >
          {subject.name}
        </Text>

        <div className="flex items-end gap-2 mt-3">
          <Text
            variant="h3"
            className="leading-none text-[var(--color-text-primary)]"
          >
            {subject.elo}
          </Text>
          <Text
            variant="caption"
            className="mb-0.5 text-[var(--color-text-muted)]"
          >
            ELO
          </Text>
        </div>

        {/* Simple Progress Bar */}
        <div className="w-full h-1 bg-[var(--color-bg-active)] rounded-full mt-3 overflow-hidden">
          <div
            className="h-full bg-[var(--color-primary-500)]"
            style={{ width: `${(subject.elo / 3000) * 100}%` }}
          />
        </div>
      </div>
    </Card>
  );
}
