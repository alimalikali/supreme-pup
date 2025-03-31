"use client";

import { Button } from "@/components/button";
import Modal from "@/components/image-modal";
import { Typography } from "@/components/typography";
import { useCheckAuthQuery } from "@/global/features/auth/authApi";
import { useAddToCartMutation, useGetCartByUserIdQuery, useUpdateCartItemMutation } from "@/global/features/cart/cartApi";
import { useGetProductBySlugQuery } from "@/global/features/products/productAPI";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function ProductPageClient({ slug }: { slug: string }) {
  const { data: user } = useCheckAuthQuery({});
  const loggedInUser = user?._id;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { data: product, error, isLoading } = useGetProductBySlugQuery(slug);
  const { data: existingCart } = useGetCartByUserIdQuery(loggedInUser);
  const [addToCart] = useAddToCartMutation();
  const [updateCartItem] = useUpdateCartItemMutation();

  if (isLoading) return <p className="text-center text-lg">Loading...</p>;
  if (error || !product) return notFound();

  const handleAddToCart = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();

    if (!loggedInUser) {
      toast.error("You must be logged in to add items to the cart.");
      return;
    }

    try {
      const existingItem = existingCart?.find((item: any) => item.product._id === product._id);

      if (existingItem) {
        await updateCartItem({
          id: existingItem._id,
          updatedData: { quantity: existingItem.quantity + 1 },
        }).unwrap();
        toast.success("Quantity updated in cart");
      } else {
        await addToCart({ user: loggedInUser, product: product?._id }).unwrap();
        toast.success("Item added to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart.");
    }
  };

  return (
    <>
      <div>
        <main className="relative grid min-h-screen grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Left Side - Images */}
          <div className="flex flex-col gap-10">
            <div className="space-y-4">
              <Modal isOpen={!!selectedImage} onClose={() => setSelectedImage(null)} imageUrl={selectedImage || ""} />
              <Image src={product.thumbnail.url} alt={product.title} width={600} height={400} className="h-96 w-full rounded-lg object-cover" onClick={() => setSelectedImage(product.thumbnail.url)} />
              {/* Additional Images */}
              <div className="grid grid-cols-3 gap-2">
                {product.images.map((image: { url: string }, index: number) => (
                  <Image key={index} src={image.url} alt={`Product Image ${index + 1}`} width={150} height={100} className="h-32 w-full cursor-pointer rounded-lg object-cover hover:opacity-75" onClick={() => setSelectedImage(image.url)} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Details */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Typography variant="h1" className="text-3xl font-bold">
              {product.slug}
            </Typography>
            <Typography variant="p" className="mt-2 text-gray-600">
              {product.description}
            </Typography>

            {/* Stock Status & Price */}
            <div className="mt-4 flex items-center justify-between">
              <Typography variant="h2" className="text-2xl font-semibold">
                ${product.price.current.toFixed(2)}
              </Typography>
              <Typography variant="p" className={`text-sm font-medium ${product.stockStatus === "In Stock" ? "text-green-600" : "text-red-600"}`}>
                {product.stockQuantity > 0 ? "In Stock" : "Out of Stock"}
              </Typography>
            </div>

            {/* Discount */}
            {product.price.discount && (
              <div className="mt-2 text-sm text-red-600">
                {product.price.discount.percentage}% Off (Expires on {new Date(product.price.discount.expiry).toLocaleDateString()})
              </div>
            )}

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
            {product.shipping && (
              <div className="mt-6">
                <Typography variant="h2" className="text-xl font-semibold">
                  Dimensions & Weight
                </Typography>
                <div className="mt-2 grid grid-cols-2 gap-x-10 gap-y-4 text-gray-700">
                  <div className="flex justify-between">
                    <Typography variant="p" className="font-bold">
                      Height:
                    </Typography>
                    <Typography variant="p">{product.shipping.dimensions.height} cm</Typography>
                  </div>
                  <div className="flex justify-between">
                    <Typography variant="p" className="font-bold">
                      Width:
                    </Typography>
                    <Typography variant="p">{product.shipping.dimensions.width} cm</Typography>
                  </div>
                  <div className="flex justify-between">
                    <Typography variant="p" className="font-bold">
                      Depth:
                    </Typography>
                    <Typography variant="p">{product.shipping.dimensions.depth} cm</Typography>
                  </div>
                  <div className="flex justify-between">
                    <Typography variant="p" className="font-bold">
                      Weight:
                    </Typography>
                    <Typography variant="p">{product.shipping.weight} kg</Typography>
                  </div>
                </div>
              </div>
            )}

            {/* Add to Cart Button */}
            <Button className="bg-foreground hover:bg-accent mt-6 w-full" size="lg" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </div>

          {/* Reviews */}
          {/* <div className="mt-6">
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
          </div> */}
        </main>
      </div>
    </>
  );
}
