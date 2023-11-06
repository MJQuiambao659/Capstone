import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";

const UsersList = ({ open, onItemClick }) => {
  return (
    <ListItem
      button
      onClick={() => onItemClick("users")}
      sx={{
        display: "flex",
      }}
    >
      <ListItemIcon
        sx={{
          height: "100%",
          marginLeft: open ? 1 : "auto", // Center the icon when closed
          [`& .MuiDrawer-paper`]: { marginLeft: open ? 1 : "auto" }, // Center the icon when closed
          color: "#E0E0E0",
        }}
      >
        <PersonIcon style={{ color: "#E6B905" }} />
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
          Users
        </Typography>
      )}
    </ListItem>
  );
};

export default UsersList;
