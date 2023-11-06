import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Box,
} from "@mui/material";

const AddModal = ({ open, onClose, onAdd, title, fields, initialData }) => {
  const [formData, setFormData] = useState(initialData || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="add-dialog-title">
      <DialogTitle id="add-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <Box width={400} sx={{ textAlign: "center" }}>
          {fields.map((field) => (
            <TextField
              key={field.name}
              autoFocus={field === fields[0]}
              margin="dense"
              name={field.name}
              label={field.label}
              type={field.type || "text"}
              fullWidth
              value={formData[field.name] || ""}
              onChange={handleChange}
              style={{ marginTop: "5px" }}
              autoComplete="off"
              sx={{
                width: "400px",
              }}
            />
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={() => onAdd(formData)} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddModal;
