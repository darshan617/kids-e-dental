import { apiSlice } from "../apiSlice";

const salesPolicyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSalesPolicyData: builder.query({
      query: () => ({
        url: "/sales-policy",
        method: "GET",
      }),
      providesTags: ["salesPolicy"],
    }),
  }),
});

export const { useGetSalesPolicyDataQuery } = salesPolicyApi;
