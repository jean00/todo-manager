import axios from "axios";
import { getEndpoints } from "./config";
import { useTodosStore } from "../store/todos/store";

// Configure axios to include credentials (cookies) with every request
axios.defaults.withCredentials = true;

export const todosService = () => {
  const { setTodos } = useTodosStore();

  // Get auth token from sessionStorage for Bearer token
  const getAuthHeaders = () => {
    const token = sessionStorage.getItem("googleToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const getTodos = async () => {
    const endpoints = await getEndpoints();
    const res = await axios.get(endpoints.todos, {
      headers: getAuthHeaders(),
    });
    if (res.data) setTodos(res.data.todos);
  };

  const deleteTodo = async (todoId: string) => {
    const endpoints = await getEndpoints();
    await axios.delete(`${endpoints.todos}/${todoId}`, {
      headers: getAuthHeaders(),
    });
  };

  const updateTodo = async (
    todoId: string,
    data: { title?: string; description?: string; backgroundColor?: string }
  ) => {
    const endpoints = await getEndpoints();
    await axios.patch(`${endpoints.todos}/${todoId}`, data, {
      headers: getAuthHeaders(),
    });
  };

  const createTodo = async (title: string, description?: string) => {
    const endpoints = await getEndpoints();
    const body = { title, description };
    console.log({ body });
    await axios.post(endpoints.todos, body, {
      headers: getAuthHeaders(),
    });
  };

  const getTodo = async (query: string) => {
    const endpoints = await getEndpoints();
    const res = await axios.get(`${endpoints.todos}?q=${query}`, {
      headers: getAuthHeaders(),
    });
    if (res.data) setTodos(res.data.todos);
  };

  return {
    getTodos,
    deleteTodo,
    updateTodo,
    createTodo,
    getTodo,
  };
};
