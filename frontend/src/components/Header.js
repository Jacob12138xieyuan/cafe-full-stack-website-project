import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";

function Header() {
  const navigate = useNavigate();
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar sx={{ flexWrap: "wrap" }}>
        <img src={logo} alt="Logo" id="toolbar-logo" />
        <Typography
          variant="h4"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
          onClick={() => {
            navigate("/cafes");
          }}
          style={{ cursor: "pointer" }}
        >
          Fantastic Coffee
        </Typography>
        <nav>
          <Link
            variant="button"
            color="rgb(255,255,255)"
            href="/cafes"
            sx={{ my: 1, mx: 1.5 }}
          >
            Cafes We Have
          </Link>
          <Link
            variant="button"
            color="rgb(255,255,255)"
            href="/employees"
            sx={{ my: 1, mx: 1.5 }}
          >
            Our Employees
          </Link>
          <Link
            variant="button"
            color="rgb(255,255,255)"
            href="#"
            sx={{ my: 1, mx: 1.5 }}
          >
            Support
          </Link>
        </nav>
        <Button
          href=""
          variant="outlined"
          sx={{ my: 1, mx: 1.5 }}
          style={{
            color: "#ffffff",
            border: "1px solid #ffffff",
          }}
        >
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
}
export default Header;
