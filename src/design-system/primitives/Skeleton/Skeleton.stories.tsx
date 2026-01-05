import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Primitives/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["text", "circular", "rectangular"],
      description: "The shape variant of the skeleton",
    },
    width: {
      control: "text",
      description: "Custom width",
    },
    height: {
      control: "text",
      description: "Custom height",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {
    variant: "text",
    width: "200px",
  },
};

export const Text: Story = {
  args: {
    variant: "text",
    width: "100%",
  },
};

export const Circular: Story = {
  args: {
    variant: "circular",
    width: 48,
    height: 48,
  },
};

export const Rectangular: Story = {
  args: {
    variant: "rectangular",
    width: "100%",
    height: 200,
  },
};

export const TextBlock: Story = {
  render: () => (
    <div className="space-y-2 w-64">
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="60%" />
    </div>
  ),
};

export const CardSkeleton: Story = {
  render: () => (
    <div className="p-4 rounded-xl bg-[var(--color-bg-card)] w-72 space-y-4">
      <Skeleton variant="rectangular" width="100%" height={120} />
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="60%" />
      <div className="flex items-center gap-3">
        <Skeleton variant="circular" width={40} height={40} />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" width="70%" />
          <Skeleton variant="text" width="40%" />
        </div>
      </div>
    </div>
  ),
};

export const ProfileSkeleton: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Skeleton variant="circular" width={64} height={64} />
      <div className="space-y-2">
        <Skeleton variant="text" width={150} height={20} />
        <Skeleton variant="text" width={100} height={16} />
      </div>
    </div>
  ),
};
