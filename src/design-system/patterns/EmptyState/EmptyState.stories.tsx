import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../../primitives/Button";
import { EmptyState } from "./EmptyState";

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const InboxIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
    <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
  </svg>
);

const TrophyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

const meta: Meta<typeof EmptyState> = {
  title: "Patterns/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "The title text",
    },
    description: {
      control: "text",
      description: "The description text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    title: "No items found",
    description: "There are no items to display at the moment.",
  },
};

export const WithIcon: Story = {
  args: {
    icon: <SearchIcon />,
    title: "No results found",
    description:
      "Try adjusting your search or filter to find what you're looking for.",
  },
};

export const WithAction: Story = {
  args: {
    icon: <InboxIcon />,
    title: "No messages",
    description: "You don't have any messages yet. Start a conversation!",
    action: <Button variant="primary">Send Message</Button>,
  },
};

export const NoMatches: Story = {
  args: {
    icon: <TrophyIcon />,
    title: "No matches yet",
    description:
      "You haven't played any matches yet. Start a battle to see your match history here!",
    action: <Button variant="primary">Find Match</Button>,
  },
};

export const SearchEmpty: Story = {
  args: {
    icon: <SearchIcon />,
    title: "No results for 'physics quantum'",
    description: "Try different keywords or check your spelling.",
    action: <Button variant="outline">Clear Search</Button>,
  },
};

export const Showcase: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8">
      <div className="bg-(--color-bg-card) rounded-xl">
        <EmptyState
          icon={<SearchIcon />}
          title="No results"
          description="Try a different search term"
        />
      </div>
      <div className="bg-(--color-bg-card) rounded-xl">
        <EmptyState
          icon={<InboxIcon />}
          title="Inbox empty"
          description="No new notifications"
          action={<Button size="sm">Refresh</Button>}
        />
      </div>
    </div>
  ),
};
