import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import CodeIcon from "@mui/icons-material/Code"; // Use CodeIcon for "Programs"
import Typography from "@mui/material/Typography";
import { Tooltip } from "@mui/material";

const ProgramsList = ({ open, onItemClick }) => {
  return (
    <ListItem
      button
      onClick={() => onItemClick("programs")}
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
            <CodeIcon style={{ color: "#E6B905" }} />
          ) : (
            <Tooltip
              title={<Typography fontSize={18}>Programs</Typography>}
              placement="right"
            >
              <CodeIcon style={{ color: "#E6B905" }} />{" "}
              {/* Use CodeIcon for "Programs" */}
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
          Programs
        </Typography>
      )}
    </ListItem>
  );
};

export default ProgramsList;
