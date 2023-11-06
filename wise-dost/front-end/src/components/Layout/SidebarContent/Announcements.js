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
import AnnouncementIcon from "@mui/icons-material/Announcement";

const Announcements = () => {
  const theme = useTheme(); // Access the theme object
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [announcementData, setAnnouncementData] = useState([]);

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
    { field: "announcement_id", headerName: "ID", width: 15 },
    {
      field: "announcement_title",
      headerName: "Announcement Title",
      width: 250,
    },
    {
      field: "author_name",
      headerName: "Author",
      width: 200,
    },
    {
      field: "created_at",
      headerName: "Created At",
      width: 150,
    },
    {
      field: "edited_at",
      headerName: "Last Edited At",
      width: 150,
    },
    {
      field: "editor_name",
      headerName: "Edited By",
      width: 200,
    },
    {
      field: "is_active",
      headerName: "Status",
      width: 150,
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
        <AnnouncementIcon style={{ marginRight: "8px" }} /> Announcements
        <Typography
          variant="body2"
          style={{ marginLeft: "8px", color: "#777" }}
        >
          manage Announcements here...
        </Typography>
      </Typography>
      <Button
        startIcon={<GridAddIcon />}
        color="primary"
        //onClick={() => setAddDialogOpen(true)}
        style={{ fontWeight: "bold" }}
      >
        Post Announcement
      </Button>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={announcementData}
          columns={columns}
          pageSize={5}
          getRowId={(row) => row.program_id}
        />
      </div>
    </Paper>
  );
};

export default Announcements;
