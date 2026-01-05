import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "./Text";

const meta: Meta<typeof Text> = {
  title: "Primitives/Text",
  component: Text,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "body",
        "bodySmall",
        "caption",
        "label",
      ],
      description: "The text variant/size",
    },
    color: {
      control: "select",
      options: ["primary", "secondary", "muted", "success", "error", "warning"],
      description: "The text color",
    },
    weight: {
      control: "select",
      options: ["normal", "medium", "semibold", "bold"],
      description: "The font weight",
    },
    truncate: {
      control: "boolean",
      description: "Truncate text with ellipsis",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

// Default story
export const Default: Story = {
  args: {
    children: "This is body text.",
    variant: "body",
  },
};

// Headings
export const Heading1: Story = {
  args: {
    children: "Heading 1",
    variant: "h1",
  },
};

export const Heading2: Story = {
  args: {
    children: "Heading 2",
    variant: "h2",
  },
};

export const Heading3: Story = {
  args: {
    children: "Heading 3",
    variant: "h3",
  },
};

export const Heading4: Story = {
  args: {
    children: "Heading 4",
    variant: "h4",
  },
};

// Body Text
export const Body: Story = {
  args: {
    children: "This is regular body text used for main content.",
    variant: "body",
  },
};

export const BodySmall: Story = {
  args: {
    children: "This is smaller body text for less prominent content.",
    variant: "bodySmall",
  },
};

export const Caption: Story = {
  args: {
    children: "This is caption text for metadata or timestamps.",
    variant: "caption",
  },
};

export const Label: Story = {
  args: {
    children: "Form Label",
    variant: "label",
  },
};

// Colors
export const Primary: Story = {
  args: {
    children: "Primary colored text",
    color: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary colored text",
    color: "secondary",
  },
};

export const Muted: Story = {
  args: {
    children: "Muted colored text",
    color: "muted",
  },
};

export const Success: Story = {
  args: {
    children: "Success message",
    color: "success",
  },
};

export const ErrorText: Story = {
  args: {
    children: "Error message",
    color: "error",
  },
};

export const Warning: Story = {
  args: {
    children: "Warning message",
    color: "warning",
  },
};

// Truncate
export const Truncated: Story = {
  args: {
    children:
      "This is a very long text that will be truncated with an ellipsis when it overflows its container.",
    truncate: true,
  },
  decorators: [
    (Story) => (
      <div className="max-w-xs">
        <Story />
      </div>
    ),
  ],
};

// Typography Scale
export const TypographyScale: Story = {
  render: () => (
    <div className="space-y-4">
      <Text variant="h1">Heading 1 - The quick brown fox</Text>
      <Text variant="h2">Heading 2 - The quick brown fox</Text>
      <Text variant="h3">Heading 3 - The quick brown fox</Text>
      <Text variant="h4">Heading 4 - The quick brown fox</Text>
      <Text variant="body">
        Body - The quick brown fox jumps over the lazy dog.
      </Text>
      <Text variant="bodySmall">
        Body Small - The quick brown fox jumps over the lazy dog.
      </Text>
      <Text variant="caption">
        Caption - The quick brown fox jumps over the lazy dog.
      </Text>
      <Text variant="label">Label - Form Field Label</Text>
    </div>
  ),
};

// Color Scale
export const ColorScale: Story = {
  render: () => (
    <div className="space-y-2">
      <Text color="primary">Primary - Main text color</Text>
      <Text color="secondary">Secondary - Less emphasis</Text>
      <Text color="muted">Muted - Subtle text</Text>
      <Text color="success">Success - Positive feedback</Text>
      <Text color="error">Error - Negative feedback</Text>
      <Text color="warning">Warning - Caution message</Text>
    </div>
  ),
};

// Real World Example
export const RealWorldExample: Story = {
  render: () => (
    <div className="max-w-lg space-y-4">
      <Text variant="h2">Welcome to Fiziks!</Text>
      <Text variant="body" color="secondary">
        Challenge your friends in real-time physics quiz battles. Test your
        knowledge across various topics and climb the leaderboard.
      </Text>
      <div className="flex items-center gap-2">
        <Text variant="caption" color="muted">
          Last updated: 5 minutes ago
        </Text>
        <Text variant="caption" color="muted">
          •
        </Text>
        <Text variant="caption" color="success">
          Online
        </Text>
      </div>
    </div>
  ),
};
