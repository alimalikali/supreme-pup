import { api } from "./apiSlice";

// Define tag types
export type AuthTags = "Auth"; // Declare valid tags, "Auth" in this case

// Extend the base API with authentication-related endpoints
export const authApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // Check Auth status, provides the "Auth" tag
    checkAuth: builder.query({
      query: () => ({
        url: "/api/auth/check-auth",
      }),
      providesTags: ["Auth"], // This provides the "Auth" tag for this query
    }),

    // Login mutation, invalidates the "Auth" tag
    login: builder.mutation({
      query: (credentials) => ({
        url: "/api/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"], // This invalidates the "Auth" tag, causing a refetch of `checkAuth`
    }),

    // Signup mutation, invalidates the "Auth" tag
    signup: builder.mutation({
      query: (credentials) => ({
        url: "/api/auth/signup",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"], // This invalidates the "Auth" tag, causing a refetch of `checkAuth`
    }),

    // Logout mutation, invalidates the "Auth" tag
    logout: builder.mutation({
      query: () => ({
        url: "/api/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"], // This invalidates the "Auth" tag, causing a refetch of `checkAuth`
    }),
  }),
});

export const { useCheckAuthQuery, useLoginMutation, useLogoutMutation, useSignupMutation } = authApi;
