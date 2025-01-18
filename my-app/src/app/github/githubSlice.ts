import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export interface GithubState {
  users: any[];
  loading: boolean;
  error: string | null;
}

export const initialState: GithubState = {
  users: [],
  loading: false,
  error: null,
};

export const fetchGithubUsers = createAsyncThunk(
  "github/fetchGithubUsers",
  async (query: string) => {
    const response = await axios.get(
      `https://api.github.com/search/users?q=${query}`
    );
    return response.data.items;
  }
);

const githubSlice = createSlice({
  name: "github",
  initialState,
  reducers: {
    clearUsers: (state) => {
      state.users = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchGithubUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchGithubUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })

      .addCase(fetchGithubUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users";
      });
  },
});

export const { clearUsers } = githubSlice.actions;

export default githubSlice;
