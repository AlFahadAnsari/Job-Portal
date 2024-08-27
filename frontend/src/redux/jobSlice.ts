import { createSlice } from "@reduxjs/toolkit";
// import { RootState } from "./store";

const JobSlice = createSlice({
  name: "job",
  initialState: {
    getAllJob: [],
    singleJob:null
  },

  reducers: {
    setAllJob: (state, action) => {
      state.getAllJob = action.payload;
    },
    setSingleJob :(state , action)=>{
      state.singleJob = action.payload
    }
  },
});

export const { setAllJob , setSingleJob } = JobSlice.actions;
export default JobSlice.reducer;
