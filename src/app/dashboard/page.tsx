"use client";

import {
  Activity,
  ArrowRight,
  Award,
  BookOpen,
  ChevronRight,
  Crosshair,
  Flame,
  Play,
  Swords,
  Target,
  TrendingUp,
  Trophy,
  Zap,
} from "lucide-react";

import { RecentGames } from "@/components/dashboard/RecentGames";
import { Sidebar } from "@/components/layout/Sidebar";
import {
  SidebarProvider,
  useSidebar,
} from "@/components/layout/SidebarContext";

interface Subject {
  id: number;
  name: string;
  elo: number;
  trend: string;
  status: "beginner" | "intermediate" | "expert" | "master" | "grandmaster";
  icon: React.ReactNode;
  progress: number;
  color: string;
}

const USER_STATS = {
  name: "Dr. Physics",
  totalBattles: 142,
  winRate: "68%",
  globalRank: "#42",
  totalElo: 2150,
  currentStreak: 7,
  eloHistory: [1980, 2010, 1995, 2050, 2080, 2105, 2150],
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
    color: "from-blue-500 to-cyan-400",
  },
  {
    id: 2,
    name: "Thermodynamics",
    elo: 1620,
    trend: "-5",
    status: "intermediate",
    icon: <Flame className="w-5 h-5" />,
    progress: 54,
    color: "from-orange-500 to-amber-400",
  },
  {
    id: 3,
    name: "Electromagnetism",
    elo: 1940,
    trend: "+24",
    status: "master",
    icon: <Zap className="w-5 h-5" />,
    progress: 65,
    color: "from-yellow-500 to-orange-400",
  },
  {
    id: 4,
    name: "Optics",
    elo: 1450,
    trend: "+8",
    status: "intermediate",
    icon: <Crosshair className="w-5 h-5" />,
    progress: 48,
    color: "from-green-500 to-emerald-400",
  },
  {
    id: 5,
    name: "Modern Physics",
    elo: 2010,
    trend: "+15",
    status: "master",
    icon: <Activity className="w-5 h-5" />,
    progress: 67,
    color: "from-pink-500 to-rose-400",
  },
  {
    id: 6,
    name: "Quantum Mechanics",
    elo: 2200,
    trend: "+30",
    status: "grandmaster",
    icon: <Award className="w-5 h-5" />,
    progress: 73,
    color: "from-purple-500 to-violet-400",
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
    <div className="min-h-screen bg-[#0f0f12]">
      {/* Ambient Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[40%] -left-[20%] w-[80%] h-[80%] rounded-full bg-indigo-500/[0.03] blur-[120px]" />
        <div className="absolute -bottom-[40%] -right-[20%] w-[70%] h-[70%] rounded-full bg-purple-500/[0.03] blur-[120px]" />
      </div>

      <Sidebar />

      <main
        className={`relative z-10 min-h-screen transition-all duration-300 pl-16 ${
          isCollapsed ? "lg:pl-16" : "lg:pl-72"
        }`}
      >
        <div className="p-4 lg:p-8 max-w-[1600px] mx-auto">
          {/* Header */}
          <header className="mb-8">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
                  Welcome back, {USER_STATS.name.split(" ")[0]}
                </h1>
                <p className="text-zinc-400 mt-1">
                  Ready to continue your physics journey?
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-300 bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.08] transition-all duration-200"
                >
                  Export Stats
                </button>
                <button
                  type="button"
                  className="px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-200 flex items-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  Start Battle
                </button>
              </div>
            </div>
          </header>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
            {/* Hero Stats Card - Large */}
            <div className="lg:col-span-8 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent rounded-2xl border border-white/[0.08] p-6 lg:p-8 backdrop-blur-sm">
              <div className="flex flex-col lg:flex-row justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-indigo-400 mb-4">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      Performance Overview
                    </span>
                  </div>
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-5xl lg:text-6xl font-bold text-white">
                      {USER_STATS.totalElo.toLocaleString()}
                    </span>
                    <span className="text-emerald-400 text-lg font-semibold">
                      +45
                    </span>
                  </div>
                  <p className="text-zinc-400 text-sm">Total ELO Rating</p>

                  <div className="mt-6 h-20">
                    <Sparkline
                      data={USER_STATS.eloHistory}
                      color="#818cf8"
                      width={280}
                      height={80}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 lg:w-72">
                  <MiniStatCard
                    label="Win Rate"
                    value={USER_STATS.winRate}
                    change="+2%"
                    icon={<Target className="w-4 h-4" />}
                    positive
                  />
                  <MiniStatCard
                    label="Battles"
                    value={USER_STATS.totalBattles.toString()}
                    change="12 today"
                    icon={<Swords className="w-4 h-4" />}
                  />
                  <MiniStatCard
                    label="Global Rank"
                    value={USER_STATS.globalRank}
                    change="Top 5%"
                    icon={<Trophy className="w-4 h-4" />}
                    positive
                  />
                  <MiniStatCard
                    label="Streak"
                    value={`${USER_STATS.currentStreak} days`}
                    change="Personal best!"
                    icon={<Flame className="w-4 h-4" />}
                    positive
                  />
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="lg:col-span-4 bg-[#18181b]/60 rounded-2xl border border-white/[0.08] p-5 backdrop-blur-sm">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <QuickActionCard
                  title="Practice Mode"
                  description="AI-powered sessions"
                  icon={<BookOpen className="w-5 h-5" />}
                  gradient="from-emerald-500 to-teal-400"
                />
                <QuickActionCard
                  title="Ranked Arena"
                  description="Competitive matches"
                  icon={<Swords className="w-5 h-5" />}
                  gradient="from-indigo-500 to-purple-500"
                  primary
                />
                <QuickActionCard
                  title="Daily Quests"
                  description="3 remaining"
                  icon={<Award className="w-5 h-5" />}
                  gradient="from-amber-500 to-orange-400"
                  badge="3"
                />
              </div>
            </div>

            {/* Subject Mastery Cards */}
            <div className="lg:col-span-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold flex items-center gap-2">
                  <Activity className="w-4 h-4 text-purple-400" />
                  Subject Mastery
                </h3>
                <button
                  type="button"
                  className="text-sm text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  View All <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
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
            </div>

            {/* Recent Battles */}
            <div className="lg:col-span-4">
              <RecentGames />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Sparkline({
  data,
  color = "#818cf8",
  height = 80,
  width = 280,
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
  const padding = 4;

  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * (width - padding * 2) + padding;
      const y =
        height - padding - ((value - min) / range) * (height - padding * 2);
      return `${x},${y}`;
    })
    .join(" ");

  const areaPoints = `${padding},${height - padding} ${points} ${width - padding},${height - padding}`;

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
      <polygon points={areaPoints} fill="url(#sparklineGradient)" />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={width - padding}
        cy={
          height -
          padding -
          ((data[data.length - 1] - min) / range) * (height - padding * 2)
        }
        r="4"
        fill={color}
        className="animate-pulse"
      />
    </svg>
  );
}

function MiniStatCard({
  label,
  value,
  change,
  icon,
  positive = false,
}: {
  label: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  positive?: boolean;
}) {
  return (
    <div className="bg-white/[0.03] rounded-xl p-4 border border-white/[0.05] hover:border-white/[0.1] transition-colors">
      <div className="flex items-center gap-2 text-zinc-400 mb-2">
        {icon}
        <span className="text-xs font-medium">{label}</span>
      </div>
      <p className="text-xl font-bold text-white">{value}</p>
      <p
        className={`text-xs mt-1 ${positive ? "text-emerald-400" : "text-zinc-500"}`}
      >
        {change}
      </p>
    </div>
  );
}

function QuickActionCard({
  title,
  description,
  icon,
  gradient,
  primary = false,
  badge,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  primary?: boolean;
  badge?: string;
}) {
  return (
    <button
      type="button"
      className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-200 group ${
        primary
          ? "bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 hover:border-indigo-500/50"
          : "bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/[0.1]"
      }`}
    >
      <div
        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-lg`}
      >
        {icon}
      </div>
      <div className="flex-1 text-left">
        <p className="text-white font-medium text-sm">{title}</p>
        <p className="text-zinc-500 text-xs">{description}</p>
      </div>
      {badge ? (
        <span className="px-2 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-medium">
          {badge}
        </span>
      ) : (
        <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
      )}
    </button>
  );
}

function SubjectCard({ subject, rank }: { subject: Subject; rank: number }) {
  const isPositive = subject.trend.startsWith("+");
  const isTopThree = rank <= 3;

  const statusConfig: Record<
    Subject["status"],
    { label: string; color: string }
  > = {
    beginner: { label: "Beginner", color: "text-zinc-400 bg-zinc-500/10" },
    intermediate: {
      label: "Intermediate",
      color: "text-amber-400 bg-amber-500/10",
    },
    expert: { label: "Expert", color: "text-emerald-400 bg-emerald-500/10" },
    master: { label: "Master", color: "text-purple-400 bg-purple-500/10" },
    grandmaster: {
      label: "Grandmaster",
      color: "text-indigo-400 bg-indigo-500/10",
    },
  };

  return (
    <div className="bg-[#18181b]/60 rounded-xl border border-white/[0.08] p-4 hover:border-white/[0.15] hover:bg-[#18181b]/80 transition-all duration-200 group cursor-pointer">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {isTopThree && (
            <div
              className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                rank === 1
                  ? "bg-amber-500/20 text-amber-400"
                  : rank === 2
                    ? "bg-zinc-400/20 text-zinc-300"
                    : "bg-orange-500/20 text-orange-400"
              }`}
            >
              {rank}
            </div>
          )}
          <div
            className={`w-9 h-9 rounded-xl bg-gradient-to-br ${subject.color} flex items-center justify-center text-white shadow-lg opacity-80 group-hover:opacity-100 transition-opacity`}
          >
            {subject.icon}
          </div>
        </div>
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full ${statusConfig[subject.status].color}`}
        >
          {statusConfig[subject.status].label}
        </span>
      </div>

      <h4 className="text-white font-medium text-sm mb-1">{subject.name}</h4>

      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-2xl font-bold text-white">
          {subject.elo.toLocaleString()}
        </span>
        <span className="text-xs text-zinc-500">ELO</span>
        <span
          className={`text-xs font-medium ml-auto ${isPositive ? "text-emerald-400" : "text-red-400"}`}
        >
          {subject.trend}
        </span>
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between text-xs">
          <span className="text-zinc-500">Next Rank</span>
          <span className="text-zinc-400 font-medium">{subject.progress}%</span>
        </div>
        <div className="w-full h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${subject.color} rounded-full transition-all duration-500`}
            style={{ width: `${subject.progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
