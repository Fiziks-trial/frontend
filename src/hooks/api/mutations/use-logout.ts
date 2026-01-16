import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api/client";

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await api.logout();
    },
    onSuccess: () => {
      queryClient.clear();
    },
  });
}
