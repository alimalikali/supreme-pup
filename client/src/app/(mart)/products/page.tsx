"use client";
import { useGetProductsQuery } from "@/global/features/products/productAPI";
import { Product as PType } from "@/types/products";
import { Product } from "@/ui/product-slider/product";

const Products = () => {
  const { data: products, error, isLoading } = useGetProductsQuery();

  if (isLoading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Failed to load products.</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">All Products</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">{products.map((item: PType, index: number) => (!!item ? <Product key={index} product={item} /> : null))}</div>
    </div>
  );
};

export default Products;
