import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItemIcon from "@mui/material/ListItemIcon";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import Collapse from "@mui/material/Collapse";
import { Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person"; // Add Person icon
import GradeIcon from "@mui/icons-material/Grade"; // Add Grade icon
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useMediaQuery from "@mui/material/useMediaQuery";

const SideBar = ({ onItemClick, isSidebarOpen, toggleSidebar }) => {
  const [open, setOpen] = useState(true);
  const [scholarsOpen, setScholarsOpen] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setScholarsOpen(false);
  };

  const handleScholarsToggle = () => {
    setScholarsOpen(!scholarsOpen);
  };

  return (
    <>
      {isSmallScreen ? (
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
          <List sx={{ height: "100%", width: "100%" }}>
            <ListItem
              button
              onClick={() => onItemClick("dashboard")}
              // Define the route path
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderBottom: "1px solid #9E9E9E",
              }}
            >
              <ListItemIcon
                sx={{
                  height: "100%",
                  marginLeft: open ? -1 : 4,
                  [`& .MuiDrawer-paper`]: { marginLeft: open ? -1 : 4 },
                  color: "#E0E0E0",
                }}
              >
                <DashboardIcon />
              </ListItemIcon>
              {open && (
                <ListItemText
                  primary="Dashboard"
                  sx={{
                    color: "#E0E0E0",
                    marginLeft: -2,
                    [`& .MuiDrawer-paper`]: { marginLeft: -2 },
                  }}
                />
              )}
            </ListItem>
            <ListItem
              button
              onClick={handleScholarsToggle}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderBottom: scholarsOpen ? "none" : "1px solid #9E9E9E",
              }}
            >
              <ListItemIcon
                sx={{
                  height: "100%",
                  marginLeft: open ? -1 : 4,
                  [`& .MuiDrawer-paper`]: { marginLeft: open ? -1 : 4 },
                  color: "#E0E0E0",
                }}
              >
                <PeopleIcon />
              </ListItemIcon>
              {open && (
                <ListItemText
                  primary="Scholars"
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
              <ListItem
                button
                onClick={() => onItemClick("grades")}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingLeft: 4,
                  color: "#E0E0E0",
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "#E0E0E0",
                    marginLeft: -6,
                    [`& .MuiDrawer-paper`]: { marginLeft: -6 },
                  }}
                >
                  <GradeIcon />
                </ListItemIcon>
                {open && (
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "0.8rem",
                      marginLeft: -2,
                      [`& .MuiDrawer-paper`]: { marginLeft: -2 },
                    }}
                  >
                    Grades
                  </Typography>
                )}
              </ListItem>
              <ListItem
                button
                onClick={() => onItemClick("users")}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingLeft: 4,
                  borderBottom: "1px solid #9E9E9E",
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "#E0E0E0",
                    marginLeft: -7,
                    [`& .MuiDrawer-paper`]: { marginLeft: -7 },
                  }}
                >
                  <PersonIcon />
                </ListItemIcon>
                {open && (
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "0.8rem",
                      color: "#E0E0E0",
                      marginLeft: -2,
                      [`& .MuiDrawer-paper`]: { marginLeft: -2 },
                    }}
                  >
                    Users
                  </Typography>
                )}
              </ListItem>
            </Collapse>
          </List>
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: open ? 200 : 50,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: open ? 200 : 50,
              boxSizing: "border-box",
              overflowX: "hidden",
              backgroundColor: "#616161",
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
            <ListItem
              button
              onClick={() => onItemClick("dashboard")}
              // Define the route path
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderBottom: "1px solid #9E9E9E",
              }}
            >
              <ListItemIcon
                sx={{
                  height: "100%",
                  marginLeft: open ? -1 : 4,
                  [`& .MuiDrawer-paper`]: { marginLeft: open ? -1 : 4 },
                  color: "#E0E0E0",
                }}
              >
                <DashboardIcon />
              </ListItemIcon>
              {open && (
                <ListItemText
                  primary="Dashboard"
                  sx={{
                    color: "#E0E0E0",
                    marginLeft: -2,
                    [`& .MuiDrawer-paper`]: { marginLeft: -2 },
                  }}
                />
              )}
            </ListItem>
            <ListItem
              button
              onClick={handleScholarsToggle}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderBottom: scholarsOpen ? "none" : "1px solid #9E9E9E",
              }}
            >
              <ListItemIcon
                sx={{
                  height: "100%",
                  marginLeft: open ? -1 : 4,
                  [`& .MuiDrawer-paper`]: { marginLeft: open ? -1 : 4 },
                  color: "#E0E0E0",
                }}
              >
                <PeopleIcon />
              </ListItemIcon>
              {open && (
                <ListItemText
                  primary="Scholars"
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
              <ListItem
                button
                onClick={() => onItemClick("grades")}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingLeft: 4,
                  color: "#E0E0E0",
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "#E0E0E0",
                    marginLeft: -6,
                    [`& .MuiDrawer-paper`]: { marginLeft: -6 },
                  }}
                >
                  <GradeIcon />
                </ListItemIcon>
                {open && (
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "0.8rem",
                      marginLeft: -2,
                      [`& .MuiDrawer-paper`]: { marginLeft: -2 },
                    }}
                  >
                    Grades
                  </Typography>
                )}
              </ListItem>
              <ListItem
                button
                onClick={() => onItemClick("users")}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingLeft: 4,
                  borderBottom: "1px solid #9E9E9E",
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "#E0E0E0",
                    marginLeft: -7,
                    [`& .MuiDrawer-paper`]: { marginLeft: -7 },
                  }}
                >
                  <PersonIcon />
                </ListItemIcon>
                {open && (
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "0.8rem",
                      color: "#E0E0E0",
                      marginLeft: -2,
                      [`& .MuiDrawer-paper`]: { marginLeft: -2 },
                    }}
                  >
                    Users
                  </Typography>
                )}
              </ListItem>
            </Collapse>
          </List>
        </Drawer>
      )}
      ;
    </>
  );
};

export default SideBar;
