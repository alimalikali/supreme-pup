"use client";

import CustomImage from "@/components/image";
import { useCheckAuthQuery } from "@/global/features/auth/authApi";
import { useAddToCartMutation, useGetCartByUserIdQuery, useUpdateCartItemMutation } from "@/global/features/cart/cartApi";
import { Product as ProductTypes } from "@/types/products";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Price } from "./price";

type ProductProps = {
  product: ProductTypes;
};

export const Product = ({ product }: ProductProps) => {
  const { data: user } = useCheckAuthQuery({});
  const loggedInUser = user?._id;
  const [addToCart] = useAddToCartMutation();
  const [updateCartItem] = useUpdateCartItemMutation();
  const { data: existingCart } = useGetCartByUserIdQuery(loggedInUser);

  const { title, slug, thumbnail, price } = product ?? {};
  const imageUrl = thumbnail?.url || "/assets/svg/vercel.svg";

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

  if (!product) return null;

  return (
    <Link href={slug ? `/products/${slug}` : "/"} className="relative flex h-fit flex-col items-stretch rounded-2xl border border-solid border-gray-300 bg-white p-2 pb-0">
      <div className="relative flex h-full max-h-5/6 flex-col justify-stretch">
        <div className="row-span-5 aspect-[1] grow overflow-hidden rounded-xl border border-gray-300">{imageUrl && <CustomImage src={imageUrl} alt="Product Image" layout="fill" className="absolute inset-0 h-full w-full" loading="lazy" />}</div>
      </div>
      <main className="flex items-center justify-between">
        <div className="flex min-h-1/6 flex-col justify-start px-2 py-2 pb-4">
          <span>{title}</span>
          <b>
            <Price price={{ ...price, currency: price.currency as "USD" | "EUR" | "INR" }} />
          </b>
        </div>
        <div>
          <button onClick={handleAddToCart} className="relative flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-700 to-gray-600 p-3 shadow-lg transition-all duration-300 hover:scale-105">
            <ShoppingCart size={28} className="text-white" />
          </button>
        </div>
      </main>
    </Link>
  );
};
