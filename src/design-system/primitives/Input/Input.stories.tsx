import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Primitives/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Label text for the input",
    },
    error: {
      control: "text",
      description: "Error message to display",
    },
    helperText: {
      control: "text",
      description: "Helper text to display",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    disabled: {
      control: "boolean",
      description: "Disables the input",
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

// With Helper Text
export const WithHelperText: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "Enter password",
    helperText: "Must be at least 8 characters",
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

// Disabled
export const Disabled: Story = {
  args: {
    label: "Disabled Input",
    placeholder: "Cannot edit this",
    disabled: true,
    defaultValue: "Disabled value",
  },
};

// Form Example
export const FormExample: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <Input label="Email" type="email" placeholder="you@example.com" />
      <Input
        label="Password"
        type="password"
        placeholder="Enter password"
        helperText="Must be at least 8 characters"
      />
      <Input
        label="Confirm Password"
        type="password"
        placeholder="Confirm password"
      />
    </div>
  ),
};

// Input Types Showcase
export const InputTypes: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <Input label="Text" type="text" placeholder="Enter text" />
      <Input label="Email" type="email" placeholder="email@example.com" />
      <Input label="Password" type="password" placeholder="Enter password" />
      <Input label="Number" type="number" placeholder="Enter number" />
    </div>
  ),
};
