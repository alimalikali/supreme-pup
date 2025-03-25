import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    credentials: "include", // Required for cookies/auth
  }),
  tagTypes: ["Auth", "User"],
  endpoints: () => ({}), // Will be extended later
});

export default api;
