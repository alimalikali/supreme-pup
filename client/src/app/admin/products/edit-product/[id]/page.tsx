"use client"; // If using Next.js App Router

import { useFileHandler } from "6pp";
import { useGetProductByIdQuery, useUpdateProductMutation } from "@/global/features/products/productAPI";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const EditProduct = () => {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const { data: product, isLoading, error } = useGetProductByIdQuery(id);
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priceOriginal, setPriceOriginal] = useState("");
  const [priceCurrent, setPriceCurrent] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");

  // Shipping Details
  const [weight, setWeight] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [depth, setDepth] = useState("");
  const [availableRegions, setAvailableRegions] = useState("");

  const [thumbnail, setThumbnail] = useState("");
  const [images, setImages] = useState([]);

  // File handling with useFileHandler
  const thumbnailHandler = useFileHandler("single");
  const imagesHandler = useFileHandler("multiple", 10, 5);

  useEffect(() => {
    if (product) {
      setTitle(product.title || "");
      setDescription(product.description || "");
      setPriceOriginal(product.price?.original?.toString() || "");
      setPriceCurrent(product.price?.current?.toString() || "");
      setCategory(product.category?._id || "");
      setBrand(product.brand?._id || "");
      setStockQuantity(product.stockQuantity?.toString() || "");
      setWeight(product.shipping?.weight?.toString() || "");
      setWidth(product.shipping?.dimensions?.width?.toString() || "");
      setHeight(product.shipping?.dimensions?.height?.toString() || "");
      setDepth(product.shipping?.dimensions?.depth?.toString() || "");
      setAvailableRegions(product.shipping?.availableRegions || "");
      // Load existing images
      // Load existing images
      if (product.thumbnail) {
        setThumbnail(product.thumbnail.url);
      }

      if (product.images && product.images.length > 0) {
        setImages(product.images.map((img: { url: any }) => img.url));
      }
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!product?._id) {
      toast.error("Invalid product ID!");
      return;
    }

    const form = new FormData();
    form.append("title", title);
    form.append("description", description);
    form.append("price[original]", priceOriginal);
    form.append("price[current]", priceCurrent);
    form.append("category", category);
    form.append("brand", brand);
    form.append("stockQuantity", stockQuantity);

    form.append("shipping[weight]", weight);
    form.append("shipping[dimensions][width]", width);
    form.append("shipping[dimensions][height]", height);
    form.append("shipping[dimensions][depth]", depth);
    form.append("shipping[availableRegions]", availableRegions);

    if (thumbnailHandler.file) {
      form.append("thumbnail", thumbnailHandler.file);
    }

    if (imagesHandler.file && imagesHandler.file.length > 0) {
      imagesHandler.file.forEach((image) => {
        form.append("images", image);
      });
    }

    try {
      await updateProduct({ id: product._id, data: form }).unwrap();
      toast.success("Product updated successfully!");
      router.push("/admin/products");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Update failed! Check console for details.");
    }
  };

  // Loading and Error States
  if (isLoading) return <div>Loading product...</div>;
  if (error) return <div>Error loading product.</div>;

  return (
    <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-bold">Edit Product</h2>
      {error && <p className="text-red-500">Error: Something went wrong</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
        <input name="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Product Title" className="w-full rounded border p-2" required />
        <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="w-full rounded border p-2" required />
        <input type="number" name="priceOriginal" value={priceOriginal} onChange={(e) => setPriceOriginal(e.target.value)} placeholder="Original Price" className="w-full rounded border p-2" required />
        <input type="number" name="priceCurrent" value={priceCurrent} onChange={(e) => setPriceCurrent(e.target.value)} placeholder="Current Price" className="w-full rounded border p-2" required />
        <input name="category" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category ID" className="w-full rounded border p-2" required />
        <input name="brand" value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Brand ID" className="w-full rounded border p-2" required />
        <input type="number" name="stockQuantity" value={stockQuantity} onChange={(e) => setStockQuantity(e.target.value)} placeholder="Stock Quantity" className="w-full rounded border p-2" required />

        <h3 className="mt-4 font-semibold">Shipping Details</h3>
        <input name="weight" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Weight (kg)" className="w-full rounded border p-2" required />
        <input name="width" value={width} onChange={(e) => setWidth(e.target.value)} placeholder="Width (cm)" className="w-full rounded border p-2" required />
        <input name="height" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="Height (cm)" className="w-full rounded border p-2" required />
        <input name="depth" value={depth} onChange={(e) => setDepth(e.target.value)} placeholder="Depth (cm)" className="w-full rounded border p-2" required />
        <input name="availableRegions" value={availableRegions} onChange={(e) => setAvailableRegions(e.target.value)} placeholder="Available Regions" className="w-full rounded border p-2" required />

        <h3 className="mt-4 font-semibold">Product Images</h3>

        {/* Thumbnail */}
        <label className="block font-medium">Thumbnail</label>
        <input type="file" accept="image/*" onChange={thumbnailHandler.changeHandler} className="w-full rounded border p-2" />

        {/* Show newly uploaded preview OR existing image */}
        {thumbnailHandler.preview ? <Image src={thumbnailHandler.preview} alt="Thumbnail" width={128} height={128} className="mt-2 h-32 w-32 object-cover" /> : thumbnail ? <Image src={thumbnail} alt="Existing Thumbnail" width={128} height={128} className="mt-2 h-32 w-32 object-cover" /> : null}

        {thumbnailHandler.error && <p className="text-red-500">{thumbnailHandler.error}</p>}

        {/* Additional Images */}
        <label className="block font-medium">Additional Images</label>
        <input type="file" accept="image/*" multiple onChange={imagesHandler.changeHandler} className="w-full rounded border p-2" />

        {/* Show newly uploaded images */}
        {imagesHandler.preview && imagesHandler.preview.map((img, i) => <Image key={`new-${i}`} src={img} alt={`New Image ${i}`} width={96} height={96} className="mt-2 inline-block h-24 w-24 object-cover" />)}

        {/* Show existing images */}
        {images.length > 0 && images.map((img, i) => <Image key={`existing-${i}`} src={img} alt={`Existing Image ${i}`} width={96} height={96} className="mt-2 inline-block h-24 w-24 object-cover" />)}

        {imagesHandler.error && <p className="text-red-500">{imagesHandler.error}</p>}

        <button disabled={isUpdating} type="submit" className="w-full rounded bg-blue-500 p-2 text-white">
          {isUpdating ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
