import { configureStore } from "@reduxjs/toolkit";
import githubSlice from "./github/githubSlice";


const store = configureStore({
  reducer: {
    github: githubSlice.reducer, // Add the reducer
  },
});

export type RootState = ReturnType<typeof store.getState>; // Type for the state
export type AppDispatch = typeof store.dispatch; // Type for the dispatch

export default store;