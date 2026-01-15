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
  Spinner,
  Checkbox,
  Switch,
  Textarea,
  Link as StyledLink,
  Alert,
  Tooltip,
  // Patterns
  SubjectRating,
  StatCard,
  TimelineNode,
  SectionHeader,
  EmptyState,
  OAuthButton,
  // Layouts
  Stack,
  Grid,
  // Effects
  CloudBackground,
  GradientBlob,
  // Navigation
  NavLink,
  // Marketing
  WindowMockup,
  FloatingCard,
  MockupCard,
  CardWithOverlay,
  type OverlayItem,
  ProblemCard,
  FeatureCard,
  SocialCard,
  TaskItem,
  FeatureItem,
  FooterColumn,
  SocialIcon,
  SectionLabel,
  PillButton,
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
  Cloud,
  Navigation,
  Monitor,
  FileText,
  PenTool,
  Sparkles,
  Share2,
  Layout,
  Folder,
  Database,
  CheckSquare,
  ToggleLeft,
  AlignLeft,
  Link2,
  AlertCircle,
  Info,
  LogIn,
  ExternalLink,
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
  { id: "spinner", label: "Spinner", icon: Loader, category: "Primitives" },
  {
    id: "checkbox",
    label: "Checkbox",
    icon: CheckSquare,
    category: "Primitives",
  },
  { id: "switch", label: "Switch", icon: ToggleLeft, category: "Primitives" },
  {
    id: "textarea",
    label: "Textarea",
    icon: AlignLeft,
    category: "Primitives",
  },
  { id: "styled-link", label: "Link", icon: Link2, category: "Primitives" },
  { id: "alert", label: "Alert", icon: AlertCircle, category: "Primitives" },
  { id: "tooltip", label: "Tooltip", icon: Info, category: "Primitives" },
  {
    id: "cloud-background",
    label: "Cloud Background",
    icon: Cloud,
    category: "Effects",
  },
  {
    id: "gradient-blob",
    label: "Gradient Blob",
    icon: Cloud,
    category: "Effects",
  },
  {
    id: "floating-navbar",
    label: "Floating Navbar",
    icon: Navigation,
    category: "Navigation",
  },
  {
    id: "nav-link",
    label: "Nav Link",
    icon: Navigation,
    category: "Navigation",
  },
  {
    id: "window-mockup",
    label: "Window Mockup",
    icon: Monitor,
    category: "Marketing",
  },
  {
    id: "floating-card",
    label: "Floating Card",
    icon: CreditCard,
    category: "Marketing",
  },
  {
    id: "mockup-card",
    label: "Mockup Card",
    icon: Monitor,
    category: "Marketing",
  },
  {
    id: "card-with-overlay",
    label: "Card With Overlay",
    icon: Layers,
    category: "Marketing",
  },
  {
    id: "problem-card",
    label: "Problem Card",
    icon: CreditCard,
    category: "Marketing",
  },
  {
    id: "feature-card",
    label: "Feature Card",
    icon: CreditCard,
    category: "Marketing",
  },
  {
    id: "social-card",
    label: "Social Card",
    icon: Share2,
    category: "Marketing",
  },
  { id: "task-item", label: "Task Item", icon: Square, category: "Marketing" },
  {
    id: "feature-item",
    label: "Feature Item",
    icon: Star,
    category: "Marketing",
  },
  {
    id: "pill-button",
    label: "Pill Button",
    icon: Square,
    category: "Marketing",
  },
  {
    id: "section-label",
    label: "Section Label",
    icon: Type,
    category: "Marketing",
  },
  {
    id: "footer-column",
    label: "Footer Column",
    icon: Layers,
    category: "Marketing",
  },
  {
    id: "social-icon",
    label: "Social Icon",
    icon: Share2,
    category: "Marketing",
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
    id: "auth-layout",
    label: "Auth Layout",
    icon: LogIn,
    category: "Patterns",
  },
  {
    id: "oauth-button",
    label: "OAuth Button",
    icon: ExternalLink,
    category: "Patterns",
  },
  {
    id: "layouts",
    label: "Grid & Stack",
    icon: LayoutGrid,
    category: "Layouts",
  },
];

const categories = [
  "Tokens",
  "Primitives",
  "Effects",
  "Navigation",
  "Marketing",
  "Patterns",
  "Layouts",
];

export default function DesignSystemPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [overlayItems, setOverlayItems] = useState<OverlayItem[]>([
    { id: "velocity", label: "Initial velocity: 20 m/s", checked: false },
    { id: "angle", label: "Launch angle: 45°", checked: false },
    { id: "height", label: "Find maximum height", checked: false },
  ]);

  const handleOverlayItemChange = (id: string, checked: boolean) => {
    setOverlayItems((items) =>
      items.map((item) => (item.id === id ? { ...item, checked } : item)),
    );
  };

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
                      <Button icon={<Trophy size={16} />}>Find Match</Button>
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

            {/* SPINNER */}
            {filteredSections.some((s) => s.id === "spinner") && (
              <Section id="spinner" title="Spinner" subtitle="Primitives">
                <Stack gap="xl">
                  <Stack gap="md">
                    <Text variant="label" color="muted">
                      Sizes
                    </Text>
                    <Stack direction="horizontal" gap="lg" align="center">
                      <Spinner size="sm" />
                      <Spinner size="md" />
                      <Spinner size="lg" />
                    </Stack>
                  </Stack>
                  <Stack gap="md">
                    <Text variant="label" color="muted">
                      With Label
                    </Text>
                    <Spinner size="md" label="Loading..." />
                  </Stack>
                </Stack>
              </Section>
            )}

            {/* CHECKBOX */}
            {filteredSections.some((s) => s.id === "checkbox") && (
              <Section id="checkbox" title="Checkbox" subtitle="Primitives">
                <Stack gap="xl">
                  <Stack gap="md">
                    <Text variant="label" color="muted">
                      Sizes
                    </Text>
                    <Stack direction="horizontal" gap="lg" align="start">
                      <Checkbox size="sm" label="Small" />
                      <Checkbox size="md" label="Medium (default)" />
                      <Checkbox size="lg" label="Large" />
                    </Stack>
                  </Stack>
                  <Stack gap="md">
                    <Text variant="label" color="muted">
                      With Description
                    </Text>
                    <Checkbox
                      label="Accept terms"
                      description="I agree to the Terms of Service and Privacy Policy"
                    />
                  </Stack>
                  <Stack gap="md">
                    <Text variant="label" color="muted">
                      States
                    </Text>
                    <Stack gap="sm">
                      <Checkbox label="Unchecked" />
                      <Checkbox label="Checked (default)" defaultChecked />
                      <Checkbox label="Disabled" disabled />
                      <Checkbox label="Error state" error />
                    </Stack>
                  </Stack>
                </Stack>
              </Section>
            )}

            {/* SWITCH */}
            {filteredSections.some((s) => s.id === "switch") && (
              <Section id="switch" title="Switch" subtitle="Primitives">
                <Stack gap="xl">
                  <Stack gap="md">
                    <Text variant="label" color="muted">
                      Sizes
                    </Text>
                    <Stack gap="md">
                      <Switch size="sm" label="Small toggle" />
                      <Switch size="md" label="Medium toggle (default)" />
                      <Switch size="lg" label="Large toggle" />
                    </Stack>
                  </Stack>
                  <Stack gap="md">
                    <Text variant="label" color="muted">
                      With Description
                    </Text>
                    <Switch
                      label="Enable notifications"
                      description="Receive email notifications for important updates"
                    />
                  </Stack>
                  <Stack gap="md">
                    <Text variant="label" color="muted">
                      States
                    </Text>
                    <Stack gap="sm">
                      <Switch label="Off" />
                      <Switch label="On (default)" defaultChecked />
                      <Switch label="Disabled" disabled />
                    </Stack>
                  </Stack>
                </Stack>
              </Section>
            )}

            {/* TEXTAREA */}
            {filteredSections.some((s) => s.id === "textarea") && (
              <Section id="textarea" title="Textarea" subtitle="Primitives">
                <Grid cols={1} colsMd={2} gap="lg">
                  <Stack gap="md">
                    <Text variant="label" color="muted">
                      Default
                    </Text>
                    <Textarea placeholder="Enter your message..." />
                  </Stack>
                  <Stack gap="md">
                    <Text variant="label" color="muted">
                      Error State
                    </Text>
                    <Textarea placeholder="Invalid input" error />
                  </Stack>
                  <Stack gap="md">
                    <Text variant="label" color="muted">
                      No Resize
                    </Text>
                    <Textarea placeholder="Fixed height..." resize="none" />
                  </Stack>
                  <Stack gap="md">
                    <Text variant="label" color="muted">
                      Disabled
                    </Text>
                    <Textarea placeholder="Disabled" disabled />
                  </Stack>
                </Grid>
              </Section>
            )}

            {/* STYLED LINK */}
            {filteredSections.some((s) => s.id === "styled-link") && (
              <Section id="styled-link" title="Link" subtitle="Primitives">
                <Stack gap="xl">
                  <Stack gap="md">
                    <Text variant="label" color="muted">
                      Variants
                    </Text>
                    <Stack direction="horizontal" gap="lg">
                      <StyledLink href="#">Default Link</StyledLink>
                      <StyledLink href="#" variant="muted">
                        Muted Link
                      </StyledLink>
                      <StyledLink href="#" variant="underline">
                        Underline Link
                      </StyledLink>
                    </Stack>
                  </Stack>
                  <Stack gap="md">
                    <Text variant="label" color="muted">
                      External Link
                    </Text>
                    <StyledLink
                      href="https://example.com"
                      external
                      iconRight={<ExternalLink size={14} />}
                    >
                      Visit Example Site
                    </StyledLink>
                  </Stack>
                </Stack>
              </Section>
            )}

            {/* ALERT */}
            {filteredSections.some((s) => s.id === "alert") && (
              <Section id="alert" title="Alert" subtitle="Primitives">
                <Stack gap="md">
                  <Alert variant="info" title="Information">
                    This is an informational message with helpful context.
                  </Alert>
                  <Alert variant="success" title="Success!">
                    Your changes have been saved successfully.
                  </Alert>
                  <Alert variant="warning" title="Warning">
                    Please review your input before proceeding.
                  </Alert>
                  <Alert variant="error" title="Error">
                    Something went wrong. Please try again.
                  </Alert>
                  <Alert variant="info" dismissible onDismiss={() => {}}>
                    This alert can be dismissed by clicking the X button.
                  </Alert>
                </Stack>
              </Section>
            )}

            {/* TOOLTIP */}
            {filteredSections.some((s) => s.id === "tooltip") && (
              <Section id="tooltip" title="Tooltip" subtitle="Primitives">
                <Stack gap="xl">
                  <Stack gap="md">
                    <Text variant="label" color="muted">
                      Positions
                    </Text>
                    <Stack direction="horizontal" gap="lg" className="py-8">
                      <Tooltip content="Tooltip on top" position="top">
                        <Button variant="secondary" size="sm">
                          Top
                        </Button>
                      </Tooltip>
                      <Tooltip content="Tooltip on bottom" position="bottom">
                        <Button variant="secondary" size="sm">
                          Bottom
                        </Button>
                      </Tooltip>
                      <Tooltip content="Tooltip on left" position="left">
                        <Button variant="secondary" size="sm">
                          Left
                        </Button>
                      </Tooltip>
                      <Tooltip content="Tooltip on right" position="right">
                        <Button variant="secondary" size="sm">
                          Right
                        </Button>
                      </Tooltip>
                    </Stack>
                  </Stack>
                </Stack>
              </Section>
            )}

            {/* CLOUD BACKGROUND */}
            {filteredSections.some((s) => s.id === "cloud-background") && (
              <Section
                id="cloud-background"
                title="Cloud Background"
                subtitle="Effects"
              >
                <Stack gap="md">
                  <Text variant="label" color="muted">
                    Density Variants
                  </Text>
                  <Grid cols={1} colsMd={3} gap="md">
                    <div className="relative h-40 bg-sky-200 rounded-xl overflow-hidden">
                      <CloudBackground density="sparse" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Text variant="body-sm">Sparse</Text>
                      </div>
                    </div>
                    <div className="relative h-40 bg-sky-200 rounded-xl overflow-hidden">
                      <CloudBackground density="medium" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Text variant="body-sm">Medium</Text>
                      </div>
                    </div>
                    <div className="relative h-40 bg-sky-200 rounded-xl overflow-hidden">
                      <CloudBackground density="dense" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Text variant="body-sm">Dense</Text>
                      </div>
                    </div>
                  </Grid>
                </Stack>
              </Section>
            )}

            {/* GRADIENT BLOB */}
            {filteredSections.some((s) => s.id === "gradient-blob") && (
              <Section
                id="gradient-blob"
                title="Gradient Blob"
                subtitle="Effects"
              >
                <Stack gap="md">
                  <Text variant="label" color="muted">
                    Colors & Positions
                  </Text>
                  <div className="relative h-64 bg-stone-100 rounded-xl overflow-hidden">
                    <GradientBlob position="top-left" size="md" color="sky" />
                    <GradientBlob
                      position="bottom-right"
                      size="lg"
                      color="purple"
                    />
                    <GradientBlob position="center" size="sm" color="pink" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Text variant="body-sm" color="muted">
                        Decorative background blobs
                      </Text>
                    </div>
                  </div>
                </Stack>
              </Section>
            )}

            {/* FLOATING NAVBAR */}
            {filteredSections.some((s) => s.id === "floating-navbar") && (
              <Section
                id="floating-navbar"
                title="Floating Navbar"
                subtitle="Navigation"
              >
                <Stack gap="md">
                  <Text variant="label" color="muted">
                    Example (static position for demo)
                  </Text>
                  <div className="relative bg-sky-100 rounded-xl p-8 flex justify-center">
                    <div className="bg-white rounded-full shadow-lg shadow-black/5 px-4 py-2 flex items-center gap-6">
                      <div className="flex items-center gap-2 px-2">
                        <span className="text-xl font-black tracking-tight">
                          FIZIKS
                        </span>
                      </div>
                      <div className="hidden md:flex items-center gap-1">
                        <NavLink href="#">Learn</NavLink>
                        <NavLink href="#">Practice</NavLink>
                        <NavLink href="#">Battles</NavLink>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <PillButton variant="dark" size="sm">
                          Sign up
                        </PillButton>
                      </div>
                    </div>
                  </div>
                </Stack>
              </Section>
            )}

            {/* NAV LINK */}
            {filteredSections.some((s) => s.id === "nav-link") && (
              <Section id="nav-link" title="Nav Link" subtitle="Navigation">
                <Stack gap="xl">
                  <Stack gap="md">
                    <Text variant="label" color="muted">
                      Variants
                    </Text>
                    <Stack direction="horizontal" gap="sm">
                      <NavLink href="#" variant="pill">
                        Pill (default)
                      </NavLink>
                      <NavLink href="#" variant="default">
                        Default
                      </NavLink>
                    </Stack>
                  </Stack>
                  <Stack gap="md">
                    <Text variant="label" color="muted">
                      Active State
                    </Text>
                    <Stack direction="horizontal" gap="sm">
                      <NavLink href="#" active>
                        Active Link
                      </NavLink>
                      <NavLink href="#">Inactive Link</NavLink>
                    </Stack>
                  </Stack>
                </Stack>
              </Section>
            )}

            {/* WINDOW MOCKUP */}
            {filteredSections.some((s) => s.id === "window-mockup") && (
              <Section
                id="window-mockup"
                title="Window Mockup"
                subtitle="Marketing"
              >
                <WindowMockup title="fiziks.app">
                  <div className="text-center py-8">
                    <Text variant="h4">App Content Here</Text>
                    <Text variant="body-sm" color="muted" className="mt-2">
                      macOS-style window chrome with traffic lights
                    </Text>
                  </div>
                </WindowMockup>
              </Section>
            )}

            {/* FLOATING CARD */}
            {filteredSections.some((s) => s.id === "floating-card") && (
              <Section
                id="floating-card"
                title="Floating Card"
                subtitle="Marketing"
              >
                <Stack gap="md">
                  <Text variant="label" color="muted">
                    Color Variants
                  </Text>
                  <div className="relative h-64">
                    <div className="bg-gray-100 rounded-xl p-6 max-w-sm">
                      <Text variant="body-sm">Main content card</Text>
                    </div>
                    <FloatingCard position="bottom-right" color="orange">
                      <Text variant="h4">Orange Float</Text>
                      <Text variant="body-sm" color="muted">
                        Positioned overlay
                      </Text>
                    </FloatingCard>
                  </div>
                </Stack>
              </Section>
            )}

            {/* MOCKUP CARD */}
            {filteredSections.some((s) => s.id === "mockup-card") && (
              <Section
                id="mockup-card"
                title="Mockup Card"
                subtitle="Marketing"
              >
                <Stack gap="xl">
                  <Stack gap="md">
                    <Text variant="label" color="muted">
                      With Title
                    </Text>
                    <MockupCard title="Practice Queue" className="max-w-sm">
                      <div className="space-y-3">
                        <TaskItem
                          label="Solve projectile motion"
                          tag="Kinematics"
                          tagColor="rose"
                        />
                        <TaskItem
                          label="Calculate momentum"
                          tag="Mechanics"
                          tagColor="sky"
                        />
                      </div>
                    </MockupCard>
                  </Stack>
                  <Stack gap="md">
                    <Text variant="label" color="muted">
                      Minimal Variant
                    </Text>
                    <MockupCard variant="minimal" className="max-w-xs">
                      <Text variant="body-sm">
                        Smaller dots for minimal look
                      </Text>
                    </MockupCard>
                  </Stack>
                </Stack>
              </Section>
            )}

            {/* CARD WITH OVERLAY */}
            {filteredSections.some((s) => s.id === "card-with-overlay") && (
              <Section
                id="card-with-overlay"
                title="Card With Overlay"
                subtitle="Marketing"
              >
                <div className="flex justify-start">
                  <CardWithOverlay
                    title="Practice Queue"
                    overlayPosition="bottom-right"
                    overlayColor="orange"
                    className="max-w-sm"
                    overlayTitle="Projectile Motion"
                    overlayItems={overlayItems}
                    overlayDescription="Use kinematic equations to solve for the maximum height reached by the projectile..."
                    onItemChange={handleOverlayItemChange}
                  >
                    <div className="space-y-3">
                      <TaskItem
                        label="Solve projectile motion"
                        tag="Kinematics"
                        tagColor="rose"
                      />
                      <TaskItem
                        label="Calculate momentum"
                        tag="Mechanics"
                        tagColor="sky"
                      />
                      <TaskItem
                        label="Wave interference"
                        tag="Waves"
                        tagColor="amber"
                      />
                    </div>
                  </CardWithOverlay>
                </div>
              </Section>
            )}

            {/* PROBLEM CARD */}
            {filteredSections.some((s) => s.id === "problem-card") && (
              <Section
                id="problem-card"
                title="Problem Card"
                subtitle="Marketing"
              >
                <Grid cols={2} colsMd={4} gap="md">
                  <ProblemCard
                    title="Kinematics"
                    color="rose"
                    items={["Motion equations", "Free fall", "Projectile"]}
                  />
                  <ProblemCard
                    title="Mechanics"
                    color="sky"
                    items={["Newton's Laws", "Friction", "Energy"]}
                  />
                  <ProblemCard
                    title="Waves"
                    color="amber"
                    items={["Properties", "Sound", "Light"]}
                  />
                  <ProblemCard
                    title="Thermo"
                    color="emerald"
                    items={["Heat", "Gas laws", "Entropy"]}
                  />
                </Grid>
              </Section>
            )}

            {/* FEATURE CARD */}
            {filteredSections.some((s) => s.id === "feature-card") && (
              <Section
                id="feature-card"
                title="Feature Card"
                subtitle="Marketing"
              >
                <Grid cols={1} colsMd={3} gap="md">
                  <FeatureCard
                    title="Subjects"
                    description="Switch between physics domains"
                    color="indigo"
                    icon={<Layout className="size-6" />}
                  />
                  <FeatureCard
                    title="Topics"
                    description="Classic structure for hierarchies"
                    color="default"
                    icon={<Folder className="size-6" />}
                  />
                  <FeatureCard
                    title="Collections"
                    description="For structured tracking"
                    color="emerald"
                    icon={<Database className="size-6" />}
                  />
                </Grid>
              </Section>
            )}

            {/* SOCIAL CARD */}
            {filteredSections.some((s) => s.id === "social-card") && (
              <Section
                id="social-card"
                title="Social Card"
                subtitle="Marketing"
              >
                <Grid cols={2} colsMd={4} gap="md">
                  <SocialCard
                    platform="Reddit"
                    description="Discuss and share"
                    color="orange"
                  />
                  <SocialCard
                    platform="Discord"
                    description="Get community help"
                    color="gray"
                  />
                  <SocialCard
                    platform="Twitter"
                    description="Stay updated"
                    color="black"
                  />
                  <SocialCard
                    platform="YouTube"
                    description="Watch tutorials"
                    color="default"
                  />
                </Grid>
              </Section>
            )}

            {/* TASK ITEM */}
            {filteredSections.some((s) => s.id === "task-item") && (
              <Section id="task-item" title="Task Item" subtitle="Marketing">
                <Card padding="md">
                  <Stack gap="sm">
                    <TaskItem
                      label="Solve projectile motion"
                      tag="Kinematics"
                      tagColor="rose"
                    />
                    <TaskItem
                      label="Calculate momentum"
                      tag="Mechanics"
                      tagColor="sky"
                    />
                    <TaskItem
                      label="Wave interference"
                      tag="Waves"
                      tagColor="amber"
                      checked
                    />
                  </Stack>
                </Card>
              </Section>
            )}

            {/* FEATURE ITEM */}
            {filteredSections.some((s) => s.id === "feature-item") && (
              <Section
                id="feature-item"
                title="Feature Item"
                subtitle="Marketing"
              >
                <Stack gap="xl">
                  <Stack gap="md">
                    <Text variant="label" color="muted">
                      Sizes
                    </Text>
                    <Stack gap="md">
                      <FeatureItem
                        icon={<FileText className="size-4" />}
                        label="Small Size"
                        size="sm"
                      />
                      <FeatureItem
                        icon={<PenTool className="size-5" />}
                        label="Medium Size (default)"
                        size="md"
                      />
                      <FeatureItem
                        icon={<Sparkles className="size-6" />}
                        label="Large Size"
                        size="lg"
                      />
                    </Stack>
                  </Stack>
                </Stack>
              </Section>
            )}

            {/* PILL BUTTON */}
            {filteredSections.some((s) => s.id === "pill-button") && (
              <Section
                id="pill-button"
                title="Pill Button"
                subtitle="Marketing"
              >
                <Stack gap="xl">
                  <Stack gap="md">
                    <Text variant="label" color="muted">
                      Variants
                    </Text>
                    <Stack direction="horizontal" gap="sm" wrap>
                      <PillButton variant="primary">Primary</PillButton>
                      <PillButton variant="secondary">Secondary</PillButton>
                      <PillButton variant="outline">Outline</PillButton>
                      <PillButton variant="dark">Dark</PillButton>
                    </Stack>
                  </Stack>
                  <Stack gap="md">
                    <Text variant="label" color="muted">
                      Sizes
                    </Text>
                    <Stack direction="horizontal" gap="sm" align="center" wrap>
                      <PillButton size="sm">Small</PillButton>
                      <PillButton size="md">Medium</PillButton>
                      <PillButton size="lg">Large</PillButton>
                    </Stack>
                  </Stack>
                </Stack>
              </Section>
            )}

            {/* SECTION LABEL */}
            {filteredSections.some((s) => s.id === "section-label") && (
              <Section
                id="section-label"
                title="Section Label"
                subtitle="Marketing"
              >
                <Stack gap="md">
                  <SectionLabel>LEARN</SectionLabel>
                  <SectionLabel>ORGANIZE</SectionLabel>
                  <SectionLabel>COMPETE</SectionLabel>
                </Stack>
              </Section>
            )}

            {/* FOOTER COLUMN */}
            {filteredSections.some((s) => s.id === "footer-column") && (
              <Section
                id="footer-column"
                title="Footer Column"
                subtitle="Marketing"
              >
                <div className="bg-black rounded-xl p-6">
                  <Grid cols={2} colsMd={4} gap="md">
                    <FooterColumn
                      title="PRODUCT"
                      links={[
                        { label: "Features", href: "#" },
                        { label: "Learn", href: "#" },
                        { label: "Practice", href: "#" },
                      ]}
                    />
                    <FooterColumn
                      title="COMMUNITY"
                      links={[
                        { label: "Discord", href: "#" },
                        { label: "Reddit", href: "#" },
                        { label: "Twitter", href: "#" },
                      ]}
                    />
                    <FooterColumn
                      title="SUPPORT"
                      links={[
                        { label: "Help Center", href: "#" },
                        { label: "Contact", href: "#" },
                      ]}
                    />
                    <FooterColumn
                      title="LEGAL"
                      links={[
                        { label: "Terms", href: "#" },
                        { label: "Privacy", href: "#" },
                      ]}
                    />
                  </Grid>
                </div>
              </Section>
            )}

            {/* SOCIAL ICON */}
            {filteredSections.some((s) => s.id === "social-icon") && (
              <Section
                id="social-icon"
                title="Social Icon"
                subtitle="Marketing"
              >
                <Stack gap="xl">
                  <Stack gap="md">
                    <Text variant="label" color="muted">
                      Variants
                    </Text>
                    <Stack direction="horizontal" gap="md">
                      <SocialIcon label="Dark" variant="dark" />
                      <SocialIcon label="Light" variant="light" />
                      <SocialIcon label="Ghost" variant="ghost" />
                    </Stack>
                  </Stack>
                  <Stack gap="md">
                    <Text variant="label" color="muted">
                      Sizes
                    </Text>
                    <Stack direction="horizontal" gap="md" align="center">
                      <SocialIcon label="Small" size="sm" />
                      <SocialIcon label="Medium" size="md" />
                      <SocialIcon label="Large" size="lg" />
                    </Stack>
                  </Stack>
                </Stack>
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
                  <div className="relative pt-8 pb-4">
                    {/* Line positioned at center of circles: pt-8 (32px) + half of size-10 (20px) = 52px */}
                    <div className="absolute left-8 right-8 top-13 h-px bg-border" />
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

            {/* AUTH LAYOUT */}
            {filteredSections.some((s) => s.id === "auth-layout") && (
              <Section id="auth-layout" title="Auth Layout" subtitle="Patterns">
                <Stack gap="md">
                  <Text variant="body-sm" color="muted">
                    Split-screen authentication layout with gradient dark panel
                    and frosted blur effect. Used in sign-in and sign-up pages.
                  </Text>
                  <div className="rounded-xl overflow-hidden border border-border h-96">
                    <div className="grid grid-cols-2 h-full">
                      {/* Mini left panel preview */}
                      <div className="relative bg-linear-to-br from-gray-900 via-slate-900 to-zinc-950 p-6 overflow-hidden">
                        <div
                          className="absolute inset-0 opacity-15"
                          style={{
                            backgroundImage:
                              "linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)",
                            backgroundSize: "30px 30px",
                          }}
                        />
                        <div className="absolute inset-0 backdrop-blur-sm bg-black/5" />
                        <div className="absolute -top-1/4 -right-1/4 size-48 bg-indigo-900/30 rounded-full blur-[80px]" />
                        <div className="absolute -bottom-1/4 -left-1/4 size-36 bg-blue-900/20 rounded-full blur-[60px]" />
                        <div className="relative z-10 h-full flex flex-col justify-center items-center">
                          <Text
                            variant="body-sm"
                            className="text-white/60 text-center"
                          >
                            Dark gradient panel with blur
                          </Text>
                        </div>
                      </div>
                      {/* Mini right panel preview */}
                      <div className="bg-[#F9F9F8] p-6 flex items-center justify-center">
                        <Text variant="body-sm" color="muted">
                          Form content area
                        </Text>
                      </div>
                    </div>
                  </div>
                  <Text variant="caption" color="muted">
                    See /sign-in and /sign-up for full implementation.
                  </Text>
                </Stack>
              </Section>
            )}

            {/* OAUTH BUTTON */}
            {filteredSections.some((s) => s.id === "oauth-button") && (
              <Section
                id="oauth-button"
                title="OAuth Button"
                subtitle="Patterns"
              >
                <Stack gap="xl">
                  <Stack gap="md">
                    <Text variant="label" color="muted">
                      Providers
                    </Text>
                    <Stack gap="sm" className="max-w-sm">
                      <OAuthButton provider="google">
                        Continue with Google
                      </OAuthButton>
                      <OAuthButton provider="github">
                        Continue with GitHub
                      </OAuthButton>
                    </Stack>
                  </Stack>
                  <Stack gap="md">
                    <Text variant="label" color="muted">
                      Disabled State
                    </Text>
                    <Stack gap="sm" className="max-w-sm">
                      <OAuthButton provider="google" disabled>
                        Continue with Google
                      </OAuthButton>
                      <OAuthButton provider="github" disabled>
                        Continue with GitHub
                      </OAuthButton>
                    </Stack>
                  </Stack>
                  <Stack gap="md">
                    <Text variant="label" color="muted">
                      Without Arrow
                    </Text>
                    <div className="max-w-sm">
                      <OAuthButton provider="google" showArrow={false}>
                        Sign in with Google
                      </OAuthButton>
                    </div>
                  </Stack>
                </Stack>
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
