import { createSlice } from "@reduxjs/toolkit";
// import { RootState } from "./store";

const JobSlice = createSlice({
  name: "job",
  initialState: {
    getAllJob: [],
    getAdminJob: [],
    singleJob: null,
    searchJobByText:""
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
    setsearchJobByText:(state, action)=>{
        state.searchJobByText =action.payload
    }
  },
});

export const { setAllJob, setSingleJob, setGetAdminJob ,setsearchJobByText } = JobSlice.actions;
export default JobSlice.reducer;
