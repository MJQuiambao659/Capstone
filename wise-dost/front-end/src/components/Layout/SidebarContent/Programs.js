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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridAddIcon } from "@mui/x-data-grid";
import CodeIcon from "@mui/icons-material/Code";

const Programs = () => {
  const theme = useTheme(); // Access the theme object
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [programData, setProgramData] = useState([]);
  const [newProgram, setNewProgram] = useState({
    program_name: "",
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

  const [programToDelete, setProgramToDelete] = useState(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [programToEdit, setProgramToEdit] = useState(null);

  // handle the add function
  const handleAdd = (newProgram) => {
    axios
      .post("http://localhost:3001/programs/add", newProgram)
      .then((response) => {
        // Update the programData state with the newly added program
        setProgramData([...programData, response.data]);

        // Reset the newprogram state to clear the form
        setNewProgram({
          program_name: "",
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
    // Open the Edit dialog with the selected program
    setEditDialogOpen(true);
    setProgramToEdit(row);
  };

  const handleSaveEdit = (editedprogram) => {
    // Send a PUT request to update the program on the server
    axios
      .put(
        `http://localhost:3001/programs/edit/${editedprogram.program_id}`,
        editedprogram
      )
      .then(() => {
        // Update the programData state to reflect the changes
        setProgramData((prevData) =>
          prevData.map((program) =>
            program.program_id === editedprogram.program_id
              ? editedprogram
              : program
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
  const handleDelete = (programId) => {
    const program = programData.find(
      (program) => program.program_id === programId
    );
    setProgramToDelete(program);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    // Send a DELETE request to delete the program on the server
    axios
      .delete(
        `http://localhost:3001/programs/delete/${programToDelete.program_id}`
      )
      .then(() => {
        // Update the programData state to remove the deleted program
        setProgramData((prevData) =>
          prevData.filter(
            (program) => program.program_id !== programToDelete.program_id
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
      .get("http://localhost:3001/programs/data")
      .then((response) => {
        setProgramData(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    // Add this useEffect to log the value of program.name
    programData.forEach((program) => {
    });
  }, [programData]);

  // Table format
  const columns = [
    { field: "program_id", headerName: "ID", flex: 1 },
    {
      field: "program_name",
      headerName: "Program Offered",
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
            onClick={() => handleDelete(params.row.program_id)}
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
        <CodeIcon style={{ marginRight: "8px" }} /> Programs
        <Typography
          variant="body2"
          style={{ marginLeft: "8px", color: "#777" }}
        >
          manage available Programs offered here...
        </Typography>
      </Typography>
      <Button
        startIcon={<GridAddIcon />}
        color="primary"
        onClick={() => setAddDialogOpen(true)}
        style={{ fontWeight: "bold" }}
      >
        Add Program
      </Button>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={programData}
          columns={columns}
          pageSize={5}
          getRowId={(row) => row.program_id}
        />
      </div>

      <AddModal
        open={isAddDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        onAdd={handleAdd}
        title="Add Program"
        fields={[{ name: "program_name", label: "Program Name" }]}
        initialData={{ program_name: "" }}
      />

      <EditModal
        open={isEditDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        onSave={handleSaveEdit}
        title="Edit Data"
        content={[{ name: "program_name", label: "Program Name" }]}
        initialData={programToEdit}
      />

      <DeleteModal
        open={isDeleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Program"
        content={
          <div>
            <span>Are you sure you want to delete the program: </span>
            <span style={{ fontWeight: "bold" }}>
              {programToDelete?.program_name}
            </span>
            <span>?</span>
          </div>
        }
      />
    </Paper>
  );
};

export default Programs;
