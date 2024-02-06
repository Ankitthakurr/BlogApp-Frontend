import { configureStore } from "@reduxjs/toolkit";
import blogs from "./blog/blogSlice";

export const store = configureStore({
  reducer: {
    blogs: blogs,
  },
});
