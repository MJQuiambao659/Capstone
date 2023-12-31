import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Paper,
  FormControlLabel,
  Checkbox,
  Link,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SeiLogo from "../../assets/images/sei_logo.png";
import Image from "../../assets/images/dost-bg.jpg";
import Registration from "./Registration";
import { handleLoginSubmit } from "./LoginHandlers";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../../utils/loading";

const Login = () => {
  const [openModal, setOpenModal] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const initialLoginForm = {
    email: "",
    password: "",
    rememberMe: rememberMe,
  };

  const [loginState, setLoginState] = useState(initialLoginForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(loginState);
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
        loginState
      );

      if (response.data.token) {
        const roleResponse = await axios.get(
          "http://localhost:3001/api/user-role/role",
          {
            headers: {
              Authorization: `${response.data.token}`,
            },
          }
        );

        const role = roleResponse.data.role;
        const id = roleResponse.data.id;
        const expiresIn = roleResponse.data.expiresIn;

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("id", id);
        localStorage.setItem("role", role);
        localStorage.setItem("expiresIn", expiresIn);

        console.log(localStorage);

        if (role === "Admin") {
          navigate("/admin");
        } else if (role === "Moderator") {
          navigate("/moderator");
        } else if (role === "User") {
          navigate("/user");
        }
      }
    } catch (error) {
      if (error.response) {
        // The request was made, but the server responded with an error
        console.error(
          "Server responded with an error:",
          error.response.status,
          error.response.data
        );
      } else if (error.request) {
        // The request was made, but there was no response from the server
        console.error("No response from the server");
      } else {
        // Something else went wrong
        console.error("An error occurred:", error.message);
      }
    }
  };

  const handleLoginClick = () => {
    handleLoginSubmit(loginState, setErrors);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      if (role === "Admin") {
        navigate("/admin");
      } else if (role === "Moderator") {
        navigate("/moderator");
      } else if (role === "User") {
        navigate("/user");
      }
    }
    setTimeout(() => {
      setLoading(false);
    }, 750);
  }, [navigate]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div
        className="App"
        style={{
          backgroundImage: `url(${Image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container
          maxWidth="xs"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "80vh",
            ...(isMobile && {
              width: "90%",
            }),
          }}
        >
          <img
            src={SeiLogo}
            alt="logo"
            style={{ marginBottom: "2rem", height: "100px" }}
          />
          <Paper
            elevation={3}
            style={{
              padding: "1rem",
              width: "100%",
              backgroundColor: "rgba(0, 0, 0, .75)",
              color: "#FFFFFF",
              borderRadius: "20px",
            }}
          >
            <Typography variant="h5" component="h1" align="center" gutterBottom>
              Login
            </Typography>

            <form onSubmit={handleLogin}>
              <Grid item xs={12}>
                <Typography color="error" align="center" gutterBottom>
                  {errors && errors.invalidEmail}
                </Typography>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    type="email"
                    name="email"
                    value={loginState.email}
                    onChange={handleLoginChange}
                    fullWidth
                    variant="filled"
                    color="primary"
                    InputProps={{
                      style: { color: "#000000", backgroundColor: "#FFFFFF" },
                    }}
                    InputLabelProps={{
                      style: { color: "#000000" },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Password"
                    type="password"
                    name="password"
                    value={loginState.password}
                    onChange={handleLoginChange}
                    fullWidth
                    variant="filled"
                    color="primary"
                    InputProps={{
                      style: { color: "#000000", backgroundColor: "#FFFFFF" },
                    }}
                    InputLabelProps={{
                      style: { color: "#000000" },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        color="primary"
                        style={{ color: "#FFFFFF" }}
                      />
                    }
                    label="Remember me"
                    style={{ color: "#FFFFFF" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" fullWidth>
                    Login
                  </Button>
                </Grid>
              </Grid>
            </form>
            <Grid item xs={12}>
              <Typography align="center">
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography align="center">
                Don't have an account?{" "}
                <Link
                  to="register"
                  component="button"
                  variant="body2"
                  onClick={handleOpenModal}
                >
                  Create account
                </Link>
              </Typography>
            </Grid>
          </Paper>
        </Container>
        <Registration open={openModal} onClose={handleCloseModal} />
      </div>
    </>
  );
};

export default Login;
