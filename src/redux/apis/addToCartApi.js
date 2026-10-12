import { apiSlice } from "../apiSlice";

const addToCartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: ({ body }) => ({
        url: "/add-to-cart",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useAddToCartMutation } = addToCartApi;
