import { useMutation, useQueryClient } from "@tanstack/react-query";
import Fetch from "@/shared/lib/Fetch";
import { QK_ALL_TODOS } from "./useAllTask";

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      return Fetch({
        method: "DELETE",
        url: `https://todo-app.pioneeralpha.com/api/todos/${id}/`,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QK_ALL_TODOS] });
    },
  });
}
