import axios from "axios";
import { getEndpoints } from "./config";
import { useTodosStore } from "../store/todos/store";

export const todosService = () => {
  const { setTodos } = useTodosStore();

  const getTodos = async () => {
    const endpoints = await getEndpoints();
    const res = await axios.get(endpoints.todos);
    if (res.data) setTodos(res.data.todos);
  };

  const deleteTodo = async (todoId: string) => {
    const endpoints = await getEndpoints();
    await axios.delete(`${endpoints.todos}/${todoId}`);
  };

  const updateTodo = async (
    todoId: string,
    data: { title?: string; description?: string }
  ) => {
    const endpoints = await getEndpoints();
    const res = await axios.patch(`${endpoints.todos}/${todoId}`, data);
    return res.data;
  };

  return {
    getTodos,
    deleteTodo,
    updateTodo,
  };
};
