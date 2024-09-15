import { createSlice } from "@reduxjs/toolkit";

const ApplicatntSlice = createSlice({
  name: "applicant",
  initialState: {
    applicants: [],
  
  },
  reducers: {
    setApplicants: (state, action) => {
      state.applicants = action.payload;
    },
 
  },
});

export const { setApplicants } = ApplicatntSlice.actions;
export default ApplicatntSlice.reducer;
