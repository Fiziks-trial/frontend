import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "./IconButton";

const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const SettingsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const meta: Meta<typeof IconButton> = {
  title: "Primitives/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "danger"],
      description: "The visual style of the button",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "The size of the button",
    },
    disabled: {
      control: "boolean",
      description: "Disables the button",
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    icon: <PlusIcon />,
    "aria-label": "Add item",
    variant: "ghost",
  },
};

export const Primary: Story = {
  args: {
    icon: <PlusIcon />,
    "aria-label": "Add item",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    icon: <SettingsIcon />,
    "aria-label": "Settings",
    variant: "secondary",
  },
};

export const Ghost: Story = {
  args: {
    icon: <SettingsIcon />,
    "aria-label": "Settings",
    variant: "ghost",
  },
};

export const Danger: Story = {
  args: {
    icon: <TrashIcon />,
    "aria-label": "Delete",
    variant: "danger",
  },
};

export const Small: Story = {
  args: {
    icon: <PlusIcon />,
    "aria-label": "Add item",
    size: "sm",
    variant: "primary",
  },
};

export const Large: Story = {
  args: {
    icon: <PlusIcon />,
    "aria-label": "Add item",
    size: "lg",
    variant: "primary",
  },
};

export const Disabled: Story = {
  args: {
    icon: <PlusIcon />,
    "aria-label": "Add item",
    variant: "primary",
    disabled: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <IconButton icon={<PlusIcon />} aria-label="Add" variant="primary" />
      <IconButton
        icon={<SettingsIcon />}
        aria-label="Settings"
        variant="secondary"
      />
      <IconButton
        icon={<SettingsIcon />}
        aria-label="Settings"
        variant="ghost"
      />
      <IconButton icon={<TrashIcon />} aria-label="Delete" variant="danger" />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <IconButton
        icon={<PlusIcon />}
        aria-label="Add"
        variant="primary"
        size="sm"
      />
      <IconButton
        icon={<PlusIcon />}
        aria-label="Add"
        variant="primary"
        size="md"
      />
      <IconButton
        icon={<PlusIcon />}
        aria-label="Add"
        variant="primary"
        size="lg"
      />
    </div>
  ),
};
