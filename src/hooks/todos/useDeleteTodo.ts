import { useMutation } from "@tanstack/react-query";
import Fetch from "@/shared/lib/Fetch";

export function useDeleteTodo() {
  return useMutation({
    mutationFn: async (id: number) => {
      return Fetch({
        method: "DELETE",
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/todos/${id}/`,
      });
    },
  });
}
