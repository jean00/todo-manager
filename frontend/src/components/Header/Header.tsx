import {
  AppBar,
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
  Collapse,
} from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useCallback, useEffect } from "react";
import { useCrossStore } from "../../store/cross/store";

const Header = () => {
  const { mode, setMode } = useColorScheme();
  const { searchQuery, setSearchQuery } = useCrossStore();
  const [inputValue, setInputValue] = useState(searchQuery);

  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

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

  if (!mode) return null;

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Todo manager
          </Typography>

          {/* DESKTOP TEXTFIELD */}
          <TextField
            sx={{ display: { xs: "none", sm: "block" } }}
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

          {/* MOBILE SEARCH ICON */}
          <IconButton
            sx={{ display: { sm: "none" } }}
            onClick={() => setMobileSearchOpen((prev) => !prev)}
          >
            <SearchIcon />
          </IconButton>

          {/* THEME SWITCH */}
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

        {/* MOBILE SLIDE-DOWN SEARCH BAR */}
        <Collapse in={mobileSearchOpen}>
          <Box
            sx={{
              px: 2,
              pb: 2,
              display: { xs: "flex", sm: "none" },
              alignItems: "center",
              gap: 1,
            }}
          >
            <TextField
              fullWidth
              autoFocus
              variant="outlined"
              placeholder="Search..."
              size="small"
              value={inputValue}
              onChange={handleSearchChange}
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
            <IconButton
              onClick={() => {
                setMobileSearchOpen(false);
                setInputValue("");
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Collapse>
      </AppBar>
    </>
  );
};

export default Header;
