import { apiSlice } from "../apiSlice";

const addToWishlistApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addToWishlist: builder.mutation({
      query: ({ body }) => ({
        url: "/add-to-wishlist",
        method: "POST",
        body,
      }),
      invalidatesTags: ["wishlist"],
    }),

    getWishlist: builder.query({
      query: () => ({
        url: "/get-wishlist",
        method: "GET",
      }),
      providesTags: ["wishlist"],
    }),
    removeFromWishlist: builder.mutation({
      query: ({ body }) => ({
        url: "/remove-cart-item",
        method: "POST",
        body,
      }),
      invalidatesTags: ["wishlist"],
    }),
  }),
});

export const { useAddToWishlistMutation, useGetWishlistQuery, useRemoveFromWishlistMutation } =
  addToWishlistApi;
