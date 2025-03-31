import api from "@/global/apiSlice";

export const orderApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: "/api/orders",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["Orders"],
    }),
    getOrderByUserId: builder.query({
      query: (id) => `/api/orders/user/${id}`,
      providesTags: ["Orders"],
    }),
    getAllOrders: builder.query({
      query: () => "/api/orders",
      providesTags: ["Orders"],
    }),
    updateOrderById: builder.mutation({
      query: (update) => ({
        url: `/api/orders/${update._id}`,
        method: "PATCH",
        body: update,
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrderByUserIdQuery, useGetAllOrdersQuery, useUpdateOrderByIdMutation } = orderApi;
