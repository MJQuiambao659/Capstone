import React, { useState } from "react";
import {
  Checkbox,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Modal,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
  FormHelperText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { handleCreateAccount } from "./RegistrationHandlers";
import axios from "axios";

const Registration = ({ open, onClose }) => {
  const initialFormState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    program: "",
    school: "",
    course: "",
  };

  const [formState, setFormState] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleCreateAccountClick = () => {
    handleCreateAccount(formState, setErrors);
  };

  const handleCheckboxChange = () => {
    setAgreedToTerms(!agreedToTerms);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleCreateAccountClick();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/user/register",
        formState
      );
      console.log(response.data.message);
      if (response.status === 201) {
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Registration error:", error.response.data.message);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          borderRadius: "20px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          width: "90%",
          maxWidth: "500px",
          maxHeight: "90vh",
          overflowY: "auto",
          ...(isMobile && {
            width: "75%",
            MaxHeight: "unset",
            height: "75vh",
          }),
        }}
      >
        <IconButton
          sx={{ position: "absolute", top: "20px", right: "20px" }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            label="First Name"
            name="firstName"
            value={formState.firstName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.firstName}
            helperText={errors.firstName}
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={formState.lastName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.lastName}
            helperText={errors.lastName}
          />
          <TextField
            label="Email"
            name="email"
            value={formState.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formState.password}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.password}
            helperText={errors.password}
          />
          <FormControl
            component="fieldset"
            margin="normal"
            error={!!errors.program}
          >
            <FormLabel component="legend">Program</FormLabel>
            <RadioGroup
              aria-label="program"
              name="program"
              value={formState.program}
              onChange={handleInputChange}
            >
              <FormControlLabel
                value="MERIT"
                control={<Radio />}
                label="MERIT"
              />
              <FormControlLabel
                value="RA7687"
                control={<Radio />}
                label="RA 7687"
              />
            </RadioGroup>
            <FormHelperText>{errors.program}</FormHelperText>
          </FormControl>
          <FormControl fullWidth margin="normal" error={!!errors.school}>
            <InputLabel>School</InputLabel>
            <Select
              name="school"
              value={formState.school}
              onChange={handleInputChange}
            >
              <MenuItem value="school1">School 1</MenuItem>
              <MenuItem value="school2">School 2</MenuItem>
              <MenuItem value="school3">School 3</MenuItem>
            </Select>
            <FormHelperText>{errors.school}</FormHelperText>
          </FormControl>
          <FormControl fullWidth margin="normal" error={!!errors.course}>
            <InputLabel>Course</InputLabel>
            <Select
              name="course"
              value={formState.course}
              onChange={handleInputChange}
            >
              <MenuItem value="course1">Course 1</MenuItem>
              <MenuItem value="course2">Course 2</MenuItem>
              <MenuItem value="course3">Course 3</MenuItem>
            </Select>
            <FormHelperText>{errors.course}</FormHelperText>
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                checked={agreedToTerms}
                onChange={handleCheckboxChange}
                color="primary"
              />
            }
            label="I agree to the Terms of Service and Data Privacy Policy"
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={!agreedToTerms}
          >
            Create Account
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default Registration;
