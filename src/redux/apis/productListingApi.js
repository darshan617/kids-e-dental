import { apiSlice } from "../apiSlice";

const productListingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    productListing: builder.query({
      query: () => ({
        url: "/product-listings",
        method: "GET",
      }),
      providesTags: ["listing"],
    }),
  }),
});

export const { useProductListingQuery } = productListingApi;
