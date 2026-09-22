import Cookies from "js-cookie";
import { apiSlice } from "../apiSlice";


const dummyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDummyData: builder.query({
      query: () => ({
        url: "/posts",
        method: "GET",
      }),
      providesTags: ["dummy"],
    }),
  }),
});

export const { useGetDummyDataQuery } = dummyApi;
