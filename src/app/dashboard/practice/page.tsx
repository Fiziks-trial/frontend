"use client";

import { Search, Play, Lock } from "lucide-react";
import { useState } from "react";

import { Sidebar } from "@/components/layout/Sidebar";
import {
  SidebarProvider,
  useSidebar,
} from "@/components/layout/SidebarContext";
import { Badge } from "@/design-system/primitives/Badge/Badge";
import { Button } from "@/design-system/primitives/Button/Button";
import { Card } from "@/design-system/primitives/Card/Card";
import { Input, Select } from "@/design-system/primitives/Input/Input";
import { Text } from "@/design-system/primitives/Text/Text";

interface Problem {
  id: string;
  title: string;
  subject: string;
  difficulty: "Easy" | "Medium" | "Hard";
  points: number;
  solved: number;
  status: "completed" | "in-progress" | "locked";
  image: string;
}

const PRACTICE_PROBLEMS: Problem[] = [
  {
    id: "1",
    title: "Projectile Motion - Horizontal Range",
    subject: "Projectile Motion",
    difficulty: "Medium",
    points: 250,
    solved: 72,
    status: "completed",
    image: "linear-gradient(135deg, #ef4444 0%, #8b5cf6 100%)",
  },
  {
    id: "2",
    title: "Free Fall Calculation",
    subject: "Kinematics",
    difficulty: "Easy",
    points: 150,
    solved: 85,
    status: "completed",
    image: "linear-gradient(135deg, #06b6d4 0%, #22c55e 100%)",
  },
  {
    id: "3",
    title: "Maximum Height Projectile",
    subject: "Projectile Motion",
    difficulty: "Medium",
    points: 250,
    solved: 68,
    status: "in-progress",
    image: "linear-gradient(135deg, #f97316 0%, #ef4444 100%)",
  },
  {
    id: "4",
    title: "Velocity-Time Graphs",
    subject: "Kinematics",
    difficulty: "Hard",
    points: 400,
    solved: 45,
    status: "in-progress",
    image: "linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)",
  },
  {
    id: "5",
    title: "Newton's Laws Application",
    subject: "Mechanics",
    difficulty: "Hard",
    points: 350,
    solved: 52,
    status: "locked",
    image: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
  },
  {
    id: "6",
    title: "Energy Conservation",
    subject: "Thermodynamics",
    difficulty: "Medium",
    points: 280,
    solved: 61,
    status: "locked",
    image: "linear-gradient(135deg, #eab308 0%, #f97316 100%)",
  },
];

const SUBJECTS = [
  "All Subjects",
  "Kinematics",
  "Projectile Motion",
  "Mechanics",
  "Thermodynamics",
  "Electromagnetism",
];

const LEVELS = ["All Levels", "Easy", "Medium", "Hard"];

function PracticeProblemsContent() {
  const { isCollapsed } = useSidebar();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");

  const filteredProblems = PRACTICE_PROBLEMS.filter((problem) => {
    const matchesSearch = problem.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesSubject =
      selectedSubject === "All Subjects" || problem.subject === selectedSubject;
    const matchesLevel =
      selectedLevel === "All Levels" || problem.difficulty === selectedLevel;

    return matchesSearch && matchesSubject && matchesLevel;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "success";
      case "Medium":
        return "warning";
      case "Hard":
        return "error";
      default:
        return "default";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "completed":
        return "success";
      case "in-progress":
        return "warning";
      case "locked":
        return "default";
      default:
        return "default";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "in-progress":
        return "In Progress";
      case "locked":
        return "Locked";
      default:
        return status;
    }
  };

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
          {/* Header Section */}
          <header className="mb-4 lg:mb-6">
            <Text variant="status" color="muted" className="mb-1">
              /// PRACTICE
            </Text>
            <Text variant="h2" color="primary" className="mb-1">
              Practice Problems
            </Text>
            <Text variant="bodySmall" color="muted">
              Master physics, mathematics, and chemistry through interactive
              problem-solving
            </Text>
          </header>

          {/* Filters Section */}
          <div className="space-y-4 mb-4 lg:mb-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999999]" />
              <Input
                type="text"
                placeholder="Search problems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Dropdowns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-3">
              {/* Subjects Dropdown */}
              <Select
                label="All Subjects"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                options={SUBJECTS.map((subject) => ({
                  value: subject,
                  label: subject,
                }))}
              />

              {/* Levels Dropdown */}
              <Select
                label="All Levels"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                options={LEVELS.map((level) => ({
                  value: level,
                  label: level,
                }))}
              />
            </div>
          </div>

          {/* Problems Grid */}
          <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 lg:gap-3">
              {filteredProblems.map((problem) => (
                <Card
                  key={problem.id}
                  variant="glow"
                  className="flex flex-col h-full overflow-hidden p-0 hover:shadow-[0_0_20px_rgba(34,197,94,0.2)] transition-all duration-200"
                >
                  {/* Image/Thumbnail */}
                  <div
                    className="h-40 w-full relative"
                    style={{ background: problem.image }}
                  >
                    {/* Status Badge */}
                    <div className="absolute top-3 right-3">
                      <Badge variant={getStatusBadgeColor(problem.status)}>
                        {getStatusLabel(problem.status)}
                      </Badge>
                    </div>

                    {/* Action Button/Lock */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-all duration-200">
                      {problem.status === "locked" ? (
                        <div className="flex flex-col items-center gap-2">
                          <Lock className="w-6 h-6" />
                        </div>
                      ) : (
                        <a href={`/dashboard/problems/${problem.id}`}>
                          <Button
                            variant="primary"
                            size="sm"
                            className="rounded flex items-center gap-2"
                          >
                            <Play className="w-4 h-4" />
                            {problem.status === "completed"
                              ? "Play Again"
                              : "Start"}
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-3 lg:p-4 flex-1 flex flex-col">
                    {/* Title */}
                    <Text
                      variant="body"
                      color="primary"
                      className="mb-2 line-clamp-2 font-semibold"
                    >
                      {problem.title}
                    </Text>

                    {/* Subject */}
                    <Text
                      variant="caption"
                      color="muted"
                      className="mb-3 uppercase tracking-wider"
                    >
                      {problem.subject}
                    </Text>

                    {/* Difficulty Badge */}
                    <div className="mb-3 lg:mb-4">
                      <Badge variant={getDifficultyColor(problem.difficulty)}>
                        {problem.difficulty}
                      </Badge>
                    </div>

                    {/* Stats Footer */}
                    <div className="mt-auto pt-2 lg:pt-3 border-t border-[rgba(255,255,255,0.1)] space-y-1.5">
                      <div className="flex justify-between items-center">
                        <Text
                          variant="caption"
                          color="muted"
                          className="text-[10px] uppercase tracking-wider"
                          font="mono"
                        >
                          Points
                        </Text>
                        <Text
                          variant="caption"
                          color="accent"
                          className="text-[10px] uppercase tracking-wider"
                          font="mono"
                        >
                          {problem.points} pts
                        </Text>
                      </div>
                      <div className="flex justify-between items-center">
                        <Text
                          variant="caption"
                          color="muted"
                          className="text-[10px] uppercase tracking-wider"
                          font="mono"
                        >
                          Solved
                        </Text>
                        <Text
                          variant="caption"
                          color="accent"
                          className="text-[10px] uppercase tracking-wider"
                          font="mono"
                        >
                          {problem.solved}%
                        </Text>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Empty State */}
          {filteredProblems.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="mb-4">
                <Search className="w-12 h-12 text-[#999999]" />
              </div>
              <Text variant="h2" font="mono" color="muted" className="mb-2">
                No problems found
              </Text>
              <Text variant="body" font="mono" color="muted">
                Try adjusting your filters or search query
              </Text>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function PracticeProblemsPage() {
  return (
    <SidebarProvider>
      <PracticeProblemsContent />
    </SidebarProvider>
  );
}
