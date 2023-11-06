import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";

const EditModal = ({ open, onClose, onSave, title, content, initialData }) => {
  const [editedData, setEditedData] = useState({ ...initialData });

  // Update the editedData when initialData changes
  useEffect(() => {
    if (initialData) {
      setEditedData(initialData);
    }
  }, [initialData]);

  const handleSave = () => {
    onSave(editedData);
    onClose(); // Close the edit modal after saving
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box width={400} sx={{ textAlign: "center" }}>
          {content.map((field) => (
            <TextField
              key={field.name}
              name={field.name}
              label={field.label}
              value={editedData[field.name] || ""}
              onChange={handleChange}
              fullWidth
              style={{ marginTop: "8px", width: "400px" }}
            />
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="success">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModal;
