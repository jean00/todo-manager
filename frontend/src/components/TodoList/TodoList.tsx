import { CircularProgress, Grid, Stack, Typography } from "@mui/material";
import TodoCard from "./components/TodoCard/TodoCard";
import { grey } from "@mui/material/colors";
import { useTodos, useDeleteTodo, useUpdateTodo } from "../../hooks/useTodos";
import { useCrossStore } from "../../store/cross/store";
import { useMemo } from "react";

const TodoList = () => {
  const { searchQuery, setToastConfig } = useCrossStore();
  const {
    data: todos = [],
    isLoading,
    error,
  } = useTodos(searchQuery || undefined);
  const deleteTodoMutation = useDeleteTodo();
  const updateTodoMutation = useUpdateTodo();

  const { pinnedTodos, unpinnedTodos } = useMemo(() => {
    return todos.reduce(
      (acc, todo) => {
        if (todo.isPinned) acc.pinnedTodos.push(todo);
        else acc.unpinnedTodos.push(todo);
        return acc;
      },
      { pinnedTodos: [] as typeof todos, unpinnedTodos: [] as typeof todos }
    );
  }, [todos]);

  const onDelete = async (id: string) => {
    try {
      await deleteTodoMutation.mutateAsync(id);
      setToastConfig({
        open: true,
        message: "Todo deleted successfully",
        severity: "success",
        title: "Success",
      });
    } catch (error) {
      console.error("Failed to delete todo:", error);
      setToastConfig({
        open: true,
        message: "Failed to delete todo",
        severity: "error",
        title: "Error",
      });
    }
  };

  const onUpdate = async (
    id: string,
    edited: {
      title?: string;
      description?: string;
      backgroundColor?: string;
      isPinned?: boolean;
      dueDate?: Date | null;
    }
  ) => {
    try {
      await updateTodoMutation.mutateAsync({ id, data: edited });
      setToastConfig({
        open: true,
        message: "Todo updated successfully",
        severity: "success",
        title: "Success",
      });
    } catch (error) {
      console.error("Failed to update todo:", error);
      setToastConfig({
        open: true,
        message: "Failed to update todo",
        severity: "error",
        title: "Error",
      });
    }
  };

  if (isLoading) {
    return (
      <Stack alignItems="center" justifyContent="center" sx={{ mt: 4 }}>
        <CircularProgress />
      </Stack>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" align="center" color="error" sx={{ mt: 4 }}>
        Error loading todos. Please try again.
      </Typography>
    );
  }

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
