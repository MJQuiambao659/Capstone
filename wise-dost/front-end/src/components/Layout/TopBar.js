import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import UserProfileDropdown from "./UserProfileDropdown"; // Import the UserProfileDropdown component
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const TopBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Adjust breakpoint as needed

  return (
    <AppBar
      position="fixed"
      sx={{
        height: isMobile ? 49 : 57,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        transition: "height 0.3s", // Add transition for smooth height change
      }}
    >
      <Toolbar>
        {/* Responsive Logo */}
        <Typography
          variant={isMobile ? "h6" : "h6"}
          component="div"
          sx={{ flexGrow: 1 }}
        >
          DOST SEI
        </Typography>

        {/* Right side user account dropdown (conditionally rendered for mobile) */}
        {isMobile ? null : <UserProfileDropdown />}
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
