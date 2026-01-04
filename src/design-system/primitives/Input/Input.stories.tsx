import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Primitives/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "The size of the input",
    },
    label: {
      control: "text",
      description: "Label text for the input",
    },
    error: {
      control: "text",
      description: "Error message to display",
    },
    hint: {
      control: "text",
      description: "Hint text to display",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    disabled: {
      control: "boolean",
      description: "Disables the input",
    },
    fullWidth: {
      control: "boolean",
      description: "Makes the input full width",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// Default story
export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

// With Label
export const WithLabel: Story = {
  args: {
    label: "Email Address",
    placeholder: "you@example.com",
    type: "email",
  },
};

// With Hint
export const WithHint: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "••••••••",
    hint: "Must be at least 8 characters",
  },
};

// With Error
export const WithError: Story = {
  args: {
    label: "Username",
    placeholder: "username",
    error: "This username is already taken",
    defaultValue: "johndoe",
  },
};

// Sizes
export const Small: Story = {
  args: {
    size: "sm",
    placeholder: "Small input",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
    placeholder: "Medium input",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    placeholder: "Large input",
  },
};

// Disabled
export const Disabled: Story = {
  args: {
    label: "Disabled Input",
    placeholder: "Cannot edit this",
    disabled: true,
    defaultValue: "Disabled value",
  },
};

// With Icons
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const WithLeftIcon: Story = {
  args: {
    placeholder: "Search...",
    leftIcon: <SearchIcon />,
  },
};

export const WithRightIcon: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "••••••••",
    rightIcon: <EyeIcon />,
  },
};

export const EmailWithIcon: Story = {
  args: {
    label: "Email",
    type: "email",
    placeholder: "you@example.com",
    leftIcon: <MailIcon />,
  },
};

// Full Width
export const FullWidth: Story = {
  args: {
    label: "Full Name",
    placeholder: "Enter your full name",
    fullWidth: true,
  },
};

// Form Example
export const FormExample: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        leftIcon={<MailIcon />}
        fullWidth
      />
      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        hint="Must be at least 8 characters"
        rightIcon={<EyeIcon />}
        fullWidth
      />
      <Input
        label="Confirm Password"
        type="password"
        placeholder="••••••••"
        fullWidth
      />
    </div>
  ),
};

// All Sizes Showcase
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <Input size="sm" placeholder="Small input" label="Small" fullWidth />
      <Input size="md" placeholder="Medium input" label="Medium" fullWidth />
      <Input size="lg" placeholder="Large input" label="Large" fullWidth />
    </div>
  ),
};
