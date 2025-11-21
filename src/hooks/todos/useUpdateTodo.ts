import { useMutation } from "@tanstack/react-query";
import Fetch from "@/shared/lib/Fetch";

export interface IUpdateTodoPayload {
  id: number;
  title: string;
  description: string;
  priority: string;
  todo_date: string;
}

export function useUpdateTodo() {
  return useMutation({
    mutationFn: async (data: IUpdateTodoPayload) => {
      const { id, ...payload } = data;
      return Fetch({
        method: "PATCH",
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/todos/${id}/`,
        body: payload,
      });
    },
  });
}
