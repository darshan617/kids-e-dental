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
    getLocationDetails: builder.query({
      query: () => ({
        url: "/location-details",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetLocationQuery, useGetLocationDetailsQuery } = locationApi;
