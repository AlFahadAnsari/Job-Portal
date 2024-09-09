import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

const companySlice = createSlice({
  name: "company",
  initialState: {
    singleCompany: null,
    getallComapny: [],
    searchComapny: "",
  },
  reducers: {
    SetSingleCompany: (state, action) => {
      state.singleCompany = action.payload;
    },
    setAllComapny: (state, action) => {
      state.getallComapny = action.payload;
    },
    setSearchCompany: (state, action) => {
      state.searchComapny = action.payload;
    },
  },
});

export const { SetSingleCompany, setAllComapny ,setSearchCompany } = companySlice.actions;

export const selectSingleCompany = (state: RootState) =>
  state.company.singleCompany;
export const selectAllComapny = (state: RootState) =>
  state.company.getallComapny;
export default companySlice.reducer;
