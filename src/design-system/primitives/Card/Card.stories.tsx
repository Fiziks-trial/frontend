import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "../Badge";
import { Button } from "../Button";
import { Card } from "./Card";

const meta: Meta<typeof Card> = {
  title: "Primitives/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "bordered", "glow"],
      description: "The visual style of the card",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

// Default story
export const Default: Story = {
  args: {
    children: "This is a card with some content.",
    variant: "default",
  },
};

// Variants
export const Bordered: Story = {
  args: {
    children: "This is a bordered card with a visible border.",
    variant: "bordered",
  },
};

export const Glow: Story = {
  args: {
    children: "This is a glow card with a neon shadow effect.",
    variant: "glow",
  },
};

// Quiz Card Example
export const QuizCard: Story = {
  render: () => (
    <Card variant="bordered" className="max-w-sm">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">Physics Quiz</h3>
          <Badge variant="purple">10 Questions</Badge>
        </div>
        <p className="text-[#999999]">
          Test your knowledge of classical mechanics and thermodynamics.
        </p>
        <div className="flex items-center gap-2 text-sm text-[#666666]">
          <span>15 minutes</span>
          <span>•</span>
          <span>Medium</span>
        </div>
        <Button variant="primary" className="w-full">
          Start Quiz
        </Button>
      </div>
    </Card>
  ),
};

// Stats Card Example
export const StatsCard: Story = {
  render: () => (
    <Card variant="glow" className="max-w-xs">
      <div className="text-center">
        <p className="text-sm text-[#999999] mb-1">Total Score</p>
        <p className="text-4xl font-bold text-[#00ff00]">2,450</p>
        <p className="text-sm text-[#00ff00] mt-2">+12% from last week</p>
      </div>
    </Card>
  ),
};

// All Variants Showcase
export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <Card variant="default">
        <h4 className="text-white mb-2">Default</h4>
        <p className="text-[#999999]">Default card variant</p>
      </Card>
      <Card variant="bordered">
        <h4 className="text-white mb-2">Bordered</h4>
        <p className="text-[#999999]">Bordered with visible border</p>
      </Card>
      <Card variant="glow">
        <h4 className="text-white mb-2">Glow</h4>
        <p className="text-[#999999]">Glow with neon shadow</p>
      </Card>
    </div>
  ),
};
