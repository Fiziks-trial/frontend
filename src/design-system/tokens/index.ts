// Design Tokens - Main Export
// Re-exports all token modules

// Colors
export { colors, bgColors, textColors, borderColors } from "./colors";

// Layout & Spacing
export { spacing } from "./spacing";
export { radii } from "./radii";

// Typography
export { typography } from "./typography";

// Effects
export { shadows } from "./shadows";
export { transitions } from "./transitions";

// Layering
export { zIndex } from "./zIndex";

// Responsive
export { breakpoints } from "./breakpoints";

// Combined tokens object for convenience
import { colors, bgColors, textColors, borderColors } from "./colors";
import { spacing } from "./spacing";
import { radii } from "./radii";
import { typography } from "./typography";
import { shadows } from "./shadows";
import { transitions } from "./transitions";
import { zIndex } from "./zIndex";
import { breakpoints } from "./breakpoints";

export const tokens = {
  colors,
  bgColors,
  textColors,
  borderColors,
  spacing,
  radii,
  typography,
  shadows,
  transitions,
  zIndex,
  breakpoints,
} as const;
