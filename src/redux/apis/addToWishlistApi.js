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
        url: "/getWishlist",
        method: "GET", 
      }),
      providesTags: ["wishlist"],
    }),
  }),
});

export const { useAddToWishlistMutation, useGetWishlistQuery } =
  addToWishlistApi;
