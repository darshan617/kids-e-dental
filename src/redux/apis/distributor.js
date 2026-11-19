import { apiSlice } from "../apiSlice";

const distributorApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    becomeDistributor: builder.mutation({
      query: (body) => ({
        url: "/distributor-enquiries",
        method: "POST",
        body,
      }),
      invalidatesTags: ["distributor"],
    }),
  }),
});

export const { useBecomeDistributorMutation } = distributorApi;
