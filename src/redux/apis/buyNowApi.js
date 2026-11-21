import { apiSlice } from "../apiSlice";

const buyProductApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    addBuyNow: builder.mutation({
      query: ({ body }) => ({
        url: "/buy-now/add",
        method: "POST",
        body,
      }),
      invalidatesTags: ["checkout"],
    }),
  }),
});

export const { useAddBuyNowMutation } = buyProductApi;
