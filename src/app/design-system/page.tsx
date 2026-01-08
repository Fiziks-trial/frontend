"use client";

import { useState } from "react";
import {
  Code as CodeIcon,
  Zap,
  Users,
  MapPin,
  Terminal,
  ChevronRight,
} from "lucide-react";
import {
  Display,
  H1,
  H2,
  H3,
  H4,
  Body,
  Small,
  Code,
  SystemMessage,
  Label,
  AccentText,
  PurpleText,
  MutedText,
} from "@/design-system/primitives/Typography";
import {
  Button,
  ArrowButton,
  IconButton,
} from "@/design-system/primitives/Button";
import {
  Card,
  IconCard,
  FeatureCard,
  InfoCard,
  StatCard,
} from "@/design-system/primitives/Card";
import {
  Badge,
  StatusBadge,
  SystemBadge,
  CounterBadge,
} from "@/design-system/primitives/Badge";
import {
  Input,
  Textarea,
  Select,
  Checkbox,
  Radio,
} from "@/design-system/primitives/Input";
import {
  Navbar,
  Logo,
  NavLink,
  Sidebar,
  SidebarLink,
  Breadcrumb,
  Footer,
} from "@/design-system/primitives/Navigation";
import { Avatar, AvatarGroup } from "@/design-system/primitives/Avatar";
import { Divider, TerminalDivider } from "@/design-system/primitives/Divider";
import {
  Skeleton,
  SkeletonText,
  SkeletonCard,
} from "@/design-system/primitives/Skeleton";
import { Spinner } from "@/design-system/primitives/Spinner";

type SectionId =
  | "typography"
  | "buttons"
  | "cards"
  | "badges"
  | "inputs"
  | "navigation"
  | "avatars"
  | "dividers"
  | "skeletons"
  | "spinners";

export default function DesignSystemPage() {
  const [activeSection, setActiveSection] = useState<SectionId>("typography");
  const [checkboxState, setCheckboxState] = useState(false);
  const [radioState, setRadioState] = useState("option1");

  const sections: { id: SectionId; label: string }[] = [
    { id: "typography", label: "Typography" },
    { id: "buttons", label: "Buttons" },
    { id: "cards", label: "Cards" },
    { id: "badges", label: "Badges" },
    { id: "inputs", label: "Inputs" },
    { id: "navigation", label: "Navigation" },
    { id: "avatars", label: "Avatars" },
    { id: "dividers", label: "Dividers" },
    { id: "skeletons", label: "Skeletons" },
    { id: "spinners", label: "Spinners" },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Navbar */}
      <Navbar
        logo={<Logo text="FIZIKS" icon={<Terminal className="w-5 h-5" />} />}
      >
        <NavLink active>Components</NavLink>
        <NavLink>Docs</NavLink>
        <NavLink>GitHub</NavLink>
      </Navbar>

      <div className="flex">
        {/* Sidebar */}
        <Sidebar className="hidden md:block sticky top-0 h-screen overflow-y-auto">
          {sections.map((section) => (
            <SidebarLink
              key={section.id}
              active={activeSection === section.id}
              onClick={(e) => {
                e.preventDefault();
                setActiveSection(section.id);
              }}
            >
              {section.label}
            </SidebarLink>
          ))}
        </Sidebar>

        {/* Main Content */}
        <main className="flex-1 p-8 lg:p-12">
          <div className="max-w-6xl mx-auto space-y-12">
            {/* Header */}
            <div className="space-y-6">
              <SystemMessage>{"/// SYSTEM_READY: FIZIKS_DESIGN.exe"}</SystemMessage>
              <Display>
                <AccentText>FIZIKS</AccentText>
                <br />
                <span className="text-white">DESIGN</span>
                <br />
                <span className="text-white">SYSTEM</span>
              </Display>
              <Body className="text-[#999999] max-w-2xl">
                A comprehensive cyberpunk-themed design system for Fiziks.
                Features monospace typography, neon green accents, and
                terminal-inspired components.
              </Body>
            </div>

            {/* Typography Section */}
            {activeSection === "typography" && (
              <section id="typography" className="space-y-8">
                <div>
                  <SystemBadge>TYPOGRAPHY</SystemBadge>
                  <H2 className="mt-4">Text Components</H2>
                </div>

                <div className="space-y-6 border border-[#00ff0033] p-8">
                  <div className="space-y-3">
                    <Label>Display Text</Label>
                    <Display className="text-white">
                      TURN <AccentText>IDEAS</AccentText> INTO REALITY
                    </Display>
                  </div>

                  <div className="space-y-3">
                    <Label>Heading 1</Label>
                    <H1>
                      System_<AccentText>Protocols</AccentText>
                    </H1>
                  </div>

                  <div className="space-y-3">
                    <Label>Heading 2</Label>
                    <H2>
                      The_<PurpleText>Network</PurpleText>
                    </H2>
                  </div>

                  <div className="space-y-3">
                    <Label>Heading 3</Label>
                    <H3>Vibrant Community</H3>
                  </div>

                  <div className="space-y-3">
                    <Label>Heading 4</Label>
                    <H4>Build Your Company</H4>
                  </div>

                  <div className="space-y-3">
                    <Label>Body Text</Label>
                    <Body className="text-[#cccccc]">
                      Learn physics the fun way with interactive simulations and
                      engaging content designed for curious minds.
                    </Body>
                  </div>

                  <div className="space-y-3">
                    <Label>Small Text</Label>
                    <Small className="text-[#999999]">
                      Weekly standups • 1:1 Mentorship • Goal tracking
                    </Small>
                  </div>

                  <div className="space-y-3">
                    <Label>Code/Terminal Text</Label>
                    <Code className="text-[#00ff00]">
                      $ npm install @fiziks/design-system
                    </Code>
                  </div>

                  <div className="space-y-3">
                    <Label>System Message</Label>
                    <SystemMessage>
                      {"/// SYSTEM_READY: FIZIKS_NODE_INIT"}
                    </SystemMessage>
                  </div>

                  <div className="space-y-3">
                    <Label>Text Variants</Label>
                    <div className="flex gap-4">
                      <AccentText>Accent Text</AccentText>
                      <PurpleText>Purple Text</PurpleText>
                      <MutedText>Muted Text</MutedText>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Buttons Section */}
            {activeSection === "buttons" && (
              <section id="buttons" className="space-y-8">
                <div>
                  <SystemBadge>BUTTONS</SystemBadge>
                  <H2 className="mt-4">Button Components</H2>
                </div>

                <div className="space-y-8 border border-[#00ff0033] p-8">
                  <div className="space-y-4">
                    <Label>Button Variants</Label>
                    <div className="flex flex-wrap gap-4">
                      <Button variant="primary">Primary Button</Button>
                      <Button variant="secondary">Secondary Button</Button>
                      <Button variant="ghost">Ghost Button</Button>
                      <Button variant="link">Link Button</Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Button Sizes</Label>
                    <div className="flex flex-wrap items-center gap-4">
                      <Button size="sm">Small</Button>
                      <Button size="md">Medium</Button>
                      <Button size="lg">Large</Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Arrow Buttons (CTA)</Label>
                    <div className="flex flex-wrap gap-4">
                      <ArrowButton variant="primary">Initiate</ArrowButton>
                      <ArrowButton variant="secondary">Learn More</ArrowButton>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Icon Buttons</Label>
                    <div className="flex flex-wrap gap-4">
                      <IconButton
                        icon={<CodeIcon size={16} />}
                        variant="primary"
                      >
                        Deploy
                      </IconButton>
                      <IconButton
                        icon={<Zap size={16} />}
                        variant="secondary"
                        iconPosition="right"
                      >
                        Execute
                      </IconButton>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Disabled State</Label>
                    <Button disabled>Disabled Button</Button>
                  </div>
                </div>
              </section>
            )}

            {/* Cards Section */}
            {activeSection === "cards" && (
              <section id="cards" className="space-y-8">
                <div>
                  <SystemBadge>CARDS</SystemBadge>
                  <H2 className="mt-4">Card Components</H2>
                </div>

                <div className="space-y-8">
                  <div className="space-y-4">
                    <Label>Basic Cards</Label>
                    <div className="grid md:grid-cols-3 gap-6">
                      <Card variant="default">
                        <H4 className="mb-2">Default Card</H4>
                        <Small className="text-[#999999]">
                          Standard card with subtle border
                        </Small>
                      </Card>
                      <Card variant="bordered">
                        <H4 className="mb-2">Bordered Card</H4>
                        <Small className="text-[#999999]">
                          Prominent green border
                        </Small>
                      </Card>
                      <Card variant="glow">
                        <H4 className="mb-2">Glow Card</H4>
                        <Small className="text-[#999999]">
                          Card with glow effect
                        </Small>
                      </Card>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Icon Cards</Label>
                    <div className="grid md:grid-cols-3 gap-6">
                      <IconCard
                        icon={<CodeIcon />}
                        title="6 Months"
                        description="Duration of the program"
                      />
                      <IconCard
                        icon={<Users />}
                        title="8 Students"
                        description="Small cohort of learners"
                      />
                      <IconCard
                        icon={<MapPin />}
                        title="Online"
                        description="Learn from anywhere"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Feature Card</Label>
                    <FeatureCard
                      title="Interactive Learning"
                      description="Engage with physics concepts through hands-on simulations and real-world applications."
                    >
                      <div className="space-y-2 mt-4">
                        <Small className="text-[#999999]">
                          • Live simulations
                        </Small>
                        <Small className="text-[#999999]">
                          • Problem solving
                        </Small>
                        <Small className="text-[#999999]">
                          • Visual explanations
                        </Small>
                      </div>
                    </FeatureCard>
                  </div>

                  <div className="space-y-4">
                    <Label>Info Card</Label>
                    <div className="grid md:grid-cols-2 gap-6">
                      <InfoCard
                        title="Sync & Coaching"
                        description="Stay clear minded and accountable with weekly syncs and coaching sessions."
                        items={[
                          "Weekly standups",
                          "1:1 Mentorship",
                          "Goal tracking",
                        ]}
                      />
                      <InfoCard
                        title="10X Trajectory"
                        description="Connect with someone who will 10x your trajectory through intros and fireside chats."
                        items={[
                          "Fireside chats",
                          "High-value intros",
                          "Alumni network",
                        ]}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Stat Cards</Label>
                    <div className="grid md:grid-cols-3 gap-6">
                      <StatCard
                        label="Active Projects"
                        value="42"
                        icon={<CodeIcon />}
                      />
                      <StatCard
                        label="Total Students"
                        value="156"
                        icon={<Users />}
                      />
                      <StatCard
                        label="Success Rate"
                        value="94%"
                        icon={<Zap />}
                      />
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Badges Section */}
            {activeSection === "badges" && (
              <section id="badges" className="space-y-8">
                <div>
                  <SystemBadge>BADGES</SystemBadge>
                  <H2 className="mt-4">Badge Components</H2>
                </div>

                <div className="space-y-8 border border-[#00ff0033] p-8">
                  <div className="space-y-4">
                    <Label>Badge Variants</Label>
                    <div className="flex flex-wrap gap-4">
                      <Badge variant="default">Default</Badge>
                      <Badge variant="success">Success</Badge>
                      <Badge variant="warning">Warning</Badge>
                      <Badge variant="error">Error</Badge>
                      <Badge variant="purple">Purple</Badge>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Status Badges</Label>
                    <div className="flex flex-wrap gap-4">
                      <StatusBadge status="active">Online</StatusBadge>
                      <StatusBadge status="inactive">Offline</StatusBadge>
                      <StatusBadge status="pending">Pending</StatusBadge>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>System Badges</Label>
                    <div className="flex flex-wrap gap-4">
                      <SystemBadge>SYSTEM_READY</SystemBadge>
                      <SystemBadge>NODE_ACTIVE</SystemBadge>
                      <SystemBadge>DEPLOY_SUCCESS</SystemBadge>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Counter Badge</Label>
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-white">Notifications</span>
                        <CounterBadge count={5} />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-white">Messages</span>
                        <CounterBadge count={127} />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Inputs Section */}
            {activeSection === "inputs" && (
              <section id="inputs" className="space-y-8">
                <div>
                  <SystemBadge>INPUTS</SystemBadge>
                  <H2 className="mt-4">Input Components</H2>
                </div>

                <div className="space-y-8 border border-[#00ff0033] p-8">
                  <div className="space-y-4">
                    <Label>Text Input</Label>
                    <div className="max-w-md">
                      <Input
                        label="Username"
                        placeholder="Enter your username"
                        helperText="Choose a unique identifier"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Text Input with Error</Label>
                    <div className="max-w-md">
                      <Input
                        label="Email"
                        placeholder="your@email.com"
                        error="Invalid email format"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Textarea</Label>
                    <div className="max-w-md">
                      <Textarea
                        label="Project Description"
                        placeholder="Describe your project..."
                        rows={4}
                        helperText="Max 500 characters"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Select Dropdown</Label>
                    <div className="max-w-md">
                      <Select
                        label="Project Type"
                        options={[
                          { value: "web", label: "Web Application" },
                          { value: "mobile", label: "Mobile App" },
                          { value: "api", label: "API Service" },
                          { value: "tool", label: "Developer Tool" },
                        ]}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Checkbox</Label>
                    <div className="space-y-3">
                      <Checkbox
                        label="I agree to the terms and conditions"
                        checked={checkboxState}
                        onChange={(e) => setCheckboxState(e.target.checked)}
                      />
                      <Checkbox label="Subscribe to newsletter" />
                      <Checkbox label="Enable notifications" disabled />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Radio Buttons</Label>
                    <div className="space-y-3">
                      <Radio
                        label="Option 1"
                        name="radio-group"
                        value="option1"
                        checked={radioState === "option1"}
                        onChange={(e) => setRadioState(e.target.value)}
                      />
                      <Radio
                        label="Option 2"
                        name="radio-group"
                        value="option2"
                        checked={radioState === "option2"}
                        onChange={(e) => setRadioState(e.target.value)}
                      />
                      <Radio
                        label="Option 3"
                        name="radio-group"
                        value="option3"
                        checked={radioState === "option3"}
                        onChange={(e) => setRadioState(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Navigation Section */}
            {activeSection === "navigation" && (
              <section id="navigation" className="space-y-8">
                <div>
                  <SystemBadge>NAVIGATION</SystemBadge>
                  <H2 className="mt-4">Navigation Components</H2>
                </div>

                <div className="space-y-8 border border-[#00ff0033] p-8">
                  <div className="space-y-4">
                    <Label>Navbar (See top of page)</Label>
                    <Small className="text-[#999999]">
                      The navigation bar at the top demonstrates the Navbar,
                      Logo, and NavLink components.
                    </Small>
                  </div>

                  <div className="space-y-4">
                    <Label>Sidebar (See left side)</Label>
                    <Small className="text-[#999999]">
                      The sidebar on desktop demonstrates the Sidebar and
                      SidebarLink components.
                    </Small>
                  </div>

                  <div className="space-y-4">
                    <Label>Breadcrumb</Label>
                    <Breadcrumb
                      items={[
                        { label: "Home", href: "#" },
                        { label: "Components", href: "#" },
                        { label: "Navigation" },
                      ]}
                    />
                  </div>

                  <div className="space-y-4">
                    <Label>Nav Links</Label>
                    <div className="flex gap-2">
                      <NavLink active>Active</NavLink>
                      <NavLink>Inactive</NavLink>
                      <NavLink>Another Link</NavLink>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Avatars Section */}
            {activeSection === "avatars" && (
              <section id="avatars" className="space-y-8">
                <div>
                  <SystemBadge>AVATARS</SystemBadge>
                  <H2 className="mt-4">Avatar Components</H2>
                </div>

                <div className="space-y-8 border border-[#00ff0033] p-8">
                  <div className="space-y-4">
                    <Label>Avatar Sizes</Label>
                    <div className="flex items-center gap-4">
                      <Avatar size="xs" name="XS" />
                      <Avatar size="sm" name="SM" />
                      <Avatar size="md" name="MD" />
                      <Avatar size="lg" name="LG" />
                      <Avatar size="xl" name="XL" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Avatar Variants</Label>
                    <div className="flex items-center gap-4">
                      <Avatar name="Circle" variant="circle" />
                      <Avatar name="Square" variant="square" />
                      <Avatar name="Bordered" bordered />
                      <Avatar name="Glow" bordered glow />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Avatar with Status</Label>
                    <div className="flex items-center gap-4">
                      <Avatar name="Online" status="online" bordered />
                      <Avatar name="Offline" status="offline" bordered />
                      <Avatar name="Away" status="away" bordered />
                      <Avatar name="Busy" status="busy" bordered />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Avatar Group</Label>
                    <AvatarGroup max={4} size="md">
                      <Avatar name="User 1" bordered />
                      <Avatar name="User 2" bordered />
                      <Avatar name="User 3" bordered />
                      <Avatar name="User 4" bordered />
                      <Avatar name="User 5" bordered />
                      <Avatar name="User 6" bordered />
                    </AvatarGroup>
                  </div>
                </div>
              </section>
            )}

            {/* Dividers Section */}
            {activeSection === "dividers" && (
              <section id="dividers" className="space-y-8">
                <div>
                  <SystemBadge>DIVIDERS</SystemBadge>
                  <H2 className="mt-4">Divider Components</H2>
                </div>

                <div className="space-y-8 border border-[#00ff0033] p-8">
                  <div className="space-y-4">
                    <Label>Solid Divider</Label>
                    <Divider variant="solid" />
                  </div>

                  <div className="space-y-4">
                    <Label>Dashed Divider</Label>
                    <Divider variant="dashed" />
                  </div>

                  <div className="space-y-4">
                    <Label>Dotted Divider</Label>
                    <Divider variant="dotted" />
                  </div>

                  <div className="space-y-4">
                    <Label>Gradient Divider</Label>
                    <Divider variant="gradient" />
                  </div>

                  <div className="space-y-4">
                    <Label>Divider with Label</Label>
                    <Divider label="SECTION" />
                  </div>

                  <div className="space-y-4">
                    <Label>Terminal Divider</Label>
                    <TerminalDivider text="// END SECTION" />
                  </div>

                  <div className="space-y-4">
                    <Label>Vertical Divider</Label>
                    <div className="flex items-center h-16 gap-4">
                      <span className="text-white">Left</span>
                      <Divider orientation="vertical" className="h-full" />
                      <span className="text-white">Right</span>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Skeletons Section */}
            {activeSection === "skeletons" && (
              <section id="skeletons" className="space-y-8">
                <div>
                  <SystemBadge>SKELETONS</SystemBadge>
                  <H2 className="mt-4">Skeleton Components</H2>
                </div>

                <div className="space-y-8 border border-[#00ff0033] p-8">
                  <div className="space-y-4">
                    <Label>Text Skeleton</Label>
                    <Skeleton variant="text" width="100%" />
                    <Skeleton variant="text" width="80%" />
                    <Skeleton variant="text" width="60%" />
                  </div>

                  <div className="space-y-4">
                    <Label>Skeleton Variants</Label>
                    <div className="flex items-center gap-4">
                      <Skeleton variant="circular" width={40} height={40} />
                      <Skeleton variant="rectangular" width={100} height={40} />
                      <Skeleton variant="avatar" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Skeleton Text Block</Label>
                    <SkeletonText lines={4} lastLineWidth="40%" />
                  </div>

                  <div className="space-y-4">
                    <Label>Skeleton Card</Label>
                    <div className="grid md:grid-cols-2 gap-6">
                      <SkeletonCard showHeader showAvatar />
                      <SkeletonCard showHeader={false} />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Skeleton with Glow</Label>
                    <Skeleton variant="card" width="100%" height={100} glow />
                  </div>
                </div>
              </section>
            )}

            {/* Spinners Section */}
            {activeSection === "spinners" && (
              <section id="spinners" className="space-y-8">
                <div>
                  <SystemBadge>SPINNERS</SystemBadge>
                  <H2 className="mt-4">Spinner Components</H2>
                </div>

                <div className="space-y-8 border border-[#00ff0033] p-8">
                  <div className="space-y-4">
                    <Label>Spinner Sizes</Label>
                    <div className="flex items-center gap-6">
                      <Spinner size="xs" />
                      <Spinner size="sm" />
                      <Spinner size="md" />
                      <Spinner size="lg" />
                      <Spinner size="xl" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Spinner Variants</Label>
                    <div className="flex items-center gap-8">
                      <div className="text-center">
                        <Spinner variant="default" />
                        <Small className="text-[#999999] mt-2 block">
                          Default
                        </Small>
                      </div>
                      <div className="text-center">
                        <Spinner variant="dots" />
                        <Small className="text-[#999999] mt-2 block">
                          Dots
                        </Small>
                      </div>
                      <div className="text-center">
                        <Spinner variant="pulse" />
                        <Small className="text-[#999999] mt-2 block">
                          Pulse
                        </Small>
                      </div>
                      <div className="text-center">
                        <Spinner variant="terminal" />
                        <Small className="text-[#999999] mt-2 block">
                          Terminal
                        </Small>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Spinner with Label</Label>
                    <div className="flex flex-col gap-4">
                      <Spinner label="Loading..." />
                      <Spinner variant="dots" label="Processing..." />
                      <Spinner
                        variant="terminal"
                        label="Initializing system..."
                      />
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Footer Section */}
            <Footer>
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <Logo text="FIZIKS" icon={<Terminal className="w-5 h-5" />} />
                  <div className="flex gap-4">
                    <Button variant="link" size="sm">
                      Documentation
                    </Button>
                    <Button variant="link" size="sm">
                      GitHub
                    </Button>
                    <Button variant="link" size="sm">
                      Discord
                    </Button>
                  </div>
                </div>
                <div className="border-t border-[#00ff0033] pt-6">
                  <Small className="text-[#666666]">
                    © 2026 Fiziks Design System. Built with React + Tailwind
                    CSS.
                  </Small>
                </div>
              </div>
            </Footer>
          </div>
        </main>
      </div>

      {/* Scroll to top button */}
      <div className="fixed bottom-8 right-8">
        <Button
          variant="primary"
          size="sm"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ChevronRight className="-rotate-90" size={16} />
        </Button>
      </div>
    </div>
  );
}
