import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api/client";
import { queryKeys } from "../keys";

export function useSubjects() {
  return useQuery({
    queryKey: queryKeys.subjects.all,
    queryFn: async () => {
      const { data, error } = await api.getSubjects();
      if (error || !data) throw new Error(error ?? "Failed to fetch subjects");
      return data;
    },
    staleTime: 10 * 60 * 1000,
  });
}

export function useSubject(slug: string) {
  return useQuery({
    queryKey: queryKeys.subjects.detail(slug),
    queryFn: async () => {
      const { data, error } = await api.getSubject(slug);
      if (error || !data) throw new Error(error ?? "Failed to fetch subject");
      return data;
    },
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
  });
}
