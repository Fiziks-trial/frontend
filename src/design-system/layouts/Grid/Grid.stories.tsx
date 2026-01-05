import type { Meta, StoryObj } from "@storybook/react";
import { Grid } from "./Grid";

const meta: Meta<typeof Grid> = {
  title: "Layouts/Grid",
  component: Grid,
  tags: ["autodocs"],
  argTypes: {
    cols: {
      control: "select",
      options: [1, 2, 3, 4, 5, 6, 12],
      description: "The number of columns",
    },
    gap: {
      control: "select",
      options: ["none", "sm", "md", "lg"],
      description: "The gap between grid items",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Grid>;

const Box = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-default)] p-4 rounded-lg text-[var(--color-text-primary)] text-center">
    {children}
  </div>
);

export const Default: Story = {
  args: {
    cols: 3,
    gap: "md",
    children: (
      <>
        <Box>1</Box>
        <Box>2</Box>
        <Box>3</Box>
        <Box>4</Box>
        <Box>5</Box>
        <Box>6</Box>
      </>
    ),
  },
};

export const TwoColumns: Story = {
  args: {
    cols: 2,
    gap: "md",
    children: (
      <>
        <Box>1</Box>
        <Box>2</Box>
        <Box>3</Box>
        <Box>4</Box>
      </>
    ),
  },
};

export const ThreeColumns: Story = {
  args: {
    cols: 3,
    gap: "md",
    children: (
      <>
        <Box>1</Box>
        <Box>2</Box>
        <Box>3</Box>
        <Box>4</Box>
        <Box>5</Box>
        <Box>6</Box>
      </>
    ),
  },
};

export const FourColumns: Story = {
  args: {
    cols: 4,
    gap: "md",
    children: (
      <>
        <Box>1</Box>
        <Box>2</Box>
        <Box>3</Box>
        <Box>4</Box>
      </>
    ),
  },
};

export const GapVariants: Story = {
  render: () => (
    <div className="space-y-8">
      {(["none", "sm", "md", "lg"] as const).map((gap) => (
        <div key={gap}>
          <p className="text-[var(--color-text-muted)] text-sm mb-2">
            gap=&quot;{gap}&quot;
          </p>
          <Grid cols={4} gap={gap}>
            <Box>1</Box>
            <Box>2</Box>
            <Box>3</Box>
            <Box>4</Box>
          </Grid>
        </div>
      ))}
    </div>
  ),
};

export const CardGrid: Story = {
  render: () => (
    <Grid cols={3} gap="md">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="bg-[var(--color-bg-card)] p-6 rounded-xl space-y-2"
        >
          <div className="w-full h-24 bg-[var(--color-neutral-700)] rounded-lg" />
          <h3 className="text-[var(--color-text-primary)] font-medium">
            Card {i}
          </h3>
          <p className="text-[var(--color-text-secondary)] text-sm">
            Card description goes here
          </p>
        </div>
      ))}
    </Grid>
  ),
};
