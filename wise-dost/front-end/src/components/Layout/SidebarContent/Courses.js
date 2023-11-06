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
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridAddIcon } from "@mui/x-data-grid";
import DeleteModal from "../../Forms/SideBar Forms/DeleteModal";
import AddModal from "../../Forms/SideBar Forms/AddModal";
import EditModal from "../../Forms/SideBar Forms/EditModal";

const Courses = () => {
  const theme = useTheme(); // Access the theme object
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [courseData, setCourseData] = useState([]);
  const [newCourse, setNewCourse] = useState({
    course_code: "",
    course_name: "",
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

  const [courseToDelete, setCourseToDelete] = useState(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [courseToEdit, setCourseToEdit] = useState(null);

  const handleAdd = (newCourse) => {
    axios
      .post("http://localhost:3001/courses/add", newCourse)
      .then((response) => {
        // Update the programData state with the newly added program
        setCourseData([...courseData, response.data]);

        // Reset the newprogram state to clear the form
        setNewCourse({
          course_code: "",
          course_name: "",
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
    setCourseToEdit(row);
  };

  const handleSaveEdit = (editedCourse) => {
    // Send a PUT request to update the program on the server
    axios
      .put(
        `http://localhost:3001/programs/edit/${editedCourse.course_id}`,
        editedCourse
      )
      .then(() => {
        // Update the programData state to reflect the changes
        setCourseData((prevData) =>
          prevData.map((course) =>
            course.course_id === editedCourse.course_id ? editedCourse : course
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

  const handleDelete = (courseId) => {
    const course = courseData.find((course) => course.course_id === courseId);
    setCourseToDelete(course);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    // Send a DELETE request to delete the program on the server
    axios
      .delete(
        `http://localhost:3001/courses/delete/${courseToDelete.course_id}`
      )
      .then(() => {
        // Update the programData state to remove the deleted program
        setCourseData((prevData) =>
          prevData.filter(
            (course) => course.course_id !== courseToDelete.course_id
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
      .get("http://localhost:3001/courses/data")
      .then((response) => {
        setCourseData(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  const columns = [
    { field: "course_id", headerName: "ID", flex: 1 },
    {
      field: "course_code",
      headerName: "Course Code",
      flex: 2,
    },
    { field: "course_name", headerName: "Course Name", flex: 3 },
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
            onClick={() => handleDelete(params.row.course_id)}
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
        <LibraryBooksIcon style={{ marginRight: "8px" }} /> Courses
        <Typography
          variant="body2"
          style={{ marginLeft: "8px", color: "#777" }}
        >
          manage available Courses here...
        </Typography>
      </Typography>
      <Button
        startIcon={<GridAddIcon />}
        color="primary"
        onClick={() => setAddDialogOpen(true)}
        style={{ fontWeight: "bold" }}
      >
        Add Course
      </Button>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={courseData}
          columns={columns}
          pageSize={5}
          getRowId={(row) => row.course_id}
        />
      </div>

      <AddModal
        open={isAddDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        onAdd={handleAdd}
        title="Add Course"
        fields={[
          { name: "course_code", label: "Course Code" },
          { name: "course_name", label: "Course Name" },
        ]}
        initialData={{ course_code: "", course_name: "" }}
      />

      <EditModal
        open={isEditDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        onSave={handleSaveEdit}
        title="Edit Data"
        content={[
          { name: "course_code", label: "Course Code" },
          { name: "course_name", label: "Course Name" },
        ]}
        initialData={courseToEdit}
      />

      <DeleteModal
        open={isDeleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Course"
        content={
          <div>
            <span>Are you sure you want to delete the program: </span>
            <span style={{ fontWeight: "bold" }}>
              {courseToDelete?.course_name}
            </span>
            <span>?</span>
          </div>
        }
      />
    </Paper>
  );
};

export default Courses;
