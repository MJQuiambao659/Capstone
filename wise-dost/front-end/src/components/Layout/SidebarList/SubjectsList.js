import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Typography from "@mui/material/Typography";
import { Tooltip } from "@mui/material";

const SubjectsList = ({ open, onItemClick }) => {
  return (
    <ListItem
      button
      onClick={() => onItemClick("subjects")}
      sx={{
        display: "flex",
        borderBottom: "1px solid #9E9E9E",
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
            <MenuBookIcon style={{ color: "#E6B905" }} />
          ) : (
            <Tooltip
              title={<Typography fontSize={18}>Subjects</Typography>}
              placement="right"
            >
              <MenuBookIcon style={{ color: "#E6B905" }} />
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
            marginLeft: open ? -2 : "auto", // Center the icon when closed
            [`& .MuiDrawer-paper`]: { marginLeft: open ? -2 : "auto" }, // Center the icon when closed
          }}
        >
          Subjects
        </Typography>
      )}
    </ListItem>
  );
};

export default SubjectsList;
