import { apiSlice } from "../apiSlice";

const userProfileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateUserProfile: builder.mutation({
      query: ({ body }) => ({
        url: "user-profile/update",
        method: "POST",
        body,
      }),
      invalidatesTags: ["profile"],
    }),
  }),
});

export const { useUpdateUserProfileMutation } = userProfileApi;
