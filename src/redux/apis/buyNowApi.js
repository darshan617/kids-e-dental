import { apiSlice } from "../apiSlice";

const buyProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addBuyNow: builder.mutation({
      query: ({ body }) => ({
        url: "/buy-now/add",
        method: "POST",
        body,
      }),
      invalidatesTags: ["getBuyNowData"],
    }),
  }),
});

export const { useAddBuyNowMutation } = buyProductApi;
