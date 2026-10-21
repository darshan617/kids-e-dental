import { apiSlice } from "../apiSlice";

const productDetailApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    productDetails: builder.mutation({
      query: ({ slug, body }) => ({
        url: `/product/${slug}`,
        method: "POST",
        body: body
      }),
      invalidatesTags: ["products"],
    }),
  }),
});

export const { useProductDetailsMutation } = productDetailApi;
