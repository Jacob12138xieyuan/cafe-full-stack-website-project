import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from "../config";

export const fetchCafes = createAsyncThunk("cafes", async () => {
  const response = await fetch(`${config.apiUrl}/cafes`);
  const cafes = await response.json();
  return cafes;
});

const cafesSlice = createSlice({
  name: "cafes",
  initialState: null,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCafes.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default cafesSlice.reducer;
