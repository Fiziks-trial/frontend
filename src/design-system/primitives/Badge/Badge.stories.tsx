import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Primitives/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "warning", "error", "purple"],
      description: "The visual style of the badge",
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

export const ErrorBadge: Story = {
  args: {
    children: "Failed",
    variant: "error",
  },
};

export const Purple: Story = {
  args: {
    children: "New",
    variant: "purple",
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
      <Badge variant="purple">Purple</Badge>
    </div>
  ),
};

// Real World Examples
export const StatusBadges: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-(--color-text-secondary)">Match Status:</span>
        <Badge variant="success">Live</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-(--color-text-secondary)">Match Status:</span>
        <Badge variant="warning">Starting Soon</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-(--color-text-secondary)">Match Status:</span>
        <Badge variant="error">Ended</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-(--color-text-secondary)">Match Status:</span>
        <Badge variant="default">Scheduled</Badge>
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
      <Badge variant="purple">Mechanics</Badge>
      <Badge variant="purple">Thermodynamics</Badge>
      <Badge variant="purple">Electromagnetism</Badge>
      <Badge variant="purple">Quantum Physics</Badge>
      <Badge variant="purple">Optics</Badge>
    </div>
  ),
};
