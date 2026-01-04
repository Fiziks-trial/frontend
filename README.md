# ScienceDuel Frontend

Next.js frontend for the ScienceDuel real-time competitive learning platform.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Auth**: JWT with refresh tokens
- **State**: React Context

## Getting Started

```bash
# Install dependencies
pnpm install

# Run in development
pnpm dev

# Build for production
pnpm build
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── auth/           # Auth callback handling
│   ├── sign-in/        # Sign in page
│   └── sign-up/        # Sign up page
├── components/          # React components
│   ├── modals/         # Modal dialogs
│   └── animation/      # Animation components
├── hooks/               # Custom React hooks
├── lib/                 # Core utilities
│   ├── api.ts          # API client
│   ├── types.ts        # TypeScript types
│   └── auth-context.tsx # Auth state management
├── styles/              # Global styles
└── utils/               # Helper functions
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

## Features

### Implemented
- OAuth authentication (Google, GitHub)
- Token refresh flow
- Physics simulation game

### Planned
- User profile pages
- Per-subject ELO ratings
- Match history display
- Global and subject leaderboards
- Real-time matchmaking
- Live competitive matches
