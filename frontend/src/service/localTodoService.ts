// service/localTodoService.ts
export interface LocalTodo {
  id: string;
  title: string;
  description?: string;
  backgroundColor?: string;
  isPinned?: boolean;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = "guest_todos";

/**
 * Get all todos from localStorage
 */
export const getLocalTodos = (): LocalTodo[] => {
  try {
    const todos = localStorage.getItem(STORAGE_KEY);
    return todos ? JSON.parse(todos) : [];
  } catch (error) {
    console.error("Error reading todos from localStorage:", error);
    return [];
  }
};

/**
 * Save a new todo to localStorage
 */
export const createLocalTodo = (
  todo: Omit<LocalTodo, "id" | "createdAt" | "updatedAt">
): LocalTodo => {
  const todos = getLocalTodos();
  const now = new Date().toISOString();

  const newTodo: LocalTodo = {
    ...todo,
    id: `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    createdAt: now,
    updatedAt: now,
  };

  todos.push(newTodo);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));

  return newTodo;
};

/**
 * Update an existing todo in localStorage
 */
export const updateLocalTodo = (
  id: string,
  updates: Partial<LocalTodo>
): LocalTodo | null => {
  const todos = getLocalTodos();
  const index = todos.findIndex((t) => t.id === id);

  if (index === -1) return null;

  const updatedTodo: LocalTodo = {
    ...todos[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  todos[index] = updatedTodo;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));

  return updatedTodo;
};

/**
 * Delete a todo from localStorage
 */
export const deleteLocalTodo = (id: string): boolean => {
  const todos = getLocalTodos();
  const filteredTodos = todos.filter((t) => t.id !== id);

  if (filteredTodos.length === todos.length) return false;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredTodos));
  return true;
};

/**
 * Search todos in localStorage
 */
export const searchLocalTodos = (query: string): LocalTodo[] => {
  const todos = getLocalTodos();
  const lowerQuery = query.toLowerCase();

  return todos.filter(
    (todo) =>
      todo.title.toLowerCase().includes(lowerQuery) ||
      (todo.description && todo.description.toLowerCase().includes(lowerQuery))
  );
};

/**
 * Clear all local todos (useful when user logs in)
 */
export const clearLocalTodos = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
