import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CafesPage from "./pages/CafesPage/CafesPage";
import CafesEditPage from "./pages/CafesEditPage/CafesEditPage";
import EmployeesPage from "./pages/EmployeesPage/EmployeesPage";
import EmployeesEditPage from "./pages/EmployeesEditPage/EmployeesEditPage";
import { ThemeProvider } from "@mui/material/styles";
import GlobalStyles from "@mui/material/GlobalStyles";
import CssBaseline from "@mui/material/CssBaseline";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import theme from "./ui_theme/myUiTheme";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <GlobalStyles
            styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
          />
          <CssBaseline />
          <div className="main">
            <Header />
            <div>
              <Routes>
                <Route path="/" element={<Navigate replace to="/cafes" />} />
                <Route path="/cafes" element={<CafesPage />} />
                <Route path="/edit-cafe" element={<CafesEditPage />} />
                <Route path="/employees" element={<EmployeesPage />} />
                <Route path="/edit-employee" element={<EmployeesEditPage />} />
                <Route path="*" element={<NotFoundPage/>} />
              </Routes>
            </div>

            <Footer />
          </div>
        </LocalizationProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
