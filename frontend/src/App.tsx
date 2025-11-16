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
import Toast from "./components/ui/Toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useCreateTodo } from "./hooks/useTodos";
import ErrorBoundary from "./components/ErrorBoundary";

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function AppContent() {
  const { modalConfig, setModalConfig, toastConfig, setToastConfig } =
    useCrossStore();
  const createTodoMutation = useCreateTodo();

  const handleOnConfirmCreate = async (edited: {
    title: string;
    description?: string;
  }) => {
    try {
      await createTodoMutation.mutateAsync(edited);
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
        message:
          error instanceof Error ? error.message : "Failed to create todo",
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
        <Box sx={{ position: "fixed", bottom: 16, right: 16 }}>
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => {
              setModalConfig({
                open: true,
                modalType: "create",
                backgroundColor: undefined,
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

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AppContent />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
