/**
 * API Types - Matches backend schema
 */

// User types
export interface User {
  id: string;
  email: string;
  name: string | null;
  avatar: string | null;
  provider: string;
  username: string | null;
  xp: number;
  totalMatches: number;
  wins: number;
  losses: number;
  draws: number;
  createdAt: string;
  updatedAt: string;
}

export interface PublicProfile {
  id: string;
  username: string | null;
  avatar: string | null;
  xp: number;
  totalMatches: number;
  wins: number;
  losses: number;
  draws: number;
  createdAt: string;
}

// Subject types
export interface Subject {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  description: string | null;
  isActive: boolean;
  defaultTimeLimit: number;
  createdAt: string;
  updatedAt: string;
}

// User subject stats (per-subject ELO and stats)
export interface UserSubjectStats {
  id: string;
  userId: string;
  subjectId: string;
  elo: number;
  matches: number;
  wins: number;
  losses: number;
  draws: number;
  currentStreak: number;
  maxStreak: number;
  lastPlayedAt: string | null;
  createdAt: string;
}

// Match types
export type MatchStatus = 'in_progress' | 'completed' | 'cancelled';

export interface Match {
  id: string;
  subjectId: string;
  status: MatchStatus;
  winnerId: string | null;
  createdAt: string;
  startedAt: string;
  endedAt: string | null;
}

export interface MatchParticipant {
  id: string;
  matchId: string;
  userId: string;
  score: number;
  correctAnswers: number;
  ratingBefore: number;
  ratingAfter: number;
  ratingChange: number;
  xpEarned: number;
  joinedAt: string;
}

// Match history with details (for profile display)
export interface MatchHistoryItem {
  match: Match;
  participant: MatchParticipant;
  opponent: {
    id: string;
    username: string | null;
    avatar: string | null;
  } | null;
  subject: {
    name: string;
    slug: string;
    icon: string | null;
  };
  result: 'win' | 'loss' | 'draw';
}

// Profile with stats (combined response)
export interface ProfileWithStats {
  user: PublicProfile;
  subjectStats: (UserSubjectStats & {
    subject: {
      name: string;
      slug: string;
      icon: string | null;
    };
  })[];
  recentMatches: MatchHistoryItem[];
}

// Leaderboard types
export interface LeaderboardEntry {
  rank: number;
  user: {
    id: string;
    username: string | null;
    avatar: string | null;
  };
  value: number; // xp, wins, or elo depending on leaderboard type
}

export interface GlobalLeaderboard {
  type: 'xp' | 'wins';
  entries: LeaderboardEntry[];
}

export interface SubjectLeaderboard {
  subjectId: string;
  subjectName: string;
  entries: LeaderboardEntry[];
}
