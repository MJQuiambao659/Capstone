import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import {
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridAddIcon } from "@mui/x-data-grid";
import PersonIcon from "@mui/icons-material/Person";

const Users = () => {
  const theme = useTheme(); // Access the theme object
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [userData, setUserData] = useState([]);

  const buttonEditStyle = {
    display: "flex",
    alignItems: "center",
    border: "none",
    padding: 0,
    cursor: "pointer",
    backgroundColor: "transparent",
  };

  const buttonDeleteStyle = {
    display: "flex",
    alignItems: "center",
    border: "none",
    padding: 0,
    cursor: "pointer",
    backgroundColor: "transparent",
  };

  const columns = [
    { field: "scholar_id", headerName: "ID", width: 15 },
    {
      field: "first_name",
      headerName: "First Name",
      width: 225,
    },
    {
      field: "last_name",
      headerName: "Last Name",
      width: 225,
    },
    {
      field: "date_of_birth",
      headerName: "Date of Birth",
      width: 150,
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 100,
    },
    {
      field: "email",
      headerName: "Email Address",
      width: 300,
    },
    {
      field: "scholarship_id",
      headerName: "Scholarship",
      width: 200
    },
    {
      field: "program_id",
      headerName: "Program",
      width: 200,
    },
    {
      field: "school_id",
      headerName: "School",
      width: 300,
    },
    {
      field: "course_id",
      headerName: "Course",
      width: 300,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <button
            style={buttonEditStyle}
            //onClick={() => handleEdit(params.row)}
          >
            <EditIcon style={{ color: "green" }} />{" "}
            <span style={{ color: "green", fontWeight: "bold" }}>Edit</span>
          </button>
          <button
            style={buttonDeleteStyle}
            //onClick={() => handleDelete(params.row.program_id)}
          >
            <DeleteIcon style={{ color: "red" }} />{" "}
            <span style={{ color: "red", fontWeight: "bold" }}>Delete</span>
          </button>
        </div>
      ),
    },
  ];

  return (
    <Paper sx={{ padding: 2, width: "100%" }}>
      <Typography
        variant="h6"
        gutterBottom
        style={{
          display: "flex",
          alignItems: "center",
          borderBottom: "2px solid gray",
          marginBottom: "20px",
        }}
      >
        <PersonIcon style={{ marginRight: "8px" }} /> Scholars
        <Typography
          variant="body2"
          style={{ marginLeft: "8px", color: "#777" }}
        >
          manage or view Scholars here...
        </Typography>
      </Typography>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={userData}
          columns={columns}
          pageSize={5}
          getRowId={(row) => row.program_id}
        />
      </div>
    </Paper>
  );
};

export default Users;
