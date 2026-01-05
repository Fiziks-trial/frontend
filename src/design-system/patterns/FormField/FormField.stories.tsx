import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "../../primitives/Input";
import { FormField } from "./FormField";

const meta: Meta<typeof FormField> = {
  title: "Patterns/FormField",
  component: FormField,
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "The label text",
    },
    error: {
      control: "text",
      description: "Error message to display",
    },
    hint: {
      control: "text",
      description: "Hint text to display",
    },
    required: {
      control: "boolean",
      description: "Whether the field is required",
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  args: {
    label: "Email",
    children: <Input type="email" placeholder="Enter your email" />,
  },
};

export const WithHint: Story = {
  args: {
    label: "Password",
    hint: "Must be at least 8 characters",
    children: <Input type="password" placeholder="Enter password" />,
  },
};

export const WithError: Story = {
  args: {
    label: "Username",
    error: "Username is already taken",
    children: <Input placeholder="Enter username" />,
  },
};

export const Required: Story = {
  args: {
    label: "Email",
    required: true,
    children: <Input type="email" placeholder="Enter your email" />,
  },
};

export const CompleteForm: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <FormField label="Username" required>
        <Input placeholder="Choose a username" />
      </FormField>
      <FormField
        label="Email"
        required
        hint="We'll never share your email with anyone"
      >
        <Input type="email" placeholder="you@example.com" />
      </FormField>
      <FormField label="Password" required hint="At least 8 characters">
        <Input type="password" placeholder="Create a password" />
      </FormField>
      <FormField label="Bio">
        <Input placeholder="Tell us about yourself (optional)" />
      </FormField>
    </div>
  ),
};

export const WithValidationStates: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <FormField label="Valid Field">
        <Input placeholder="This field is valid" />
      </FormField>
      <FormField label="Field with Hint" hint="This is a helpful hint">
        <Input placeholder="Enter something" />
      </FormField>
      <FormField label="Field with Error" error="This field has an error">
        <Input placeholder="Enter something" />
      </FormField>
    </div>
  ),
};
