import { apiSlice } from "../apiSlice";

const addToCartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => ({
        url: "/get-cart",
        method: "GET",
      }),
      providesTags: ["Cart"], 
    }),

    addToCart: builder.mutation({
      query: ({ body }) => ({
        url: "/add-to-cart",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),

    updateCart: builder.mutation({
      query: ({ body }) => ({
        url: "/update-cart",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),

    removeCart: builder.mutation({
      query: ({ body }) => ({
        url: "/remove-cart-item",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useAddToCartMutation,
  useGetCartQuery,
  useUpdateCartMutation,
  useRemoveCartMutation,
} = addToCartApi;