"use client";

import Link from "next/link";
import { useState } from "react";
import { Container, Grid, Stack } from "@/design-system/layouts";
import { EmptyState, FormField, StatCard } from "@/design-system/patterns";
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Divider,
  IconButton,
  Input,
  Skeleton,
  Spinner,
  Text,
} from "@/design-system/primitives";

type Section =
  | "colors"
  | "typography"
  | "spacing"
  | "shadows"
  | "radii"
  | "zIndex"
  | "button"
  | "input"
  | "card"
  | "text"
  | "badge"
  | "avatar"
  | "spinner"
  | "iconButton"
  | "divider"
  | "skeleton"
  | "formField"
  | "emptyState"
  | "statCard"
  | "container"
  | "stack"
  | "grid";

const sections = [
  {
    title: "Tokens",
    items: [
      { id: "colors" as Section, name: "Colors" },
      { id: "typography" as Section, name: "Typography" },
      { id: "spacing" as Section, name: "Spacing" },
      { id: "shadows" as Section, name: "Shadows" },
      { id: "radii" as Section, name: "Radii" },
      { id: "zIndex" as Section, name: "Z-Index" },
    ],
  },
  {
    title: "Primitives",
    items: [
      { id: "button" as Section, name: "Button" },
      { id: "input" as Section, name: "Input" },
      { id: "card" as Section, name: "Card" },
      { id: "text" as Section, name: "Text" },
      { id: "badge" as Section, name: "Badge" },
      { id: "avatar" as Section, name: "Avatar" },
      { id: "spinner" as Section, name: "Spinner" },
      { id: "iconButton" as Section, name: "IconButton" },
      { id: "divider" as Section, name: "Divider" },
      { id: "skeleton" as Section, name: "Skeleton" },
    ],
  },
  {
    title: "Patterns",
    items: [
      { id: "formField" as Section, name: "FormField" },
      { id: "emptyState" as Section, name: "EmptyState" },
      { id: "statCard" as Section, name: "StatCard" },
    ],
  },
  {
    title: "Layouts",
    items: [
      { id: "container" as Section, name: "Container" },
      { id: "stack" as Section, name: "Stack" },
      { id: "grid" as Section, name: "Grid" },
    ],
  },
];

export default function DesignSystemPage() {
  const [activeSection, setActiveSection] = useState<Section>("colors");

  return (
    <div className="min-h-screen bg-[#0f0f1a]">
      <header className="sticky top-0 z-50 border-b border-[#3f3f46] bg-[#0f0f1a]/80 backdrop-blur">
        <div className="flex items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold text-white">Fiziks Design System</h1>
          <Link
            href="/"
            className="text-sm text-[#a1a1aa] hover:text-white transition-colors"
          >
            Back to App
          </Link>
        </div>
      </header>

      <div className="flex">
        <aside className="sticky top-16.25 h-[calc(100vh-65px)] w-56 overflow-y-auto border-r border-[#3f3f46] p-4">
          <nav className="space-y-6">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#71717a]">
                  {section.title}
                </h2>
                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => setActiveSection(item.id)}
                        className={`w-full text-left rounded-lg px-3 py-2 text-sm transition-colors ${
                          activeSection === item.id
                            ? "bg-[#8b5cf6] text-white"
                            : "text-[#a1a1aa] hover:bg-[#1a1a2e] hover:text-white"
                        }`}
                      >
                        {item.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-8">
          {/* Tokens */}
          {activeSection === "colors" && <ColorsSection />}
          {activeSection === "typography" && <TypographySection />}
          {activeSection === "spacing" && <SpacingSection />}
          {activeSection === "shadows" && <ShadowsSection />}
          {activeSection === "radii" && <RadiiSection />}
          {activeSection === "zIndex" && <ZIndexSection />}
          {/* Primitives */}
          {activeSection === "button" && <ButtonSection />}
          {activeSection === "input" && <InputSection />}
          {activeSection === "card" && <CardSection />}
          {activeSection === "text" && <TextSection />}
          {activeSection === "badge" && <BadgeSection />}
          {activeSection === "avatar" && <AvatarSection />}
          {activeSection === "spinner" && <SpinnerSection />}
          {activeSection === "iconButton" && <IconButtonSection />}
          {activeSection === "divider" && <DividerSection />}
          {activeSection === "skeleton" && <SkeletonSection />}
          {/* Patterns */}
          {activeSection === "formField" && <FormFieldSection />}
          {activeSection === "emptyState" && <EmptyStateSection />}
          {activeSection === "statCard" && <StatCardSection />}
          {/* Layouts */}
          {activeSection === "container" && <ContainerSection />}
          {activeSection === "stack" && <StackSection />}
          {activeSection === "grid" && <GridSection />}
        </main>
      </div>
    </div>
  );
}

// ============ TOKEN SECTIONS ============

function ColorsSection() {
  const colorGroups = [
    {
      name: "Primary",
      colors: [
        { name: "500", value: "#8b5cf6" },
        { name: "600", value: "#7c3aed" },
        { name: "700", value: "#6d28d9" },
      ],
    },
    {
      name: "Secondary",
      colors: [
        { name: "500", value: "#14b8a6" },
        { name: "600", value: "#0d9488" },
        { name: "700", value: "#0f766e" },
      ],
    },
    {
      name: "Semantic",
      colors: [
        { name: "Success", value: "#22c55e" },
        { name: "Warning", value: "#f59e0b" },
        { name: "Error", value: "#ef4444" },
        { name: "Info", value: "#3b82f6" },
      ],
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Colors</h2>
      <div className="space-y-8">
        {colorGroups.map((group) => (
          <div key={group.name}>
            <h3 className="text-sm font-medium text-[#a1a1aa] mb-3">
              {group.name}
            </h3>
            <div className="flex gap-3">
              {group.colors.map((color) => (
                <div key={color.name} className="text-center">
                  <div
                    className="w-16 h-16 rounded-lg border border-[#3f3f46] mb-2"
                    style={{ backgroundColor: color.value }}
                  />
                  <p className="text-xs text-white">{color.name}</p>
                  <p className="text-xs text-[#71717a]">{color.value}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TypographySection() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Typography</h2>
      <div className="space-y-4 p-6 rounded-lg bg-[#16213e] border border-[#3f3f46]">
        {[
          { label: "4xl", text: "Heading 1", cls: "text-4xl font-bold" },
          { label: "3xl", text: "Heading 2", cls: "text-3xl font-bold" },
          { label: "2xl", text: "Heading 3", cls: "text-2xl font-semibold" },
          { label: "base", text: "Body text", cls: "text-base" },
          { label: "sm", text: "Small text", cls: "text-sm" },
          { label: "xs", text: "Caption", cls: "text-xs" },
        ].map((item) => (
          <div key={item.label} className="flex items-baseline gap-4">
            <span className="w-16 text-xs text-[#71717a]">{item.label}</span>
            <span className={`${item.cls} text-white`}>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SpacingSection() {
  const spacing = [
    { name: "1", px: "4px" },
    { name: "2", px: "8px" },
    { name: "4", px: "16px" },
    { name: "6", px: "24px" },
    { name: "8", px: "32px" },
  ];
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Spacing</h2>
      <div className="space-y-3">
        {spacing.map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-4 p-3 rounded-lg bg-[#16213e] border border-[#3f3f46]"
          >
            <span className="w-8 text-sm text-[#71717a]">{item.name}</span>
            <span className="w-12 text-sm text-[#71717a]">{item.px}</span>
            <div
              className="h-4 bg-[#8b5cf6] rounded"
              style={{ width: item.px }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function ShadowsSection() {
  const shadows = [
    { name: "sm", value: "0 1px 2px 0 rgba(0, 0, 0, 0.05)" },
    { name: "md", value: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" },
    { name: "lg", value: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" },
    { name: "xl", value: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" },
    { name: "glow", value: "0 0 20px rgba(139, 92, 246, 0.3)" },
  ];
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Shadows</h2>
      <div className="grid grid-cols-3 gap-4">
        {shadows.map((shadow) => (
          <div
            key={shadow.name}
            className="p-6 rounded-lg bg-[#16213e] border border-[#3f3f46]"
          >
            <div
              className="w-full h-16 rounded-lg bg-[#1e2a4a] mb-4"
              style={{ boxShadow: shadow.value }}
            />
            <p className="text-sm font-medium text-white">{shadow.name}</p>
            <p className="text-xs text-[#71717a] truncate">{shadow.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function RadiiSection() {
  const radii = [
    { name: "none", value: "0" },
    { name: "sm", value: "4px" },
    { name: "md", value: "8px" },
    { name: "lg", value: "12px" },
    { name: "xl", value: "16px" },
    { name: "full", value: "9999px" },
  ];
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Border Radius</h2>
      <div className="grid grid-cols-6 gap-4">
        {radii.map((r) => (
          <div
            key={r.name}
            className="p-4 rounded-lg bg-[#16213e] border border-[#3f3f46] text-center"
          >
            <div
              className="w-12 h-12 mx-auto mb-3 bg-[#8b5cf6]"
              style={{ borderRadius: r.value }}
            />
            <p className="text-sm font-medium text-white">{r.name}</p>
            <p className="text-xs text-[#71717a]">{r.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ZIndexSection() {
  const zIndexes = [
    { name: "base", value: 0 },
    { name: "dropdown", value: 100 },
    { name: "sticky", value: 200 },
    { name: "modal", value: 300 },
    { name: "popover", value: 400 },
    { name: "tooltip", value: 500 },
  ];
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Z-Index</h2>
      <div className="space-y-3">
        {zIndexes.map((z) => (
          <div
            key={z.name}
            className="flex items-center gap-4 p-3 rounded-lg bg-[#16213e] border border-[#3f3f46]"
          >
            <span className="w-24 text-sm font-medium text-white">
              {z.name}
            </span>
            <span className="text-sm text-[#71717a]">{z.value}</span>
            <div className="flex-1 h-2 bg-[#27272a] rounded overflow-hidden">
              <div
                className="h-full bg-[#8b5cf6]"
                style={{ width: `${(z.value / 500) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ PRIMITIVE SECTIONS ============

function ButtonSection() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Button</h2>
      <div className="space-y-8">
        <div>
          <h3 className="text-sm font-medium text-[#a1a1aa] mb-3">Variants</h3>
          <div className="flex flex-wrap gap-3 p-6 rounded-lg bg-[#16213e] border border-[#3f3f46]">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-[#a1a1aa] mb-3">Sizes</h3>
          <div className="flex items-center gap-3 p-6 rounded-lg bg-[#16213e] border border-[#3f3f46]">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-[#a1a1aa] mb-3">States</h3>
          <div className="flex gap-3 p-6 rounded-lg bg-[#16213e] border border-[#3f3f46]">
            <Button>Default</Button>
            <Button disabled>Disabled</Button>
            <Button isLoading>Loading</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InputSection() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Input</h2>
      <div className="space-y-8 max-w-md">
        <div>
          <h3 className="text-sm font-medium text-[#a1a1aa] mb-3">Basic</h3>
          <div className="p-6 rounded-lg bg-[#16213e] border border-[#3f3f46]">
            <Input placeholder="Enter text..." fullWidth />
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-[#a1a1aa] mb-3">
            With Label & Hint
          </h3>
          <div className="p-6 rounded-lg bg-[#16213e] border border-[#3f3f46]">
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              hint="Must be at least 8 characters"
              fullWidth
            />
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-[#a1a1aa] mb-3">
            With Error
          </h3>
          <div className="p-6 rounded-lg bg-[#16213e] border border-[#3f3f46]">
            <Input
              label="Username"
              defaultValue="johndoe"
              error="This username is already taken"
              fullWidth
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function CardSection() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Card</h2>
      <div className="space-y-8">
        <div>
          <h3 className="text-sm font-medium text-[#a1a1aa] mb-3">Variants</h3>
          <div className="grid grid-cols-3 gap-4">
            <Card variant="default">
              <CardTitle>Default</CardTitle>
              <CardContent>Default card</CardContent>
            </Card>
            <Card variant="elevated">
              <CardTitle>Elevated</CardTitle>
              <CardContent>With shadow</CardContent>
            </Card>
            <Card variant="outlined">
              <CardTitle>Outlined</CardTitle>
              <CardContent>With border</CardContent>
            </Card>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-[#a1a1aa] mb-3">
            With Header & Footer
          </h3>
          <Card className="max-w-sm">
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
            </CardHeader>
            <CardContent>Main content goes here.</CardContent>
            <CardFooter>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  Cancel
                </Button>
                <Button size="sm">Save</Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

function TextSection() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Text</h2>
      <div className="space-y-8">
        <div>
          <h3 className="text-sm font-medium text-[#a1a1aa] mb-3">Variants</h3>
          <div className="space-y-3 p-6 rounded-lg bg-[#16213e] border border-[#3f3f46]">
            <Text variant="h1">Heading 1</Text>
            <Text variant="h2">Heading 2</Text>
            <Text variant="h3">Heading 3</Text>
            <Text variant="body">Body text</Text>
            <Text variant="caption">Caption</Text>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-[#a1a1aa] mb-3">Colors</h3>
          <div className="space-y-2 p-6 rounded-lg bg-[#16213e] border border-[#3f3f46]">
            <Text color="primary">Primary</Text>
            <Text color="secondary">Secondary</Text>
            <Text color="muted">Muted</Text>
            <Text color="success">Success</Text>
            <Text color="error">Error</Text>
          </div>
        </div>
      </div>
    </div>
  );
}

function BadgeSection() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Badge</h2>
      <div className="flex flex-wrap gap-3 p-6 rounded-lg bg-[#16213e] border border-[#3f3f46]">
        <Badge variant="default">Default</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="error">Error</Badge>
        <Badge variant="info">Info</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>
    </div>
  );
}

function AvatarSection() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Avatar</h2>
      <div className="space-y-8">
        <div>
          <h3 className="text-sm font-medium text-[#a1a1aa] mb-3">Sizes</h3>
          <div className="flex items-center gap-4 p-6 rounded-lg bg-[#16213e] border border-[#3f3f46]">
            <Avatar size="xs" name="XS" />
            <Avatar size="sm" name="SM" />
            <Avatar size="md" name="MD" />
            <Avatar size="lg" name="LG" />
            <Avatar size="xl" name="XL" />
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-[#a1a1aa] mb-3">
            With Names
          </h3>
          <div className="flex gap-3 p-6 rounded-lg bg-[#16213e] border border-[#3f3f46]">
            <Avatar name="Alice" />
            <Avatar name="Bob Smith" />
            <Avatar name="Charlie" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SpinnerSection() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Spinner</h2>
      <div className="flex items-center gap-6 p-6 rounded-lg bg-[#16213e] border border-[#3f3f46]">
        <div className="text-center">
          <Spinner size="sm" className="text-[#8b5cf6]" />
          <p className="text-xs text-[#71717a] mt-2">sm</p>
        </div>
        <div className="text-center">
          <Spinner size="md" className="text-[#8b5cf6]" />
          <p className="text-xs text-[#71717a] mt-2">md</p>
        </div>
        <div className="text-center">
          <Spinner size="lg" className="text-[#8b5cf6]" />
          <p className="text-xs text-[#71717a] mt-2">lg</p>
        </div>
      </div>
    </div>
  );
}

const CloseIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);
const MenuIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

function IconButtonSection() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">IconButton</h2>
      <div className="flex gap-3 p-6 rounded-lg bg-[#16213e] border border-[#3f3f46]">
        <IconButton icon={<MenuIcon />} aria-label="Menu" variant="ghost" />
        <IconButton icon={<CloseIcon />} aria-label="Close" variant="primary" />
        <IconButton icon={<CloseIcon />} aria-label="Delete" variant="danger" />
      </div>
    </div>
  );
}

function DividerSection() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Divider</h2>
      <div className="p-6 rounded-lg bg-[#16213e] border border-[#3f3f46]">
        <p className="text-white mb-4">Content above</p>
        <Divider />
        <p className="text-white mt-4">Content below</p>
      </div>
    </div>
  );
}

function SkeletonSection() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Skeleton</h2>
      <div className="space-y-4 p-6 rounded-lg bg-[#16213e] border border-[#3f3f46]">
        <div className="flex items-center gap-4">
          <Skeleton variant="circular" width={48} height={48} />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="40%" />
          </div>
        </div>
        <Skeleton variant="rectangular" height={100} />
      </div>
    </div>
  );
}

// ============ PATTERN SECTIONS ============

function FormFieldSection() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">FormField</h2>
      <div className="max-w-md space-y-6 p-6 rounded-lg bg-[#16213e] border border-[#3f3f46]">
        <FormField label="Email" required hint="We'll never share your email.">
          <input
            className="w-full px-4 py-2 rounded-lg bg-[#1a1a2e] border border-[#3f3f46] text-white"
            placeholder="you@example.com"
          />
        </FormField>
        <FormField label="Password" error="Password is too weak">
          <input
            type="password"
            className="w-full px-4 py-2 rounded-lg bg-[#1a1a2e] border border-[#ef4444] text-white"
          />
        </FormField>
      </div>
    </div>
  );
}

function EmptyStateSection() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">EmptyState</h2>
      <div className="p-6 rounded-lg bg-[#16213e] border border-[#3f3f46]">
        <EmptyState
          icon={
            <svg
              className="w-12 h-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          }
          title="No quizzes yet"
          description="Create your first quiz to get started."
          action={<Button>Create Quiz</Button>}
        />
      </div>
    </div>
  );
}

function StatCardSection() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">StatCard</h2>
      <div className="grid grid-cols-3 gap-4">
        <StatCard
          label="Total Score"
          value="2,450"
          change={{ value: "12%", type: "increase" }}
        />
        <StatCard
          label="Matches Played"
          value="48"
          change={{ value: "3%", type: "decrease" }}
        />
        <StatCard
          label="Win Rate"
          value="67%"
          change={{ value: "0%", type: "neutral" }}
        />
      </div>
    </div>
  );
}

// ============ LAYOUT SECTIONS ============

function ContainerSection() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Container</h2>
      <div className="space-y-4">
        {(["sm", "md", "lg"] as const).map((size) => (
          <div
            key={size}
            className="p-4 rounded-lg bg-[#16213e] border border-[#3f3f46]"
          >
            <p className="text-xs text-[#71717a] mb-2">{size}</p>
            <Container size={size} className="bg-[#8b5cf6]/20 p-4 rounded">
              <p className="text-white text-center">Container {size}</p>
            </Container>
          </div>
        ))}
      </div>
    </div>
  );
}

function StackSection() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Stack</h2>
      <div className="space-y-8">
        <div>
          <h3 className="text-sm font-medium text-[#a1a1aa] mb-3">Vertical</h3>
          <div className="p-6 rounded-lg bg-[#16213e] border border-[#3f3f46]">
            <Stack spacing="md">
              <div className="p-4 bg-[#8b5cf6]/20 rounded text-white">
                Item 1
              </div>
              <div className="p-4 bg-[#8b5cf6]/20 rounded text-white">
                Item 2
              </div>
              <div className="p-4 bg-[#8b5cf6]/20 rounded text-white">
                Item 3
              </div>
            </Stack>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-[#a1a1aa] mb-3">
            Horizontal
          </h3>
          <div className="p-6 rounded-lg bg-[#16213e] border border-[#3f3f46]">
            <Stack direction="horizontal" spacing="md">
              <div className="p-4 bg-[#8b5cf6]/20 rounded text-white">
                Item 1
              </div>
              <div className="p-4 bg-[#8b5cf6]/20 rounded text-white">
                Item 2
              </div>
              <div className="p-4 bg-[#8b5cf6]/20 rounded text-white">
                Item 3
              </div>
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
}

function GridSection() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Grid</h2>
      <div className="p-6 rounded-lg bg-[#16213e] border border-[#3f3f46]">
        <Grid cols={3} gap="md">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="p-4 bg-[#8b5cf6]/20 rounded text-white text-center"
            >
              {n}
            </div>
          ))}
        </Grid>
      </div>
    </div>
  );
}
