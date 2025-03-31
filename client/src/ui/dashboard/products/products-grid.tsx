"use client";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { useDeleteProductSoftlyMutation, useGetProductsQuery } from "@/global/features/products/productAPI";
import { Product as PType } from "@/types/products";
import { Edit, Edit2, Grid, List, Search, Trash, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ProductsGrid = () => {
  const { data: products } = useGetProductsQuery();
  const [deleteProductSoftly] = useDeleteProductSoftlyMutation();
  const router = useRouter();

  const [filteredProducts, setFilteredProducts] = useState<PType[]>([]);
  useEffect(() => {
    if (products) {
      setFilteredProducts(products);
    }
  }, [products]);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [productToDelete, setProductToDelete] = useState<PType | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterProducts(query);
  };

  const filterProducts = (query: string) => {
    if (!query) {
      setFilteredProducts(products);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const result = products.filter((product: PType) => product.title.toLowerCase().includes(lowerQuery) || product.category.name.toLowerCase().includes(lowerQuery));

    setFilteredProducts(result);
  };

  // 🔹 Navigate to edit page
  const handleEdit = (id: string) => {
    router.push(`/admin/products/edit-product/${id}`);
  };

  // **SHOW CONFIRMATION BEFORE DELETE**
  const confirmDelete = (product: PType) => {
    setProductToDelete(product);
  };

  // **HANDLE DELETE AFTER CONFIRMATION**
  const handleDelete = async () => {
    if (!productToDelete) return;

    try {
      await deleteProductSoftly(productToDelete._id);
      setFilteredProducts((prev) => prev.filter((p) => p._id !== productToDelete._id));
      toast.success("Product Deleted Successfully");
    } catch {
      toast.error("Failed To Delete Product");
    } finally {
      setProductToDelete(null);
    }
  };

  return (
    <div className="">
      <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="relative w-full sm:w-auto">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input type="search" placeholder="Search products..." className="w-full pl-10 sm:w-[300px]" value={searchQuery} onChange={handleSearch} />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex overflow-hidden rounded-md border">
            <Button variant={viewMode === "grid" ? "primary" : "outline"} size="sm" onClick={() => setViewMode("grid")} className="rounded-none">
              <Grid size={18} />
            </Button>
            <Button variant={viewMode === "list" ? "primary" : "outline"} size="sm" onClick={() => setViewMode("list")} className="rounded-none">
              <List size={18} />
            </Button>
          </div>
          {/* <Button>Add Product</Button> */}
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <div key={product._id} className="border-border overflow-hidden rounded-lg border bg-white p-0 shadow-sm transition-all hover:scale-105 hover:shadow-2xl">
              <div className="bg-muted relative h-60 rounded-md">
                <Image src={product.thumbnail.url} alt={product.title} height={1000} width={1000} className="h-full w-full rounded-md object-cover" />
                <div className="absolute top-2 right-2 flex gap-1">
                  {/* EDIT BUTTON */}
                  <div className="flex size-8 cursor-pointer items-center justify-center rounded-md bg-gray-700" onClick={() => handleEdit(product._id)}>
                    <Edit2 size={16} className="size-5 text-white" />
                  </div>
                  {/* DELETE BUTTON */}
                  <div className="flex size-8 cursor-pointer items-center justify-center rounded-md bg-red-700" onClick={() => confirmDelete(product)}>
                    <Trash2 size={16} className="size-5 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="mb-2 flex items-start justify-between">
                  <h3 className="font-medium">{product.title}</h3>
                  <span className="bg-primary/10 text-primary rounded px-2 py-0.5 text-sm">${product.price.current}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{product.category.name}</span>
                  <span className={`font-medium ${product.stockQuantity > 10 ? "text-lime-700" : "text-red-700"}`}>{product.stockQuantity} in stock</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="pb-2 text-left font-medium">Product</th>
                <th className="pb-2 text-left font-medium">Category</th>
                <th className="pb-2 text-right font-medium">Price</th>
                <th className="pb-2 text-right font-medium">Stock</th>
                <th className="pb-2 text-right font-medium">Brand</th>
                <th className="pb-2 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product._id} className="border-b last:border-0">
                  <td className="py-3">
                    <div className="flex items-center space-x-3">
                      <div className="bg-muted h-10 w-10 overflow-hidden rounded-md">
                        <Image src={product.thumbnail.url} alt={product.title} height={1000} width={1000} className="h-full w-full rounded-md object-cover" />
                      </div>
                      <span className="font-medium">{product.title}</span>
                    </div>
                  </td>
                  <td className="py-3">{product.category.name}</td>
                  <td className="py-3 text-right">${product.price.current}</td>
                  <td className="py-3 text-right">
                    <span className={`font-medium ${product.stockQuantity > 10 ? "text-lime-700" : "text-red-700"}`}>{product.stockQuantity} in stock</span>
                  </td>
                  <td className="py-3 text-right font-medium">{product.brand.name}</td>

                  <td className="py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Button onClick={() => handleEdit(product._id)} variant="outline" size="sm" className="border-0 text-black">
                        <Edit size={16} />
                      </Button>
                      <Button onClick={() => confirmDelete(product)} variant="outline" size="sm" className="border-0 text-black">
                        <Trash size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredProducts.length === 0 && (
            <div className="py-8 text-center">
              <p className="text-muted-foreground">No products found</p>
            </div>
          )}
        </div>
      )}
      {productToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-4 text-lg font-semibold">Confirm Deletion</h3>
            <p>
              Are you sure you want to delete <strong>{productToDelete.title}</strong>?
            </p>
            <div className="mt-4 flex justify-end gap-3">
              <Button onClick={() => setProductToDelete(null)} variant="outline">
                Cancel
              </Button>
              <Button onClick={handleDelete} className="bg-red-600 text-white">
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsGrid;
