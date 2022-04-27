import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { login, reset } from "../features/authSlice";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";

const Login = () => {
  const [fromData, setFromData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = fromData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate(`/`);
    }
    dispatch(reset);
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const inputHandler = (e) => {
    setFromData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  return (
    <>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={submitHandler}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Sign in
              </Typography>
            </Box>
            <Box
              sx={{
                pb: 1,
                pt: 3,
              }}
            ></Box>
            <TextField
              fullWidth
              label="Email Address"
              margin="normal"
              name="email"
              onChange={inputHandler}
              type="email"
              value={email}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Password"
              margin="normal"
              name="password"
              onChange={inputHandler}
              type="password"
              value={password}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign In Now
              </Button>
            </Box>
            <Typography color="textSecondary" variant="body2">
              Don&apos;t have an account?{" "}
            
                <Link
                  to={"/register"}
                  variant="subtitle2"
                  underline="hover"
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  Sign Up
                </Link>
            
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
