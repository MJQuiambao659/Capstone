import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Typography from "@mui/material/Typography";

const DashboardList = ({ open, onItemClick }) => {
  return (
    <ListItem
      button
      onClick={() => onItemClick("dashboard")}
      sx={{
        display: "flex",
        borderBottom: "1px solid #9E9E9E",
      }}
    >
      <ListItemIcon
        sx={{
          height: "100%",
          marginLeft: open ? -1 : "auto", // Center the icon when closed
          [`& .MuiDrawer-paper`]: { marginLeft: open ? -1 : "auto" }, // Center the icon when closed
          color: "#E0E0E0",
        }}
      >
        <DashboardIcon style={{ color: "#E6B905" }} />
      </ListItemIcon>
      {open && (
        <Typography
          variant="body2"
          fontWeight="bold"
          sx={{
            color: "#E0E0E0",
            marginLeft: -2,
            [`& .MuiDrawer-paper`]: { marginLeft: -2 },
          }}
        >
          Dashboard
        </Typography>
      )}
    </ListItem>
  );
};

export default DashboardList;
