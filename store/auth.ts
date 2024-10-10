import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
    },
  },
});

export type authState = typeof initialState;
export const setToken = authSlice.actions.setToken;
export default authSlice.reducer;
