import {
  AppBar,
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
  Collapse,
  Menu,
  MenuItem,
  Avatar,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState, useCallback, useEffect } from "react";
import { useCrossStore } from "../../store/cross/store";
import { GoogleLogin } from "@react-oauth/google";
import { useSessionToken } from "../../hooks/useSessionToken";
import { authenticateWithGoogle } from "../../service/authService";
import { useQueryClient } from "@tanstack/react-query";
import { todoKeys } from "../../hooks/useTodos";

const Header = () => {
  const { mode, setMode } = useColorScheme();
  const { searchQuery, setSearchQuery } = useCrossStore();
  const [inputValue, setInputValue] = useState(searchQuery);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [user, setUser] = useState<any>(null);

  const { saveToken, getUserFromToken, logout, isAuthenticated } =
    useSessionToken();
  const queryClient = useQueryClient();
  const menuOpen = Boolean(anchorEl);

  const handleSuccess = async (response: any) => {
    const credential = response?.credential;
    if (!credential) return;

    try {
      // Send credential to backend to verify and save user to DB
      const authResponse = await authenticateWithGoogle(credential);
      console.log("Authentication successful:", authResponse);

      // Save the token to session storage (backend sets it as cookie too)
      saveToken(credential);

      // Get user data
      const userData = getUserFromToken();
      console.log("Logged in user:", userData);
      setUser(userData);

      // Refetch todos after successful login
      queryClient.invalidateQueries({ queryKey: todoKeys.lists() });
    } catch (error) {
      console.error("Login Failed:", error);
    }
  };

  const handleError = () => {
    console.error("Login Failed");
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    handleProfileMenuClose();
    // Optionally refresh the page to clear state
    window.location.reload();
  };

  // Check if user is logged in on mount
  useEffect(() => {
    if (isAuthenticated()) {
      const userData = getUserFromToken();
      setUser(userData);
    }
  }, [isAuthenticated, getUserFromToken]);

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

          {/* AUTH SECTION */}
          {user ? (
            <>
              <IconButton
                onClick={handleProfileMenuOpen}
                size="small"
                sx={{ ml: 1 }}
                aria-controls={menuOpen ? "profile-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={menuOpen ? "true" : undefined}
              >
                <Avatar
                  src={user.picture}
                  alt={user.name || user.email}
                  sx={{ width: 36, height: 36 }}
                />
              </IconButton>
              <Menu
                id="profile-menu"
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleProfileMenuClose}
                onClick={handleProfileMenuClose}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                slotProps={{
                  paper: {
                    elevation: 3,
                    sx: {
                      mt: 1.5,
                      minWidth: 200,
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  },
                }}
              >
                <Box sx={{ px: 2, py: 1.5 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {user.name || "User"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {user.email}
                  </Typography>
                </Box>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Box sx={{ ml: 1 }}>
              <GoogleLogin
                onSuccess={handleSuccess}
                onError={handleError}
                size="medium"
                shape="pill"
                theme={mode === "dark" ? "filled_black" : "outline"}
              />
            </Box>
          )}
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
