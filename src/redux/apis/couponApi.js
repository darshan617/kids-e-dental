import { apiSlice } from "../apiSlice";

const couponApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAvailableCoupon: builder.query({
      query: () => ({
        url: "available-coupons",
        method: "GET",
      }),
      providesTags: ["coupon"],
    }),
    applyCoupon: builder.mutation({
      query: ({ body }) => ({
        url: "/apply-coupon",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["coupon", "checkout", "Cart"],
    }),
    removeCoupon: builder.mutation({
      query: ({ body }) => ({
        url: "/remove-coupon",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["checkout", "Cart"],
    }),
  }),
});

export const { useGetAvailableCouponQuery, useApplyCouponMutation, useRemoveCouponMutation } = couponApi;
