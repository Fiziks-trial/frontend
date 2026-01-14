"use client";

import { useState } from "react";
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
  MoreHorizontal,
  Zap,
  Crown,
  ChevronRight,
  FileText,
  Menu,
  X,
} from "lucide-react";

const RefinedDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background text-foreground font-sans selection:bg-section-indigo">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 bg-black/20 z-40 lg:hidden cursor-default"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 shrink-0 border-r border-border bg-background
        flex flex-col pt-8 pb-6 px-4
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        {/* Close button for mobile */}
        <button
          type="button"
          className="absolute top-4 right-4 p-2 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <X size={20} className="text-muted-foreground" />
        </button>

        <div className="flex items-center gap-2 px-2 mb-8">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground shadow-sm">
            <Swords size={16} />
          </div>
          <span className="font-bold text-lg tracking-tight">MindSport</span>
        </div>

        <nav className="flex-1 space-y-8 overflow-y-auto">
          <div>
            <div className="section-label px-2 mb-2">Arena</div>
            <ul className="space-y-1">
              <SidebarItem
                icon={<Layout size={18} />}
                label="Overview"
                active
              />
              <SidebarItem icon={<Swords size={18} />} label="Find Match" />
              <SidebarItem icon={<Trophy size={18} />} label="Leaderboards" />
              <SidebarItem icon={<History size={18} />} label="Match History" />
            </ul>
          </div>

          <div>
            <div className="section-label px-2 mb-2">Subject Leagues</div>
            <ul className="space-y-1">
              <SidebarItem
                icon={<Calculator size={18} />}
                label="Mathematics"
              />
              <SidebarItem icon={<Atom size={18} />} label="Physics" />
              <SidebarItem icon={<Beaker size={18} />} label="Chemistry" />
              <SidebarItem icon={<Dna size={18} />} label="Biology" />
            </ul>
          </div>
        </nav>

        <div className="pt-4 border-t border-border">
          <button
            type="button"
            className="flex items-center gap-3 px-2 py-2 w-full hover:bg-secondary rounded-lg transition-colors text-sm font-medium text-muted-foreground"
          >
            <Settings size={18} />
            <span>Settings</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
          {/* HEADER */}
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8 sm:mb-10">
            <div className="flex items-start gap-4 w-full sm:w-auto">
              {/* Mobile menu button */}
              <button
                type="button"
                className="p-2 -ml-2 lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu size={24} className="text-muted-foreground" />
              </button>

              <div>
                <p className="text-muted-foreground font-medium mb-1 flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
                  Season 4 • Week 2
                </p>
                <h1 className="headline-serif text-2xl sm:text-3xl lg:text-4xl">
                  Welcome back, Tushar.
                </h1>
              </div>
            </div>

            {/* Level Capsule */}
            <div className="bg-card pl-1 pr-4 sm:pr-6 py-1 rounded-full border border-border shadow-sm flex items-center gap-3 sm:gap-4 hover:shadow-md transition-shadow cursor-pointer w-full sm:w-auto">
              {/* Avatar + Progress Ring */}
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shrink-0">
                <svg
                  aria-hidden="true"
                  className="w-full h-full transform -rotate-90"
                >
                  <circle
                    cx="50%"
                    cy="50%"
                    r="40%"
                    stroke="var(--muted)"
                    strokeWidth="3"
                    fill="transparent"
                  />
                  <circle
                    cx="50%"
                    cy="50%"
                    r="40%"
                    stroke="var(--primary)"
                    strokeWidth="3"
                    fill="transparent"
                    strokeDasharray="138"
                    strokeDashoffset="30"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 sm:w-9 sm:h-9 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold">
                  TB
                </div>
              </div>

              {/* Text Info */}
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-foreground">
                    Level 42
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-muted text-[10px] font-bold text-muted-foreground border border-border">
                    240 XP
                  </span>
                </div>
                <span className="text-xs text-muted-foreground font-serif italic truncate">
                  Grandmaster League
                </span>
              </div>
            </div>
          </header>

          {/* GRID LAYOUT - Responsive */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6">
            {/* HERO CARD */}
            <div className="md:col-span-2 lg:col-span-8 bg-linear-to-br from-section-blue to-section-purple rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm border border-white/50 relative overflow-hidden group cursor-pointer transition-transform hover:scale-[1.005] duration-300">
              <div className="cloud-blur w-64 h-64 -mr-16 -mt-16 top-0 right-0"></div>

              <div className="relative z-10">
                <span className="inline-block px-3 py-1 bg-white/60 backdrop-blur-sm rounded-full text-xs font-semibold text-accent-indigo mb-4 border border-white/20">
                  Win Streak: 5
                </span>
                <h2 className="headline-serif text-xl sm:text-2xl lg:text-3xl mb-2 leading-tight">
                  Your Physics Rating is peaking.
                </h2>
                <p className="text-muted-foreground mb-6 sm:mb-8 max-w-md text-sm leading-relaxed">
                  You are 20 points away from the Diamond League. A win in
                  Quantum Mechanics topics will secure your promotion.
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <button
                    type="button"
                    className="bg-primary text-primary-foreground px-5 sm:px-6 py-2.5 rounded-xl font-medium text-sm hover:bg-primary-hover transition-colors shadow-lg shadow-primary/10 flex items-center gap-2 w-full sm:w-auto justify-center"
                  >
                    <Swords size={16} />
                    Find Ranked Match
                  </button>
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-card border-2 border-section-blue flex items-center justify-center text-[10px] font-bold text-muted-foreground">
                        You
                      </div>
                      <div className="w-8 h-8 rounded-full bg-section-indigo border-2 border-section-blue"></div>
                      <div className="w-8 h-8 rounded-full bg-section-pink border-2 border-section-blue"></div>
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">
                      1,204 online
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* STATS CARD */}
            <div className="lg:col-span-4 bg-card rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-sm border border-border flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <h3 className="font-serif text-lg text-foreground">
                  Global Rank
                </h3>
                <div className="p-2 bg-muted rounded-lg">
                  <Trophy size={18} className="text-muted-foreground" />
                </div>
              </div>

              <div className="flex items-center justify-center py-4">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
                  <svg
                    aria-hidden="true"
                    className="w-full h-full transform -rotate-90"
                  >
                    <circle
                      cx="50%"
                      cy="50%"
                      r="44%"
                      stroke="var(--muted)"
                      strokeWidth="12"
                      fill="transparent"
                    />
                    <circle
                      cx="50%"
                      cy="50%"
                      r="44%"
                      stroke="var(--warning)"
                      strokeWidth="12"
                      fill="transparent"
                      strokeDasharray="351"
                      strokeDashoffset="35"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
                      #42
                    </span>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wide font-bold">
                      Top 1%
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Tier:{" "}
                  <span className="text-warning font-bold">Grandmaster</span>
                </p>
              </div>
            </div>

            {/* SECOND ROW */}

            {/* YELLOW NOTE */}
            <div className="lg:col-span-4 bg-section-yellow rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-sm border border-warning/20 group hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-serif text-lg text-foreground flex items-center gap-2">
                  <FileText size={18} className="text-warning/70" />
                  Analysis
                </h3>
                <button
                  type="button"
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-warning/20 rounded"
                >
                  <MoreHorizontal size={16} className="text-warning" />
                </button>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="mt-1 min-w-4 h-4 border-2 border-warning/30 rounded flex items-center justify-center shrink-0"></div>
                  <span className="text-sm text-foreground/80 leading-snug">
                    Review 3 missed organic chemistry reactions
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 min-w-4 h-4 border-2 border-warning/30 rounded flex items-center justify-center shrink-0">
                    <Zap size={12} className="text-warning" />
                  </div>
                  <span className="text-sm text-muted-foreground leading-snug">
                    Calculus integration speed improved by 15%
                  </span>
                </li>
              </ul>
            </div>

            {/* CENTER LIST (ELO) */}
            <div className="lg:col-span-4 bg-card rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-sm border border-border">
              <h3 className="font-serif text-lg text-foreground mb-4">
                Subject Ratings
              </h3>
              <div className="space-y-4">
                <EloItem
                  icon={<Calculator size={16} />}
                  subject="Mathematics"
                  elo="1,450"
                  color="blue"
                />
                <EloItem
                  icon={<Atom size={16} />}
                  subject="Physics"
                  elo="1,320"
                  color="purple"
                />
                <EloItem
                  icon={<Beaker size={16} />}
                  subject="Chemistry"
                  elo="1,105"
                  color="orange"
                />
                <EloItem
                  icon={<Dna size={16} />}
                  subject="Biology"
                  elo="1,180"
                  color="green"
                />
              </div>
            </div>

            {/* PURPLE TILE */}
            <div className="lg:col-span-4 bg-section-purple rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-sm border border-accent-purple/20 flex flex-col justify-center relative overflow-hidden">
              <div className="relative z-10">
                <div className="w-10 h-10 bg-card rounded-xl flex items-center justify-center text-accent-purple mb-4 shadow-sm">
                  <Crown size={20} />
                </div>
                <h3 className="font-serif text-lg text-foreground mb-1">
                  Weekly Tournament
                </h3>
                <p className="text-xs text-muted-foreground mb-4">
                  "Science Olympiad" starts in 2 hours.
                </p>
                <button
                  type="button"
                  className="text-xs font-bold uppercase tracking-wide text-accent-purple flex items-center gap-1 hover:gap-2 transition-all"
                >
                  Register Now <ChevronRight size={14} />
                </button>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-section-purple rounded-full blur-2xl opacity-70"></div>
            </div>

            {/* MATCH TIMELINE - Now inside the grid */}
            <div className="md:col-span-2 lg:col-span-12 mt-4 sm:mt-6">
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <h3 className="font-serif text-lg text-foreground">
                  Match Timeline
                </h3>
                <span className="section-label">Last 5 Matches</span>
              </div>

              {/* Timeline - Horizontal on larger screens, vertical on mobile */}
              <div className="hidden sm:block">
                {/* Desktop/Tablet: Horizontal Timeline */}
                <div className="relative py-16">
                  {/* The Line */}
                  <div className="absolute left-8 right-8 top-1/2 h-px bg-border -translate-y-1/2"></div>

                  {/* Nodes */}
                  <div className="flex justify-between px-8 relative">
                    <TimelineNode
                      result="W"
                      elo="+24"
                      icon={<Atom size={14} />}
                      subject="Physics"
                      color="purple"
                      opponent="Alex"
                    />
                    <TimelineNode
                      result="L"
                      elo="-12"
                      icon={<Calculator size={14} />}
                      subject="Maths"
                      color="blue"
                      opponent="Sarah"
                    />
                    <TimelineNode
                      result="W"
                      elo="+18"
                      icon={<Dna size={14} />}
                      subject="Biology"
                      color="green"
                      opponent="Dave"
                    />
                    <TimelineNode
                      result="W"
                      elo="+32"
                      icon={<Beaker size={14} />}
                      subject="Chem"
                      color="orange"
                      opponent="Mark"
                    />
                    {/* Current (The Pulse) */}
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-primary border-4 border-background flex items-center justify-center shadow-lg relative cursor-pointer hover:scale-110 transition-transform">
                        <Swords size={12} className="text-primary-foreground" />
                        <div className="absolute inset-0 rounded-full animate-ping bg-primary opacity-20"></div>
                      </div>
                      <div className="mt-3 text-center">
                        <span className="section-label">Next</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile: Vertical Timeline */}
              <div className="sm:hidden">
                <div className="relative pl-8">
                  {/* Vertical Line */}
                  <div className="absolute left-4 top-0 bottom-0 w-px bg-border"></div>

                  <div className="space-y-6">
                    <MobileTimelineNode
                      result="W"
                      elo="+24"
                      icon={<Atom size={14} />}
                      subject="Physics"
                      color="purple"
                      opponent="Alex"
                    />
                    <MobileTimelineNode
                      result="L"
                      elo="-12"
                      icon={<Calculator size={14} />}
                      subject="Maths"
                      color="blue"
                      opponent="Sarah"
                    />
                    <MobileTimelineNode
                      result="W"
                      elo="+18"
                      icon={<Dna size={14} />}
                      subject="Biology"
                      color="green"
                      opponent="Dave"
                    />
                    <MobileTimelineNode
                      result="W"
                      elo="+32"
                      icon={<Beaker size={14} />}
                      subject="Chem"
                      color="orange"
                      opponent="Mark"
                    />

                    {/* Next Match */}
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary border-2 border-background flex items-center justify-center shadow-lg relative -ml-4">
                        <Swords size={12} className="text-primary-foreground" />
                        <div className="absolute inset-0 rounded-full animate-ping bg-primary opacity-20"></div>
                      </div>
                      <span className="section-label">Next Match</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const SidebarItem = ({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) => (
  <li
    className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 group ${active ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
  >
    <span
      className={`${active ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}
    >
      {icon}
    </span>
    <span className="text-sm font-medium">{label}</span>
  </li>
);

const EloItem = ({
  icon,
  subject,
  elo,
  color,
}: {
  icon: React.ReactNode;
  subject: string;
  elo: string;
  color: "blue" | "purple" | "orange" | "green";
}) => {
  const colors = {
    blue: "bg-section-blue text-subject-math",
    purple: "bg-section-purple text-subject-physics",
    orange: "bg-section-amber text-subject-chemistry",
    green: "bg-section-emerald text-subject-biology",
  };
  const bars = {
    blue: "bg-subject-math",
    purple: "bg-subject-physics",
    orange: "bg-subject-chemistry",
    green: "bg-subject-biology",
  };

  return (
    <div className="flex items-center gap-4 group cursor-pointer">
      <div className={`p-2 rounded-lg ${colors[color]} shrink-0`}>{icon}</div>
      <div className="flex-1 py-1 min-w-0">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-foreground truncate">
            {subject}
          </span>
          <span className="font-mono font-bold text-foreground text-sm ml-2">
            {elo}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-1.5 mt-2 overflow-hidden">
          <div
            className={`h-1.5 rounded-full ${bars[color]}`}
            style={{ width: "70%" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

// Desktop Timeline Node
const TimelineNode = ({
  result,
  elo,
  icon,
  subject,
  color,
  opponent,
}: {
  result: string;
  elo: string;
  icon: React.ReactNode;
  subject: string;
  color: "purple" | "blue" | "green" | "orange";
  opponent: string;
}) => {
  const colors = {
    purple: "text-subject-physics bg-section-purple border-subject-physics/30",
    blue: "text-subject-math bg-section-blue border-subject-math/30",
    green: "text-subject-biology bg-section-emerald border-subject-biology/30",
    orange:
      "text-subject-chemistry bg-section-amber border-subject-chemistry/30",
  };

  return (
    <div className="group relative flex flex-col items-center cursor-pointer">
      {/* Top Info (Subject) - Shows on hover */}
      <div className="absolute bottom-full mb-3 opacity-0 group-hover:opacity-100 transition-all duration-200">
        <span
          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md shadow-sm border whitespace-nowrap ${colors[color]}`}
        >
          {subject}
        </span>
      </div>

      {/* The Node */}
      <div
        className={`w-10 h-10 rounded-full bg-card border-2 flex items-center justify-center relative z-10 transition-all duration-200 group-hover:scale-110 shadow-sm ${result === "W" ? "border-border" : "border-destructive/30 bg-destructive/5"}`}
      >
        <div
          className={result === "W" ? "text-foreground" : "text-destructive"}
        >
          {icon}
        </div>
      </div>

      {/* Bottom Info (Result) */}
      <div className="mt-3 text-center">
        <div className="text-lg font-serif text-foreground font-bold">
          {result}
        </div>
        <span
          className={`font-mono text-xs font-bold ${elo.includes("+") ? "text-success" : "text-destructive"}`}
        >
          {elo}
        </span>
        <div className="text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
          vs {opponent}
        </div>
      </div>
    </div>
  );
};

// Mobile Timeline Node
const MobileTimelineNode = ({
  result,
  elo,
  icon,
  subject,
  color,
  opponent,
}: {
  result: string;
  elo: string;
  icon: React.ReactNode;
  subject: string;
  color: "purple" | "blue" | "green" | "orange";
  opponent: string;
}) => {
  const colors = {
    purple: "bg-section-purple text-subject-physics",
    blue: "bg-section-blue text-subject-math",
    green: "bg-section-emerald text-subject-biology",
    orange: "bg-section-amber text-subject-chemistry",
  };

  return (
    <div className="flex items-center gap-4">
      {/* Node */}
      <div
        className={`w-8 h-8 rounded-full bg-card border-2 flex items-center justify-center shrink-0 -ml-4 ${result === "W" ? "border-border" : "border-destructive/30 bg-destructive/5"}`}
      >
        <div
          className={result === "W" ? "text-foreground" : "text-destructive"}
        >
          {icon}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-between bg-card rounded-xl p-3 border border-border">
        <div className="flex items-center gap-3">
          <span
            className={`text-xs font-bold px-2 py-0.5 rounded ${colors[color]}`}
          >
            {subject}
          </span>
          <span className="text-sm text-muted-foreground">vs {opponent}</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`font-mono text-sm font-bold ${elo.includes("+") ? "text-success" : "text-destructive"}`}
          >
            {elo}
          </span>
          <span
            className={`text-sm font-bold ${result === "W" ? "text-foreground" : "text-destructive"}`}
          >
            {result}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RefinedDashboard;
