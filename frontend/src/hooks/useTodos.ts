import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { getEndpoints } from "../service/config";
import type { Todo } from "../types";
import { useSessionToken } from "./useSessionToken";
import {
  getLocalTodos,
  createLocalTodo,
  updateLocalTodo,
  deleteLocalTodo,
  searchLocalTodos,
  type LocalTodo,
} from "../service/localTodoService";

// Configure axios to include credentials
axios.defaults.withCredentials = true;

// Helper to get auth headers
const getAuthHeaders = () => {
  const token = sessionStorage.getItem("googleToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Helper to check if user is authenticated
const isUserAuthenticated = (): boolean => {
  const token = sessionStorage.getItem("googleToken");
  return !!token;
};

// Convert LocalTodo to Todo type
const localTodoToTodo = (localTodo: LocalTodo): Todo => {
  return {
    _id: localTodo.id,
    title: localTodo.title,
    description: localTodo.description,
    backgroundColor: localTodo.backgroundColor,
    isPinned: localTodo.isPinned,
    dueDate: localTodo.dueDate,
  } as Todo;
};

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
      // Check if user is authenticated
      if (!isUserAuthenticated()) {
        // Use local storage for guest users
        const localTodos = searchQuery
          ? searchLocalTodos(searchQuery)
          : getLocalTodos();
        return localTodos.map(localTodoToTodo);
      }

      // Use backend API for authenticated users
      const endpoints = await getEndpoints();
      const url = searchQuery
        ? `${endpoints.todos}?q=${searchQuery}`
        : endpoints.todos;
      const response = await axios.get(url, {
        headers: getAuthHeaders(),
      });
      return response.data.todos as Todo[];
    },
  });
};

// Create todo
export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateTodoData) => {
      // Check if user is authenticated
      if (!isUserAuthenticated()) {
        // Use local storage for guest users
        const localTodo = createLocalTodo(data);
        return localTodoToTodo(localTodo);
      }

      // Use backend API for authenticated users
      const endpoints = await getEndpoints();
      const response = await axios.post(endpoints.todos, data, {
        headers: getAuthHeaders(),
      });
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
      // Check if user is authenticated
      if (!isUserAuthenticated()) {
        // Use local storage for guest users
        const updated = updateLocalTodo(id, data as any);
        if (!updated) throw new Error("Todo not found");
        return localTodoToTodo(updated);
      }

      // Use backend API for authenticated users
      const endpoints = await getEndpoints();
      const response = await axios.patch(`${endpoints.todos}/${id}`, data, {
        headers: getAuthHeaders(),
      });
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
      // Check if user is authenticated
      if (!isUserAuthenticated()) {
        // Use local storage for guest users
        const deleted = deleteLocalTodo(id);
        if (!deleted) throw new Error("Todo not found");
        return;
      }

      // Use backend API for authenticated users
      const endpoints = await getEndpoints();
      await axios.delete(`${endpoints.todos}/${id}`, {
        headers: getAuthHeaders(),
      });
    },
    onSuccess: () => {
      // Invalidate and refetch todos
      queryClient.invalidateQueries({ queryKey: todoKeys.lists() });
    },
  });
};
