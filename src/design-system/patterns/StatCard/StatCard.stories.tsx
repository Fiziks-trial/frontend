import type { Meta, StoryObj } from "@storybook/react";
import { StatCard } from "./StatCard";

const TrophyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
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

const FlameIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
);

const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const TargetIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const meta: Meta<typeof StatCard> = {
  title: "Patterns/StatCard",
  component: StatCard,
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "The label text",
    },
    value: {
      control: "text",
      description: "The value to display",
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatCard>;

export const Default: Story = {
  args: {
    label: "Total Matches",
    value: 142,
  },
};

export const WithIcon: Story = {
  args: {
    label: "Win Rate",
    value: "67%",
    icon: <TrophyIcon />,
  },
};

export const WithIncrease: Story = {
  args: {
    label: "ELO Rating",
    value: 1420,
    change: {
      value: "+45 this week",
      type: "increase",
    },
    icon: <StarIcon />,
  },
};

export const WithDecrease: Story = {
  args: {
    label: "Rank",
    value: "#156",
    change: {
      value: "-12 from yesterday",
      type: "decrease",
    },
    icon: <TargetIcon />,
  },
};

export const WithNeutralChange: Story = {
  args: {
    label: "Win Streak",
    value: 5,
    change: {
      value: "Same as last week",
      type: "neutral",
    },
    icon: <FlameIcon />,
  },
};

export const StatsGrid: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 max-w-2xl">
      <StatCard
        label="Total Matches"
        value={142}
        change={{ value: "+12 this week", type: "increase" }}
        icon={<TargetIcon />}
      />
      <StatCard
        label="Win Rate"
        value="67%"
        change={{ value: "+5%", type: "increase" }}
        icon={<TrophyIcon />}
      />
      <StatCard
        label="Current Streak"
        value={5}
        change={{ value: "Best: 12", type: "neutral" }}
        icon={<FlameIcon />}
      />
      <StatCard
        label="ELO Rating"
        value={1420}
        change={{ value: "-15 today", type: "decrease" }}
        icon={<StarIcon />}
      />
    </div>
  ),
};

export const CompactStats: Story = {
  render: () => (
    <div className="flex gap-4">
      <StatCard label="Wins" value={95} />
      <StatCard label="Losses" value={47} />
      <StatCard label="Draws" value={8} />
    </div>
  ),
};
