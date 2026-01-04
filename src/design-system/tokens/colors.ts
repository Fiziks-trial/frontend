// Color Tokens
// All color-related design tokens

export const colors = {
  primary: {
    50: "var(--color-primary-50)",
    100: "var(--color-primary-100)",
    200: "var(--color-primary-200)",
    300: "var(--color-primary-300)",
    400: "var(--color-primary-400)",
    500: "var(--color-primary-500)",
    600: "var(--color-primary-600)",
    700: "var(--color-primary-700)",
    800: "var(--color-primary-800)",
    900: "var(--color-primary-900)",
  },
  secondary: {
    50: "var(--color-secondary-50)",
    100: "var(--color-secondary-100)",
    200: "var(--color-secondary-200)",
    300: "var(--color-secondary-300)",
    400: "var(--color-secondary-400)",
    500: "var(--color-secondary-500)",
    600: "var(--color-secondary-600)",
    700: "var(--color-secondary-700)",
    800: "var(--color-secondary-800)",
    900: "var(--color-secondary-900)",
  },
  neutral: {
    50: "var(--color-neutral-50)",
    100: "var(--color-neutral-100)",
    200: "var(--color-neutral-200)",
    300: "var(--color-neutral-300)",
    400: "var(--color-neutral-400)",
    500: "var(--color-neutral-500)",
    600: "var(--color-neutral-600)",
    700: "var(--color-neutral-700)",
    800: "var(--color-neutral-800)",
    900: "var(--color-neutral-900)",
    950: "var(--color-neutral-950)",
  },
  success: {
    500: "var(--color-success-500)",
    600: "var(--color-success-600)",
  },
  warning: {
    500: "var(--color-warning-500)",
    600: "var(--color-warning-600)",
  },
  error: {
    500: "var(--color-error-500)",
    600: "var(--color-error-600)",
  },
  info: {
    500: "var(--color-info-500)",
    600: "var(--color-info-600)",
  },
} as const;

export const bgColors = {
  primary: "var(--color-bg-primary)",
  secondary: "var(--color-bg-secondary)",
  card: "var(--color-bg-card)",
  elevated: "var(--color-bg-elevated)",
  overlay: "var(--color-bg-overlay)",
} as const;

export const textColors = {
  primary: "var(--color-text-primary)",
  secondary: "var(--color-text-secondary)",
  muted: "var(--color-text-muted)",
  inverse: "var(--color-text-inverse)",
} as const;

export const borderColors = {
  default: "var(--color-border-default)",
  muted: "var(--color-border-muted)",
  focus: "var(--color-border-focus)",
} as const;
