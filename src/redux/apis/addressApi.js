import { apiSlice } from "../apiSlice";

const addressApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addAddress: builder.mutation({
      query: ({ body }) => ({
        url: "/add-address",
        method: "POST",
        body,
      }),
      invalidatesTags: ["address"],
    }),
    getAddress: builder.query({
      query: () => ({
        url: "/all-addresses",
        method: "GET",
      }),
      providesTags: ["address"],
    }),
    updateAddress: builder.mutation({
      query: ({ body }) => ({
        url: "/update-address",
        method: "POST",
        body,
      }),
      invalidatesTags: ["address"],
    }),
    deleteAddress: builder.mutation({
      query: ({ body }) => ({
        url: "/delete-address",
        method: "POST",
        body,
      }),
      invalidatesTags: ["address"],
    }),
  }),
});

export const {
  useAddAddressMutation,
  useGetAddressQuery,
  useUpdateAddressMutation,
  useDeleteAddressMutation
} = addressApi;
