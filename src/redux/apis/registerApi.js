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
      invalidatesTags: ["auth"],
    }),

    login: builder.mutation({
      query: ({ body }) => {
        return {
          url: "/login",
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["auth"],
    }),

    resetPassword: builder.mutation({
      query: ({ body }) => {
        return {
          url: "/reset-password",
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["auth"],
    }),
    verifyOtp: builder.mutation({
      query: ({ body }) => {
        return {
          url: "/verify-otp",
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["auth"],
    }),
    resendOtp: builder.mutation({
      query: ({ body }) => {
        return {
          url: "/resend-otp",
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useResetPasswordMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useAddToCartMutation,
} = registerApi;
