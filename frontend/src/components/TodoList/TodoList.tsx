import { Grid } from "@mui/material";
import TodoCard from "./components/TodoCard/TodoCard";

const mock = [
  {
    title: "Todo 1",
    description:
      "This is the first todo item.This is the first todo item.This is the first todo item.This is the first todo item.This is the first todo item.This is the first todo item.This is the first todo item.This is the first todo item.This is the first todo item.This is the first todo item.This is the first todo item.This is the first todo item.This is the first todo item.This is the first todo item.This is the first todo item.This is the first todo item.This is the first todo item.This is the first todo item.This is the first todo item.This is the first todo item.This is the first todo item.This is the first todo item.This is the first todo item.This is the first todo item.This is the first todo item.This is the first todo item.This is the first todo item.This is the first todo item.This is the first todo item.This is the first todo item.This is the first todo item.This is the first todo item.This is the first todo item.This is the first todo item.This is the first todo item.This is the first todo item.This is the first todo item.This is the first todo item.This is the first todo item.This is the first todo item.This is the first todo item.This is the first todo item.",
  },
  {
    title: "Todo 2",
    description: "This is the second todo item.",
  },
  {
    title: "Todo 3",
    description: "This is the third todo item.",
  },
  {
    title: "Todo 3",
    description: "This is the third todo item.",
  },
  {
    title: "Todo 3",
    description: "This is the third todo item.",
  },
  {
    title: "Todo 3",
    description: "This is the third todo item.",
  },
  {
    title: "Todo 3",
    description: "This is the third todo item.",
  },
  {
    title: "Todo 3",
    description: "This is the third todo item.",
  },
  {
    title: "Todo 3",
    description: "This is the third todo item.",
  },
  {
    title: "Todo 3",
    description: "This is the third todo item.",
  },
  {
    title: "Todo 3",
    description: "This is the third todo item.",
  },
  {
    title: "Todo 3",
    description: "This is the third todo item.",
  },
  {
    title: "Todo 3",
    description: "This is the third todo item.",
  },
];

const TodoList = () => {
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
      {mock.map((todo, index) => (
        <Grid size={1} key={index}>
          <TodoCard title={todo.title} description={todo.description} />
        </Grid>
      ))}
    </Grid>
  );
};

export default TodoList;
