import {
  AppBar,
  Box,
  debounce,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { todosService } from "../../service/todosService";

const Header = () => {
  const { mode, setMode } = useColorScheme();
  const { getTodo } = todosService();

  const debouncedSearch = debounce((query: string) => {
    getTodo(query);
  }, 1000);

  if (!mode) {
    return null;
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexGrow: 1,
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="h6">Task manager</Typography>
          <TextField
            id="filled-basic"
            variant="outlined"
            placeholder="Search"
            size="small"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
            onChange={(event) => debouncedSearch(event.target.value)}
          />
        </Box>
        <IconButton
          aria-label="Toggle theme"
          onClick={() => setMode(mode === "dark" ? "light" : "dark")}
        >
          {mode === "light" ? (
            <LightModeOutlinedIcon />
          ) : (
            <DarkModeOutlinedIcon />
          )}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
