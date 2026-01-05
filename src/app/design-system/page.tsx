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
import { Fizzy } from "@/design-system/components/Fizzy";

type Section =
  | "colors"
  | "typography"
  | "spacing"
  | "shadows"
  | "radii"
  | "zIndex"
  | "fizzy"
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
    title: "Brand",
    items: [{ id: "fizzy" as Section, name: "Fizzy Mascot" }],
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
  const [activeSection, setActiveSection] = useState<Section>("fizzy");

  return (
    <div className="min-h-screen relative">
      {/* Dot Grid Background */}
      <div className="dot-grid-bg" />

      {/* Floating accent blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="glow-spot glow-spot-green absolute top-20 left-1/4 w-[400px] h-[400px]" />
        <div className="glow-spot glow-spot-green absolute bottom-20 right-1/4 w-[300px] h-[300px]" style={{ opacity: 0.5 }} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <Fizzy state="idle" size="sm" />
              <h1 className="text-xl font-bold text-neon">
                Fiziks Design System
              </h1>
            </div>
            <Link
              href="/"
              className="text-sm text-[#64748b] hover:text-[#00ff7f] transition-colors"
            >
              Back to App
            </Link>
          </div>
        </header>

        <div className="flex">
          <aside className="sticky top-16.25 h-[calc(100vh-65px)] w-56 overflow-y-auto border-r border-white/5 bg-[#0a0a0a]/50 backdrop-blur-lg p-4">
            <nav className="space-y-6">
              {sections.map((section) => (
                <div key={section.title}>
                  <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                    {section.title}
                  </h2>
                  <ul className="space-y-1">
                    {section.items.map((item) => (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => setActiveSection(item.id)}
                          className={`w-full text-left rounded-xl px-3 py-2 text-sm transition-all duration-200 ${
                            activeSection === item.id
                              ? "bg-[#00ff7f] text-[#0a0a0a] font-semibold shadow-md"
                              : "text-[#94a3b8] hover:bg-white/5 hover:text-white"
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
          {/* Brand */}
          {activeSection === "fizzy" && <FizzySection />}
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
    </div>
  );
}

// ============ TOKEN SECTIONS ============

function ColorsSection() {
  const colorGroups = [
    {
      name: "Primary (Neon Green)",
      colors: [
        { name: "Neon", value: "#00ff7f" },
        { name: "400", value: "#4ade80" },
        { name: "500", value: "#22c55e" },
        { name: "600", value: "#16a34a" },
      ],
    },
    {
      name: "Secondary (Lime)",
      colors: [
        { name: "400", value: "#a3e635" },
        { name: "500", value: "#84cc16" },
        { name: "600", value: "#65a30d" },
      ],
    },
    {
      name: "Accent (Emerald)",
      colors: [
        { name: "400", value: "#34d399" },
        { name: "500", value: "#10b981" },
        { name: "600", value: "#059669" },
      ],
    },
    {
      name: "Semantic",
      colors: [
        { name: "Success", value: "#22c55e" },
        { name: "Warning", value: "#f59e0b" },
        { name: "Error", value: "#ef4444" },
      ],
    },
    {
      name: "Dark Surfaces",
      colors: [
        { name: "bg", value: "#0a0a0a" },
        { name: "card", value: "#141414" },
        { name: "border", value: "rgba(255,255,255,0.06)" },
      ],
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Colors</h2>
      <div className="space-y-8">
        {colorGroups.map((group) => (
          <div key={group.name}>
            <h3 className="text-sm font-medium text-[#94a3b8] mb-3">
              {group.name}
            </h3>
            <div className="flex gap-3">
              {group.colors.map((color) => (
                <div key={color.name} className="text-center">
                  <div
                    className="w-16 h-16 rounded-xl border border-white/10 mb-2"
                    style={{ backgroundColor: color.value }}
                  />
                  <p className="text-xs text-white">{color.name}</p>
                  <p className="text-xs text-[#64748b]">{color.value}</p>
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
      <div className="space-y-4 p-6 rounded-2xl bg-[#141414]/80 backdrop-blur-lg border border-white/6">
        {[
          { label: "5xl", text: "Heading 1", cls: "text-5xl font-extrabold" },
          { label: "4xl", text: "Heading 2", cls: "text-4xl font-bold" },
          { label: "2xl", text: "Heading 3", cls: "text-2xl font-bold" },
          { label: "xl", text: "Heading 4", cls: "text-xl font-semibold" },
          { label: "base", text: "Body text", cls: "text-base" },
          { label: "sm", text: "Small text", cls: "text-sm" },
          { label: "xs", text: "Caption", cls: "text-xs" },
        ].map((item) => (
          <div key={item.label} className="flex items-baseline gap-4">
            <span className="w-16 text-xs text-[#64748b]">{item.label}</span>
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
            className="flex items-center gap-4 p-3 rounded-xl bg-[#141414]/80 backdrop-blur-lg border border-white/10"
          >
            <span className="w-8 text-sm text-[#64748b]">{item.name}</span>
            <span className="w-12 text-sm text-[#64748b]">{item.px}</span>
            <div
              className="h-4 bg-[#00ff7f] rounded-lg"
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
    { name: "sm", value: "0 1px 2px rgba(0, 0, 0, 0.2)" },
    { name: "md", value: "0 4px 12px rgba(0, 0, 0, 0.15)" },
    { name: "lg", value: "0 8px 24px rgba(0, 0, 0, 0.2)" },
    { name: "xl", value: "0 12px 48px rgba(0, 0, 0, 0.25)" },
    { name: "glass", value: "0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)" },
    { name: "glow", value: "0 0 20px rgba(0, 255, 127, 0.3)" },
  ];
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Shadows</h2>
      <div className="grid grid-cols-3 gap-4">
        {shadows.map((shadow) => (
          <div
            key={shadow.name}
            className="p-6 rounded-2xl bg-[#141414]/80 backdrop-blur-lg border border-white/10"
          >
            <div
              className="w-full h-16 rounded-xl bg-[#0a0a0a]/80 mb-4"
              style={{ boxShadow: shadow.value }}
            />
            <p className="text-sm font-medium text-white">{shadow.name}</p>
            <p className="text-xs text-[#64748b] truncate">{shadow.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function RadiiSection() {
  const radii = [
    { name: "none", value: "0" },
    { name: "sm", value: "8px" },
    { name: "md", value: "12px" },
    { name: "lg", value: "16px" },
    { name: "xl", value: "24px" },
    { name: "2xl", value: "32px" },
    { name: "full", value: "9999px" },
  ];
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Border Radius</h2>
      <div className="grid grid-cols-7 gap-4">
        {radii.map((r) => (
          <div
            key={r.name}
            className="p-4 rounded-2xl bg-[#141414]/80 backdrop-blur-lg border border-white/10 text-center"
          >
            <div
              className="w-12 h-12 mx-auto mb-3 bg-[#00ff7f]"
              style={{ borderRadius: r.value }}
            />
            <p className="text-sm font-medium text-white">{r.name}</p>
            <p className="text-xs text-[#64748b]">{r.value}</p>
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
            className="flex items-center gap-4 p-3 rounded-xl bg-[#141414]/80 backdrop-blur-lg border border-white/10"
          >
            <span className="w-24 text-sm font-medium text-white">
              {z.name}
            </span>
            <span className="text-sm text-[#64748b]">{z.value}</span>
            <div className="flex-1 h-2 bg-[#0a0a0a]/60 rounded-lg overflow-hidden">
              <div
                className="h-full bg-[#00ff7f]"
                style={{ width: `${(z.value / 500) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ BRAND SECTIONS ============

function FizzySection() {
  const states = [
    "idle",
    "thinking",
    "correct",
    "wrong",
    "celebrate",
    "encourage",
    "hint",
    "excited",
  ] as const;

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-2">
        Fizzy Mascot
      </h2>
      <p className="text-[#94a3b8] mb-8">
        Fizzy is the energy spark mascot that guides users through Fiziks. It
        has multiple emotional states and sizes.
      </p>

      <div className="space-y-8">
        {/* States */}
        <div>
          <h3 className="text-sm font-medium text-[#94a3b8] mb-3">
            Emotional States
          </h3>
          <div className="grid grid-cols-4 gap-6 p-6 rounded-2xl bg-[#141414]/80 backdrop-blur-lg border border-white/10">
            {states.map((state) => (
              <div key={state} className="text-center">
                <Fizzy state={state} size="md" />
                <p className="mt-2 text-sm text-[#94a3b8] capitalize">
                  {state}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div>
          <h3 className="text-sm font-medium text-[#94a3b8] mb-3">
            Sizes
          </h3>
          <div className="flex items-end gap-8 p-6 rounded-2xl bg-[#141414]/80 backdrop-blur-lg border border-white/10">
            <div className="text-center">
              <Fizzy size="sm" />
              <p className="mt-2 text-sm text-[#94a3b8]">
                Small (48px)
              </p>
            </div>
            <div className="text-center">
              <Fizzy size="md" />
              <p className="mt-2 text-sm text-[#94a3b8]">
                Medium (72px)
              </p>
            </div>
            <div className="text-center">
              <Fizzy size="lg" />
              <p className="mt-2 text-sm text-[#94a3b8]">
                Large (96px)
              </p>
            </div>
          </div>
        </div>

        {/* Usage Examples */}
        <div>
          <h3 className="text-sm font-medium text-[#94a3b8] mb-3">
            Usage Examples
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {/* Correct Answer */}
            <div className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-[#141414]/80 backdrop-blur-lg border border-[#22c55e]/30">
              <Fizzy state="correct" size="lg" />
              <div className="text-center">
                <p className="text-xl font-bold text-[#22c55e]">
                  Correct!
                </p>
                <p className="text-sm text-[#94a3b8]">
                  +15 XP earned
                </p>
              </div>
            </div>

            {/* Wrong Answer */}
            <div className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-[#141414]/80 backdrop-blur-lg border border-[#ef4444]/30">
              <Fizzy state="wrong" size="lg" />
              <div className="text-center">
                <p className="text-xl font-bold text-[#ef4444]">
                  Not quite!
                </p>
                <p className="text-sm text-[#94a3b8]">
                  The answer was 42 m/s
                </p>
              </div>
            </div>

            {/* Hint */}
            <div className="flex items-center gap-4 p-6 rounded-2xl bg-[#141414]/80 backdrop-blur-lg border border-white/10">
              <Fizzy state="hint" size="md" />
              <div>
                <p className="text-white font-medium">
                  Need a hint?
                </p>
                <p className="text-sm text-[#94a3b8]">
                  Remember: kinetic energy = 1/2 mv²
                </p>
              </div>
            </div>

            {/* Thinking */}
            <div className="flex items-center gap-4 p-6 rounded-2xl bg-[#141414]/80 backdrop-blur-lg border border-white/10">
              <Fizzy state="thinking" size="md" />
              <div>
                <p className="text-white font-medium">
                  Processing...
                </p>
                <p className="text-sm text-[#94a3b8]">
                  Finding your next opponent
                </p>
              </div>
            </div>
          </div>
        </div>
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
          <h3 className="text-sm font-medium text-[#94a3b8] mb-3">Variants</h3>
          <div className="flex flex-wrap gap-3 p-6 rounded-2xl bg-[#141414]/80 backdrop-blur-lg border border-white/10">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-[#94a3b8] mb-3">Sizes</h3>
          <div className="flex items-center gap-3 p-6 rounded-2xl bg-[#141414]/80 backdrop-blur-lg border border-white/10">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-[#94a3b8] mb-3">States</h3>
          <div className="flex gap-3 p-6 rounded-2xl bg-[#141414]/80 backdrop-blur-lg border border-white/10">
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
          <h3 className="text-sm font-medium text-[#94a3b8] mb-3">Basic</h3>
          <div className="p-6 rounded-2xl bg-[#141414]/80 backdrop-blur-lg border border-white/10">
            <Input placeholder="Enter text..." fullWidth />
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-[#94a3b8] mb-3">
            With Label & Hint
          </h3>
          <div className="p-6 rounded-2xl bg-[#141414]/80 backdrop-blur-lg border border-white/10">
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
          <h3 className="text-sm font-medium text-[#94a3b8] mb-3">
            With Error
          </h3>
          <div className="p-6 rounded-2xl bg-[#141414]/80 backdrop-blur-lg border border-white/10">
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
          <div className="space-y-3 p-6 rounded-lg bg-[#141414] border border-white/6">
            <Text variant="h1">Heading 1</Text>
            <Text variant="h2">Heading 2</Text>
            <Text variant="h3">Heading 3</Text>
            <Text variant="body">Body text</Text>
            <Text variant="caption">Caption</Text>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-[#a1a1aa] mb-3">Colors</h3>
          <div className="space-y-2 p-6 rounded-lg bg-[#141414] border border-white/6">
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
      <div className="flex flex-wrap gap-3 p-6 rounded-lg bg-[#141414] border border-white/6">
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
          <div className="flex items-center gap-4 p-6 rounded-lg bg-[#141414] border border-white/6">
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
          <div className="flex gap-3 p-6 rounded-lg bg-[#141414] border border-white/6">
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
      <div className="flex items-center gap-6 p-6 rounded-lg bg-[#141414] border border-white/6">
        <div className="text-center">
          <Spinner size="sm" className="text-[#00ff7f]" />
          <p className="text-xs text-[#71717a] mt-2">sm</p>
        </div>
        <div className="text-center">
          <Spinner size="md" className="text-[#00ff7f]" />
          <p className="text-xs text-[#71717a] mt-2">md</p>
        </div>
        <div className="text-center">
          <Spinner size="lg" className="text-[#00ff7f]" />
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
      <div className="flex gap-3 p-6 rounded-lg bg-[#141414] border border-white/6">
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
      <div className="p-6 rounded-lg bg-[#141414] border border-white/6">
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
      <div className="space-y-4 p-6 rounded-lg bg-[#141414] border border-white/6">
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
      <div className="max-w-md space-y-6 p-6 rounded-lg bg-[#141414] border border-white/6">
        <FormField label="Email" required hint="We'll never share your email.">
          <input
            className="w-full px-4 py-2 rounded-lg bg-[#0a0a0a] border border-white/6 text-white"
            placeholder="you@example.com"
          />
        </FormField>
        <FormField label="Password" error="Password is too weak">
          <input
            type="password"
            className="w-full px-4 py-2 rounded-lg bg-[#0a0a0a] border border-[#ef4444] text-white"
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
      <div className="p-6 rounded-lg bg-[#141414] border border-white/6">
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
            className="p-4 rounded-lg bg-[#141414] border border-white/6"
          >
            <p className="text-xs text-[#71717a] mb-2">{size}</p>
            <Container size={size} className="bg-[#00ff7f]/20 p-4 rounded">
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
          <div className="p-6 rounded-lg bg-[#141414] border border-white/6">
            <Stack spacing="md">
              <div className="p-4 bg-[#00ff7f]/20 rounded text-white">
                Item 1
              </div>
              <div className="p-4 bg-[#00ff7f]/20 rounded text-white">
                Item 2
              </div>
              <div className="p-4 bg-[#00ff7f]/20 rounded text-white">
                Item 3
              </div>
            </Stack>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-[#a1a1aa] mb-3">
            Horizontal
          </h3>
          <div className="p-6 rounded-lg bg-[#141414] border border-white/6">
            <Stack direction="horizontal" spacing="md">
              <div className="p-4 bg-[#00ff7f]/20 rounded text-white">
                Item 1
              </div>
              <div className="p-4 bg-[#00ff7f]/20 rounded text-white">
                Item 2
              </div>
              <div className="p-4 bg-[#00ff7f]/20 rounded text-white">
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
      <div className="p-6 rounded-lg bg-[#141414] border border-white/6">
        <Grid cols={3} gap="md">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="p-4 bg-[#00ff7f]/20 rounded text-white text-center"
            >
              {n}
            </div>
          ))}
        </Grid>
      </div>
    </div>
  );
}
