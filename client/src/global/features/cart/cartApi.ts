import api from "@/global/apiSlice";

export const cartApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // ✅ Add to Cart
    addToCart: builder.mutation({
      query: (cartItem) => {
        console.log("Adding to cart:", cartItem); // Debugging log
        return {
          url: "/api/cart",
          method: "POST",
          body: cartItem,
        };
      },
      invalidatesTags: ["Cart"],
    }),

    // ✅ Get Cart by User ID
    getCartByUserId: builder.query({
      query: (userId) => `/api/cart/user/${userId}`,
      providesTags: ["Cart"],
    }),

    // ✅ Update Cart Item by ID
    updateCartItem: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/api/cart/${id}`,
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: ["Cart"],
    }),

    // ✅ Delete Cart Item by ID
    removeFromCart: builder.mutation({
      query: (id) => ({
        url: `/api/cart/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),

    // ✅ Clear Cart for a User
    clearCart: builder.mutation({
      query: (userId) => ({
        url: `/api/cart/user/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const { useAddToCartMutation, useGetCartByUserIdQuery, useUpdateCartItemMutation, useRemoveFromCartMutation, useClearCartMutation } = cartApi;
