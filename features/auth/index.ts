import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Status } from "../../types";
import { RootState } from "../../store";
import { AuthState } from "./types";

export const initialState: AuthState = {
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthStatus: (state: AuthState, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
    setAuthToken: (state: AuthState, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { setAuthStatus, setAuthToken } = authSlice.actions;
const selectAuth = (state: RootState): AuthState => state.auth;
export const selectAuthStatus = createSelector(selectAuth, (auth: AuthState): Status => auth.status);
export const selectAuthToken = createSelector(selectAuth, (auth: AuthState): string | undefined => auth.token);

export default authSlice.reducer;