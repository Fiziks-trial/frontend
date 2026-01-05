import type { Meta, StoryObj } from "@storybook/react";
import { Divider } from "./Divider";

const meta: Meta<typeof Divider> = {
  title: "Primitives/Divider",
  component: Divider,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "The orientation of the divider",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  args: {
    orientation: "horizontal",
  },
};

export const Horizontal: Story = {
  render: () => (
    <div className="w-full">
      <p className="text-[var(--color-text-primary)] mb-4">Content above</p>
      <Divider orientation="horizontal" />
      <p className="text-[var(--color-text-primary)] mt-4">Content below</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex items-center h-16">
      <span className="text-[var(--color-text-primary)] px-4">Left</span>
      <Divider orientation="vertical" />
      <span className="text-[var(--color-text-primary)] px-4">Right</span>
    </div>
  ),
};

export const InList: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-[var(--color-text-primary)]">Item 1</div>
      <Divider />
      <div className="text-[var(--color-text-primary)]">Item 2</div>
      <Divider />
      <div className="text-[var(--color-text-primary)]">Item 3</div>
    </div>
  ),
};
