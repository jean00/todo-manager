import { Grid, Stack, Typography } from "@mui/material";
import TodoCard from "./components/TodoCard/TodoCard";
import { useEffect } from "react";
import { todosService } from "../../service/todosService";
import { useTodosStore } from "../../store/todos/store";
import { grey } from "@mui/material/colors";

const TodoList = () => {
  const { getTodos, deleteTodo, updateTodo } = todosService();
  const { todos } = useTodosStore();

  const { pinnedTodos, unpinnedTodos } = todos.reduce(
    (acc, todo) => {
      if (todo.isPinned) acc.pinnedTodos.push(todo);
      else acc.unpinnedTodos.push(todo);

      return acc;
    },
    { pinnedTodos: [] as typeof todos, unpinnedTodos: [] as typeof todos }
  );

  const getData = async () => {
    try {
      await getTodos();
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  };

  const onDelete = async (id: string) => {
    try {
      await deleteTodo(id);
      await getData();
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  const onUpdate = async (
    id: string,
    edited: {
      title?: string;
      description?: string;
      backgroundColor?: string;
      isPinned?: boolean;
    }
  ) => {
    try {
      await updateTodo(id, edited);
      await getData();
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Stack spacing={2}>
      {todos.length === 0 && (
        <Typography variant="h6" align="center" color={grey[500]}>
          No todos found. Create a todo
        </Typography>
      )}
      {pinnedTodos.length > 0 && (
        <Typography color={grey[500]}>Pinned Todos</Typography>
      )}
      <Grid
        container
        spacing={2}
        columns={{
          xs: 1,
          sm: 2,
          md: 4,
          lg: 6,
        }}
      >
        {pinnedTodos.map((todo) => (
          <Grid size={1} key={todo._id}>
            <TodoCard {...todo} onDelete={onDelete} onUpdate={onUpdate} />
          </Grid>
        ))}
      </Grid>
      {unpinnedTodos.length > 0 && pinnedTodos.length > 0 && (
        <Typography color={grey[500]}>Others</Typography>
      )}
      <Grid
        container
        spacing={2}
        columns={{
          xs: 1,
          sm: 2,
          md: 4,
          lg: 6,
        }}
      >
        {unpinnedTodos.map((todo) => (
          <Grid size={1} key={todo._id}>
            <TodoCard {...todo} onDelete={onDelete} onUpdate={onUpdate} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default TodoList;
