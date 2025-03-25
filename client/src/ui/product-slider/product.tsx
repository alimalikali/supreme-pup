"use client";

import { Button } from "@/components/button";
import CustomImage from "@/components/image";
import { addToCart } from "@/lib/features/cart/cartSlice";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { Price } from "./price";

type ProductProps = {
  product: {
    id: string;
    name?: string | null;
    path?: string | null;
    Variant?: { firstImage: { url: string | null } | null; price: any | null } | null;
    variants?: Array<{ sku?: string | null; firstImage: { url: string | null } | null } | null> | null;
  } | null;
};

export const Product = ({ product }: ProductProps) => {
  const { name, path, Variant, variants } = product ?? {};
  const { firstImage, price } = Variant ?? {};
  const totalVariants = variants?.length || 0;

  const dispatch = useDispatch();

  return (
    <Link href={path ? `/products/${path.substring(1)}` : "/"} className="text-foreground text-primary relative flex h-fit flex-col items-stretch rounded-2xl border border-solid border-gray-300 bg-white p-2 pb-0" data-testid={path}>
      <div className="relative flex h-full max-h-5/6 flex-col justify-stretch">
        <div className="row-span-5 aspect-[1] grow overflow-hidden rounded-xl border border-gray-300">{firstImage?.url && <CustomImage src={firstImage.url} alt={name ?? "Product Image"} layout="fill" className="absolute inset-0 h-full w-full" loading="lazy" />}</div>
        {totalVariants > 1 && (
          <div className="grid grid-cols-6 gap-1.5 pt-1.5">
            {variants?.slice(0, 5).map((variant, index) => (
              <Fragment key={variant?.sku ?? index}>
                {!!variant?.firstImage?.url && (
                  <div className="border-muted relative aspect-square w-full rounded-sm border border-solid">
                    <CustomImage src={variant.firstImage.url} alt={`Variant ${index + 1}`} layout="fill" className="absolute inset-0 h-full w-full" loading="lazy" />
                  </div>
                )}
              </Fragment>
            ))}
            {totalVariants > 5 && <span className="border-muted relative flex aspect-square items-center justify-center overflow-hidden rounded-sm border border-solid text-sm font-bold">+{totalVariants - 5}</span>}
          </div>
        )}
      </div>
      <main className="flex items-center justify-between">
        <div className="flex min-h-1/6 flex-col justify-start px-2 py-2 pb-4">
          <span>{name}</span>
          <b>
            <Price price={price} />
          </b>
        </div>
        <div>
          <Button
            onClick={(event) => {
              event.stopPropagation();
              event.preventDefault();
              const cartItem = {
                ...product,
                quantity: 1,
                id: product?.id ?? "",
                price: product?.Variant?.price.price,
                name: product?.name ?? "",
                image: product?.Variant?.firstImage?.url ?? "",
              };

              console.log("DISPATCHING ADD TO CART:", cartItem.id);
              dispatch(addToCart(cartItem));
            }}
            className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-700 to-gray-600 p-3 shadow-lg transition-all duration-300 hover:scale-105"
          >
            <ShoppingCart size={28} className="text-white" />
          </Button>
        </div>
      </main>
    </Link>
  );
};
