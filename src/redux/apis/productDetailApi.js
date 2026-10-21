import { apiSlice } from "../apiSlice";

const productDetailApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductDetails: builder.query({
      query: ({ slug }) => ({
        url: `/product/${slug}`,
        method: "GET",
      }),
      providesTags: ["products"],
    }),
  }),
});

export const { useGetProductDetailsQuery } = productDetailApi;
