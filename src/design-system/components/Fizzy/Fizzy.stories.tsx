import type { Meta, StoryObj } from "@storybook/react";
import { Fizzy } from "./Fizzy";

const meta: Meta<typeof Fizzy> = {
  title: "Components/Fizzy",
  component: Fizzy,
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#0a0a0f" }],
    },
  },
  argTypes: {
    state: {
      control: "select",
      options: [
        "idle",
        "thinking",
        "correct",
        "wrong",
        "celebrate",
        "encourage",
        "hint",
        "excited",
      ],
      description: "The current emotional/action state of Fizzy",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "The size of Fizzy",
    },
    minimized: {
      control: "boolean",
      description: "Show Fizzy in minimized form (corner dot)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Fizzy>;

export const Default: Story = {
  args: {
    state: "idle",
    size: "md",
  },
};

export const Idle: Story = {
  args: {
    state: "idle",
    size: "lg",
  },
};

export const Thinking: Story = {
  args: {
    state: "thinking",
    size: "lg",
  },
};

export const Correct: Story = {
  args: {
    state: "correct",
    size: "lg",
  },
};

export const Wrong: Story = {
  args: {
    state: "wrong",
    size: "lg",
  },
};

export const Celebrate: Story = {
  args: {
    state: "celebrate",
    size: "lg",
  },
};

export const Encourage: Story = {
  args: {
    state: "encourage",
    size: "lg",
  },
};

export const Hint: Story = {
  args: {
    state: "hint",
    size: "lg",
  },
};

export const Excited: Story = {
  args: {
    state: "excited",
    size: "lg",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-8">
      <div className="text-center">
        <Fizzy size="sm" />
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">Small</p>
      </div>
      <div className="text-center">
        <Fizzy size="md" />
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">Medium</p>
      </div>
      <div className="text-center">
        <Fizzy size="lg" />
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">Large</p>
      </div>
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-8">
      <div className="text-center">
        <Fizzy state="idle" size="md" />
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">Idle</p>
      </div>
      <div className="text-center">
        <Fizzy state="thinking" size="md" />
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">Thinking</p>
      </div>
      <div className="text-center">
        <Fizzy state="correct" size="md" />
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">Correct</p>
      </div>
      <div className="text-center">
        <Fizzy state="wrong" size="md" />
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">Wrong</p>
      </div>
      <div className="text-center">
        <Fizzy state="celebrate" size="md" />
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">Celebrate</p>
      </div>
      <div className="text-center">
        <Fizzy state="encourage" size="md" />
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">Encourage</p>
      </div>
      <div className="text-center">
        <Fizzy state="hint" size="md" />
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">Hint</p>
      </div>
      <div className="text-center">
        <Fizzy state="excited" size="md" />
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">Excited</p>
      </div>
    </div>
  ),
};

export const Minimized: Story = {
  args: {
    minimized: true,
  },
  parameters: {
    layout: "fullscreen",
  },
};

export const WithMessage: Story = {
  render: () => (
    <div className="flex items-center gap-4 p-6 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border-default)]">
      <Fizzy state="hint" size="md" />
      <div>
        <p className="text-[var(--color-text-primary)] font-medium">
          Need a hint?
        </p>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Remember: kinetic energy = 1/2 mv^2
        </p>
      </div>
    </div>
  ),
};

export const CorrectAnswer: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4 p-8 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-success-500)]/30">
      <Fizzy state="correct" size="lg" />
      <div className="text-center">
        <p className="text-xl font-bold text-[var(--color-success-500)]">
          Correct!
        </p>
        <p className="text-sm text-[var(--color-text-secondary)]">
          +15 XP earned
        </p>
      </div>
    </div>
  ),
};

export const WrongAnswer: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4 p-8 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-error-500)]/30">
      <Fizzy state="wrong" size="lg" />
      <div className="text-center">
        <p className="text-xl font-bold text-[var(--color-error-500)]">
          Not quite!
        </p>
        <p className="text-sm text-[var(--color-text-secondary)]">
          The correct answer was 42 m/s
        </p>
      </div>
    </div>
  ),
};
