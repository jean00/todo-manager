import { Grid } from "@mui/material";
import TodoCard from "./components/TodoCard/TodoCard";
import { useEffect } from "react";
import { todosService } from "../../service/todosService";
import { useTodosStore } from "../../store/todos/store";

const TodoList = () => {
  const { getTodos } = todosService();
  const { todos } = useTodosStore();

  const getData = async () => {
    try {
      await getTodos();
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Grid
      container
      spacing={2}
      columns={{
        xs: 1,
        sm: 2,
        md: 4,
        lg: 6,
      }}
      sx={{
        padding: 4,
      }}
    >
      {todos.map((todo) => (
        <Grid size={1} key={todo._id}>
          <TodoCard
            id={todo._id}
            title={todo.title}
            description={todo.description}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default TodoList;
