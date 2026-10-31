import { apiSlice } from "../apiSlice";

const checkoutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBuyNow: builder.query({
      query: () => ({
        url: "/buy-now/get",
        method: "GET",
      }),
      providesTags: ["checkout"],
    }),
    updateCheckout: builder.mutation({
      query: ({ body }) => ({
        url: "/buy-now/update",
        method: "POST",
        body,
      }),
      invalidatesTags: ["checkout"],
    }),

    removeCheckoutItem: builder.mutation({
      query: ({ body }) => ({
        url: "/buy-now/remove",
        method: "POST",
        body,
      }),
      invalidatesTags: ["checkout"],
    }),
  }),
});

export const {
  useGetBuyNowQuery,
  useUpdateCheckoutMutation,
  useRemoveCheckoutItemMutation,
} = checkoutApi;
