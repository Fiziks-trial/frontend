import type { Meta, StoryObj } from "@storybook/react";
import { Stack } from "./Stack";

const meta: Meta<typeof Stack> = {
  title: "Layouts/Stack",
  component: Stack,
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "The direction of the stack",
    },
    spacing: {
      control: "select",
      options: ["none", "xs", "sm", "md", "lg", "xl"],
      description: "The spacing between items",
    },
    align: {
      control: "select",
      options: ["start", "center", "end", "stretch"],
      description: "The alignment of items",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Stack>;

const Box = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-[var(--color-primary-600)] text-white px-4 py-2 rounded">
    {children}
  </div>
);

export const Default: Story = {
  args: {
    direction: "vertical",
    spacing: "md",
    children: (
      <>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
      </>
    ),
  },
};

export const Vertical: Story = {
  args: {
    direction: "vertical",
    spacing: "md",
    children: (
      <>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
      </>
    ),
  },
};

export const Horizontal: Story = {
  args: {
    direction: "horizontal",
    spacing: "md",
    children: (
      <>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
      </>
    ),
  },
};

export const SpacingVariants: Story = {
  render: () => (
    <div className="space-y-8">
      {(["none", "xs", "sm", "md", "lg", "xl"] as const).map((spacing) => (
        <div key={spacing}>
          <p className="text-[var(--color-text-muted)] text-sm mb-2">
            spacing=&quot;{spacing}&quot;
          </p>
          <Stack direction="horizontal" spacing={spacing}>
            <Box>A</Box>
            <Box>B</Box>
            <Box>C</Box>
          </Stack>
        </div>
      ))}
    </div>
  ),
};

export const AlignmentVariants: Story = {
  render: () => (
    <div className="space-y-8">
      {(["start", "center", "end", "stretch"] as const).map((align) => (
        <div key={align}>
          <p className="text-[var(--color-text-muted)] text-sm mb-2">
            align=&quot;{align}&quot;
          </p>
          <Stack direction="horizontal" spacing="md" align={align}>
            <div className="bg-[var(--color-primary-600)] text-white px-4 py-2 rounded">
              Short
            </div>
            <div className="bg-[var(--color-primary-600)] text-white px-4 py-6 rounded">
              Tall
            </div>
            <div className="bg-[var(--color-primary-600)] text-white px-4 py-4 rounded">
              Medium
            </div>
          </Stack>
        </div>
      ))}
    </div>
  ),
};

export const NestedStacks: Story = {
  render: () => (
    <Stack direction="vertical" spacing="lg">
      <Stack direction="horizontal" spacing="md">
        <Box>Row 1 - A</Box>
        <Box>Row 1 - B</Box>
      </Stack>
      <Stack direction="horizontal" spacing="md">
        <Box>Row 2 - A</Box>
        <Box>Row 2 - B</Box>
        <Box>Row 2 - C</Box>
      </Stack>
    </Stack>
  ),
};
