import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import SchoolIcon from "@mui/icons-material/School";
import Typography from "@mui/material/Typography";
import { Tooltip } from "@mui/material";

const SchoolsList = ({ open, onItemClick }) => {
  return (
    <ListItem
      button
      onClick={() => onItemClick("schools")}
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
        <div>
          {open ? (
            <SchoolIcon style={{ color: "#E6B905" }} />
          ) : (
            <Tooltip
              title={<Typography fontSize={18}>Schools</Typography>}
              placement="right"
            >
              <SchoolIcon style={{ color: "#E6B905" }} />
            </Tooltip>
          )}
        </div>
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
          Schools
        </Typography>
      )}
    </ListItem>
  );
};

export default SchoolsList;
