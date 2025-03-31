"use client";

import { useCreateProductMutation } from "@/global/features/products/productAPI";
import { useFileHandler } from "6pp";
import React, { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";

const AddProduct = () => {
  const [createProduct, { isLoading, error }] = useCreateProductMutation();
  const router = useRouter();

  // State for product details
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

  // File handling with useFileHandler
  const thumbnailHandler = useFileHandler("single");
  const imagesHandler = useFileHandler("multiple", 10, 5);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
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
      console.log("Uploading files:", thumbnailHandler.file, imagesHandler.file);
      const response = await createProduct(form).unwrap();
      console.log(response);
      toast.success("Product added successfully!");
      router.push("/admin/products");
    } catch (err) {
      toast.error("Error adding product");
      console.error(err);
    }
  };

  return (
    <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-bold">Add Product</h2>
      {error && <p className="text-red-500">Error: Something went wrong</p>}
      <form onSubmit={onSubmit} encType="multipart/form-data" className="space-y-4">
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
        <label className="block font-medium">Thumbnail</label>
        <input type="file" accept="image/*" onChange={thumbnailHandler.changeHandler} className="w-full rounded border p-2" />
        {thumbnailHandler.preview && <Image width={100} height={100} src={thumbnailHandler.preview} alt="Thumbnail" className="mt-2 h-32 w-32 object-cover" />}
        {thumbnailHandler.error && <p className="text-red-500">{thumbnailHandler.error}</p>}

        <label className="block font-medium">Additional Images</label>
        <input type="file" accept="image/*" multiple onChange={imagesHandler.changeHandler} className="w-full rounded border p-2" />
        {imagesHandler.preview && imagesHandler.preview.map((img, i) => <Image  width={100} height={100} key={i} src={img} alt="Product Image" className="mt-2 inline-block h-24 w-24 object-cover" />)}
        {imagesHandler.error && <p className="text-red-500">{imagesHandler.error}</p>}

        <button disabled={isLoading} type="submit" className="w-full rounded bg-blue-500 p-2 text-white">
          {isLoading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
