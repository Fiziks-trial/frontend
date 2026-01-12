"use client";

import { ChevronLeft, Lightbulb, Play } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Sidebar } from "@/components/layout/Sidebar";
import {
  SidebarProvider,
  useSidebar,
} from "@/components/layout/SidebarContext";
import { Badge } from "@/design-system/primitives/Badge/Badge";
import { Button } from "@/design-system/primitives/Button/Button";
import { Card } from "@/design-system/primitives/Card/Card";
import { Input } from "@/design-system/primitives/Input/Input";

interface Problem {
  id: string;
  title: string;
  subject: string;
  difficulty: string;
  description: string;
  timeLimit: number;
  points: number;
  hints: string[];
  expectedAnswer: number;
  unit: string;
}

const SAMPLE_PROBLEM: Problem = {
  id: "1",
  title: "Projectile Motion - Horizontal Range",
  subject: "Physics",
  difficulty: "Medium",
  description:
    "A projectile is launched at an angle of 45° with an initial velocity of 29 m/s. Calculate the horizontal distance it will travel. (Ignore air resistance, g = 9.8 m/s²)",
  timeLimit: 300,
  points: 200,
  hints: [
    "Use the formula: Range = (v² × sin(2θ)) / g",
    "sin(90°) = 1",
    "29² = 841",
  ],
  expectedAnswer: 85.82,
  unit: "m",
};

function ProblemContent() {
  const router = useRouter();
  const { isCollapsed } = useSidebar();
  const [answer, setAnswer] = useState("");
  const [timeElapsed] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showHints, setShowHints] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "default";
      case "medium":
        return "warning";
      case "hard":
        return "error";
      default:
        return "default";
    }
  };

  const handleSubmit = () => {
    setAttempts(attempts + 1);
    const userAnswer = parseFloat(answer);
    const isAnswerCorrect =
      Math.abs(userAnswer - SAMPLE_PROBLEM.expectedAnswer) < 0.1;

    setIsCorrect(isAnswerCorrect);
    setSubmitted(true);

    if (!isAnswerCorrect) {
      setAnswer("");
    }
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-b from-black to-[#0a0a0a] transition-all duration-300 ${
        isCollapsed ? "ml-20" : "ml-64"
      }`}
    >
      <div className="p-8">
        {/* Header with Back Button */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-2 mb-6 text-[#999999] hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm font-mono">Back to Problems</span>
          </button>

          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-4xl md:text-5xl font-mono font-bold tracking-wide text-[#22c55e]">
                  {SAMPLE_PROBLEM.title}
                </h1>
                <Badge variant={getDifficultyColor(SAMPLE_PROBLEM.difficulty)}>
                  {SAMPLE_PROBLEM.difficulty}
                </Badge>
              </div>
              <p className="text-[10px] font-mono text-[#999999] uppercase tracking-wider">
                {SAMPLE_PROBLEM.subject}
              </p>
            </div>

            {/* Timer and Points */}
            <div className="flex items-center gap-6 text-right">
              <div>
                <p className="text-[10px] font-mono text-[#999999] uppercase tracking-wider mb-1">
                  Time
                </p>
                <p className="text-2xl font-mono font-bold text-[#22c55e]">
                  {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, "0")}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-mono text-[#999999] uppercase tracking-wider mb-1">
                  Points
                </p>
                <p className="text-2xl font-mono font-bold text-[#22c55e]">
                  +{SAMPLE_PROBLEM.points} pts
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left Column - Problem Details */}
          <div className="space-y-6">
            {/* Problem Description */}
            <Card variant="glow" className="p-6">
              <p className="text-[10px] font-mono text-[#999999] uppercase tracking-wider mb-4 block">
                Problem Description
              </p>
              <p className="text-base font-mono text-white leading-relaxed">
                {SAMPLE_PROBLEM.description}
              </p>
            </Card>

            {/* Your Solution */}
            <Card variant="glow" className="p-6">
              <p className="text-[10px] font-mono text-[#999999] uppercase tracking-wider mb-4 block">
                Your Solution
              </p>

              <div className="mb-6">
                <p className="text-sm font-mono text-[#999999] mb-3">
                  Enter your answer:
                </p>
                <div className="flex gap-3">
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    disabled={submitted && isCorrect}
                    className="flex-1"
                    step="0.01"
                  />
                  <div className="w-16 flex items-center justify-center text-white font-mono text-sm border border-[rgba(255,255,255,0.1)] rounded bg-[rgba(255,255,255,0.02)]">
                    {SAMPLE_PROBLEM.unit}
                  </div>
                </div>
              </div>

              <Button
                variant="primary"
                size="md"
                className="w-full rounded flex items-center justify-center gap-2"
                onClick={handleSubmit}
                disabled={submitted && isCorrect}
              >
                <Play className="w-4 h-4" />
                {submitted
                  ? isCorrect
                    ? "Correct! 🎉"
                    : "Try Again"
                  : "Submit Answer"}
              </Button>

              {submitted && !isCorrect && (
                <div className="mt-4 p-4 bg-[rgba(239,68,68,0.1)] border border-[#ef4444] rounded">
                  <p className="text-sm font-mono text-[#ef4444]">
                    Not quite right. Expected: {SAMPLE_PROBLEM.expectedAnswer}{" "}
                    {SAMPLE_PROBLEM.unit}
                  </p>
                </div>
              )}
            </Card>

            {/* Show Hints Button */}
            <Card
              variant="glow"
              className="p-6 cursor-pointer hover:bg-[rgba(255,255,255,0.02)] transition-colors"
              onClick={() => setShowHints(!showHints)}
            >
              <div className="flex items-center gap-3 cursor-pointer">
                <Lightbulb className="w-5 h-5 text-[#f97316]" />
                <p className="text-[10px] font-mono text-[#f97316] uppercase tracking-wider font-bold">
                  Show Hints
                </p>
              </div>

              {showHints && (
                <div className="mt-4 space-y-3">
                  {SAMPLE_PROBLEM.hints.map((hint, index) => (
                    <div
                      key={hint}
                      className="p-3 bg-[rgba(249,115,22,0.1)] border border-[rgba(249,115,22,0.2)] rounded"
                    >
                      <p className="text-xs font-mono text-[#fbbf24]">
                        Hint {index + 1}: {hint}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>

          {/* Right Column - Visualization and Stats */}
          <div className="space-y-6">
            {/* Visualization */}
            <Card variant="glow" className="p-6 h-64 flex flex-col">
              <p className="text-[10px] font-mono text-[#999999] uppercase tracking-wider mb-4 block">
                Visualization
              </p>
              <div className="flex-1 flex items-end justify-center relative bg-gradient-to-b from-[rgba(59,130,246,0.1)] to-transparent rounded border border-[rgba(59,130,246,0.2)]">
                {/* Projectile Visualization */}
                <div className="w-full h-full relative flex items-end">
                  {/* Ground */}
                  <div className="w-full h-12 bg-[#22c55e] rounded-b absolute bottom-0"></div>

                  {/* Trajectory Path */}
                  <svg
                    className="absolute inset-0"
                    viewBox="0 0 400 250"
                    preserveAspectRatio="none"
                    role="img"
                    aria-label="Projectile motion trajectory visualization"
                  >
                    <path
                      d="M 20 200 Q 200 50 380 200"
                      stroke="#3b82f6"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="5,5"
                    />
                  </svg>

                  {/* Projectile Circle */}
                  <div className="absolute w-4 h-4 bg-[#22c55e] rounded-full shadow-lg shadow-[#22c55e]/50 left-[10%] top-[75%]"></div>
                </div>
              </div>
            </Card>

            {/* Attempt Stats */}
            <Card variant="glow" className="p-6">
              <p className="text-[10px] font-mono text-[#999999] uppercase tracking-wider mb-6 block">
                Attempt Stats
              </p>

              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-[rgba(255,255,255,0.1)]">
                  <p className="text-[10px] font-mono text-[#999999] uppercase tracking-wider">
                    Attempts
                  </p>
                  <p className="text-2xl font-mono font-bold text-white">
                    {attempts}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-[10px] font-mono text-[#999999] uppercase tracking-wider">
                    Time Elapsed
                  </p>
                  <p className="text-2xl font-mono font-bold text-white">
                    {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, "0")}
                  </p>
                </div>
              </div>
            </Card>

            {/* Answer Comparison */}
            {submitted && (
              <Card variant="glow" className="p-6">
                <p className="text-[10px] font-mono text-[#999999] uppercase tracking-wider mb-6 block">
                  Answer Comparison
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-mono text-[#999999] uppercase tracking-wider mb-2">
                      Your Answer
                    </p>
                    <div
                      className="p-3 rounded border border-[rgba(239,68,68,0.3)] bg-[rgba(139,0,0,0.1)]"
                      style={{
                        borderColor: isCorrect
                          ? "rgba(34,197,94,0.3)"
                          : undefined,
                        backgroundColor: isCorrect
                          ? "rgba(0,100,0,0.1)"
                          : undefined,
                      }}
                    >
                      <p
                        className="text-xl font-mono font-bold"
                        style={{
                          color: isCorrect ? "#22c55e" : "#ef4444",
                        }}
                      >
                        {answer || "--"}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-mono text-[#999999] uppercase tracking-wider mb-2">
                      Expected
                    </p>
                    <div className="p-3 rounded border border-[rgba(34,197,94,0.3)] bg-[rgba(0,100,0,0.1)]">
                      <p className="text-xl font-mono font-bold text-[#22c55e]">
                        {SAMPLE_PROBLEM.expectedAnswer}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProblemsPage() {
  return (
    <SidebarProvider>
      <div className="flex">
        <Sidebar />
        <ProblemContent />
      </div>
    </SidebarProvider>
  );
}
