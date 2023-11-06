import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { useLocation } from "react-router-dom";
import { useTheme, useMediaQuery } from "@mui/material";

const Breadcrumb = ({}) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const theme = useTheme(); // Access the theme object
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Paper
      sx={{
        padding: 1, // Reduce padding for the Paper component
        width: isSmallScreen ? "80%" : "100%",
        fontSize: isSmallScreen ? "0.8rem" : "1rem", // Adjust font size for text
      }}
    >
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;

          return (
            <Typography
              color={last ? "textPrimary" : "textSecondary"}
              key={value}
            >
              {value}
            </Typography>
          );
        })}
      </Breadcrumbs>
    </Paper>
  );
};

export default Breadcrumb;
