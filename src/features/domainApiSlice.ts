import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { DomainState } from "../types/types";

export const domainApiSlice = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://6797aa2bc2c861de0c6d964c.mockapi.io",
  }),
  tagTypes: ["Domain"],
  endpoints: (builder) => ({
    getDomains: builder.query<DomainState[], void>({
      query: () => "/domain",
      providesTags: ["Domain"],
    }),
  }),
});

export const { useGetDomainsQuery } = domainApiSlice;