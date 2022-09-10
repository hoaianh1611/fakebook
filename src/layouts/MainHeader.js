import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SendIcon from "@mui/icons-material/Send";

import Logo from "../components/Logo";
import { Avatar, Divider } from "@mui/material";
import useAuth from "../hooks/useAuth";
import { useNavigate, Link as RouterLink } from "react-router-dom";

function MainHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      handleMenuClose();
      await logout(() => {
        navigate("/login");
      });
    } catch (error) {
      console.error(error);
    }
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}>
      <Box sx={{ my: 1.5, px: 2.5 }}>
        <Box display="flex" alignItems="center">
          <Logo sx={{ width: "40px", height: "auto", mr: "10px" }} />
          <Typography variant="subtitle2" fontWeight="600" noWrap>
            {user?.name}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <SendIcon sx={{ ml: "5px", mr: "10px" }} />
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {user?.email}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderStyle: "dashed" }} />

      <MenuItem
        onClick={handleMenuClose}
        to="/"
        component={RouterLink}
        sx={{ mx: 1 }}>
        <SentimentSatisfiedAltIcon sx={{ mr: "10px" }} />
        My Profile
      </MenuItem>

      <MenuItem
        onClick={handleMenuClose}
        to="/account"
        component={RouterLink}
        sx={{ mx: 1 }}>
        <SettingsIcon sx={{ mr: "10px" }} />
        Account Settings
      </MenuItem>

      <Divider sx={{ borderStyle: "dashed" }} />

      <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
        <ExitToAppIcon sx={{ mr: "10px" }} />
        Logout
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ mb: 3 }}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <IconButton
            size="medium"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}>
            <Logo sx={{ width: "60px", height: "auto" }} />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" }, fontWeight: "600" }}>
            Fakebook
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <Avatar
              onClick={handleProfileMenuOpen}
              src={user.avatarUrl}
              alt={user.name}
              sx={{ width: 32, height: 32 }}
            />
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}

export default MainHeader;
