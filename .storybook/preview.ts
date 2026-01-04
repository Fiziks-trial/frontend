import type { Preview } from "@storybook/react";
import "../src/styles/globals.css";
import "../src/design-system/tokens/design-tokens.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#1a1a2e" },
        { name: "card", value: "#16213e" },
        { name: "light", value: "#ffffff" },
      ],
    },
  },
};

export default preview;
