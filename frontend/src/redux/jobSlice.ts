import { createSlice } from "@reduxjs/toolkit";
// import { RootState } from "./store";

const JobSlice = createSlice({
  name: "job",
  initialState: {
    getAllJob: [],
    getAdminJob: [],
    singleJob: null,
    searchJobByText: "",
    getaAppliedJob: [],
    searchHome: "",
  },

  reducers: {
    setAllJob: (state, action) => {
      state.getAllJob = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setGetAdminJob: (state, action) => {
      state.getAdminJob = action.payload;
    },
    setsearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
    setGetAppliedJob: (state, action) => {
      state.getaAppliedJob = action.payload;
    },
    setSearchHome: (state, action) => {
      state.searchHome = action.payload;
    },
  },
});

export const {
  setAllJob,
  setSingleJob,
  setGetAdminJob,
  setsearchJobByText,
  setGetAppliedJob,
  setSearchHome,
} = JobSlice.actions;
export default JobSlice.reducer;
