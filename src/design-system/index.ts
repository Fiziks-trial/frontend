// Primitives - Basic building blocks
export {
  Button,
  Card,
  Badge,
  Text,
  Input,
  Avatar,
  AvatarGroup,
  ProgressBar,
  ProgressRing,
  Divider,
  IconButton,
  Spinner,
  Checkbox,
  Label,
  Switch,
  Textarea,
  Link,
  Alert,
  Tooltip,
  ToggleGroup,
  type ButtonProps,
  type CardProps,
  type BadgeProps,
  type TextProps,
  type InputProps,
  type AvatarProps,
  type AvatarGroupProps,
  type ProgressBarProps,
  type ProgressRingProps,
  type DividerProps,
  type IconButtonProps,
  type SpinnerProps,
  type CheckboxProps,
  type LabelProps,
  type SwitchProps,
  type TextareaProps,
  type LinkProps,
  type AlertProps,
  type TooltipProps,
  type ToggleGroupProps,
  type ToggleOption,
} from "./primitives";

// Patterns - Composed, domain-specific components
export {
  SidebarItem,
  SubjectRating,
  StatCard,
  TimelineNode,
  MobileTimelineNode,
  SectionHeader,
  PageHeader,
  EmptyState,
  // Match & Game patterns
  MatchCard,
  HeroBanner,
  SearchingState,
  QuickMatchBanner,
  SubjectSelectionCard,
  GameModeButton,
  UserRankCard,
  RecentOpponentItem,
  // Auth patterns
  AuthLayout,
  OAuthButton,
  AuthPanelContent,
  // Dashboard patterns
  DashboardLayout,
  DashboardSidebar,
  DashboardPageHeader,
  // Types
  type SidebarItemProps,
  type SubjectRatingProps,
  type StatCardProps,
  type TimelineNodeProps,
  type SectionHeaderProps,
  type PageHeaderProps,
  type EmptyStateProps,
  type MatchCardProps,
  type HeroBannerProps,
  type SearchingStateProps,
  type QuickMatchBannerProps,
  type SubjectSelectionCardProps,
  type GameModeButtonProps,
  type UserRankCardProps,
  type RecentOpponentItemProps,
  type AuthLayoutProps,
  type OAuthButtonProps,
  type AuthPanelContentProps,
  type AuthPanelQuote,
  type DashboardLayoutProps,
  type DashboardPageHeaderProps,
} from "./patterns";

// Layouts - Structural components
export {
  Container,
  Stack,
  Grid,
  SidebarLayout,
  SidebarTrigger,
  useSidebar,
  type ContainerProps,
  type StackProps,
  type GridProps,
  type SidebarLayoutProps,
} from "./layouts";

// Effects - Decorative background elements
export {
  CloudBackground,
  GradientBlob,
  type CloudBackgroundProps,
  type GradientBlobProps,
} from "./effects";

// Navigation - Nav components
export {
  NavLink,
  FloatingNavbar,
  type NavLinkProps,
  type FloatingNavbarProps,
} from "./navigation";

// Marketing - Landing page components
export {
  // Mockups
  WindowMockup,
  FloatingCard,
  MockupCard,
  CardWithOverlay,
  // Cards
  ProblemCard,
  FeatureCard,
  SocialCard,
  // List Items
  TaskItem,
  FeatureItem,
  FeatureRow,
  // Footer
  FooterColumn,
  SocialIcon,
  // Typography
  SectionLabel,
  DisplayHeading,
  DisplayHeadingMuted,
  // Leaderboard
  LeaderboardRow,
  // Buttons
  PillButton,
  // Types
  type WindowMockupProps,
  type FloatingCardProps,
  type MockupCardProps,
  type CardWithOverlayProps,
  type OverlayItem,
  type ProblemCardProps,
  type FeatureCardProps,
  type SocialCardProps,
  type TaskItemProps,
  type FeatureItemProps,
  type FeatureRowProps,
  type FooterColumnProps,
  type FooterLink,
  type SocialIconProps,
  type SectionLabelProps,
  type DisplayHeadingProps,
  type DisplayHeadingMutedProps,
  type LeaderboardRowProps,
  type PillButtonProps,
} from "./marketing";

// Constants - Shared configuration
export {
  SUBJECTS,
  SUBJECT_LIST,
  type Subject,
  type SubjectConfig,
} from "./constants";
