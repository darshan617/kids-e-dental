import { apiSlice } from "../apiSlice";

const homeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHomeData: builder.query({ 
      query: () => ({
        url: "/home",
        method: "GET",
      }),
      providesTags: ['home']
    }),
  }),
});

export const { useGetHomeDataQuery } = homeApi;