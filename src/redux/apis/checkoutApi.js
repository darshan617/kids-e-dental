import { apiSlice } from "../apiSlice";

const checkoutApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getBuyNow: builder.query({
      query: () => ({
        url: "/buy-now/get",
        method: "GET",
      }),
      providesTags: ["checkout"],
      // Checkout is opened right after Buy Now. Always read the latest
      // buy-now payload instead of a cached empty cart from an earlier visit.
      refetchOnMountOrArgChange: true,
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
