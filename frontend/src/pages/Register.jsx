import NextLink from "next/link";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../features/authSlice";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Link as Links,
  TextField,
  Typography,
} from "@mui/material";

const Register = () => {
  const [fromData, setFromData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const { firstName, lastName, email, password } = fromData;

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
      firstName,
      lastName,
      email,
      password,
    };

    dispatch(register(userData));
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
                Create a new account
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Use your email to create a new account
              </Typography>
            </Box>
            <TextField
              fullWidth
              label="First Name"
              margin="normal"
              name="firstName"
              onChange={inputHandler}
              value={firstName}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Last Name"
              margin="normal"
              name="lastName"
              onChange={inputHandler}
              value={lastName}
              variant="outlined"
            />
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
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                ml: -1,
              }}
            >
              <Checkbox checked={false} name="policy" onChange={inputHandler} />
              <Typography color="textSecondary" variant="body2">
                I have read the{" "}
                <NextLink href="#" passHref>
                  <Links color="primary" underline="always" variant="subtitle2">
                    Terms and Conditions
                  </Links>
                </NextLink>
              </Typography>
            </Box>
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign Up Now
              </Button>
            </Box>
            <Typography color="textSecondary" variant="body2">
              Have an account?{" "}
              <Link to={"/login"} variant="subtitle2" underline="hover">
                Sign In
              </Link>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Register;
