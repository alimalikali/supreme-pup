"use client";

import { Button } from "@/components/button";
import Modal from "@/components/image-modal";
import { Typography } from "@/components/typography";
import { addToCart } from "@/lib/features/cart/cartSlice";
import { Product } from "@/types/products";
import { Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function ProductPageClient({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const dispatch = useDispatch();

  return (
    <>
      <main className="relative grid min-h-screen grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left Side - Images */}
        <div className="flex flex-col gap-10">
          <div className="space-y-4">
            <Modal isOpen={!!selectedImage} onClose={() => setSelectedImage(null)} imageUrl={selectedImage || ""} />
            <Image src={product.Variant.firstImage.url} alt={product.name} width={600} height={400} className="h-96 w-full rounded-lg object-cover" onClick={() => setSelectedImage(product.Variant.firstImage.url)} />

            {/* Variant Thumbnails */}
            <div className="grid grid-cols-3 gap-2">
              {product.images.map((image, index) => (
                <Image key={index} src={image.url} alt={`Product Image ${index + 1}`} width={150} height={100} className="h-32 w-full cursor-pointer rounded-lg object-cover hover:opacity-75" onClick={() => setSelectedImage(image.url)} />
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Details */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Typography variant="h1" className="text-3xl font-bold">
            {product.name}
          </Typography>
          <Typography variant="p" className="mt-2 text-gray-600">
            {product.description}
          </Typography>

          {/* Stock Status & Price */}
          <div className="mt-4 flex items-center justify-between">
            <Typography variant="h2" className="text-2xl font-semibold">
              €{product.Variant.price.price.toFixed(2)}
            </Typography>
            <Typography variant="p" className={`text-sm font-medium ${product.stockStatus === "In Stock" ? "text-green-600" : "text-red-600"}`}>
              {product.stockStatus}
            </Typography>
          </div>

          {/* Tags */}
          <div className="mt-2 flex gap-2">
            {product.tags.map((tag, index) => (
              <span key={index} className="rounded-full bg-gray-200 px-2 py-1 text-sm text-gray-700">
                #{tag}
              </span>
            ))}
          </div>

          {/* Warranty & Return Policy */}
          <div className="mt-6 text-sm text-gray-700">
            <p>
              <strong>Warranty:</strong> {product.warranty}
            </p>
            <p>
              <strong>Return Policy:</strong> {product.returnPolicy}
            </p>
          </div>

          {/* Dimensions & Weight */}
          {product.dimensions && (
            <div className="mt-6">
              <Typography variant="h2" className="text-xl font-semibold">
                Dimensions & Weight
              </Typography>
              <div className="mt-2 grid grid-cols-2 gap-x-10 gap-y-4 text-gray-700">
                <div className="flex justify-between">
                  <Typography variant="p" className="font-bold">
                    Height:
                  </Typography>
                  <Typography variant="p">{product.dimensions.height} cm</Typography>
                </div>
                <div className="flex justify-between">
                  <Typography variant="p" className="font-bold">
                    Width:
                  </Typography>
                  <Typography variant="p">{product.dimensions.width} cm</Typography>
                </div>
                <div className="flex justify-between">
                  <Typography variant="p" className="font-bold">
                    Depth:
                  </Typography>
                  <Typography variant="p">{product.dimensions.depth} cm</Typography>
                </div>
                <div className="flex justify-between">
                  <Typography variant="p" className="font-bold">
                    Weight:
                  </Typography>
                  <Typography variant="p">{product.weight} kg</Typography>
                </div>
              </div>
            </div>
          )}

          {/* Add to Cart Button */}
          <Button
            className="bg-foreground mt-6 w-full"
            size="lg"
            onClick={() => {
              const cartItem = {
                ...product,
                quantity: 1,
                id: product.id,
                // id: crypto.randomUUID(),
                price: product.Variant.price.price,
                name: product.name,
                image: product.Variant.firstImage.url,
              };

              console.log("DISPATCHING ADD TO CART:", cartItem.id);
              dispatch(addToCart(cartItem));
            }}
          >
            Add to Cart
          </Button>
        </div>

        {/* Reviews */}
        <div className="mt-6">
          <Typography variant="h2" className="text-xl font-semibold">
            Reviews
          </Typography>
          <div className="mt-2 space-y-4">
            {product.reviews.map((review, index) => (
              <div key={index} className="rounded-lg border p-4">
                <Typography variant="h3" className="font-medium">
                  {review.user}
                </Typography>
                <div className="mt-1 flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={i < review.rating ? "text-yellow-500" : "text-gray-300"} />
                  ))}
                </div>
                <Typography variant="p" className="mt-1 text-gray-600">
                  {review.comment}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
