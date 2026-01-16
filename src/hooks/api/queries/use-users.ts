import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api/client";
import { queryKeys } from "../keys";

export function usePublicProfile(userId: string) {
  return useQuery({
    queryKey: queryKeys.users.profile(userId),
    queryFn: async () => {
      const { data, error } = await api.getPublicProfile(userId);
      if (error || !data) throw new Error(error ?? "Failed to fetch profile");
      return data;
    },
    enabled: !!userId,
  });
}

export function usePublicProfileByUsername(username: string) {
  return useQuery({
    queryKey: queryKeys.users.profileByUsername(username),
    queryFn: async () => {
      const { data, error } = await api.getPublicProfileByUsername(username);
      if (error || !data) throw new Error(error ?? "Failed to fetch profile");
      return data;
    },
    enabled: !!username,
  });
}

export function useUserStats(userId: string) {
  return useQuery({
    queryKey: queryKeys.users.stats(userId),
    queryFn: async () => {
      const { data, error } = await api.getUserStats(userId);
      if (error || !data) throw new Error(error ?? "Failed to fetch stats");
      return data;
    },
    enabled: !!userId,
  });
}

export function useUserMatches(userId: string, limit = 20, offset = 0) {
  return useQuery({
    queryKey: queryKeys.users.matches(userId, limit, offset),
    queryFn: async () => {
      const { data, error } = await api.getMatchHistory(userId, limit, offset);
      if (error || !data) throw new Error(error ?? "Failed to fetch matches");
      return data;
    },
    enabled: !!userId,
  });
}
