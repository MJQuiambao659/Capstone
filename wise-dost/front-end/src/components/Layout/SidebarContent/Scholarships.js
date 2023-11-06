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
import DeleteModal from "../../Forms/SideBar Forms/DeleteModal";
import AddModal from "../../Forms/SideBar Forms/AddModal";
import EditModal from "../../Forms/SideBar Forms/EditModal";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { GridAddIcon } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Scholarships = () => {
  const theme = useTheme(); // Access the theme object
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [scholarshipData, setScholarshipData] = useState([]);
  const [newScholarship, setNewScholarship] = useState({
    scholarship_name: "",
  });

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

  const [isAddDialogOpen, setAddDialogOpen] = useState(false);

  const [scholarshipToDelete, setScholarshipToDelete] = useState(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [scholarshipToEdit, setScholarshipToEdit] = useState(null);

  // handle the add function
  const handleAdd = (newScholarship) => {
    axios
      .post("http://localhost:3001/scholarships/add", newScholarship)
      .then((response) => {
        // Update the scholarshipData state with the newly added scholarship
        setScholarshipData([...scholarshipData, response.data]);

        // Reset the newScholarship state to clear the form
        setNewScholarship({
          scholarship_name: "",
        });

        // Close the add dialog
        setAddDialogOpen(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  // handle the edit function
  const handleEdit = (row) => {
    // Open the Edit dialog with the selected scholarship
    setEditDialogOpen(true);
    setScholarshipToEdit(row);
  };

  const handleSaveEdit = (editedScholarship) => {
    // Send a PUT request to update the scholarship on the server
    axios
      .put(
        `http://localhost:3001/scholarships/edit/${editedScholarship.scholarship_id}`,
        editedScholarship
      )
      .then(() => {
        // Update the scholarshipData state to reflect the changes
        setScholarshipData((prevData) =>
          prevData.map((scholarship) =>
            scholarship.scholarship_id === editedScholarship.scholarship_id
              ? editedScholarship
              : scholarship
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

  // handle the delete function
  const handleDelete = (scholarshipId) => {
    const scholarship = scholarshipData.find(
      (scholarship) => scholarship.scholarship_id === scholarshipId
    );
    setScholarshipToDelete(scholarship);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    // Send a DELETE request to delete the scholarship on the server
    axios
      .delete(
        `http://localhost:3001/scholarships/delete/${scholarshipToDelete.scholarship_id}`
      )
      .then(() => {
        // Update the scholarshipData state to remove the deleted scholarship
        setScholarshipData((prevData) =>
          prevData.filter(
            (scholarship) =>
              scholarship.scholarship_id !== scholarshipToDelete.scholarship_id
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

  // Display the data on the table
  useEffect(() => {
    axios
      .get("http://localhost:3001/scholarships/data")
      .then((response) => {
        setScholarshipData(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  // Table format
  const columns = [
    { field: "scholarship_id", headerName: "ID", flex: 1 },
    {
      field: "scholarship_name",
      headerName: "Scholarship Offered",
      flex: 2,
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
            onClick={() => handleEdit(params.row)}
          >
            <EditIcon style={{ color: "green" }} />{" "}
            <span style={{ color: "green", fontWeight: "bold" }}>Edit</span>
          </button>
          <button
            style={buttonDeleteStyle}
            onClick={() => handleDelete(params.row.scholarship_id)}
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
        <AccountBalanceIcon style={{ marginRight: "8px" }} /> Scholarships
        <Typography
          variant="body2"
          style={{ marginLeft: "8px", color: "#777" }}
        >
          manage available Scholarships offered here...
        </Typography>
      </Typography>
      <Button
        startIcon={<GridAddIcon />}
        color="primary"
        onClick={() => setAddDialogOpen(true)}
        style={{ fontWeight: "bold" }}
      >
        Add Scholarship
      </Button>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={scholarshipData}
          columns={columns}
          pageSize={5}
          getRowId={(row) => row.scholarship_id}
        />
      </div>

      <AddModal
        open={isAddDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        onAdd={handleAdd}
        title="Add Scholarship"
        fields={[{ name: "scholarship_name", label: "Scholarship Name" }]}
        initialData={{ scholarship_name: "" }}
      />

      <EditModal
        open={isEditDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        onSave={handleSaveEdit}
        title="Edit Scholarship" // Specify the title
        content={[
          { name: "scholarship_name", label: "Scholarship Name" }, // Specify the content (form fields)
        ]}
        initialData={scholarshipToEdit} // Specify the initial data to edit
      />

      <DeleteModal
        open={isDeleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Scholarship"
        content={
          <div>
            <span>Are you sure you want to delete the scholarship: </span>
            <span style={{ fontWeight: "bold" }}>
              {scholarshipToDelete?.scholarship_name}
            </span>
            <span>?</span>
          </div>
        }
      />
    </Paper>
  );
};

export default Scholarships;
