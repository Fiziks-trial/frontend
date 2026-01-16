/**
 * API Types - Matches backend DTOs
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
  subject: {
    name: string;
    slug: string;
    icon: string | null;
  };
}

// Match types
export type MatchStatus = "in_progress" | "completed" | "cancelled";

export interface MatchSubject {
  id: string;
  name: string;
  icon: string | null;
}

export interface MatchPlayer {
  id: string;
  username: string;
  score: number;
  ratingBefore: number;
  ratingAfter: number;
  ratingChange: number;
}

export interface Match {
  id: string;
  status: MatchStatus;
  subject: MatchSubject;
  player1: MatchPlayer;
  player2: MatchPlayer;
  winnerId: string | null;
  createdAt: string;
  startedAt: string;
  endedAt: string | null;
}

// Match history types (from /users/:id/matches endpoint)
export interface HistoryPlayer {
  score: number;
  ratingBefore: number;
  ratingAfter: number;
  ratingChange: number;
}

export interface HistoryOpponent {
  id: string;
  username: string;
  score: number;
}

export interface MatchHistoryItem {
  id: string;
  subject: MatchSubject;
  player: HistoryPlayer;
  opponent: HistoryOpponent;
  result: "win" | "loss" | "draw";
  createdAt: string;
  endedAt: string | null;
}

export interface MatchHistoryResponse {
  matches: MatchHistoryItem[];
}
