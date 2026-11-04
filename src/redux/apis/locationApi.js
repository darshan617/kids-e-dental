import { apiSlice } from "../apiSlice";

const locationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLocation: builder.query({
      query: () => ({
        url: "/location/check",
        method: "GET",
      }),
      providesTags: ["location"],
    }),
  }),
});

export const { useGetLocationQuery } = locationApi;
