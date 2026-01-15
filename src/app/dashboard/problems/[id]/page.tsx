"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronLeft,
  Clock,
  Lightbulb,
  Play,
  CheckCircle,
  XCircle,
  BookOpen,
} from "lucide-react";
import {
  Card,
  Badge,
  Button,
  Input,
  Text,
  Grid,
  Stack,
  SUBJECTS,
  type Subject,
} from "@/design-system";

type Difficulty = "easy" | "medium" | "hard";

interface Problem {
  id: string;
  title: string;
  subject: Subject;
  difficulty: Difficulty;
  topic: string;
  description: string;
  points: number;
  timeLimit: number;
  hints: string[];
  expectedAnswer: number;
  unit: string;
}

const PROBLEMS_DB: Record<string, Problem> = {
  "1": {
    id: "1",
    title: "Projectile Motion - Horizontal Range",
    subject: "physics",
    difficulty: "medium",
    topic: "Kinematics",
    description:
      "A projectile is launched at an angle of 45° with an initial velocity of 29 m/s. Calculate the horizontal distance it will travel. (Ignore air resistance, g = 9.8 m/s²)",
    points: 200,
    timeLimit: 300,
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
    subject: "physics",
    difficulty: "easy",
    topic: "Dynamics",
    description:
      "A force of 50 N is applied to a 10 kg object. Calculate the acceleration. (F = ma)",
    points: 100,
    timeLimit: 180,
    hints: ["Rearrange the formula to solve for a", "a = F/m", "50/10 = ?"],
    expectedAnswer: 5,
    unit: "m/s²",
  },
  "3": {
    id: "3",
    title: "Quadratic Equation Roots",
    subject: "math",
    difficulty: "hard",
    topic: "Algebra",
    description:
      "Solve the equation: 2x² + 5x - 3 = 0. Find the positive root.",
    points: 300,
    timeLimit: 300,
    hints: [
      "Use the quadratic formula: x = (-b ± √(b²-4ac)) / 2a",
      "a = 2, b = 5, c = -3",
      "Discriminant = 25 + 24 = 49",
    ],
    expectedAnswer: 0.5,
    unit: "",
  },
  "4": {
    id: "4",
    title: "Integration by Parts",
    subject: "math",
    difficulty: "medium",
    topic: "Calculus",
    description:
      "Evaluate the definite integral: ∫₀¹ x·eˣ dx. Round to 2 decimal places.",
    points: 250,
    timeLimit: 360,
    hints: [
      "Use integration by parts: ∫u dv = uv - ∫v du",
      "Let u = x, dv = eˣ dx",
      "The result is [xeˣ - eˣ] from 0 to 1",
    ],
    expectedAnswer: 1,
    unit: "",
  },
  "5": {
    id: "5",
    title: "Balancing Redox Reactions",
    subject: "chemistry",
    difficulty: "hard",
    topic: "Electrochemistry",
    description:
      "In the reaction: Fe²⁺ + MnO₄⁻ → Fe³⁺ + Mn²⁺ (acidic solution), what is the coefficient of Fe²⁺ when balanced?",
    points: 350,
    timeLimit: 420,
    hints: [
      "Separate into half-reactions",
      "MnO₄⁻ gains 5 electrons to become Mn²⁺",
      "Fe²⁺ loses 1 electron to become Fe³⁺",
    ],
    expectedAnswer: 5,
    unit: "",
  },
  "6": {
    id: "6",
    title: "Ideal Gas Law",
    subject: "chemistry",
    difficulty: "easy",
    topic: "Thermodynamics",
    description:
      "A gas occupies 2.0 L at 1.0 atm and 273 K. What volume will it occupy at 2.0 atm and 546 K? (Assume ideal behavior)",
    points: 150,
    timeLimit: 240,
    hints: [
      "Use the combined gas law: P₁V₁/T₁ = P₂V₂/T₂",
      "Rearrange to solve for V₂",
      "(1.0 × 2.0 × 546) / (273 × 2.0)",
    ],
    expectedAnswer: 2,
    unit: "L",
  },
  "7": {
    id: "7",
    title: "Mendelian Genetics",
    subject: "biology",
    difficulty: "medium",
    topic: "Genetics",
    description:
      "In a cross between two heterozygous tall plants (Tt × Tt), what percentage of offspring will be tall? (T = tall, t = short)",
    points: 200,
    timeLimit: 300,
    hints: [
      "Draw a Punnett square",
      "TT, Tt, Tt, tt are the possible genotypes",
      "Both TT and Tt result in tall phenotype",
    ],
    expectedAnswer: 75,
    unit: "%",
  },
  "8": {
    id: "8",
    title: "Photosynthesis Equation",
    subject: "biology",
    difficulty: "easy",
    topic: "Plant Biology",
    description:
      "In the balanced photosynthesis equation, how many molecules of water (H₂O) are required to produce one molecule of glucose (C₆H₁₂O₆)?",
    points: 100,
    timeLimit: 180,
    hints: [
      "The general equation: CO₂ + H₂O → C₆H₁₂O₆ + O₂",
      "Balance carbon first: 6CO₂",
      "Then balance hydrogen and oxygen",
    ],
    expectedAnswer: 6,
    unit: "",
  },
};

const difficultyColors: Record<
  Difficulty,
  "success" | "warning" | "destructive"
> = {
  easy: "success",
  medium: "warning",
  hard: "destructive",
};

export default function ProblemDetailPage() {
  const params = useParams();
  const router = useRouter();
  const problemId = params?.id as string;
  const problem = PROBLEMS_DB[problemId];

  const [answer, setAnswer] = useState("");
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showHints, setShowHints] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    if (!submitted || !isCorrect) {
      const timer = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [submitted, isCorrect]);

  if (!problem) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md text-center">
          <Stack gap="md" align="center">
            <BookOpen size={48} className="text-muted-foreground" />
            <Text variant="h2">Problem not found</Text>
            <Text variant="body" color="muted">
              The problem you are looking for does not exist.
            </Text>
            <Button onClick={() => router.push("/dashboard/problems")}>
              Back to Problems
            </Button>
          </Stack>
        </Card>
      </div>
    );
  }

  const handleSubmit = () => {
    setAttempts(attempts + 1);
    const userAnswer = parseFloat(answer);
    const tolerance =
      problem.expectedAnswer === 0
        ? 0.01
        : Math.abs(problem.expectedAnswer * 0.01);
    const isAnswerCorrect =
      Math.abs(userAnswer - problem.expectedAnswer) <= tolerance;

    setIsCorrect(isAnswerCorrect);
    setSubmitted(true);

    if (!isAnswerCorrect) {
      setAnswer("");
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const subject = SUBJECTS[problem.subject];
  const SubjectIcon = subject.icon;

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard/problems"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronLeft size={20} />
                <span className="text-sm font-medium hidden sm:inline">
                  Problems
                </span>
              </Link>

              <div className="h-6 w-px bg-border hidden sm:block" />

              <div className="flex items-center gap-3">
                <div
                  className={[
                    "p-2 rounded-lg",
                    subject.bgColor,
                    subject.color,
                  ].join(" ")}
                >
                  <SubjectIcon size={18} />
                </div>
                <div className="hidden sm:block">
                  <Text variant="caption" color="muted">
                    {problem.topic}
                  </Text>
                  <Text variant="h4" className="line-clamp-1">
                    {problem.title}
                  </Text>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-muted-foreground" />
                <Text variant="mono" className="text-lg font-bold">
                  {formatTime(timeElapsed)}
                </Text>
              </div>
              <Badge variant={difficultyColors[problem.difficulty]}>
                {problem.difficulty}
              </Badge>
              <div className="hidden sm:flex items-center gap-1">
                <Text variant="mono" className="text-success font-bold text-lg">
                  +{problem.points}
                </Text>
                <Text variant="body-sm" color="muted">
                  pts
                </Text>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Mobile Title */}
        <div className="sm:hidden mb-6">
          <Text variant="caption" color="muted">
            {problem.topic}
          </Text>
          <Text variant="h2" serif>
            {problem.title}
          </Text>
        </div>

        <Grid cols={1} colsLg={3} gap="lg">
          {/* Left Column - Problem & Solution */}
          <div className="lg:col-span-1 space-y-6">
            {/* Problem Description */}
            <Card>
              <Stack gap="md">
                <Text variant="label" color="muted">
                  Problem
                </Text>
                <Text variant="body" className="leading-relaxed">
                  {problem.description}
                </Text>
              </Stack>
            </Card>

            {/* Answer Input */}
            <Card>
              <Stack gap="md">
                <Text variant="label" color="muted">
                  Your Answer
                </Text>

                <div className="flex gap-3">
                  <Input
                    type="number"
                    placeholder="Enter your answer"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    disabled={submitted && isCorrect}
                    className="flex-1"
                    step="0.01"
                  />
                  {problem.unit && (
                    <div className="px-4 flex items-center justify-center text-muted-foreground font-mono text-sm border border-input rounded-xl bg-secondary">
                      {problem.unit}
                    </div>
                  )}
                </div>

                <Button
                  fullWidth
                  icon={
                    submitted && isCorrect ? (
                      <CheckCircle size={18} />
                    ) : (
                      <Play size={18} />
                    )
                  }
                  onClick={handleSubmit}
                  disabled={(submitted && isCorrect) || !answer}
                  variant={submitted && isCorrect ? "secondary" : "primary"}
                >
                  {submitted
                    ? isCorrect
                      ? "Correct!"
                      : "Try Again"
                    : "Submit Answer"}
                </Button>

                {submitted && !isCorrect && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-destructive/10 border border-destructive/20">
                    <XCircle size={18} className="text-destructive shrink-0" />
                    <Text variant="body-sm" className="text-destructive">
                      Not quite right. Try again!
                    </Text>
                  </div>
                )}

                {submitted && isCorrect && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-success/10 border border-success/20">
                    <CheckCircle size={18} className="text-success shrink-0" />
                    <Text variant="body-sm" className="text-success">
                      Excellent! You earned +{problem.points} points!
                    </Text>
                  </div>
                )}
              </Stack>
            </Card>

            {/* Hints */}
            <Card
              hover
              onClick={() => setShowHints(!showHints)}
              color="amber"
              className="cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Lightbulb size={20} className="text-warning" />
                <Text variant="label" className="text-warning">
                  {showHints ? "Hide Hints" : "Show Hints"}
                </Text>
              </div>

              {showHints && (
                <Stack gap="sm" className="mt-4">
                  {problem.hints.map((hint, index) => (
                    <div
                      key={hint}
                      className="p-3 bg-warning/10 border border-warning/20 rounded-lg"
                    >
                      <Text
                        variant="body-sm"
                        className="text-warning-foreground"
                      >
                        <span className="font-bold">Hint {index + 1}:</span>{" "}
                        {hint}
                      </Text>
                    </div>
                  ))}
                </Stack>
              )}
            </Card>
          </div>

          {/* Right Column - Visualization & Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Visualization */}
            <Card padding="lg">
              <Stack gap="md">
                <Text variant="label" color="muted">
                  Visualization
                </Text>
                <div className="aspect-video bg-linear-to-b from-section-blue/30 to-section-purple/20 rounded-xl border border-border flex items-center justify-center relative overflow-hidden">
                  {problem.subject === "physics" && problem.id === "1" && (
                    <ProjectileVisualization />
                  )}
                  {!(problem.subject === "physics" && problem.id === "1") && (
                    <div className="text-center">
                      <BookOpen
                        size={48}
                        className="text-muted-foreground mx-auto mb-3"
                      />
                      <Text variant="body" color="muted">
                        Visualization for this problem type coming soon
                      </Text>
                    </div>
                  )}
                </div>
              </Stack>
            </Card>

            {/* Stats Grid */}
            <Grid cols={2} gap="md">
              <Card>
                <Stack gap="sm">
                  <Text variant="label" color="muted">
                    Attempts
                  </Text>
                  <Text variant="h2" serif>
                    {attempts}
                  </Text>
                </Stack>
              </Card>

              <Card>
                <Stack gap="sm">
                  <Text variant="label" color="muted">
                    Time Elapsed
                  </Text>
                  <Text variant="h2" serif>
                    {formatTime(timeElapsed)}
                  </Text>
                </Stack>
              </Card>

              {submitted && (
                <>
                  <Card>
                    <Stack gap="sm">
                      <Text variant="label" color="muted">
                        Your Answer
                      </Text>
                      <Text
                        variant="h2"
                        serif
                        className={
                          isCorrect ? "text-success" : "text-destructive"
                        }
                      >
                        {answer || "--"} {problem.unit}
                      </Text>
                    </Stack>
                  </Card>

                  <Card>
                    <Stack gap="sm">
                      <Text variant="label" color="muted">
                        Expected
                      </Text>
                      <Text variant="h2" serif className="text-success">
                        {problem.expectedAnswer} {problem.unit}
                      </Text>
                    </Stack>
                  </Card>
                </>
              )}
            </Grid>

            {/* Next Problem */}
            {submitted && isCorrect && (
              <Card color="purple" hover>
                <div className="flex items-center justify-between">
                  <div>
                    <Text variant="h4">Ready for the next challenge?</Text>
                    <Text variant="body-sm" color="muted">
                      Continue practicing to improve your rating
                    </Text>
                  </div>
                  <Button
                    onClick={() => {
                      const nextId = String(Number(problem.id) + 1);
                      if (PROBLEMS_DB[nextId]) {
                        router.push(`/dashboard/problems/${nextId}`);
                      } else {
                        router.push("/dashboard/problems");
                      }
                    }}
                  >
                    Next Problem
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </Grid>
      </main>
    </div>
  );
}

function ProjectileVisualization() {
  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 600 300"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      {/* Grid */}
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="var(--muted)"
            strokeWidth="0.5"
            opacity="0.3"
          />
        </pattern>
        <linearGradient id="groundGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--success)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="var(--success)" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <rect width="600" height="300" fill="url(#grid)" />

      {/* Ground */}
      <line
        x1="0"
        y1="240"
        x2="600"
        y2="240"
        stroke="var(--success)"
        strokeWidth="2"
      />
      <rect x="0" y="240" width="600" height="60" fill="url(#groundGradient)" />

      {/* Trajectory */}
      <path
        d="M 60 220 Q 300 60 540 220"
        stroke="var(--primary)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 60 220 Q 300 60 540 220"
        stroke="var(--primary)"
        strokeWidth="1"
        fill="none"
        strokeDasharray="8,4"
        opacity="0.4"
      />

      {/* Start point */}
      <circle cx="60" cy="220" r="6" fill="var(--success)" />

      {/* End point */}
      <circle cx="540" cy="220" r="6" fill="var(--success)" />

      {/* Projectile at apex */}
      <circle cx="300" cy="80" r="8" fill="var(--warning)" />
      <circle
        cx="300"
        cy="80"
        r="12"
        fill="none"
        stroke="var(--warning)"
        strokeWidth="1"
        opacity="0.5"
      />

      {/* Angle indicator */}
      <line
        x1="60"
        y1="220"
        x2="120"
        y2="180"
        stroke="var(--success)"
        strokeWidth="1.5"
        strokeDasharray="4,3"
        opacity="0.6"
      />
      <text
        x="85"
        y="200"
        fontFamily="monospace"
        fontSize="11"
        fill="var(--success)"
        opacity="0.8"
      >
        45°
      </text>

      {/* Distance marker */}
      <line
        x1="60"
        y1="255"
        x2="540"
        y2="255"
        stroke="var(--primary)"
        strokeWidth="1"
        opacity="0.6"
      />
      <line
        x1="60"
        y1="250"
        x2="60"
        y2="260"
        stroke="var(--primary)"
        strokeWidth="1"
        opacity="0.6"
      />
      <line
        x1="540"
        y1="250"
        x2="540"
        y2="260"
        stroke="var(--primary)"
        strokeWidth="1"
        opacity="0.6"
      />
      <text
        x="290"
        y="275"
        fontFamily="monospace"
        fontSize="11"
        fill="var(--primary)"
        textAnchor="middle"
        opacity="0.8"
      >
        Range ≈ 85.82 m
      </text>
    </svg>
  );
}
