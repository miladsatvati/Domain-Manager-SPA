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
    postDomain: builder.mutation<DomainState, DomainState>({
      query: (newDomain) => ({
        url: "/domain",
        method: "POST",
        body: newDomain,
      }),
      invalidatesTags: ["Domain"],
    }),
    getEachDomain: builder.query<DomainState, string>({
      query: (id) => `/domain/${id}`,
    }),
    updateDomain: builder.mutation<
      DomainState,
      { id: string; patch: Partial<DomainState> }
    >({
      query: ({ id, patch }) => ({
        url: `/domain/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["Domain"],
    }),
    deleteDomain: builder.mutation<void, string>({
      query: (id) => ({
        url: `/domain/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Domain"],
    }),
  }),
});

export const {
  useGetDomainsQuery,
  usePostDomainMutation,
  useGetEachDomainQuery,
  useUpdateDomainMutation,
  useDeleteDomainMutation,
} = domainApiSlice;
