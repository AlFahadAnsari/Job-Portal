import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
  },
  reducers: {
    setLoadin: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoadin } = authSlice.actions;
export default authSlice.reducer;
