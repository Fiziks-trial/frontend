import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Primitives/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "The size of the avatar",
    },
    name: {
      control: "text",
      description: "Name for generating initials",
    },
    src: {
      control: "text",
      description: "Image source URL",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

// Default story (with initials)
export const Default: Story = {
  args: {
    name: "John Doe",
    size: "md",
  },
};

// With Image
export const WithImage: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    name: "John Doe",
    size: "md",
  },
};

// Sizes
export const ExtraSmall: Story = {
  args: {
    name: "Alice",
    size: "xs",
  },
};

export const Small: Story = {
  args: {
    name: "Bob",
    size: "sm",
  },
};

export const Medium: Story = {
  args: {
    name: "Charlie",
    size: "md",
  },
};

export const Large: Story = {
  args: {
    name: "Diana",
    size: "lg",
  },
};

export const ExtraLarge: Story = {
  args: {
    name: "Edward",
    size: "xl",
  },
};

// Initials Examples
export const SingleName: Story = {
  args: {
    name: "Alice",
    size: "md",
  },
};

export const FullName: Story = {
  args: {
    name: "John Smith",
    size: "md",
  },
};

export const ThreeNames: Story = {
  args: {
    name: "Mary Jane Watson",
    size: "md",
  },
};

// All Sizes Showcase
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="xs" name="User 1" />
      <Avatar size="sm" name="User 2" />
      <Avatar size="md" name="User 3" />
      <Avatar size="lg" name="User 4" />
      <Avatar size="xl" name="User 5" />
    </div>
  ),
};

// Color Variations (generated from names)
export const ColorVariations: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Avatar name="Alice" />
      <Avatar name="Bob" />
      <Avatar name="Charlie" />
      <Avatar name="Diana" />
      <Avatar name="Edward" />
      <Avatar name="Frank" />
      <Avatar name="Grace" />
      <Avatar name="Henry" />
    </div>
  ),
};

// Avatar Group Example
export const AvatarGroup: Story = {
  render: () => (
    <div className="flex -space-x-2">
      <Avatar
        size="sm"
        name="User 1"
        className="ring-2 ring-[var(--color-bg-primary)]"
      />
      <Avatar
        size="sm"
        name="User 2"
        className="ring-2 ring-[var(--color-bg-primary)]"
      />
      <Avatar
        size="sm"
        name="User 3"
        className="ring-2 ring-[var(--color-bg-primary)]"
      />
      <Avatar
        size="sm"
        name="User 4"
        className="ring-2 ring-[var(--color-bg-primary)]"
      />
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-neutral-700)] text-sm font-medium ring-2 ring-[var(--color-bg-primary)]">
        +5
      </div>
    </div>
  ),
};

// With Fallback
export const WithBrokenImage: Story = {
  args: {
    src: "https://broken-image-url.jpg",
    name: "Fallback User",
    size: "lg",
  },
};

// Player Card Example
export const PlayerCard: Story = {
  render: () => (
    <div className="flex items-center gap-3 p-4 bg-[var(--color-bg-card)] rounded-lg">
      <Avatar size="lg" name="Alex Johnson" />
      <div>
        <p className="font-semibold text-[var(--color-text-primary)]">
          Alex Johnson
        </p>
        <p className="text-sm text-[var(--color-text-muted)]">
          Score: 2,450 pts
        </p>
      </div>
    </div>
  ),
};

// Leaderboard Example
export const Leaderboard: Story = {
  render: () => (
    <div className="space-y-2">
      {[
        { rank: 1, name: "Alice Champion", score: 3200 },
        { rank: 2, name: "Bob Runner", score: 2850 },
        { rank: 3, name: "Charlie Third", score: 2600 },
        { rank: 4, name: "Diana Fourth", score: 2400 },
        { rank: 5, name: "Edward Fifth", score: 2200 },
      ].map((player) => (
        <div
          key={player.rank}
          className="flex items-center gap-3 p-3 bg-[var(--color-bg-card)] rounded-lg"
        >
          <span className="w-6 text-center font-bold text-[var(--color-text-muted)]">
            {player.rank}
          </span>
          <Avatar size="sm" name={player.name} />
          <span className="flex-1 text-[var(--color-text-primary)]">
            {player.name}
          </span>
          <span className="font-semibold text-[var(--color-primary-400)]">
            {player.score.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  ),
};
