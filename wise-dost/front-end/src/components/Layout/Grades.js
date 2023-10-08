import React from "react";
import {
  Container,
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";

const Grades = () => {
  const theme = useTheme(); // Access the theme object
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Paper
      elevation={5}
      sx={{ padding: 2, width: isSmallScreen ? "80%" : "100%" }}
    >
      <Typography variant="h4" gutterBottom>
        Grades
      </Typography>
      {/* Add your dashboard content here */}
    </Paper>
  );
};

export default Grades;
