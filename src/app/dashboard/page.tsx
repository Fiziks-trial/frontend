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
  eloHistory: [1980, 2010, 1995, 2050, 2080, 2105, 2150], // Last 7 days
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
            "linear-gradient(#22c55e10 1px, transparent 1px), linear-gradient(90deg, #22c55e10 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <Sidebar />

      <main
        className={`relative z-10 min-h-screen transition-all duration-300 pl-16 ${
          isCollapsed ? "lg:pl-16" : "lg:pl-64"
        }`}
      >
        <div className="p-4 lg:p-6">
          {/* Header Section - Full Width */}
          <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3 lg:gap-4 mb-4 lg:mb-6">
            <div>
              <Text variant="status" color="muted" className="mb-1">
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
                  <TrendingUp className="w-4 h-4 text-[#22c55e]" />
                  <Text variant="caption" color="accent" uppercase font="mono">
                    Performance
                  </Text>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2 lg:gap-3">
                  {/* Enhanced ELO Card with Sparkline */}
                  <div className="p-3 lg:p-4 bg-[#0a0a0a] border border-[rgba(255,255,255,0.1)] transition-all duration-300 hover:border-[#22c55e40]">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] lg:text-xs text-[#999999] mb-0.5 lg:mb-1">
                          Total ELO
                        </p>
                        <p className="text-lg lg:text-2xl font-bold text-white">
                          {USER_STATS.totalElo.toLocaleString()}
                        </p>
                        <p className="text-[10px] lg:text-xs mt-1 lg:mt-2 font-medium text-[#22c55e]">
                          ↑ +45 this week
                        </p>
                      </div>
                      <div className="shrink-0">
                        <Sparkline
                          data={USER_STATS.eloHistory}
                          color="#22c55e"
                          width={64}
                          height={28}
                        />
                      </div>
                    </div>
                  </div>
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
                    <Zap className="w-4 h-4 text-[#22c55e]" />
                    <Text
                      variant="caption"
                      color="accent"
                      uppercase
                      font="mono"
                    >
                      Subject Mastery
                    </Text>
                  </div>
                  <Button variant="link" size="sm">
                    View All
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 lg:gap-3">
                  {[...SUBJECT_STATS]
                    .sort((a, b) => b.elo - a.elo)
                    .map((subject, index) => (
                      <SubjectCard
                        key={subject.id}
                        subject={subject}
                        rank={index + 1}
                      />
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

function Sparkline({
  data,
  color = "#22c55e",
  height = 32,
  width = 80,
}: {
  data: number[];
  color?: string;
  height?: number;
  width?: number;
}) {
  if (data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * (height - 4) - 2;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      width={width}
      height={height}
      className="overflow-visible"
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label="ELO trend sparkline"
    >
      <title>ELO trend over time</title>
      <defs>
        <linearGradient
          id="sparklineGradient"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Fill area */}
      <polygon
        points={`0,${height} ${points} ${width},${height}`}
        fill="url(#sparklineGradient)"
      />
      {/* Line */}
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* End dot */}
      <circle
        cx={width}
        cy={height - ((data[data.length - 1] - min) / range) * (height - 4) - 2}
        r="3"
        fill={color}
        className="animate-pulse"
      />
    </svg>
  );
}

function SubjectCard({ subject, rank }: { subject: Subject; rank: number }) {
  const isPositive = subject.trend.startsWith("+");
  const isTopPerformer = rank === 1;
  const isTopThree = rank <= 3;

  const statusColors: Record<Subject["status"], string> = {
    beginner: "default",
    intermediate: "warning",
    expert: "success",
    master: "purple",
    grandmaster: "purple",
  };

  const rankColors: Record<number, string> = {
    1: "text-[#d4a574] bg-[#d4a57415] border-[#d4a574]", // Muted gold
    2: "text-[#94a3b8] bg-[#94a3b815] border-[#94a3b8]", // Silver
    3: "text-[#b8956b] bg-[#b8956b15] border-[#b8956b]", // Bronze
  };

  return (
    <Card
      variant="bordered"
      className={`group transition-all duration-300 p-0 ${
        isTopPerformer
          ? "border-[#d4a57450] hover:border-[#d4a574]"
          : "hover:border-[#22c55e50]"
      }`}
    >
      <div className="p-3 lg:p-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-2 lg:mb-3">
          <div className="flex items-center gap-2">
            {/* Rank Badge */}
            {isTopThree && (
              <div
                className={`w-5 h-5 lg:w-6 lg:h-6 flex items-center justify-center text-[9px] lg:text-[10px] font-bold border ${rankColors[rank]}`}
              >
                {rank}
              </div>
            )}
            <div
              className={`w-8 h-8 lg:w-9 lg:h-9 flex items-center justify-center transition-all ${
                isTopPerformer
                  ? "bg-[#d4a57410] border border-[#d4a57430] text-[#d4a574] group-hover:border-[#d4a57460]"
                  : "bg-[#22c55e08] border border-[#22c55e20] text-[#22c55e80] group-hover:border-[#22c55e50] group-hover:text-[#22c55e]"
              }`}
            >
              {subject.icon}
            </div>
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
            className="text-[10px] lg:text-xs"
          >
            {subject.status}
          </Badge>
        </div>

        {/* Title */}
        <Text
          variant="caption"
          color="primary"
          weight="medium"
          className="mb-1 text-[11px] lg:text-xs"
        >
          {subject.name}
        </Text>

        {/* ELO Score */}
        <div className="flex items-baseline gap-1 lg:gap-2 mb-2 lg:mb-3">
          <Text
            variant="body"
            color={isTopPerformer ? "warning" : "primary"}
            font="mono"
            className="font-bold text-sm lg:text-base"
          >
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
            <Text
              variant="caption"
              color="muted"
              className="text-[10px] lg:text-xs"
            >
              Next Rank
            </Text>
            <Text
              variant="caption"
              color={isTopPerformer ? "warning" : "secondary"}
              font="mono"
              className="text-[10px] lg:text-xs"
            >
              {subject.progress}%
            </Text>
          </div>
          <div className="w-full h-1.5 bg-[#1a1a1a] overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                isTopPerformer ? "bg-[#d4a574]" : "bg-[rgba(255,255,255,0.3)]"
              }`}
              style={{ width: `${subject.progress}%` }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
