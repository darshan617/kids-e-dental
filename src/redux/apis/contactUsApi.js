import { apiSlice } from "../apiSlice";

const contactUsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    contactUs: builder.mutation({ 
      query: ({body}) => ({
        url: "/contact-enquiry",
        method: "POST",
        body
      }),
      invalidatesTags: ["contactUs"]
    }),
  }),
});

export const { useContactUsMutation } = contactUsApi;