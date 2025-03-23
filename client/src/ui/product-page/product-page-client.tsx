"use client";

import { Button } from "@/components/button";
import Modal from "@/components/image-modal";
import { Typography } from "@/components/typography";
import { Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Product } from "@/types/products";






export default function ProductPageClient({ product }: { product: Product }) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <>

            <main className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative  min-h-screen">
                {/* Left Side - Images */}
                <div className="flex flex-col gap-10">
                    <div className="space-y-4">
                        <Modal
                            isOpen={!!selectedImage}
                            onClose={() => setSelectedImage(null)}
                            imageUrl={selectedImage || ""}
                        />
                        <Image
                            src={product.defaultVariant.firstImage.url}
                            alt={product.name}
                            width={600}
                            height={400}
                            className="w-full h-96 object-cover rounded-lg"
                            onClick={() => setSelectedImage(product.defaultVariant.firstImage.url)}
                        />

                        {/* Variant Thumbnails */}
                        <div className="grid grid-cols-3 gap-2">
                            {product.images.map((image, index) => (
                                <Image
                                    key={index}
                                    src={image.url}
                                    alt={`Product Image ${index + 1}`}
                                    width={150}
                                    height={100}
                                    className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-75"
                                    onClick={() => setSelectedImage(image.url)}
                                />
                            ))}
                        </div>
                    </div>

                </div>

                {/* Right Side - Details */}
                <div className="lg:sticky lg:top-32 lg:self-start">
                    <Typography variant="h1" className="text-3xl font-bold">
                        {product.name}
                    </Typography>
                    <Typography variant="p" className="text-gray-600 mt-2">
                        {product.description}
                    </Typography>

                    {/* Stock Status & Price */}
                    <div className="mt-4 flex items-center justify-between">
                        <Typography variant="h2" className="text-2xl font-semibold">
                            €{product.defaultVariant.defaultPrice.price.toFixed(2)}
                        </Typography>
                        <Typography
                            variant="p"
                            className={`text-sm font-medium ${product.stockStatus === "In Stock" ? "text-green-600" : "text-red-600"}`}
                        >
                            {product.stockStatus}
                        </Typography>
                    </div>

                    {/* Tags */}
                    <div className="mt-2 flex gap-2">
                        {product.tags.map((tag, index) => (
                            <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
                                #{tag}
                            </span>
                        ))}
                    </div>



                    {/* Warranty & Return Policy */}
                    <div className="mt-6 text-sm text-gray-700">
                        <p><strong>Warranty:</strong> {product.warranty}</p>
                        <p><strong>Return Policy:</strong> {product.returnPolicy}</p>
                    </div>




                    {/* Dimensions & Weight */}
                    {product.dimensions && (
                        <div className="mt-6">
                            <Typography variant="h2" className="text-xl font-semibold">Dimensions & Weight</Typography>
                            <div className="grid grid-cols-2 gap-x-10 gap-y-4 mt-2 text-gray-700">
                                <div className="flex justify-between">
                                    <Typography variant="p" className="font-bold">Height:</Typography>
                                    <Typography variant="p">{product.dimensions.height} cm</Typography>
                                </div>
                                <div className="flex justify-between">
                                    <Typography variant="p" className="font-bold">Width:</Typography>
                                    <Typography variant="p">{product.dimensions.width} cm</Typography>
                                </div>
                                <div className="flex justify-between">
                                    <Typography variant="p" className="font-bold">Depth:</Typography>
                                    <Typography variant="p">{product.dimensions.depth} cm</Typography>
                                </div>
                                <div className="flex justify-between">
                                    <Typography variant="p" className="font-bold">Weight:</Typography>
                                    <Typography variant="p">{product.weight} kg</Typography>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Add to Cart Button */}
                    <Button className="mt-6 bg-foreground w-full" size="lg">
                        Add to Cart
                    </Button>
                </div>

                {/* Reviews */}
                <div className="mt-6">
                    <Typography variant="h2" className="text-xl font-semibold">Reviews</Typography>
                    <div className="mt-2 space-y-4">
                        {product.reviews.map((review, index) => (
                            <div key={index} className="border p-4 rounded-lg">
                                <Typography variant="h3" className="font-medium">
                                    {review.user}
                                </Typography>
                                <div className="flex items-center mt-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={16}
                                            className={i < review.rating ? "text-yellow-500" : "text-gray-300"}
                                        />
                                    ))}
                                </div>
                                <Typography variant="p" className="text-gray-600 mt-1">
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
