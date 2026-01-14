"use client";

import { useState } from "react";
import {
  // Primitives
  Button,
  Card,
  Badge,
  Text,
  Input,
  Avatar,
  AvatarGroup,
  ProgressBar,
  ProgressRing,
  Divider,
  IconButton,
  // Patterns
  SubjectRating,
  StatCard,
  TimelineNode,
  SectionHeader,
  EmptyState,
  // Layouts
  Stack,
  Grid,
} from "@/design-system";
import {
  Atom,
  Beaker,
  Calculator,
  Dna,
  Search,
  Settings,
  Trophy,
  Inbox,
  Swords,
  Plus,
  Heart,
  Star,
  Palette,
  Type,
  Square,
  CreditCard,
  Tag,
  TextCursor,
  User,
  Loader,
  SplitSquareHorizontal,
  BarChart3,
  LayoutGrid,
  Layers,
  Menu,
  X,
} from "lucide-react";

const sections = [
  { id: "colors", label: "Colors", icon: Palette, category: "Tokens" },
  { id: "typography", label: "Typography", icon: Type, category: "Tokens" },
  { id: "button", label: "Button", icon: Square, category: "Primitives" },
  { id: "card", label: "Card", icon: CreditCard, category: "Primitives" },
  { id: "badge", label: "Badge", icon: Tag, category: "Primitives" },
  { id: "input", label: "Input", icon: TextCursor, category: "Primitives" },
  { id: "avatar", label: "Avatar", icon: User, category: "Primitives" },
  { id: "progress", label: "Progress", icon: Loader, category: "Primitives" },
  {
    id: "icon-button",
    label: "Icon Button",
    icon: Square,
    category: "Primitives",
  },
  {
    id: "divider",
    label: "Divider",
    icon: SplitSquareHorizontal,
    category: "Primitives",
  },
  {
    id: "subject-rating",
    label: "Subject Rating",
    icon: BarChart3,
    category: "Patterns",
  },
  {
    id: "stat-card",
    label: "Stat Card",
    icon: CreditCard,
    category: "Patterns",
  },
  { id: "timeline", label: "Timeline", icon: Layers, category: "Patterns" },
  {
    id: "empty-state",
    label: "Empty State",
    icon: Inbox,
    category: "Patterns",
  },
  {
    id: "layouts",
    label: "Grid & Stack",
    icon: LayoutGrid,
    category: "Layouts",
  },
];

const categories = ["Tokens", "Primitives", "Patterns", "Layouts"];

export default function DesignSystemPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredSections = activeSection
    ? sections.filter((s) => s.id === activeSection)
    : sections;

  return (
    <div className="flex min-h-screen bg-linear-to-br from-section-blue/50 via-section-indigo/20 to-section-purple/40">
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
          "fixed lg:sticky lg:top-0 inset-y-0 left-0 z-50",
          "w-64 h-screen shrink-0 border-r border-white/20",
          "flex flex-col overflow-hidden",
          "transform transition-transform duration-300 ease-in-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        ].join(" ")}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/20 bg-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <Text variant="h4" className="text-foreground">
                Design System
              </Text>
              <Text variant="body-sm" color="muted">
                Fiziks UI
              </Text>
            </div>
            <button
              type="button"
              className="lg:hidden p-2"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={20} className="text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Show All Button */}
        <div className="px-4 py-3 border-b border-white/20">
          <button
            type="button"
            onClick={() => setActiveSection(null)}
            className={[
              "w-full px-3 py-2 rounded-lg text-sm font-medium transition-all",
              activeSection === null
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-black/10 text-foreground hover:bg-black/20",
            ].join(" ")}
          >
            Show All Components
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {categories.map((category) => (
            <div key={category} className="mb-6">
              <div className="px-4 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-foreground/60">
                  {category}
                </span>
              </div>
              <ul className="space-y-1 px-2">
                {sections
                  .filter((s) => s.category === category)
                  .map((section) => {
                    const Icon = section.icon;
                    const isActive = activeSection === section.id;
                    return (
                      <li key={section.id}>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveSection(isActive ? null : section.id);
                            setSidebarOpen(false);
                          }}
                          className={[
                            "flex items-center gap-3 w-full px-3 py-2 rounded-lg",
                            "text-sm font-medium transition-all duration-200",
                            isActive
                              ? "bg-primary text-primary-foreground shadow-md"
                              : "text-foreground/80 hover:bg-white/30 hover:text-foreground hover:translate-x-1",
                          ].join(" ")}
                        >
                          <Icon size={16} />
                          {section.label}
                        </button>
                      </li>
                    );
                  })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {/* Mobile Header */}
        <div className="lg:hidden sticky top-0 z-30 bg-background border-b border-border px-4 py-3 flex items-center gap-4">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="p-2 -ml-2"
          >
            <Menu size={24} className="text-muted-foreground" />
          </button>
          <Text variant="h4">Design System</Text>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Header */}
          {!activeSection && (
            <header className="mb-10">
              <Text variant="h1" serif className="mb-2">
                Component Library
              </Text>
              <Text variant="body" color="muted">
                Production-ready components for Fiziks. Select a component from
                the sidebar to view it in isolation.
              </Text>
            </header>
          )}

          <Stack gap="xl">
            {/* COLORS */}
            {filteredSections.some((s) => s.id === "colors") && (
              <Section id="colors" title="Colors" subtitle="Design Tokens">
                <Stack gap="xl">
                  <Stack gap="md">
                    <Text variant="label" color="muted">
                      Base Colors
                    </Text>
                    <Grid cols={2} colsMd={4} colsLg={6} gap="sm">
                      <ColorSwatch name="Primary" className="bg-primary" />
                      <ColorSwatch name="Secondary" className="bg-secondary" />
                      <ColorSwatch name="Muted" className="bg-muted" />
                      <ColorSwatch name="Card" className="bg-card border" />
                      <ColorSwatch
                        name="Destructive"
                        className="bg-destructive"
                      />
                      <ColorSwatch name="Success" className="bg-success" />
                      <ColorSwatch name="Warning" className="bg-warning" />
                      <ColorSwatch name="Info" className="bg-info" />
                    </Grid>
                  </Stack>

                  <Stack gap="md">
                    <Text variant="label" color="muted">
                      Section Colors
                    </Text>
                    <Grid cols={2} colsMd={4} colsLg={6} gap="sm">
                      <ColorSwatch name="Blue" className="bg-section-blue" />
                      <ColorSwatch
                        name="Purple"
                        className="bg-section-purple"
                      />
                      <ColorSwatch
                        name="Yellow"
                        className="bg-section-yellow"
                      />
                      <ColorSwatch
                        name="Emerald"
                        className="bg-section-emerald"
                      />
                      <ColorSwatch name="Amber" className="bg-section-amber" />
                      <ColorSwatch name="Pink" className="bg-section-pink" />
                    </Grid>
                  </Stack>

                  <Stack gap="md">
                    <Text variant="label" color="muted">
                      Subject Colors
                    </Text>
                    <Grid cols={2} colsMd={4} gap="sm">
                      <ColorSwatch name="Math" className="bg-subject-math" />
                      <ColorSwatch
                        name="Physics"
                        className="bg-subject-physics"
                      />
                      <ColorSwatch
                        name="Chemistry"
                        className="bg-subject-chemistry"
                      />
                      <ColorSwatch
                        name="Biology"
                        className="bg-subject-biology"
                      />
                    </Grid>
                  </Stack>
                </Stack>
              </Section>
            )}

            {/* TYPOGRAPHY */}
            {filteredSections.some((s) => s.id === "typography") && (
              <Section
                id="typography"
                title="Typography"
                subtitle="Design Tokens"
              >
                <Stack gap="md">
                  <Text variant="h1" serif>
                    Heading 1 — Serif
                  </Text>
                  <Text variant="h2" serif>
                    Heading 2 — Serif
                  </Text>
                  <Text variant="h3">Heading 3</Text>
                  <Text variant="h4">Heading 4</Text>
                  <Text variant="body">
                    Body text — The quick brown fox jumps over the lazy dog.
                  </Text>
                  <Text variant="body-sm" color="muted">
                    Body small — Secondary text for descriptions and captions.
                  </Text>
                  <Text variant="label" color="muted">
                    Label Text
                  </Text>
                  <Text variant="caption" color="muted">
                    Caption Text
                  </Text>
                  <Text variant="mono">Monospace: 1,450</Text>
                </Stack>
              </Section>
            )}

            {/* BUTTONS */}
            {filteredSections.some((s) => s.id === "button") && (
              <Section id="button" title="Button" subtitle="Primitives">
                <Stack gap="xl">
                  <Stack gap="md">
                    <Text variant="label" color="muted">
                      Variants
                    </Text>
                    <Stack direction="horizontal" gap="sm" wrap>
                      <Button variant="primary">Primary</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="ghost">Ghost</Button>
                      <Button variant="link">Link</Button>
                      <Button variant="destructive">Destructive</Button>
                    </Stack>
                  </Stack>

                  <Stack gap="md">
                    <Text variant="label" color="muted">
                      Sizes
                    </Text>
                    <Stack direction="horizontal" gap="sm" align="center" wrap>
                      <Button size="sm">Small</Button>
                      <Button size="md">Medium</Button>
                      <Button size="lg">Large</Button>
                    </Stack>
                  </Stack>

                  <Stack gap="md">
                    <Text variant="label" color="muted">
                      With Icons
                    </Text>
                    <Stack direction="horizontal" gap="sm" wrap>
                      <Button icon={<Swords size={16} />}>Find Match</Button>
                      <Button variant="secondary" icon={<Plus size={16} />}>
                        Add New
                      </Button>
                      <Button variant="ghost" icon={<Settings size={16} />}>
                        Settings
                      </Button>
                    </Stack>
                  </Stack>

                  <Stack gap="md">
                    <Text variant="label" color="muted">
                      States
                    </Text>
                    <Stack direction="horizontal" gap="sm" wrap>
                      <Button loading>Loading</Button>
                      <Button disabled>Disabled</Button>
                    </Stack>
                  </Stack>
                </Stack>
              </Section>
            )}

            {/* CARDS */}
            {filteredSections.some((s) => s.id === "card") && (
              <Section id="card" title="Card" subtitle="Primitives">
                <Grid cols={1} colsMd={2} colsLg={3} gap="md">
                  <Card>
                    <Text variant="h4">Default Card</Text>
                    <Text variant="body-sm" color="muted" className="mt-2">
                      Standard card with border and shadow.
                    </Text>
                  </Card>
                  <Card color="blue">
                    <Text variant="h4">Blue Section</Text>
                    <Text variant="body-sm" color="muted" className="mt-2">
                      Soft blue background.
                    </Text>
                  </Card>
                  <Card color="purple">
                    <Text variant="h4">Purple Section</Text>
                    <Text variant="body-sm" color="muted" className="mt-2">
                      Soft purple background.
                    </Text>
                  </Card>
                  <Card color="yellow" hover>
                    <Text variant="h4">Yellow + Hover</Text>
                    <Text variant="body-sm" color="muted" className="mt-2">
                      Hover for shadow effect.
                    </Text>
                  </Card>
                  <Card color="emerald">
                    <Text variant="h4">Emerald Section</Text>
                    <Text variant="body-sm" color="muted" className="mt-2">
                      Soft green background.
                    </Text>
                  </Card>
                  <Card variant="elevated">
                    <Text variant="h4">Elevated</Text>
                    <Text variant="body-sm" color="muted" className="mt-2">
                      Larger shadow for emphasis.
                    </Text>
                  </Card>
                </Grid>
              </Section>
            )}

            {/* BADGES */}
            {filteredSections.some((s) => s.id === "badge") && (
              <Section id="badge" title="Badge" subtitle="Primitives">
                <Stack gap="xl">
                  <Stack gap="md">
                    <Text variant="label" color="muted">
                      Status Variants
                    </Text>
                    <Stack direction="horizontal" gap="sm" wrap>
                      <Badge>Default</Badge>
                      <Badge variant="success">Success</Badge>
                      <Badge variant="warning">Warning</Badge>
                      <Badge variant="destructive">Error</Badge>
                      <Badge variant="info">Info</Badge>
                    </Stack>
                  </Stack>

                  <Stack gap="md">
                    <Text variant="label" color="muted">
                      Subject Variants
                    </Text>
                    <Stack direction="horizontal" gap="sm" wrap>
                      <Badge variant="math">Math</Badge>
                      <Badge variant="physics">Physics</Badge>
                      <Badge variant="chemistry">Chemistry</Badge>
                      <Badge variant="biology">Biology</Badge>
                    </Stack>
                  </Stack>

                  <Stack gap="md">
                    <Text variant="label" color="muted">
                      Sizes
                    </Text>
                    <Stack direction="horizontal" gap="sm" align="center" wrap>
                      <Badge size="sm">Small</Badge>
                      <Badge size="md">Medium</Badge>
                    </Stack>
                  </Stack>
                </Stack>
              </Section>
            )}

            {/* INPUT */}
            {filteredSections.some((s) => s.id === "input") && (
              <Section id="input" title="Input" subtitle="Primitives">
                <Grid cols={1} colsMd={2} gap="lg">
                  <Stack gap="md">
                    <Text variant="label" color="muted">
                      Default
                    </Text>
                    <Input placeholder="Enter your name..." />
                  </Stack>
                  <Stack gap="md">
                    <Text variant="label" color="muted">
                      With Icon
                    </Text>
                    <Input
                      placeholder="Search..."
                      icon={<Search size={16} />}
                    />
                  </Stack>
                  <Stack gap="md">
                    <Text variant="label" color="muted">
                      Error State
                    </Text>
                    <Input placeholder="Invalid input" error />
                  </Stack>
                  <Stack gap="md">
                    <Text variant="label" color="muted">
                      Disabled
                    </Text>
                    <Input placeholder="Disabled" disabled />
                  </Stack>
                </Grid>
              </Section>
            )}

            {/* AVATAR */}
            {filteredSections.some((s) => s.id === "avatar") && (
              <Section id="avatar" title="Avatar" subtitle="Primitives">
                <Stack gap="xl">
                  <Stack gap="md">
                    <Text variant="label" color="muted">
                      Sizes
                    </Text>
                    <Stack direction="horizontal" gap="md" align="center">
                      <Avatar size="xs" fallback="XS" />
                      <Avatar size="sm" fallback="SM" />
                      <Avatar size="md" fallback="MD" />
                      <Avatar size="lg" fallback="LG" />
                      <Avatar size="xl" fallback="XL" />
                    </Stack>
                  </Stack>

                  <Stack gap="md">
                    <Text variant="label" color="muted">
                      Avatar Group
                    </Text>
                    <AvatarGroup>
                      <Avatar
                        size="sm"
                        fallback="TB"
                        className="border-2 border-background"
                      />
                      <Avatar
                        size="sm"
                        fallback="AK"
                        className="border-2 border-background bg-section-purple"
                      />
                      <Avatar
                        size="sm"
                        fallback="JD"
                        className="border-2 border-background bg-section-blue"
                      />
                      <Avatar
                        size="sm"
                        fallback="+5"
                        className="border-2 border-background bg-muted text-muted-foreground"
                      />
                    </AvatarGroup>
                  </Stack>
                </Stack>
              </Section>
            )}

            {/* PROGRESS */}
            {filteredSections.some((s) => s.id === "progress") && (
              <Section id="progress" title="Progress" subtitle="Primitives">
                <Grid cols={1} colsMd={2} gap="lg">
                  <Stack gap="md">
                    <Text variant="label" color="muted">
                      Progress Bar
                    </Text>
                    <Stack gap="sm">
                      <ProgressBar value={75} />
                      <ProgressBar value={60} color="success" />
                      <ProgressBar value={40} color="warning" />
                      <Stack direction="horizontal" gap="sm">
                        <ProgressBar
                          value={80}
                          color="math"
                          className="flex-1"
                        />
                        <ProgressBar
                          value={65}
                          color="physics"
                          className="flex-1"
                        />
                      </Stack>
                    </Stack>
                  </Stack>

                  <Stack gap="md">
                    <Text variant="label" color="muted">
                      Progress Ring
                    </Text>
                    <Stack direction="horizontal" gap="md" align="center">
                      <ProgressRing value={75} size="sm" />
                      <ProgressRing value={60} size="md" color="var(--success)">
                        <Text variant="mono" className="text-xs">
                          60%
                        </Text>
                      </ProgressRing>
                      <ProgressRing value={85} size="lg" color="var(--warning)">
                        <Stack align="center" gap="none">
                          <Text variant="h3" serif>
                            #42
                          </Text>
                          <Text variant="caption" color="muted">
                            Rank
                          </Text>
                        </Stack>
                      </ProgressRing>
                    </Stack>
                  </Stack>
                </Grid>
              </Section>
            )}

            {/* ICON BUTTON */}
            {filteredSections.some((s) => s.id === "icon-button") && (
              <Section
                id="icon-button"
                title="Icon Button"
                subtitle="Primitives"
              >
                <Stack gap="md">
                  <Text variant="label" color="muted">
                    Variants
                  </Text>
                  <Stack direction="horizontal" gap="md">
                    <IconButton icon={<Heart size={18} />} label="Like" />
                    <IconButton
                      icon={<Star size={18} />}
                      label="Favorite"
                      variant="ghost"
                    />
                    <IconButton
                      icon={<Settings size={18} />}
                      label="Settings"
                      variant="outline"
                    />
                  </Stack>
                </Stack>
              </Section>
            )}

            {/* DIVIDER */}
            {filteredSections.some((s) => s.id === "divider") && (
              <Section id="divider" title="Divider" subtitle="Primitives">
                <Card padding="md">
                  <Text variant="body-sm">Content above</Text>
                  <Divider className="my-4" />
                  <Text variant="body-sm">Content below</Text>
                  <Divider label="OR" className="my-4" />
                  <Text variant="body-sm">Alternative option</Text>
                </Card>
              </Section>
            )}

            {/* SUBJECT RATING */}
            {filteredSections.some((s) => s.id === "subject-rating") && (
              <Section
                id="subject-rating"
                title="Subject Rating"
                subtitle="Patterns"
              >
                <Card>
                  <Stack gap="md">
                    <SubjectRating
                      icon={<Calculator size={16} />}
                      subject="Mathematics"
                      rating="1,450"
                      progress={85}
                      color="math"
                    />
                    <SubjectRating
                      icon={<Atom size={16} />}
                      subject="Physics"
                      rating="1,320"
                      progress={70}
                      color="physics"
                    />
                    <SubjectRating
                      icon={<Beaker size={16} />}
                      subject="Chemistry"
                      rating="1,105"
                      progress={55}
                      color="chemistry"
                    />
                    <SubjectRating
                      icon={<Dna size={16} />}
                      subject="Biology"
                      rating="1,180"
                      progress={62}
                      color="biology"
                    />
                  </Stack>
                </Card>
              </Section>
            )}

            {/* STAT CARD */}
            {filteredSections.some((s) => s.id === "stat-card") && (
              <Section id="stat-card" title="Stat Card" subtitle="Patterns">
                <Grid cols={1} colsMd={3} gap="md">
                  <StatCard
                    title="Global Rank"
                    value="#42"
                    subtitle="Top 1%"
                    icon={
                      <Trophy size={18} className="text-muted-foreground" />
                    }
                  />
                  <StatCard
                    title="Win Rate"
                    value="68%"
                    trend={{ value: "5%", positive: true }}
                    color="emerald"
                  />
                  <StatCard
                    title="Games Played"
                    value="1,204"
                    subtitle="This season"
                    color="purple"
                  />
                </Grid>
              </Section>
            )}

            {/* TIMELINE */}
            {filteredSections.some((s) => s.id === "timeline") && (
              <Section id="timeline" title="Timeline" subtitle="Patterns">
                <Card padding="lg">
                  <SectionHeader
                    title="Match Timeline"
                    subtitle="Last 4 Matches"
                  />
                  <div className="relative py-8">
                    <div className="absolute left-8 right-8 top-1/2 h-px bg-border -translate-y-1/2" />
                    <Stack
                      direction="horizontal"
                      justify="between"
                      className="px-8 relative"
                    >
                      <TimelineNode
                        result="W"
                        delta="+24"
                        icon={<Atom size={14} />}
                        subject="Physics"
                        color="physics"
                        opponent="Alex"
                      />
                      <TimelineNode
                        result="L"
                        delta="-12"
                        icon={<Calculator size={14} />}
                        subject="Math"
                        color="math"
                        opponent="Sarah"
                      />
                      <TimelineNode
                        result="W"
                        delta="+18"
                        icon={<Dna size={14} />}
                        subject="Biology"
                        color="biology"
                        opponent="Dave"
                      />
                      <TimelineNode
                        result="W"
                        delta="+32"
                        icon={<Beaker size={14} />}
                        subject="Chem"
                        color="chemistry"
                        opponent="Mark"
                      />
                    </Stack>
                  </div>
                </Card>
              </Section>
            )}

            {/* EMPTY STATE */}
            {filteredSections.some((s) => s.id === "empty-state") && (
              <Section id="empty-state" title="Empty State" subtitle="Patterns">
                <Card>
                  <EmptyState
                    icon={<Inbox size={48} />}
                    title="No matches yet"
                    description="Start your first ranked match to see your history here."
                    action={{
                      label: "Find Match",
                      onClick: () => {},
                    }}
                  />
                </Card>
              </Section>
            )}

            {/* LAYOUTS */}
            {filteredSections.some((s) => s.id === "layouts") && (
              <Section id="layouts" title="Grid & Stack" subtitle="Layouts">
                <Stack gap="xl">
                  <Stack gap="md">
                    <Text variant="label" color="muted">
                      Grid (responsive)
                    </Text>
                    <Grid cols={2} colsMd={3} colsLg={4} gap="sm">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div
                          key={i}
                          className="h-16 bg-muted rounded-lg flex items-center justify-center text-muted-foreground text-sm"
                        >
                          Item {i}
                        </div>
                      ))}
                    </Grid>
                  </Stack>

                  <Stack gap="md">
                    <Text variant="label" color="muted">
                      Stack (horizontal)
                    </Text>
                    <Stack direction="horizontal" gap="sm" wrap>
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className="h-12 w-24 bg-section-purple rounded-lg flex items-center justify-center text-sm"
                        >
                          Item {i}
                        </div>
                      ))}
                    </Stack>
                  </Stack>

                  <Stack gap="md">
                    <Text variant="label" color="muted">
                      Stack (vertical)
                    </Text>
                    <Stack gap="sm">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="h-12 bg-section-blue rounded-lg flex items-center justify-center text-sm"
                        >
                          Item {i}
                        </div>
                      ))}
                    </Stack>
                  </Stack>
                </Stack>
              </Section>
            )}
          </Stack>
        </div>
      </main>
    </div>
  );
}

function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id}>
      <SectionHeader title={title} subtitle={subtitle} />
      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-sm">
        {children}
      </div>
    </section>
  );
}

function ColorSwatch({ name, className }: { name: string; className: string }) {
  return (
    <div className="text-center">
      <div className={`h-16 rounded-xl ${className}`} />
      <Text variant="body-sm" color="muted" className="mt-2">
        {name}
      </Text>
    </div>
  );
}
