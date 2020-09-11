import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./apiSlice";

export default configureStore({
  reducer: {
    api: counterReducer,
  },
});
