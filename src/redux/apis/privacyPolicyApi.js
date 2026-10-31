import { apiSlice } from "../apiSlice";

const privacyPolicyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPolicyData: builder.query({ 
      query: () => ({
        url: "/privacy-policy",
        method: "GET",
      }),
      providesTags :["privacyPolicy"]
    }),
  }),
});

export const { useGetPolicyDataQuery } = privacyPolicyApi;