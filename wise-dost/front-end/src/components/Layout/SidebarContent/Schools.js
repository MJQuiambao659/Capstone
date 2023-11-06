import React, { useState, useEffect } from "react";
import {
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import DeleteModal from "../../Forms/SideBar Forms/DeleteModal";
import AddModal from "../../Forms/SideBar Forms/AddModal";
import EditModal from "../../Forms/SideBar Forms/EditModal";
import SchoolIcon from "@mui/icons-material/School";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridAddIcon } from "@mui/x-data-grid";

const Schools = () => {
  const theme = useTheme(); // Access the theme object
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [schoolData, setSchoolData] = useState([]);
  const [newSchoolData, setNewSchoolData] = useState({
    school_code: "",
    school_name: "",
  });

  const [isAddDialogOpen, setAddDialogOpen] = useState(false);

  const [schoolToDelete, setSchoolToDelete] = useState(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [schoolToEdit, setSchoolToEdit] = useState(null);

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

  const handleAdd = (newSchool) => {
    axios
      .post("http://localhost:3001/schools/add", newSchool)
      .then((response) => {
        // Update the programData state with the newly added program
        setSchoolData([...schoolData, response.data]);

        // Reset the newprogram state to clear the form
        setNewSchoolData({
          school_code: "",
          school_name: "",
        });

        // Close the add dialog
        setAddDialogOpen(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const handleEdit = (row) => {
    // Open the Edit dialog with the selected program
    setEditDialogOpen(true);
    setSchoolToEdit(row);
  };

  const handleSaveEdit = (editedSchool) => {
    // Send a PUT request to update the program on the server
    axios
      .put(
        `http://localhost:3001/schools/edit/${editedSchool.school_id}`,
        editedSchool
      )
      .then(() => {
        // Update the programData state to reflect the changes
        setSchoolData((prevData) =>
          prevData.map((school) =>
            school.school_id === editedSchool.school_id ? editedSchool : school
          )
        );
        // Close the edit dialog
        setEditDialogOpen(false);
      })
      .catch(function (error) {
        console.error(error);
        // Handle the error as needed
      });
  };

  const handleDelete = (schoolId) => {
    const school = schoolData.find((school) => school.school_id === schoolId);
    setSchoolToDelete(school);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    // Send a DELETE request to delete the program on the server
    axios
      .delete(
        `http://localhost:3001/schools/delete/${schoolToDelete.school_id}`
      )
      .then(() => {
        // Update the programData state to remove the deleted program
        setSchoolData((prevData) =>
          prevData.filter(
            (school) => school.school_id !== schoolToDelete.school_id
          )
        );
        // Close the confirmation dialog
        setDeleteDialogOpen(false);
      })
      .catch(function (error) {
        console.error(error);
        // Handle the error as needed
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/schools/data")
      .then((response) => {
        setSchoolData(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  const columns = [
    { field: "school_id", headerName: "ID", flex: 1 },
    {
      field: "school_code",
      headerName: "School Code",
      flex: 2,
    },
    { field: "school_name", headerName: "School Name", flex: 3 },
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
            onClick={() => handleEdit(params.row)}
          >
            <EditIcon style={{ color: "green" }} />{" "}
            <span style={{ color: "green", fontWeight: "bold" }}>Edit</span>
          </button>
          <button
            style={buttonDeleteStyle}
            onClick={() => handleDelete(params.row.school_id)}
          >
            <DeleteIcon style={{ color: "red" }} />{" "}
            <span style={{ color: "red", fontWeight: "bold" }}>Delete</span>
          </button>
        </div>
      ),
    },
  ];

  return (
    <Paper sx={{ padding: 2, width: isSmallScreen ? "80%" : "100%" }}>
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
        <SchoolIcon style={{ marginRight: "8px" }} /> Schools
        <Typography
          variant="body2"
          style={{ marginLeft: "8px", color: "#777" }}
        >
          manage available University or State College here...
        </Typography>
      </Typography>
      <Button
        startIcon={<GridAddIcon />}
        color="primary"
        onClick={() => setAddDialogOpen(true)}
        style={{ fontWeight: "bold" }}
      >
        Add School
      </Button>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={schoolData}
          columns={columns}
          pageSize={5}
          getRowId={(row) => row.school_id}
        />
      </div>

      <AddModal
        open={isAddDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        onAdd={handleAdd}
        title="Add School"
        fields={[
          { name: "school_code", label: "School Code" },
          { name: "school_name", label: "School Name" },
        ]}
        initialData={{ school_code: "", program_name: "" }}
      />

      <EditModal
        open={isEditDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        onSave={handleSaveEdit}
        title="Edit Data"
        content={[
          { name: "school_code", label: "School Code" },
          { name: "school_name", label: "School Name" },
        ]}
        initialData={schoolToEdit}
      />

      <DeleteModal
        open={isDeleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Program"
        content={
          <div>
            <span>Are you sure you want to delete the school: </span>
            <span style={{ fontWeight: "bold" }}>
              {schoolToDelete?.school_name}
            </span>
            <span>?</span>
          </div>
        }
      />
    </Paper>
  );
};

export default Schools;
