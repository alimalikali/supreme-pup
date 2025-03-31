import api from "@/global/apiSlice";

export const addressesApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    addAddress: builder.mutation({
      query: (address) => ({
        url: "/api/address",
        method: "POST",
        body: address,
      }),
      invalidatesTags: ["Addresses"], // ✅ This now works
    }),
    fetchAddressByUserId: builder.query({
      query: (id) => `/api/address/user/${id}`,
      providesTags: ["Addresses"], // ✅ Define this to enable invalidation
    }),
    updateAddressById: builder.mutation({
      query: (update) => ({
        url: `/api/address/${update._id}`,
        method: "PATCH",
        body: update,
      }),
      invalidatesTags: ["Addresses"], // ✅ This will now clear the cache
    }),
    deleteAddressById: builder.mutation({
      query: (id) => ({
        url: `/api/address/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Addresses"], // ✅ Ensures refetch after deletion
    }),
  }),
});

export const { useAddAddressMutation, useFetchAddressByUserIdQuery, useUpdateAddressByIdMutation, useDeleteAddressByIdMutation } = addressesApi;
