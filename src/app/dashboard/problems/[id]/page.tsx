"use client";

import { ChevronLeft, Lightbulb, Play, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

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

// Sample problems database
const PROBLEMS_DB: Record<string, Problem> = {
  "1": {
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
  },
  "2": {
    id: "2",
    title: "Newton's Second Law",
    subject: "Physics",
    difficulty: "Easy",
    description:
      "A force of 50 N is applied to a 10 kg object. Calculate the acceleration. (F = ma)",
    timeLimit: 180,
    points: 100,
    hints: ["Rearrange the formula to solve for a", "a = F/m", "50/10 = 5"],
    expectedAnswer: 5,
    unit: "m/s²",
  },
  "3": {
    id: "3",
    title: "Quadratic Equation",
    subject: "Mathematics",
    difficulty: "Hard",
    description:
      "Solve the equation: 2x² + 5x - 3 = 0. Find the positive root.",
    timeLimit: 300,
    points: 300,
    hints: [
      "Use the quadratic formula: x = (-b ± √(b²-4ac)) / 2a",
      "a = 2, b = 5, c = -3",
      "Discriminant = 25 + 24 = 49",
    ],
    expectedAnswer: 0.5,
    unit: "",
  },
};

function ProblemContent() {
  const router = useRouter();
  const params = useParams();
  const { isCollapsed } = useSidebar();

  const [mounted, setMounted] = useState(false);
  const problemId = params?.id as string;
  const problem = PROBLEMS_DB[problemId] || PROBLEMS_DB["1"];

  const [answer, setAnswer] = useState("");
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showHints, setShowHints] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Fix hydration error by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Timer effect
  useEffect(() => {
    if (!submitted || !isCorrect) {
      const timer = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [submitted, isCorrect]);

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
    const isAnswerCorrect = Math.abs(userAnswer - problem.expectedAnswer) < 0.1;

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
      {!mounted ? (
        <div className="flex items-center justify-center h-screen">
          <p className="text-white font-mono">Loading...</p>
        </div>
      ) : (
        <div className="p-8">
          {/* Header with Back Button */}
          <div className="mb-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex items-center gap-2 mb-6 text-[#999999] hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm font-mono">Back to Problems</span>
            </button>

            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl md:text-4xl font-mono font-bold tracking-wide text-[#22c55e]">
                    {problem.title}
                  </h1>
                  <Badge variant={getDifficultyColor(problem.difficulty)}>
                    {problem.difficulty}
                  </Badge>
                </div>
                <p className="text-[10px] font-mono text-[#999999] uppercase tracking-wider">
                  {problem.subject}
                </p>
              </div>

              {/* Timer and Points */}
              <div className="flex items-center gap-8 text-right">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-[#999999]" />
                    <p className="text-2xl font-mono font-bold text-[#999999]">
                      {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, "0")}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-mono font-bold text-[#22c55e]">
                    +{problem.points} pts
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Left Column - Problem Description & Solution */}
            <div className="lg:col-span-1 space-y-6">
              {/* Problem Description */}
              <Card variant="glow" className="p-6">
                <p className="text-[10px] font-mono text-[#999999] uppercase tracking-wider mb-4 block font-bold">
                  Problem Description
                </p>
                <p className="text-sm font-mono text-white leading-relaxed">
                  {problem.description}
                </p>
              </Card>

              {/* Your Solution */}
              <Card variant="glow" className="p-6">
                <p className="text-[10px] font-mono text-[#999999] uppercase tracking-wider mb-4 block font-bold">
                  Your Solution
                </p>

                <div className="mb-6">
                  <p className="text-xs font-mono text-[#999999] mb-3">
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
                    {problem.unit && (
                      <div className="px-4 flex items-center justify-center text-white font-mono text-sm border border-[rgba(255,255,255,0.1)] rounded bg-[rgba(255,255,255,0.02)]">
                        {problem.unit}
                      </div>
                    )}
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
                    <p className="text-xs font-mono text-[#ef4444]">
                      Not quite right. Expected: {problem.expectedAnswer}{" "}
                      {problem.unit}
                    </p>
                  </div>
                )}

                {submitted && isCorrect && (
                  <div className="mt-4 p-4 bg-[rgba(34,197,94,0.1)] border border-[#22c55e] rounded">
                    <p className="text-xs font-mono text-[#22c55e]">
                      Excellent! Your answer is correct.
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
                    {problem.hints.map((hint, index) => (
                      <div
                        key={hint}
                        className="p-3 bg-[rgba(249,115,22,0.1)] border border-[rgba(249,115,22,0.2)] rounded"
                      >
                        <p className="text-xs font-mono text-[#fbbf24]">
                          <span className="font-bold">Hint {index + 1}:</span>{" "}
                          {hint}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>

            {/* Right Column - Visualization & Stats */}
            <div className="lg:col-span-2 space-y-6">
              {/* Visualization */}
              <Card variant="glow" className="p-6">
                <p className="text-[10px] font-mono text-[#999999] uppercase tracking-wider mb-4 block font-bold">
                  Visualization
                </p>
                <div className="w-full aspect-video relative bg-gradient-to-b from-[#0a1f47] via-[#091d42] to-[#0a1a3a] rounded border border-[rgba(59,130,246,0.3)] overflow-hidden">
                  {/* SVG Canvas */}
                  <svg
                    className="w-full h-full absolute inset-0"
                    viewBox="0 0 600 350"
                    preserveAspectRatio="xMidYMid meet"
                    role="img"
                    aria-label="Projectile motion visualization with trajectory arc and ground"
                  >
                    {/* Grid Background */}
                    <defs>
                      <pattern
                        id="grid"
                        width="40"
                        height="40"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M 40 0 L 0 0 0 40"
                          fill="none"
                          stroke="rgba(59,130,246,0.1)"
                          strokeWidth="0.5"
                        />
                      </pattern>
                    </defs>
                    <rect width="600" height="350" fill="url(#grid)" />

                    {/* Ground Line */}
                    <line
                      x1="0"
                      y1="280"
                      x2="600"
                      y2="280"
                      stroke="#22c55e"
                      strokeWidth="3"
                    />

                    {/* Ground Fill */}
                    <rect
                      x="0"
                      y="280"
                      width="600"
                      height="70"
                      fill="url(#groundGradient)"
                    />

                    {/* Gradient for ground */}
                    <defs>
                      <linearGradient
                        id="groundGradient"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#22c55e"
                          stopOpacity="0.4"
                        />
                        <stop
                          offset="100%"
                          stopColor="#15803d"
                          stopOpacity="0.2"
                        />
                      </linearGradient>

                      {/* Trajectory gradient */}
                      <linearGradient
                        id="trajectoryGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#3b82f6"
                          stopOpacity="0.8"
                        />
                        <stop
                          offset="100%"
                          stopColor="#0ea5e9"
                          stopOpacity="0.4"
                        />
                      </linearGradient>
                    </defs>

                    {/* Trajectory Arc - Thicker for visibility */}
                    <path
                      d="M 80 260 Q 300 100 520 260"
                      stroke="url(#trajectoryGradient)"
                      strokeWidth="2.5"
                      fill="none"
                      strokeLinecap="round"
                    />

                    {/* Dashed trajectory guide */}
                    <path
                      d="M 80 260 Q 300 100 520 260"
                      stroke="rgba(59,130,246,0.3)"
                      strokeWidth="1"
                      fill="none"
                      strokeDasharray="8,4"
                    />

                    {/* Projectile Start Point */}
                    <circle
                      cx="80"
                      cy="260"
                      r="6"
                      fill="#22c55e"
                      opacity="0.6"
                    />
                    <circle cx="80" cy="260" r="4" fill="#22c55e" />

                    {/* Projectile End Point */}
                    <circle
                      cx="520"
                      cy="260"
                      r="6"
                      fill="#22c55e"
                      opacity="0.6"
                    />
                    <circle cx="520" cy="260" r="4" fill="#22c55e" />

                    {/* Mid-arc projectile (animated position) */}
                    <circle cx="300" cy="120" r="7" fill="#f97316" />
                    <circle cx="300" cy="120" r="5" fill="#fbbf24" />

                    {/* Glow effect for projectile */}
                    <circle
                      cx="300"
                      cy="120"
                      r="12"
                      fill="none"
                      stroke="rgba(249,115,22,0.4)"
                      strokeWidth="1.5"
                      opacity="0.7"
                    />

                    {/* Launch angle indicator */}
                    <line
                      x1="80"
                      y1="260"
                      x2="140"
                      y2="220"
                      stroke="rgba(34,197,94,0.4)"
                      strokeWidth="1.5"
                      strokeDasharray="4,3"
                    />
                    <text
                      x="105"
                      y="235"
                      fontFamily="monospace"
                      fontSize="10"
                      fill="rgba(34,197,94,0.6)"
                    >
                      45°
                    </text>

                    {/* Distance marker */}
                    <line
                      x1="80"
                      y1="295"
                      x2="520"
                      y2="295"
                      stroke="rgba(59,130,246,0.5)"
                      strokeWidth="1"
                    />
                    <line
                      x1="80"
                      y1="290"
                      x2="80"
                      y2="300"
                      stroke="rgba(59,130,246,0.5)"
                      strokeWidth="1"
                    />
                    <line
                      x1="520"
                      y1="290"
                      x2="520"
                      y2="300"
                      stroke="rgba(59,130,246,0.5)"
                      strokeWidth="1"
                    />
                    <text
                      x="290"
                      y="320"
                      fontFamily="monospace"
                      fontSize="11"
                      fill="rgba(59,130,246,0.7)"
                      textAnchor="middle"
                    >
                      Range ≈ 85.82 m
                    </text>
                  </svg>

                  {/* Legend */}
                  <div className="absolute top-3 right-3 space-y-2 bg-black/50 backdrop-blur p-3 rounded border border-[rgba(255,255,255,0.1)]">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#fbbf24]"></div>
                      <p className="text-[10px] font-mono text-[#999999]">
                        Projectile
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[#22c55e]"></div>
                      <p className="text-[10px] font-mono text-[#999999]">
                        Ground
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-1 bg-[#3b82f6]"></div>
                      <p className="text-[10px] font-mono text-[#999999]">
                        Trajectory
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6">
                {/* Attempt Stats */}
                <Card variant="glow" className="p-6">
                  <p className="text-[10px] font-mono text-[#999999] uppercase tracking-wider mb-6 block font-bold">
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
                    <p className="text-[10px] font-mono text-[#999999] uppercase tracking-wider mb-6 block font-bold">
                      Answer Comparison
                    </p>

                    <div className="space-y-4">
                      <div>
                        <p className="text-[10px] font-mono text-[#999999] uppercase tracking-wider mb-2">
                          Your Answer
                        </p>
                        <div
                          className={`p-3 rounded border ${
                            isCorrect
                              ? "border-[rgba(34,197,94,0.3)] bg-[rgba(0,100,0,0.1)]"
                              : "border-[rgba(239,68,68,0.3)] bg-[rgba(139,0,0,0.1)]"
                          }`}
                        >
                          <p
                            className={`text-lg font-mono font-bold ${
                              isCorrect ? "text-[#22c55e]" : "text-[#ef4444]"
                            }`}
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
                          <p className="text-lg font-mono font-bold text-[#22c55e]">
                            {problem.expectedAnswer}
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
      )}
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
