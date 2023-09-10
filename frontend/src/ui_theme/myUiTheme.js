import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#7d4e2d", // Brown color for primary elements
    },
    secondary: {
      main: "#f57c00", // Orange color for secondary elements
    },
    error: {
      main: "#d32f2f",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif", // Default font family
    h1: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      marginBottom: "1rem",
      textShadow: "0.1em 0.1em 0.15em #6f4e37",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: "bold",
      marginBottom: "0.75rem",
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      marginBottom: "0.5rem",
    },
    h4: {
      fontSize: "1.25rem",
      fontWeight: "bold",
      marginBottom: "0.25rem",
    },
    h5: {
      fontSize: "1.1rem",
      fontWeight: "bold",
      marginBottom: "0.25rem",
    },
    h6: {
      fontSize: "1rem",
      fontWeight: "bold",
      marginBottom: "0.25rem",
    },
  },
});

export default theme;
