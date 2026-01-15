"use client";

import { useState } from "react";
import { DashboardPageHeader } from "@/design-system";
import {
  SearchFiltersSection,
  ProblemsGrid,
  type SubjectFilter,
  type Problem,
} from "./_sections";

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

export default function ProblemsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<SubjectFilter>("all");

  const filteredProblems = PROBLEMS.filter((problem) => {
    const matchesSearch =
      problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.topic.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject =
      selectedSubject === "all" || problem.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <DashboardPageHeader
        title="Practice Problems"
        subtitle="Sharpen your skills with curated problems"
      />

      <SearchFiltersSection
        searchQuery={searchQuery}
        selectedSubject={selectedSubject}
        onSearchChange={setSearchQuery}
        onSubjectChange={setSelectedSubject}
      />

      <ProblemsGrid problems={filteredProblems} />
    </div>
  );
}
