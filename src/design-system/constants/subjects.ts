import { Atom, Beaker, Calculator, Dna, type LucideIcon } from "lucide-react";

export type Subject = "physics" | "math" | "chemistry" | "biology";

export interface SubjectConfig {
  id: Subject;
  label: string;
  shortLabel: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  badgeVariant: Subject;
  barColor: string;
  borderColor: string;
}

export const SUBJECTS: Record<Subject, SubjectConfig> = {
  physics: {
    id: "physics",
    label: "Physics",
    shortLabel: "Physics",
    icon: Atom,
    color: "text-subject-physics",
    bgColor: "bg-section-purple",
    badgeVariant: "physics",
    barColor: "bg-subject-physics",
    borderColor: "border-subject-physics/30",
  },
  math: {
    id: "math",
    label: "Mathematics",
    shortLabel: "Math",
    icon: Calculator,
    color: "text-subject-math",
    bgColor: "bg-section-blue",
    badgeVariant: "math",
    barColor: "bg-subject-math",
    borderColor: "border-subject-math/30",
  },
  chemistry: {
    id: "chemistry",
    label: "Chemistry",
    shortLabel: "Chem",
    icon: Beaker,
    color: "text-subject-chemistry",
    bgColor: "bg-section-amber",
    badgeVariant: "chemistry",
    barColor: "bg-subject-chemistry",
    borderColor: "border-subject-chemistry/30",
  },
  biology: {
    id: "biology",
    label: "Biology",
    shortLabel: "Biology",
    icon: Dna,
    color: "text-subject-biology",
    bgColor: "bg-section-emerald",
    badgeVariant: "biology",
    barColor: "bg-subject-biology",
    borderColor: "border-subject-biology/30",
  },
};

export const SUBJECT_LIST = Object.values(SUBJECTS);
