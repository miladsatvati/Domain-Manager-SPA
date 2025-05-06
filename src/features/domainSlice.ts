import { createSlice } from "@reduxjs/toolkit";
import type { DomainState } from "../types/types";



const initialState: {
  domains: DomainState[];
} = {
  domains: [],
};

const domainSlice = createSlice({
  name: "domain",
  initialState,
  reducers: {},
});


export const domainReducer = domainSlice.reducer;
