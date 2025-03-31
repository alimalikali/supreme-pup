import api from "@/global/apiSlice";

export const productAPI = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // 🔹 Get All Products (Filters, Sorting, Pagination)
    getProducts: builder.query<any, Record<string, any> | void>({
      query: (params) => ({
        url: "/api/products/",
        params: params || undefined,
      }),
      providesTags: ["Product"],
    }),

    // 🔹 Get Product by ID
    getProductById: builder.query<any, string>({
      query: (id) => `/api/products/id/${id}`,
      providesTags: ["Product"],
    }),

    // 🔹 Get Product by ID
    getProductBySlug: builder.query<any, string>({
      query: (slug) => `/api/products/${slug}`,
      providesTags: ["Product"],
    }),

    // 🔹 Create Product
    createProduct: builder.mutation<any, FormData>({
      query: (data) => ({
        url: "/api/products/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),

    // 🔹 Update Product
    updateProduct: builder.mutation<void, { id: string; data: Partial<FormData> }>({
      query: ({ id, data }) => ({
        url: `/api/products/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),

    // 🔹 Restore (Undelete) Product
    restoreProduct: builder.mutation<any, string>({
      query: (id) => ({
        url: `/api/products/undelete/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Product"],
    }),

    // 🔹 Permanently Delete Product
    deleteProductSoftly: builder.mutation<any, string>({
      query: (id) => ({
        url: `/api/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery, useCreateProductMutation, useGetProductBySlugQuery, useUpdateProductMutation, useRestoreProductMutation, useDeleteProductSoftlyMutation } = productAPI;
