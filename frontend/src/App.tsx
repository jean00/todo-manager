import Header from "./components/Header/Header";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import TodoList from "./components/TodoList/TodoList";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";
import { useCrossStore } from "./store/cross/store";
import CommonModal from "./components/ui/CommonModal";

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

function App() {
  const { modalConfig } = useCrossStore();

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <main>
        <TodoList />
        <CommonModal {...modalConfig} />
      </main>
    </ThemeProvider>
  );
}

export default App;
