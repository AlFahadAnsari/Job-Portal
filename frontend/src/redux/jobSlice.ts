import { createSlice } from "@reduxjs/toolkit";
// import { RootState } from "./store";

const JobSlice = createSlice({
  name: "job",
  initialState: {
    getAllJob: [],
  },

  reducers: {
    setAllJob: (state, action) => {
      state.getAllJob = action.payload;
    },
  },
});

export const { setAllJob } = JobSlice.actions;

// export const setAllJobs = (state: RootState) => state.job.getAllJob;
export default JobSlice.reducer;
