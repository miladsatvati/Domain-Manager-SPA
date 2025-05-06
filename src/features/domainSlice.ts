import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { DomainState } from "../types/types";

const initialState: {
  domains: DomainState[];
  searchTerm: string;
} = {
  domains: [],
  searchTerm: "",
};

const domainSlice = createSlice({
  name: "domain",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

export const domainReducer = domainSlice.reducer;
export const { setSearchTerm } = domainSlice.actions;
