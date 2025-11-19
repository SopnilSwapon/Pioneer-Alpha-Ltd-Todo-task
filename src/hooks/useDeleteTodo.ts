import { useMutation, useQueryClient } from "@tanstack/react-query";
import Fetch from "@/shared/lib/Fetch";
import { QK_ALL_TODOS } from "./useAllTask";

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      return Fetch({
        method: "DELETE",
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/todos/${id}/`,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QK_ALL_TODOS] });
    },
  });
}
