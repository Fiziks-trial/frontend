import type { Meta, StoryObj } from "@storybook/react";
import { Container } from "./Container";

const meta: Meta<typeof Container> = {
  title: "Layouts/Container",
  component: Container,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "full"],
      description: "The maximum width of the container",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Container>;

const DemoContent = () => (
  <div className="bg-[var(--color-bg-card)] p-4 rounded-lg text-[var(--color-text-primary)]">
    Container content goes here. This demonstrates the max-width and padding of
    the container.
  </div>
);

export const Default: Story = {
  args: {
    size: "lg",
    children: <DemoContent />,
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    children: <DemoContent />,
  },
};

export const Medium: Story = {
  args: {
    size: "md",
    children: <DemoContent />,
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    children: <DemoContent />,
  },
};

export const ExtraLarge: Story = {
  args: {
    size: "xl",
    children: <DemoContent />,
  },
};

export const Full: Story = {
  args: {
    size: "full",
    children: <DemoContent />,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-8">
      {(["sm", "md", "lg", "xl", "full"] as const).map((size) => (
        <div key={size}>
          <p className="text-[var(--color-text-muted)] text-sm mb-2">{size}</p>
          <Container size={size}>
            <div className="bg-[var(--color-bg-card)] p-4 rounded-lg text-[var(--color-text-primary)]">
              Container with size=&quot;{size}&quot;
            </div>
          </Container>
        </div>
      ))}
    </div>
  ),
};
