import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Primitives/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "warning", "error", "info", "outline"],
      description: "The visual style of the badge",
    },
    size: {
      control: "select",
      options: ["sm", "md"],
      description: "The size of the badge",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

// Default story
export const Default: Story = {
  args: {
    children: "Badge",
    variant: "default",
  },
};

// Variants
export const Success: Story = {
  args: {
    children: "Completed",
    variant: "success",
  },
};

export const Warning: Story = {
  args: {
    children: "Pending",
    variant: "warning",
  },
};

export const Error: Story = {
  args: {
    children: "Failed",
    variant: "error",
  },
};

export const Info: Story = {
  args: {
    children: "New",
    variant: "info",
  },
};

export const Outline: Story = {
  args: {
    children: "Draft",
    variant: "outline",
  },
};

// Sizes
export const Small: Story = {
  args: {
    children: "Small",
    size: "sm",
  },
};

export const Medium: Story = {
  args: {
    children: "Medium",
    size: "md",
  },
};

// All Variants Showcase
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};

// Real World Examples
export const StatusBadges: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-[var(--color-text-secondary)]">Match Status:</span>
        <Badge variant="success">Live</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[var(--color-text-secondary)]">Match Status:</span>
        <Badge variant="warning">Starting Soon</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[var(--color-text-secondary)]">Match Status:</span>
        <Badge variant="error">Ended</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[var(--color-text-secondary)]">Match Status:</span>
        <Badge variant="outline">Scheduled</Badge>
      </div>
    </div>
  ),
};

export const DifficultyBadges: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge variant="success">Easy</Badge>
      <Badge variant="warning">Medium</Badge>
      <Badge variant="error">Hard</Badge>
    </div>
  ),
};

export const CategoryBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="info">Mechanics</Badge>
      <Badge variant="info">Thermodynamics</Badge>
      <Badge variant="info">Electromagnetism</Badge>
      <Badge variant="info">Quantum Physics</Badge>
      <Badge variant="info">Optics</Badge>
    </div>
  ),
};
