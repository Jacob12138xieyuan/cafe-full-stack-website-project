// store.js
import { configureStore } from "@reduxjs/toolkit";
import cafesReducer from "./cafesSlice";
import employeesReducer from "./employeesSlice";
import thunk from "redux-thunk";

const store = configureStore({
  reducer: {
    cafes: cafesReducer,
    employees: employeesReducer,
  },
  middleware: [thunk],
});

export default store;
