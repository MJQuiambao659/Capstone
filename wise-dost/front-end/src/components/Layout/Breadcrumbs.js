import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
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
      elevation={5}
      sx={{ padding: 2, width: isSmallScreen ? "80%" : "100%" }}
    >
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;

          return last ? (
            <Typography color="textPrimary" key={to}>
              {value}
            </Typography>
          ) : (
            <Link color="inherit" href={to} key={to}>
              {value}
            </Link>
          );
        })}
      </Breadcrumbs>
    </Paper>
  );
};

export default Breadcrumb;
