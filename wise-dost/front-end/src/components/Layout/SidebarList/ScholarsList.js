import React from "react";
import ListItem from "@mui/material/ListItem";
import { ListItemText, Typography } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import PeopleIcon from "@mui/icons-material/People";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import GradesList from "./GradesList"; // Import the existing GradesList component
import UsersList from "./UsersList";

const ScholarsList = ({
  open,
  scholarsOpen,
  handleScholarsToggle,
  onItemClick,
}) => {
  return (
    <>
      <ListItem
        button
        onClick={handleScholarsToggle}
        sx={{
          display: "flex",
          borderBottom: scholarsOpen ? "none" : "1px solid #9E9E9E",
        }}
      >
        <ListItemIcon
          sx={{
            height: "100%",
            marginLeft: open ? -1 : "auto",
            [`& .MuiDrawer-paper`]: { marginLeft: open ? -1 : "auto" },
            color: "#E0E0E0",
          }}
        >
          <PeopleIcon style={{ color: "#E6B905" }} />
        </ListItemIcon>
        {open && (
          <ListItemText
            primary={
              <Typography variant="body2" style={{ fontWeight: 'bold', fontSize:"11px"}}>
                Manage Scholars
              </Typography>
            }
            sx={{
              color: "#E0E0E0",
              marginLeft: -2,
              [`& .MuiDrawer-paper`]: { marginLeft: -2 },
            }}
          />
        )}
        {open ? (
          scholarsOpen ? (
            <ExpandLessIcon sx={{ color: "#E0E0E0" }} />
          ) : (
            <ExpandMoreIcon sx={{ color: "#E0E0E0" }} />
          )
        ) : null}
      </ListItem>
      <Collapse in={scholarsOpen}>
        <UsersList open={open} onItemClick={onItemClick} />
        <GradesList open={open} onItemClick={onItemClick} />
      </Collapse>
    </>
  );
};

export default ScholarsList;
