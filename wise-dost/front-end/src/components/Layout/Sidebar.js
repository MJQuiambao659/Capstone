import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import DashboardList from "./SidebarList/DashboardList";
import AnalyticsList from "./SidebarList/AnalyticsList";
import EducationList from "./SidebarList/EducationList";
import ScholarsList from "./SidebarList/ScholarsList";
import AnnouncementList from "./SidebarList/AnnouncementsList"

const SideBar = ({ onItemClick, isSidebarOpen, toggleSidebar }) => {
  const [open, setOpen] = useState(true);
  const [scholarsOpen, setScholarsOpen] = useState(false);
  const [educationOpen, setEducationOpen] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setScholarsOpen(false);
    setEducationOpen(false);
  };

  const handleScholarsToggle = () => {
    if (educationOpen) {
      setEducationOpen(false);
    }
    setScholarsOpen(!scholarsOpen);
  };

  const handleEducationToggle = () => {
    if (scholarsOpen) {
      setScholarsOpen(false);
    }
    setEducationOpen(!educationOpen);
  };

  return (
    <>
      {isSmallScreen ? (
        /*This is for the Phone Version in sidebar */
        <Drawer
          variant="temporary"
          anchor="top"
          open={isSidebarOpen}
          onClose={toggleSidebar}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            width: isSidebarOpen ? "100%" : 0,
            flexShrink: 0,
            // Apply the background color to the temporary drawer
            [`& .MuiDrawer-paper`]: {
              overflowX: "hidden",
              backgroundColor: "#616161",
            },
          }}
        >
          <IconButton
            onClick={() => {
              toggleSidebar();
              if (open) {
                handleDrawerClose();
              } else {
                handleDrawerOpen();
              }
            }}
            sx={{
              alignSelf: "flex-end",
              marginTop: 7,
              marginRight: 0.5,
              color: "#E0E0E0",
            }}
          >
            <MenuIcon />
          </IconButton>
          <List sx={{ height: "100%" }}>
            <DashboardList open={open} onItemClick={onItemClick} />
            <AnalyticsList open={open} onItemClick={onItemClick} />
            <ScholarsList open={open} onItemClick={onItemClick} />
            <EducationList open={open} onItemClick={onItemClick} />
          </List>
        </Drawer>
      ) : (
        /*This is for the Desktop Version in sidebar */
        <Drawer
          variant="permanent"
          sx={{
            width: open ? 200 : 50,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: open ? 200 : 50,
              boxSizing: "border-box",
              overflowX: "hidden",
              backgroundColor: "#333333",
            },
            transition: "width 0.3s",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={() => {
              toggleSidebar();
              if (open) {
                handleDrawerClose();
              } else {
                handleDrawerOpen();
              }
            }}
            sx={{
              alignSelf: "flex-end",
              marginTop: 7,
              marginRight: 0.5,
              color: "#E0E0E0",
            }}
          >
            <MenuIcon />
          </IconButton>
          <List sx={{ height: "100%" }}>
            <DashboardList open={open} onItemClick={onItemClick} />
            <AnnouncementList open={open} onItemClick={onItemClick} />
            <AnalyticsList open={open} onItemClick={onItemClick} />
            <ScholarsList
              open={open}
              scholarsOpen={scholarsOpen}
              handleScholarsToggle={handleScholarsToggle}
              onItemClick={onItemClick}
            />
            <EducationList
              open={open}
              educationOpen={educationOpen}
              handleEducationToggle={handleEducationToggle}
              onItemClick={onItemClick}
            />
          </List>
        </Drawer>
      )}
      ;
    </>
  );
};

export default SideBar;
