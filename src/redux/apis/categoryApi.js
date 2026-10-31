import { apiSlice } from "../apiSlice";

const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategoryData: builder.query({
      query: () => ({
        url: "/categories",
        method: "GET",
      }),
      providesTags: ["category"],
    }),
  }),
});

export const { useGetCategoryDataQuery } = categoryApi;
