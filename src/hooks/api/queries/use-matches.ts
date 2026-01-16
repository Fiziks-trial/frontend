import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api/client";
import { queryKeys } from "../keys";

export function useMatch(matchId: string) {
  return useQuery({
    queryKey: queryKeys.matches.detail(matchId),
    queryFn: async () => {
      const { data, error } = await api.getMatch(matchId);
      if (error) throw new Error(error);
      return data;
    },
    enabled: !!matchId,
  });
}
