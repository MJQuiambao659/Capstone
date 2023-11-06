import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const UserProfileDropdown = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    console.log(localStorage);
    navigate("/");
    handleMenuClose();
  };

  return (
    <div>
      {/* Clickable area for opening the dropdown */}
      <ButtonBase
        onClick={handleMenuOpen}
        style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
      >
        {/* User Name */}
        <Typography variant="subtitle1" sx={{ marginRight: 2 }}>
          John Doe {/* Replace with the user's actual name */}
        </Typography>

        {/* Account Circle Icon */}
        <AccountCircleIcon />
      </ButtonBase>

      {/* Dropdown Menu */}
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom", // Anchor point at the bottom of the button
          horizontal: "right", // Anchor point at the right of the button
        }}
        transformOrigin={{
          vertical: "top", // Menu should align with the top of the button
          horizontal: "right", // Menu should align with the right of the button
        }}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default UserProfileDropdown;
