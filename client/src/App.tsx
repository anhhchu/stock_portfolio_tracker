import { useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { ThemeProvider } from "@mui/material";
import { CssBaseline } from "@mui/material";
import { Box } from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "@/scenes/navbar";
import Dashboard from "@/scenes/dashboard";
import LoginPage from "@/scenes/loginPage";
import { useSelector } from "react-redux";

// import Predictions from "@/scenes/predictions";

function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);
  const isAuth = Boolean(useSelector((state) => state.auth.token));

  return (
    <div className="app">
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
          <Navbar/>
          <Routes>
            <Route path="/" element={<LoginPage />}/>
            <Route
              path={`/home`}
              element={ isAuth ? <Dashboard /> : <Navigate to="/" /> }
            />
          </Routes>
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  </div>
  )  
}

export default App;


