import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    // loading: false,
    user: null,
  },
  reducers: {
    // setLoadin: (state, action) => {
    //   state.loading = action.payload;
    // },
    setuser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setuser } = authSlice.actions;

export const setUser = (state: RootState) => state.auth.user;
export default authSlice.reducer;
