import { configureStore } from "@reduxjs/toolkit";
import { domainReducer } from "../features/domainSlice";
import { domainApiSlice } from "../features/domainApiSlice";

export const store = configureStore({
  reducer: {
    domain: domainReducer,
    [domainApiSlice.reducerPath]: domainApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(domainApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
