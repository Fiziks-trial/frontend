import {
  Database,
  FileText,
  Folder,
  Layout,
  Linkedin,
  MessageCircle,
  PenTool,
  Share2,
  Sparkles,
  Trophy,
  Twitter,
  Users,
  Youtube,
} from "lucide-react";

export const NAV_LINKS = [
  { href: "/dashboard", label: "Learn" },
  { href: "/dashboard/practice", label: "Practice" },
  { href: "/dashboard/battles", label: "Battles" },
  { href: "/dashboard/leaderboard", label: "Rankings" },
] as const;

export const PROBLEM_CARDS = [
  {
    title: "Kinematics",
    color: "rose" as const,
    items: ["Motion equations", "Free fall", "Projectile motion"],
  },
  {
    title: "Mechanics",
    color: "sky" as const,
    items: ["Newton's Laws", "Friction", "Work & Energy"],
  },
  {
    title: "Waves",
    color: "amber" as const,
    items: ["Wave properties", "Sound waves", "Light"],
  },
  {
    title: "Thermodynamics",
    color: "emerald" as const,
    items: ["Heat transfer", "Gas laws", "Entropy"],
  },
];

export const PRACTICE_TASKS = [
  { label: "Solve projectile motion", tag: "Kinematics", tagColor: "rose" },
  { label: "Calculate momentum", tag: "Mechanics", tagColor: "sky" },
  { label: "Wave interference", tag: "Waves", tagColor: "amber" },
] as const;

export const LEARN_FEATURES = [
  { icon: FileText, label: "Simulations" },
  { icon: PenTool, label: "Practice" },
  { icon: Sparkles, label: "AI Tutor" },
  { icon: Share2, label: "Compete & Share" },
] as const;

export const ORGANIZE_CARDS = [
  {
    title: "Subjects",
    description: "Switch between different physics domains",
    color: "indigo",
    icon: Layout,
  },
  {
    title: "Topics & Tags",
    description: "Classic structure for clear hierarchies",
    color: "default",
    icon: Folder,
  },
  {
    title: "Collections",
    description: "For structured tracking and rich data",
    color: "emerald",
    icon: Database,
  },
] as const;

export const COMMUNITY_FEATURES = [
  {
    icon: MessageCircle,
    title: "Discord Community",
    description: "Get instant help and discuss problem strategies.",
  },
  {
    icon: Users,
    title: "Study Groups",
    description: "Find partners at your skill level to practice with.",
  },
  {
    icon: Trophy,
    title: "Weekly Events",
    description: "Tournaments, AMAs, and live problem-solving sessions.",
  },
] as const;

export const LEADERBOARD_DATA = [
  { rank: "#1", name: "PhysicsWiz", score: "142 pts", highlight: true },
  { rank: "#2", name: "NewtonFan99", score: "98 pts" },
  { rank: "#3", name: "QuantumLeaper", score: "87 pts" },
  { rank: "#4", name: "VectorVictor", score: "76 pts" },
] as const;

export const FOOTER_COLUMNS = [
  {
    title: "Product",
    className: "col-span-6 sm:col-span-4 lg:col-span-2 lg:col-start-7",
    links: [
      { label: "Download", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "Changelog", href: "#" },
      { label: "Docs", href: "#" },
    ],
  },
  {
    title: "Community",
    className: "col-span-6 sm:col-span-4 lg:col-span-2",
    links: [
      { label: "Discord", href: "#" },
      { label: "Manifesto", href: "#" },
      { label: "Events", href: "#" },
    ],
  },
  {
    title: "Company",
    className: "col-span-6 sm:col-span-4 lg:col-span-2",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
];

export const SOCIAL_LINKS = [
  { icon: Twitter, label: "Twitter" },
  { icon: Youtube, label: "YouTube" },
  { icon: Linkedin, label: "LinkedIn" },
] as const;
