import { apiSlice } from "../apiSlice";

const termsConditionsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTermConditionData: builder.query({ 
      query: () => ({
        url: "/terms-conditions",
        method: "GET",
      }),
      providesTags :["termsConditions"]
    }),
  }),
});

export const { useGetTermConditionDataQuery } = termsConditionsApi;