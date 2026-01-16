import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api/client";
import { queryKeys } from "../keys";

export function useCurrentUser() {
  return useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: async () => {
      const { data, error } = await api.getMe();
      if (error || !data) throw new Error(error ?? "Failed to fetch user");
      return data;
    },
    enabled: !!api.getAccessToken(),
    staleTime: 5 * 60 * 1000,
  });
}
