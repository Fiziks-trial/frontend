"use client";

import {
  Activity,
  Award,
  Crosshair,
  Flame,
  Swords,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";

import { RecentGames } from "@/components/dashboard/RecentGames";
import { Sidebar } from "@/components/layout/Sidebar";
import {
  SidebarProvider,
  useSidebar,
} from "@/components/layout/SidebarContext";
import { Badge } from "@/design-system/primitives/Badge/Badge";
import {
  ArrowButton,
  Button,
  IconButton as ButtonWithIcon,
} from "@/design-system/primitives/Button/Button";
import { Card, FeatureCard } from "@/design-system/primitives/Card/Card";
import { TerminalDivider } from "@/design-system/primitives/Divider/Divider";
import { Text } from "@/design-system/primitives/Text/Text";
import { StatCard } from "@/design-system/patterns/StatCard/StatCard";

interface Subject {
  id: number;
  name: string;
  elo: number;
  trend: string;
  status: "beginner" | "intermediate" | "expert" | "master" | "grandmaster";
  icon: React.ReactNode;
  progress: number;
}

const USER_STATS = {
  name: "Dr. Physics",
  totalBattles: 142,
  winRate: "68%",
  globalRank: "#42",
  totalElo: 2150,
  currentStreak: 7,
};

const SUBJECT_STATS: Subject[] = [
  {
    id: 1,
    name: "Classical Mechanics",
    elo: 1850,
    trend: "+12",
    status: "expert",
    icon: <Target className="w-5 h-5" />,
    progress: 62,
  },
  {
    id: 2,
    name: "Thermodynamics",
    elo: 1620,
    trend: "-5",
    status: "intermediate",
    icon: <Flame className="w-5 h-5" />,
    progress: 54,
  },
  {
    id: 3,
    name: "Electromagnetism",
    elo: 1940,
    trend: "+24",
    status: "master",
    icon: <Zap className="w-5 h-5" />,
    progress: 65,
  },
  {
    id: 4,
    name: "Optics",
    elo: 1450,
    trend: "+8",
    status: "intermediate",
    icon: <Crosshair className="w-5 h-5" />,
    progress: 48,
  },
  {
    id: 5,
    name: "Modern Physics",
    elo: 2010,
    trend: "+15",
    status: "master",
    icon: <Activity className="w-5 h-5" />,
    progress: 67,
  },
  {
    id: 6,
    name: "Quantum Mechanics",
    elo: 2200,
    trend: "+30",
    status: "grandmaster",
    icon: <Award className="w-5 h-5" />,
    progress: 73,
  },
];

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <DashboardContent />
    </SidebarProvider>
  );
}

function DashboardContent() {
  const { isCollapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Background Grid Pattern */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(#00ff0010 1px, transparent 1px), linear-gradient(90deg, #00ff0010 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <Sidebar />

      <main
        className={`relative z-10 min-h-screen transition-all duration-300 pl-16 ${isCollapsed ? "lg:pl-16" : "lg:pl-64"
          }`}
      >
        <div className="p-4 lg:p-6">
          {/* Header Section - Full Width */}
          <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3 lg:gap-4 mb-4 lg:mb-6">
            <div>
              <Text variant="status" color="neon" className="mb-1">
                {"/// COMMAND_CENTER"}
              </Text>
              <Text variant="h2" color="primary" className="mb-1">
                Dashboard
              </Text>
              <Text variant="bodySmall" color="muted">
                Welcome back, {USER_STATS.name}
              </Text>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm">
                Export
              </Button>
              <ArrowButton variant="primary" size="sm">
                Battle
              </ArrowButton>
            </div>
          </header>

          {/* Main Content with Recent Battles starting at Performance level */}
          <div className="flex gap-4 lg:gap-6">
            {/* Left Column */}
            <div className="flex-1 min-w-0 space-y-4 lg:space-y-6">
              {/* Stats Overview */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-[#00ff00]" />
                  <Text variant="caption" color="muted" uppercase font="mono">
                    Performance
                  </Text>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2 lg:gap-3">
                  <StatCard
                    label="Total ELO"
                    value={USER_STATS.totalElo.toLocaleString()}
                    change={{ value: "+45", type: "increase" }}
                    icon={<TrendingUp className="w-4 h-4" />}
                  />
                  <StatCard
                    label="Win Rate"
                    value={USER_STATS.winRate}
                    change={{ value: "+2%", type: "increase" }}
                    icon={<Target className="w-4 h-4" />}
                  />
                  <StatCard
                    label="Battles"
                    value={USER_STATS.totalBattles}
                    change={{ value: "12 today", type: "neutral" }}
                    icon={<Swords className="w-4 h-4" />}
                  />
                  <StatCard
                    label="Rank"
                    value={USER_STATS.globalRank}
                    change={{ value: "Top 5%", type: "increase" }}
                    icon={<Award className="w-4 h-4" />}
                  />
                </div>
              </section>

              {/* Quick Actions */}
              <section>
                <TerminalDivider text="// ACTIONS" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-3 mt-3 lg:mt-4">
                  <FeatureCard
                    title="Practice"
                    description="AI-powered practice sessions tailored to your weak points."
                  >
                    <ButtonWithIcon
                      variant="secondary"
                      size="sm"
                      icon={<Target className="w-4 h-4" />}
                      className="mt-3"
                    >
                      Start
                    </ButtonWithIcon>
                  </FeatureCard>
                  <FeatureCard
                    title="Arena"
                    description="Face other physicists in ranked competitive matches."
                  >
                    <ButtonWithIcon
                      variant="primary"
                      size="sm"
                      icon={<Swords className="w-4 h-4" />}
                      className="mt-3"
                    >
                      Match
                    </ButtonWithIcon>
                  </FeatureCard>
                  <FeatureCard
                    title="Quests"
                    description="Complete daily challenges for bonus XP and rewards."
                  >
                    <div className="mt-3 flex items-center gap-2">
                      <Badge variant="warning">3 Left</Badge>
                      <Button variant="link" size="sm">
                        View
                      </Button>
                    </div>
                  </FeatureCard>
                </div>
              </section>

              {/* Subject Mastery */}
              <section>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#9945ff]" />
                    <Text variant="caption" color="muted" uppercase font="mono">
                      Subject Mastery
                    </Text>
                  </div>
                  <Button variant="link" size="sm">
                    View All
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 lg:gap-3">
                  {SUBJECT_STATS.map((subject) => (
                    <SubjectCard key={subject.id} subject={subject} />
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column: Recent Battles - starts at Performance level */}
            <div className="hidden lg:block w-72 xl:w-80 shrink-0 self-start">
              <RecentGames />
            </div>
          </div>

          {/* Mobile: Recent Games below */}
          <div className="lg:hidden mt-4">
            <RecentGames />
          </div>
        </div>
      </main>
    </div>
  );
}

function SubjectCard({ subject }: { subject: Subject }) {
  const isPositive = subject.trend.startsWith("+");

  const statusColors: Record<Subject["status"], string> = {
    beginner: "default",
    intermediate: "warning",
    expert: "success",
    master: "purple",
    grandmaster: "purple",
  };

  return (
    <Card
      variant="bordered"
      className="group hover:shadow-[0_0_20px_rgba(0,255,0,0.2)] transition-all duration-300 p-0"
    >
      <div className="p-3 lg:p-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-2 lg:mb-3">
          <div className="w-8 h-8 lg:w-9 lg:h-9 bg-[#00ff0015] border border-[#00ff0033] flex items-center justify-center text-[#00ff00] group-hover:border-[#00ff00] group-hover:shadow-[0_0_10px_rgba(0,255,0,0.3)] transition-all">
            {subject.icon}
          </div>
          <Badge
            variant={
              statusColors[subject.status] as
              | "default"
              | "success"
              | "warning"
              | "error"
              | "purple"
            }
            className="text-[9px] lg:text-[10px]"
          >
            {subject.status}
          </Badge>
        </div>

        {/* Title */}
        <Text
          variant="caption"
          color="primary"
          weight="medium"
          className="mb-1 group-hover:text-[#00ff00] transition-colors lg:text-sm"
        >
          {subject.name}
        </Text>

        {/* ELO Score */}
        <div className="flex items-baseline gap-1 lg:gap-2 mb-2 lg:mb-3">
          <Text variant="body" color="neon" font="mono" className="font-bold lg:text-xl">
            {subject.elo.toLocaleString()}
          </Text>
          <Text variant="caption" color="muted" className="text-[10px]">
            ELO
          </Text>
          <Text
            variant="caption"
            color={isPositive ? "success" : "error"}
            font="mono"
            className="ml-auto text-[10px]"
          >
            {subject.trend}
          </Text>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between">
            <Text variant="caption" color="muted" className="text-[9px] lg:text-[10px]">
              Next Rank
            </Text>
            <Text
              variant="caption"
              color="neon"
              font="mono"
              className="text-[9px] lg:text-[10px]"
            >
              {subject.progress}%
            </Text>
          </div>
          <div className="w-full h-1 bg-[#1a1a1a] overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-[#00ff00] to-[#9945ff] transition-all duration-500"
              style={{ width: `${subject.progress}%` }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
