import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from "../config";

export const fetchEmployees = createAsyncThunk("employees", async () => {
  const response = await fetch(`${config.apiUrl}/employees`);
  const employees = await response.json();
  return employees;
});

const employeesSlice = createSlice({
  name: "employees",
  initialState: null,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEmployees.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default employeesSlice.reducer;
