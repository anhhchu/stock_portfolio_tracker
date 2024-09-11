// useState is a hook from the react library that allows you to add state to functional components. It returns a pair of values: the current state and a function that updates it1.
import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
// import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
//  Formik is a library for building forms in React. It helps with getting values in and out of form state, validation and error messages, and handling form submission.
import { Formik } from "formik";
// yup is a JavaScript schema builder for value parsing and validation. It allows you to define a schema, transform a value to match, validate the shape of an existing value, or both
import * as yup from "yup";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetCompanyQuery } from "@/state/api";

const transSchema = yup.object().shape({
  symbol: yup.string().required("required"),
  date: yup
    .string()
    .required("required")
    .test("is-date", "Date must be in the format YYYY-MM-DD", (value) => {
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      return regex.test(value);
    }),
  quantity: yup
    .number()
    .min(1, "Quantity must be at least 1")
    .required("required"),
  costPerShare: yup
    .number()
    .min(0.01, "Cost per share must be more than 0")
    .required("required"),
});

const initialValuesTrans = {
  symbol: "",
  date: "",
  quantity: "",
  costPerShare: "",
};

const TransactionForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { palette } = useTheme();
  const userId = useSelector((state) => state.auth.user._id);
  const token = useSelector((state) => state.auth.token);
  // const navigate = useNavigate()
  const { data: companyData } = useGetCompanyQuery();
  let symbols = [];
  if (companyData) {
    symbols = companyData.map(
      (item) => `${item.Symbol} - ${item["Company Name"]}`
    );
  }

  const handleFormSubmit = async (values, onSubmitProps) => {
    await createTrans(values, onSubmitProps);
  };

  const createTrans = async (values, onSubmitProps) => {
    values.symbol = values.symbol.split('-')[0].trim();
    const savedTransResponse = await fetch(
      `http://localhost:1337/portfolio/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      }
    );
    //console.log(savedTransResponse.status);
    const savedTrans = await savedTransResponse.json();
    //console.log(savedTrans);
    onSubmitProps.resetForm();
    if (savedTransResponse.status === 201) {
      alert("Transaction saved successfully");
      window.location.reload(); // Refresh the page
    } else {
      setErrorMessage("Failed to save Transaction, please try again");
    }
  };

  return (
    
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesTrans}
      validationSchema={transSchema}
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
            display="flex"
            gap="100px"
            flexDirection="row"
            justifyContent="space-between"
            align="center"
            alignItems="center"
            sx={{
              "& .MuiInputBase-root": { border: "None" },
              "& .MuiInputLabel-outlined": { color: palette.grey[300] },
              "& .MuiTextField-root": { color: palette.grey[300] },
              "& .MuiInputBase-FormControl": { color: palette.grey[300] },
            }}
          >
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel id="symbol-label">Symbol</InputLabel>
              <Select
                labelId="symbol"
                id="symbol"
                value={values.symbol}
                onChange={handleChange}
                onBlur={handleBlur}
                name="symbol"
              >
                {symbols.map((symbol) => (
                  <MenuItem
                    value={symbol}
                    sx={{
                      backgroundColor: palette.background.light,
                      color: palette.grey[500]
                    }}
                  >
                    {symbol}
                  </MenuItem>
                ))}
              </Select>
              {Boolean(touched.symbol) && Boolean(errors.symbol) && (
                <FormHelperText>{errors.symbol}</FormHelperText>
              )}
            </FormControl>


            <TextField
              label="Purchase Date"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.date}
              name="date"
              error={Boolean(touched.date) && Boolean(errors.date)}
              helperText={touched.date && errors.date}
            />
            <TextField
              label="Share Quantity"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.quantity}
              name="quantity"
              error={Boolean(touched.quantity) && Boolean(errors.quantity)}
              helperText={touched.quantity && errors.quantity}
            />
            <TextField
              label="Cost Per Share"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.costPerShare}
              name="costPerShare"
              error={
                Boolean(touched.costPerShare) && Boolean(errors.costPerShare)
              }
              helperText={touched.costPerShare && errors.costPerShare}
            />
            {/* Button */}
            <Button
              type="submit"
              sx={{
                m: "0rem 0",
                p: "0.5rem",
                backgroundColor: palette.primary.light,
                color: palette.background.light,
                "&:hover": { color: palette.primary.light },
              }}
            >
              Submit
            </Button>
          </Box>
          <Typography sx={{ color: "red", fontSize: "0.5rem" }}>
            {errorMessage && `${errorMessage}`}
          </Typography>
        </form>
      )}
    </Formik>
  );
};

export default TransactionForm;
