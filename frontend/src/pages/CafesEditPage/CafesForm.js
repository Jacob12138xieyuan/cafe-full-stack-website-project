import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { addCafeApi, editCafeApi } from "../../api/cafes_api";
import { fetchCafes } from "../../redux/cafesSlice";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import Cancel from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function CafesForm() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // edit status
  const [editSuccess, setEditSuccess] = useState("");
  const [editError, setEditError] = useState("");

  const editCafe = location.state;

  // if editCafe is available, use as init state
  const [cafeName, setCafeName] = useState(editCafe?.cafe_name || "");
  const [cafeNameError, setCafeNameError] = useState("");

  const [description, setDescription] = useState(editCafe?.description || "");
  const [descriptionError, setDescriptionError] = useState("");

  const [cafeLocation, setCafeLocation] = useState(editCafe?.location || "");
  const [cafeLocationError, setCafeLocationError] = useState("");

  const [logo, setLogo] = useState(editCafe?.logo || "");
  const [logoError, setLogoError] = useState("");

  // save button loading
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // button loading
    setSaving(true);

    // validate cafeName
    var validationError = false;

    if (!cafeName) {
      validationError = true;
      setCafeNameError("Cafe name is required!");
    } else {
      if (cafeName.length < 6 || cafeName.length > 10) {
        validationError = true;
        setCafeNameError("Name must be between 6 and 10 characters!");
      }
    }

    if (!logo) {
      validationError = true;
      setLogoError("Cafe logo is required!");
    } else {
      if (!logo.endsWith(".jpg")) {
        validationError = true;
        setLogoError("Cafe logo is not .jpg!");
      }
    }

    // validate description
    if (!description) {
      validationError = true;
      setDescriptionError("Description is required!");
    } else {
      if (description.length < 5) {
        validationError = true;
        setDescriptionError("Write at least 5 characters!");
      }
    }

    // validate location
    if (!cafeLocation) {
      validationError = true;
      setCafeLocationError("Location is required!");
    }

    if (validationError) {
      setSaving(false);
      return;
    }

    // no validation error
    try {
      // if editEmloyee, means edit not add
      if (editCafe) {
        // edit cafe in db
        await editCafeApi({
          cafe_id: editCafe.cafe_id,
          cafe_name: cafeName,
          description,
          location: cafeLocation,
          logo,
        });
      } else {
        // add cafe in db
        await addCafeApi({
          cafe_name: cafeName,
          description,
          location: cafeLocation,
          logo,
        });
      }
      // fetch cafes again
      dispatch(fetchCafes());
      // Reset the form fields
      setCafeName("");
      setDescription("");
      setCafeLocation("");
      setLogo("");
      setEditSuccess("Successfully added/edited a cafe! Redirecting...");
      setTimeout(() => {
        navigate("/cafes");
      }, 2000);
    } catch (error) {
      setEditError(error.message + ". " + error?.response?.data);
      setTimeout(() => {
        setEditError("");
      }, 3000);
    }
    setSaving(false);
  };

  return (
    <Container maxWidth="md">
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={editSuccess}
      >
        <Alert severity="success">Edit successful!</Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={editError}
      >
        <Alert severity="error">{editError}</Alert>
      </Snackbar>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="cafeName"
              label="Cafe Name"
              value={cafeName}
              fullWidth
              variant="standard"
              onChange={(event) => {
                setCafeName(event.target.value);
              }}
              error={cafeNameError.length > 0}
              helperText={cafeNameError}
              onFocus={() => setCafeNameError("")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="logo"
              label="Cafe logo"
              value={logo}
              fullWidth
              variant="standard"
              onChange={(event) => {
                setLogo(event.target.value);
              }}
              error={logoError.length > 0}
              helperText={logoError}
              onFocus={() => setLogoError("")}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              id="location"
              label="Location"
              value={cafeLocation}
              fullWidth
              autoComplete="address"
              variant="standard"
              onChange={(event) => {
                setCafeLocation(event.target.value);
              }}
              error={cafeLocationError.length > 0}
              helperText={cafeLocationError}
              onFocus={() => setCafeLocationError("")}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              multiline
              rows={4}
              id="description"
              label="Description "
              value={description}
              fullWidth
              autoComplete="description"
              variant="filled"
              onChange={(event) => {
                setDescription(event.target.value);
              }}
              error={descriptionError.length > 0}
              helperText={descriptionError}
              onFocus={() => setDescriptionError("")}
            />
          </Grid>

          <LoadingButton
            type="submit"
            loading={saving}
            fullWidth
            variant="contained"
            startIcon={<SaveIcon />}
            sx={{ mt: 3, mb: 2 }}
            style={{ marginLeft: "24px", marginTop: "40px" }}
          >
            Save
          </LoadingButton>
          <LoadingButton
            fullWidth
            variant="contained"
            startIcon={<Cancel />}
            sx={{ mt: 3, mb: 2 }}
            style={{ marginLeft: "24px", marginTop: "5px" }}
            color="error"
            onClick={() => navigate("/cafes")}
          >
            Cancel
          </LoadingButton>
        </Grid>
      </Box>
    </Container>
  );
}
