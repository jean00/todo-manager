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
import { useState, useCallback, useEffect } from "react";
import { useCrossStore } from "../../store/cross/store";

const Header = () => {
  const { mode, setMode } = useColorScheme();
  const { searchQuery, setSearchQuery } = useCrossStore();
  const [inputValue, setInputValue] = useState(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(inputValue);
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue, setSearchQuery]);

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
    },
    []
  );

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
            id="search-todos"
            variant="outlined"
            placeholder="Search"
            size="small"
            value={inputValue}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
            onChange={handleSearchChange}
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
