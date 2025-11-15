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
import { Box, CssBaseline, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { todosService } from "./service/todosService";
import Toast from "./components/ui/Toast";

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

function App() {
  const { modalConfig, setModalConfig, toastConfig, setToastConfig } =
    useCrossStore();
  const { createTodo, getTodos } = todosService();

  const handleOnConfirmCreate = async (edited: {
    title: string;
    description?: string;
  }) => {
    try {
      await createTodo(edited.title, edited.description);
      await getTodos();
      setModalConfig({
        open: false,
      });
      setToastConfig({
        open: true,
        message: "Todo created successfully",
        severity: "success",
        title: "Success",
      });
    } catch (error) {
      console.error("Failed to create todo:", error);
      setToastConfig({
        open: true,
        message: "Failed to create todo",
        severity: "error",
        title: "Error",
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <main>
        <TodoList />
        <CommonModal {...modalConfig} />
        <Toast
          toastConfig={toastConfig}
          handleClose={() => setToastConfig({ open: false })}
        />
        <Box sx={{ position: "absolute", bottom: 16, right: 16 }}>
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => {
              setModalConfig({
                open: true,
                modalType: "create",
                onClose: () =>
                  setModalConfig({
                    open: false,
                  }),
                onConfirm: handleOnConfirmCreate,
              });
            }}
          >
            <AddIcon />
          </Fab>
        </Box>
      </main>
    </ThemeProvider>
  );
}

export default App;
