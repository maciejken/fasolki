import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Buffer } from 'buffer';

import { Status } from "../../types";
import { RootState } from "../../store";
import { AuthState, JwtPayload } from "./types";

export const initialState: AuthState = {
  status: "loading",
  token: null,
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
export const selectAuthToken = createSelector(selectAuth, (auth: AuthState): string | null => auth.token);
export const selectAuthenticatedUserId = createSelector(selectAuthToken, (token: string | null): string | null => {
  let userId = null;

  if (token) {
    const [_, base64Payload] = token.split('.');
    const { sub }: JwtPayload = JSON.parse(Buffer.from(base64Payload, 'base64').toString('ascii'));
    userId = sub || null;
  }

  return userId;
})

export default authSlice.reducer;