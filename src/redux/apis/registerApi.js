import { apiSlice } from "../apiSlice";

const registerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: ({ body }) => {
        return {
          url: "/register",
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["register"],
    }),
  }),
});

export const { useRegisterMutation } = registerApi;
