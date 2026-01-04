import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./Card";
import { Button } from "../Button";
import { Badge } from "../Badge";

const meta: Meta<typeof Card> = {
  title: "Primitives/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "elevated", "outlined"],
      description: "The visual style of the card",
    },
    padding: {
      control: "select",
      options: ["none", "sm", "md", "lg"],
      description: "The padding inside the card",
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
    padding: "md",
  },
};

// Variants
export const Elevated: Story = {
  args: {
    children: "This is an elevated card with a shadow.",
    variant: "elevated",
  },
};

export const Outlined: Story = {
  args: {
    children: "This is an outlined card with a border.",
    variant: "outlined",
  },
};

// With sub-components
export const WithHeaderAndFooter: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
      </CardHeader>
      <CardContent>
        This is the main content of the card. It can contain any type of content
        including text, images, or other components.
      </CardContent>
      <CardFooter>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            Cancel
          </Button>
          <Button size="sm">Save</Button>
        </div>
      </CardFooter>
    </Card>
  ),
};

// Quiz Card Example
export const QuizCard: Story = {
  render: () => (
    <Card variant="elevated" className="max-w-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Physics Quiz</CardTitle>
          <Badge variant="info">10 Questions</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          Test your knowledge of classical mechanics and thermodynamics.
        </p>
        <div className="flex items-center gap-2 text-sm text-(--color-text-muted)">
          <span>⏱ 15 minutes</span>
          <span>•</span>
          <span>🎯 Medium</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button fullWidth>Start Quiz</Button>
      </CardFooter>
    </Card>
  ),
};

// Stats Card Example
export const StatsCard: Story = {
  render: () => (
    <Card className="max-w-xs">
      <div className="text-center">
        <p className="text-sm text-(--color-text-muted) mb-1">Total Score</p>
        <p className="text-4xl font-bold text-(--color-primary-400)">2,450</p>
        <p className="text-sm text-(--color-success-500) mt-2">
          ↑ 12% from last week
        </p>
      </div>
    </Card>
  ),
};

// All Variants Showcase
export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <Card variant="default">
        <CardTitle>Default</CardTitle>
        <CardContent>Default card variant</CardContent>
      </Card>
      <Card variant="elevated">
        <CardTitle>Elevated</CardTitle>
        <CardContent>Elevated with shadow</CardContent>
      </Card>
      <Card variant="outlined">
        <CardTitle>Outlined</CardTitle>
        <CardContent>Outlined with border</CardContent>
      </Card>
    </div>
  ),
};
