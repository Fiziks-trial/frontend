# Fiziks Frontend

Next.js frontend for the Fiziks real-time competitive physics quiz battle game.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4
- **Linting**: Biome
- **Auth**: JWT with refresh tokens
- **State**: React Context
- **Design System**: Custom primitives with Storybook

## Getting Started

```bash
# Install dependencies
bun install

# Run in development
bun dev

# Build for production
bun run build
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Auth callback handling
│   ├── sign-in/           # Sign in page
│   ├── sign-up/           # Sign up page
│   └── design-system/     # Design system showcase page
├── components/             # React components
│   ├── modals/            # Modal dialogs
│   ├── panels/            # Control panels
│   ├── animation/         # Animation/canvas utilities
│   └── ProjectileApp.tsx  # Physics game component
├── design-system/          # Design system components
│   ├── primitives/        # Base components
│   │   ├── Button/
│   │   ├── IconButton/
│   │   ├── Input/
│   │   ├── Badge/
│   │   ├── Avatar/
│   │   ├── Text/
│   │   └── Spinner/
│   └── patterns/          # Composed components
│       ├── Card/
│       ├── FormField/
│       ├── StatCard/
│       ├── EmptyState/
│       └── Grid/
├── hooks/                  # Custom React hooks
├── lib/                    # Core utilities
│   ├── api.ts             # API client
│   ├── types.ts           # TypeScript types
│   └── auth-context.tsx   # Auth state management
├── styles/                 # Global styles
└── utils/                  # Helper functions
```

## API Client

The API client (`src/lib/api.ts`) provides typed methods for all backend endpoints:

### Authentication
```typescript
api.getMe()                    // Get current user
api.logout()                   // Logout and clear tokens
```

### User Profiles
```typescript
api.getProfile(userId)         // Get user profile with stats
api.getProfileByUsername(username) // Get profile by username
api.updateProfile({ username, name }) // Update current user
```

### Subjects
```typescript
api.getSubjects()              // Get all active subjects
api.getSubject(slug)           // Get subject by slug
```

### Leaderboards
```typescript
api.getGlobalLeaderboard('wins', 50)  // Global leaderboard
api.getSubjectLeaderboard(subjectId)  // Subject-specific leaderboard
```

### Match History
```typescript
api.getMatchHistory(userId, limit, offset) // User's match history
```

## Types

All API types are defined in `src/lib/types.ts`:

| Type | Description |
|------|-------------|
| `User` | Full user object with stats |
| `PublicProfile` | Public-facing user profile |
| `Subject` | Game subject (Physics, etc.) |
| `UserSubjectStats` | Per-subject ELO and stats |
| `Match` | Match record |
| `MatchParticipant` | User's participation in a match |
| `MatchHistoryItem` | Match with opponent and result |
| `ProfileWithStats` | Combined profile response |
| `LeaderboardEntry` | Single leaderboard row |

## Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## Design System

The frontend includes a comprehensive design system built with Tailwind CSS. Components are organized into primitives (basic building blocks) and patterns (composed components).

### Running Storybook

```bash
bun run storybook
```

Open [http://localhost:6006](http://localhost:6006) to explore components.

### Primitives

| Component | Description |
|-----------|-------------|
| `Button` | Primary, secondary, outline, ghost, danger variants |
| `IconButton` | Icon-only button with all variants |
| `Input` | Text input with label, error, hint, icons |
| `Badge` | Status badges (success, warning, error, info) |
| `Avatar` | User avatar with image or initials fallback |
| `Text` | Typography with variants (h1-h4, body, caption) |
| `Spinner` | Loading indicator (sm, md, lg sizes) |

### Patterns

| Component | Description |
|-----------|-------------|
| `Card` | Container with header, body, footer slots |
| `FormField` | Label + input + error/hint wrapper |
| `StatCard` | Stat display with icon and trend indicator |
| `EmptyState` | Empty state with icon, title, description, action |
| `Grid` | Responsive grid layout |

### Usage Example

```tsx
import { Button } from '@/design-system/primitives/Button';
import { Input } from '@/design-system/primitives/Input';
import { Card } from '@/design-system/patterns/Card';

function LoginForm() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Sign In</Card.Title>
      </Card.Header>
      <Card.Body className="space-y-4">
        <Input label="Email" type="email" placeholder="you@example.com" />
        <Input label="Password" type="password" />
        <Button variant="primary" fullWidth>Sign In</Button>
      </Card.Body>
    </Card>
  );
}
```

### Design Tokens

The design system uses CSS custom properties for consistent theming:

```css
--color-primary-500: #8b5cf6
--color-secondary-500: #06b6d4
--color-success-500: #22c55e
--color-warning-500: #f59e0b
--color-error-500: #ef4444
--color-bg-primary: #0a0a0f
--color-bg-card: #16213e
--color-text-primary: #fafafa
--color-text-secondary: #a1a1aa
```

## Scripts

| Script | Description |
|--------|-------------|
| `bun dev` | Start development server |
| `bun run build` | Build for production |
| `bun run lint` | Run Biome linter |
| `bun run lint:fix` | Auto-fix lint issues |
| `bun run storybook` | Start Storybook |
| `bun run build-storybook` | Build Storybook for deployment |

## Features

### Implemented
- OAuth authentication (Google, GitHub)
- Token refresh flow
- Physics simulation game
- Design system with Storybook

### Planned
- User profile pages
- Per-subject ELO ratings
- Match history display
- Global and subject leaderboards
- Real-time matchmaking
- Live competitive matches
