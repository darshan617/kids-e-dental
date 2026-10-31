import { apiSlice } from "../apiSlice";

const productListingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    productListing: builder.query({
      query: () => ({
        url: "/product-listings",
        method: "GET",
      }),
      providesTags: ["listing", "home"],
    }),
  }),
});

export const { useProductListingQuery } = productListingApi;
