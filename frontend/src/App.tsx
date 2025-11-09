import Header from "./components/Header/Header";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import TodoList from "./components/TodoList/TodoList";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <main>
        <TodoList />
      </main>
    </ThemeProvider>
  );
}

export default App;
