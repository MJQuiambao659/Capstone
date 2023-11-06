import React from "react";
import ListItem from "@mui/material/ListItem";
import { ListItemText, Tooltip, Typography } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import BusinessIcon from "@mui/icons-material/Business";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import ScholarshipsList from "./ScholarshipsList"; // Import the existing ScholarshipsList component
import ProgramsList from "./ProgramsList"; // Import the existing ProgramsList component
import SchoolsList from "./SchoolsList"; // Import the existing SchoolsList component
import CoursesList from "./CoursesList"; // Import the existing CoursesList component
import SubjectList from "./SubjectsList";

const EducationList = ({
  open,
  educationOpen,
  handleEducationToggle,
  onItemClick,
}) => {
  return (
    <>
      <ListItem
        button
        onClick={handleEducationToggle}
        sx={{
          display: "flex",
          borderBottom: educationOpen ? "none" : "1px solid #9E9E9E",
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
          <div>
            {open ? (
              <BusinessIcon style={{ color: "#E6B905" }} />
            ) : (
              <Tooltip
                title={<Typography fontSize={18}>Manage Scholarship</Typography>}
                placement="right"
              >
                <BusinessIcon style={{ color: "#E6B905" }} />
              </Tooltip>
            )}
          </div>
        </ListItemIcon>
        {open && (
          <ListItemText
            primary={
              <Typography variant="body2" style={{ fontWeight: "bold", fontSize: "11px" }}>
                Manage Educations
              </Typography>
            }
            fontWeight="bold"
            sx={{
              color: "#E0E0E0",
              marginLeft: -2,
              [`& .MuiDrawer-paper`]: { marginLeft: -2 },
            }}
          />
        )}
        {open ? (
          educationOpen ? (
            <ExpandLessIcon sx={{ color: "#E0E0E0" }} />
          ) : (
            <ExpandMoreIcon sx={{ color: "#E0E0E0" }} />
          )
        ) : null}
      </ListItem>
      <Collapse in={educationOpen}>
        <ScholarshipsList open={open} onItemClick={onItemClick} />
        <ProgramsList open={open} onItemClick={onItemClick} />
        <SchoolsList open={open} onItemClick={onItemClick} />
        <CoursesList open={open} onItemClick={onItemClick} />
        <SubjectList open={open} onItemClick={onItemClick} />
      </Collapse>
    </>
  );
};

export default EducationList;
