import { apiSlice } from "../apiSlice";

const searchQueryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSearchQuery: builder.query({
      query: ({ search_query }) => ({
        url: `/search?query=${search_query}`,
        method: "GET",
      }),
      providesTags: ["search"],
    }),
  }),
});

export const { useGetSearchQueryQuery } = searchQueryApi;
