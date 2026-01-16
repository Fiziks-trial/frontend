export const queryKeys = {
  auth: {
    me: ["auth", "me"] as const,
  },
  users: {
    all: ["users"] as const,
    profile: (id: string) => ["users", id, "profile"] as const,
    profileByUsername: (username: string) =>
      ["users", "username", username] as const,
    stats: (id: string) => ["users", id, "stats"] as const,
    matches: (id: string, limit?: number, offset?: number) =>
      ["users", id, "matches", { limit, offset }] as const,
  },
  subjects: {
    all: ["subjects"] as const,
    detail: (slug: string) => ["subjects", slug] as const,
  },
  matches: {
    detail: (id: string) => ["matches", id] as const,
  },
};
