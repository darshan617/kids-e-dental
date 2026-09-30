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

    login: builder.mutation({
      query: ({ body }) => {
        return {
          url: "/login",
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["register"],
    }),

    resetPassword: builder.mutation({
      query: ({ body }) => {
        return {
          url: "/reset-password",
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["register"],
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useResetPasswordMutation  } = registerApi;
