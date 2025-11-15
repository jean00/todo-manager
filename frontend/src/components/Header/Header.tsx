import {
  AppBar,
  Box,
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

const Header = () => {
  const { mode, setMode } = useColorScheme();

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
            alignItems: "end",
            gap: 2,
          }}
        >
          <Typography variant="h6">Task manager</Typography>
          <TextField
            id="filled-basic"
            label="Search"
            variant="outlined"
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
