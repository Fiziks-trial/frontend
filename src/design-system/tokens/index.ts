// Design Tokens - Main Export
// Re-exports all token modules

// Responsive
export { breakpoints } from "./breakpoints";
// Colors
export { bgColors, borderColors, colors, textColors } from "./colors";
export { radii } from "./radii";
// Effects
export { shadows } from "./shadows";
// Layout & Spacing
export { spacing } from "./spacing";
export { transitions } from "./transitions";
// Typography
export { typography } from "./typography";
// Layering
export { zIndex } from "./zIndex";

import { breakpoints } from "./breakpoints";
// Combined tokens object for convenience
import { bgColors, borderColors, colors, textColors } from "./colors";
import { radii } from "./radii";
import { shadows } from "./shadows";
import { spacing } from "./spacing";
import { transitions } from "./transitions";
import { typography } from "./typography";
import { zIndex } from "./zIndex";

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
