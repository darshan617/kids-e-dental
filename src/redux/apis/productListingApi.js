import { apiSlice } from "../apiSlice";

const productListingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    productListing: builder.query({
      query: ({
        category_slug,
        subcategory_slug,
        child_category_slug,
        min_price,
        max_price,
      }) => ({
        url: "/product-listings",
        params: {
          ...(category_slug ? { category_slug } : {}),
          ...(subcategory_slug ? { subcategory_slug } : {}),
          ...(child_category_slug ? { child_category_slug } : {}),
          ...(min_price !== undefined ? { min_price } : {}),
          ...(max_price !== undefined ? { max_price } : {}),
        },
        method: "GET",
      }),
      providesTags: ["listing", "home"],
    }),
  }),
});

export const { useProductListingQuery } = productListingApi;
