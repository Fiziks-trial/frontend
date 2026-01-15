"use client";

import { useState } from "react";
import Link from "next/link";
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
  Menu,
  X,
  Search,
  Clock,
  Target,
  BookOpen,
} from "lucide-react";
import { Card } from "@/design-system/primitives/card";
import { Badge } from "@/design-system/primitives/badge";
import { Input } from "@/design-system/primitives/input";
import { Text } from "@/design-system/primitives/text";
import { Grid } from "@/design-system/layouts/grid";
import { Stack } from "@/design-system/layouts/stack";

type Subject = "all" | "physics" | "math" | "chemistry" | "biology";
type Difficulty = "easy" | "medium" | "hard";

interface Problem {
  id: string;
  title: string;
  subject: Subject;
  difficulty: Difficulty;
  topic: string;
  points: number;
  timeLimit: number;
  solvedCount: number;
}

const PROBLEMS: Problem[] = [
  {
    id: "1",
    title: "Projectile Motion - Horizontal Range",
    subject: "physics",
    difficulty: "medium",
    topic: "Kinematics",
    points: 200,
    timeLimit: 300,
    solvedCount: 1234,
  },
  {
    id: "2",
    title: "Newton's Second Law",
    subject: "physics",
    difficulty: "easy",
    topic: "Dynamics",
    points: 100,
    timeLimit: 180,
    solvedCount: 2456,
  },
  {
    id: "3",
    title: "Quadratic Equation Roots",
    subject: "math",
    difficulty: "hard",
    topic: "Algebra",
    points: 300,
    timeLimit: 300,
    solvedCount: 876,
  },
  {
    id: "4",
    title: "Integration by Parts",
    subject: "math",
    difficulty: "medium",
    topic: "Calculus",
    points: 250,
    timeLimit: 360,
    solvedCount: 1045,
  },
  {
    id: "5",
    title: "Balancing Redox Reactions",
    subject: "chemistry",
    difficulty: "hard",
    topic: "Electrochemistry",
    points: 350,
    timeLimit: 420,
    solvedCount: 543,
  },
  {
    id: "6",
    title: "Ideal Gas Law",
    subject: "chemistry",
    difficulty: "easy",
    topic: "Thermodynamics",
    points: 150,
    timeLimit: 240,
    solvedCount: 1876,
  },
  {
    id: "7",
    title: "Mendelian Genetics",
    subject: "biology",
    difficulty: "medium",
    topic: "Genetics",
    points: 200,
    timeLimit: 300,
    solvedCount: 987,
  },
  {
    id: "8",
    title: "Photosynthesis Equation",
    subject: "biology",
    difficulty: "easy",
    topic: "Plant Biology",
    points: 100,
    timeLimit: 180,
    solvedCount: 2134,
  },
];

const subjects = [
  { id: "all" as const, label: "All", icon: BookOpen },
  { id: "physics" as const, label: "Physics", icon: Atom },
  { id: "math" as const, label: "Math", icon: Calculator },
  { id: "chemistry" as const, label: "Chemistry", icon: Beaker },
  { id: "biology" as const, label: "Biology", icon: Dna },
];

const difficultyColors: Record<
  Difficulty,
  "success" | "warning" | "destructive"
> = {
  easy: "success",
  medium: "warning",
  hard: "destructive",
};

export default function ProblemsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<Subject>("all");

  const filteredProblems = PROBLEMS.filter((problem) => {
    const matchesSearch =
      problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.topic.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject =
      selectedSubject === "all" || problem.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="flex min-h-screen bg-background text-foreground font-sans">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 bg-black/20 z-40 lg:hidden cursor-default"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={[
          "fixed lg:static inset-y-0 left-0 z-50",
          "w-64 shrink-0 border-r border-border bg-background",
          "flex flex-col pt-8 pb-6 px-4",
          "transform transition-transform duration-300 ease-in-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        ].join(" ")}
      >
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
                href="/dashboard"
              />
              <SidebarItem
                icon={<Target size={18} />}
                label="Problems"
                active
                href="/dashboard/problems"
              />
              <SidebarItem
                icon={<Swords size={18} />}
                label="Find Match"
                href="/dashboard/battles"
              />
              <SidebarItem
                icon={<Trophy size={18} />}
                label="Leaderboards"
                href="/dashboard/leaderboard"
              />
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
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 px-2 py-2 w-full hover:bg-secondary rounded-lg transition-colors text-sm font-medium text-muted-foreground"
          >
            <Settings size={18} />
            <span>Settings</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
          {/* Header */}
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <button
                type="button"
                className="p-2 -ml-2 lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu size={24} className="text-muted-foreground" />
              </button>
              <div>
                <Text variant="h1" serif>
                  Practice Problems
                </Text>
                <Text variant="body" color="muted" className="mt-1">
                  Sharpen your skills with curated problems
                </Text>
              </div>
            </div>
          </header>

          {/* Search and Filters */}
          <Stack gap="md" className="mb-8">
            <Input
              placeholder="Search problems by title or topic..."
              icon={<Search size={18} />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md"
            />

            {/* Subject Filter Tabs */}
            <div className="flex gap-2 flex-wrap">
              {subjects.map((subject) => {
                const Icon = subject.icon;
                const isActive = selectedSubject === subject.id;
                return (
                  <button
                    key={subject.id}
                    type="button"
                    onClick={() => setSelectedSubject(subject.id)}
                    className={[
                      "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary-hover",
                    ].join(" ")}
                  >
                    <Icon size={16} />
                    {subject.label}
                  </button>
                );
              })}
            </div>
          </Stack>

          {/* Problems Grid */}
          <Grid cols={1} colsMd={2} colsLg={2} gap="md">
            {filteredProblems.map((problem) => (
              <ProblemCard key={problem.id} problem={problem} />
            ))}
          </Grid>

          {filteredProblems.length === 0 && (
            <Card className="text-center py-12">
              <Text variant="h3" color="muted" className="mb-2">
                No problems found
              </Text>
              <Text variant="body" color="muted">
                Try adjusting your search or filter criteria
              </Text>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}

function ProblemCard({ problem }: { problem: Problem }) {
  const SubjectIcon =
    subjects.find((s) => s.id === problem.subject)?.icon || BookOpen;

  return (
    <Link href={`/dashboard/problems/${problem.id}`}>
      <Card hover className="h-full">
        <Stack gap="md">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className={[
                  "p-2 rounded-lg",
                  problem.subject === "physics" &&
                    "bg-section-purple text-subject-physics",
                  problem.subject === "math" &&
                    "bg-section-blue text-subject-math",
                  problem.subject === "chemistry" &&
                    "bg-section-amber text-subject-chemistry",
                  problem.subject === "biology" &&
                    "bg-section-emerald text-subject-biology",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <SubjectIcon size={18} />
              </div>
              <div>
                <Text variant="caption" color="muted">
                  {problem.topic}
                </Text>
                <Text variant="h4" className="line-clamp-1">
                  {problem.title}
                </Text>
              </div>
            </div>
            <Badge variant={difficultyColors[problem.difficulty]} size="sm">
              {problem.difficulty}
            </Badge>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Clock size={14} />
                <Text variant="body-sm" color="muted">
                  {Math.floor(problem.timeLimit / 60)} min
                </Text>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Target size={14} />
                <Text variant="body-sm" color="muted">
                  {problem.solvedCount.toLocaleString()} solved
                </Text>
              </div>
            </div>
            <div className="flex items-center gap-1 text-success">
              <Text variant="mono" className="text-success font-bold">
                +{problem.points}
              </Text>
              <Text variant="body-sm" color="muted">
                pts
              </Text>
            </div>
          </div>
        </Stack>
      </Card>
    </Link>
  );
}

function SidebarItem({
  icon,
  label,
  active = false,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  href?: string;
}) {
  const styles = [
    "flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 group w-full",
    active
      ? "bg-secondary text-foreground"
      : "text-muted-foreground hover:bg-muted hover:text-foreground",
  ].join(" ");

  const content = (
    <>
      <span
        className={
          active
            ? "text-foreground"
            : "text-muted-foreground group-hover:text-foreground"
        }
      >
        {icon}
      </span>
      <span className="text-sm font-medium">{label}</span>
    </>
  );

  if (href) {
    return (
      <li>
        <Link href={href} className={styles}>
          {content}
        </Link>
      </li>
    );
  }

  return <li className={styles}>{content}</li>;
}
