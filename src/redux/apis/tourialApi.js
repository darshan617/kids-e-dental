import { apiSlice } from "../apiSlice";

const tourialApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTutorialData: builder.query({
      query: ({ slug }) => ({
        url: `tutorials/${slug}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetTutorialDataQuery } = tourialApi;
