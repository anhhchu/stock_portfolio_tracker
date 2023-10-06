// useState is a hook from the react library that allows you to add state to functional components. It returns a pair of values: the current state and a function that updates it1.
import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
// import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
//  Formik is a library for building forms in React. It helps with getting values in and out of form state, validation and error messages, and handling form submission.
import { Formik } from "formik";
// yup is a JavaScript schema builder for value parsing and validation. It allows you to define a schema, transform a value to match, validate the shape of an existing value, or both
import * as yup from "yup";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "@/state";
//Dropzone is a component from the react-dropzone library that provides an HTML5-compliant drag-and-drop zone for files. It also provides additional functionality such as customizing the dropzone, displaying previews, and restricting file types and amounts
// import Dropzone from "react-dropzone";
// import FlexBetween from "@/components/FlexBetween";
import { useSelector } from "react-redux";

const registerSchema = yup.object().shape({
  name: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  name: "",
  email: "",
  password: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const [errorMessage, setErrorMessage] = useState("");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  const register = async (values, onSubmitProps) => {
    const savedUserResponse = await fetch(
      "http://localhost:1337/auth/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );
    // //console.log(savedUserResponse.status);
    const savedUser = await savedUserResponse.json();
    // //console.log(savedUser);
    onSubmitProps.resetForm();
    if (savedUserResponse.status === 201) {
      setPageType("login"); //redirect to login
      alert("User successfully created");
    } else {
      setErrorMessage("Fail to create user");
    }
  };

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("http://localhost:1337/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    //console.log(loggedInResponse);
    if (loggedInResponse.status === 200) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate(`/home`);
    } else {
      onSubmitProps.resetForm();
      setErrorMessage("Login unsuccessful");
    }
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(2, mixmax(0, 1fr))"
            sx = {{"& .MuiInputBase-root": { color: palette.grey[300], borderColor: "white" }}}
          >
            <Typography sx={{color: "red"}}>
              {errorMessage && `${errorMessage}`}
            </Typography>

            {isRegister && (
              <>
                <TextField
                  label="Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  name="name"
                  error={Boolean(touched.name) && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                  sx={{
                    gridColumn: "span 2",
                  }}
                  InputLabelProps={{
                    style: { color: 'white' },
                  }}
                />
              </>
            )}
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{
                gridColumn: "span 2",
              }}
              InputLabelProps={{
                style: { color: 'white' },
              }}
            />
            <TextField
              label="Password"
              type="password" // hide password value
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{
                gridColumn: "span 2",
              }}
              InputLabelProps={{
                style: { color: 'white' },
              }}
            />
          </Box>
          {/* Button */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.light,
                color: palette.background.default,
                "&:hover": { color: palette.primary.light },
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.light,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
