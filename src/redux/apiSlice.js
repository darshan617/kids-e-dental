import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import Cookies from "js-cookie";

export const apiSlice = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,

    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      headers.set("Accept", "application/json");

      const token = Cookies.get("token");

      if (token) {
        try {
          let parsedToken;

          try {
            parsedToken = JSON.parse(token);
          } catch {
            parsedToken = token;
          }

          if (parsedToken) {
            headers.set("Authorization", `Bearer ${parsedToken}`);
          }
        } catch (error) {
          console.error("Error reading token:", error);
        }
      }

      return headers;
    },
  }),

  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },

  tagTypes: [
    "home",
    "auth",
    "category",
    "products",
    "wishlist",
    "listing",
    "checkout",
    "Cart",
    "coupon",
    "contactUs",
    "privacyPolicy",
    "termsConditions",
    "salesPolicy",
    "subscribeEmail",
  ],

  overrideExisting: true,

  endpoints: (builder) => ({}),
});
