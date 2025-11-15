import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { getEndpoints } from "../service/config";
import type { Todo } from "../types";

interface CreateTodoData {
  title: string;
  description?: string;
}

interface UpdateTodoData {
  title?: string;
  description?: string;
  backgroundColor?: string;
  isPinned?: boolean;
  dueDate?: Date | null;
}

// Query Keys
export const todoKeys = {
  all: ["todos"] as const,
  lists: () => [...todoKeys.all, "list"] as const,
  list: (query?: string) => [...todoKeys.lists(), { query }] as const,
  details: () => [...todoKeys.all, "detail"] as const,
  detail: (id: string) => [...todoKeys.details(), id] as const,
};

// Fetch todos
export const useTodos = (searchQuery?: string) => {
  return useQuery({
    queryKey: todoKeys.list(searchQuery),
    queryFn: async () => {
      const endpoints = await getEndpoints();
      const url = searchQuery
        ? `${endpoints.todos}?q=${searchQuery}`
        : endpoints.todos;
      const response = await axios.get(url);
      return response.data.todos as Todo[];
    },
  });
};

// Create todo
export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateTodoData) => {
      const endpoints = await getEndpoints();
      const response = await axios.post(endpoints.todos, data);
      return response.data.todo as Todo;
    },
    onSuccess: () => {
      // Invalidate and refetch todos
      queryClient.invalidateQueries({ queryKey: todoKeys.lists() });
    },
  });
};

// Update todo
export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateTodoData }) => {
      const endpoints = await getEndpoints();
      const response = await axios.patch(`${endpoints.todos}/${id}`, data);
      return response.data.todo as Todo;
    },
    onSuccess: () => {
      // Invalidate and refetch todos
      queryClient.invalidateQueries({ queryKey: todoKeys.lists() });
    },
  });
};

// Delete todo
export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const endpoints = await getEndpoints();
      await axios.delete(`${endpoints.todos}/${id}`);
    },
    onSuccess: () => {
      // Invalidate and refetch todos
      queryClient.invalidateQueries({ queryKey: todoKeys.lists() });
    },
  });
};
