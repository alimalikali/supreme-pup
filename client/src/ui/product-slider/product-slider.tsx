"use client";

import Slider from "@/components/slider";
import { Typography } from "@/components/typography";
import { useGetProductsQuery } from "@/global/features/products/productAPI";
import { Product as ProductPropType } from "@/types/products";
import { Product } from "./product";

interface ProductSliderProps {
  productsDataset: {
    heading: string;
    description: string;
  };
}

export const ProductSlider = ({ productsDataset }: ProductSliderProps) => {
  const { data: products, error, isLoading } = useGetProductsQuery();

  if (isLoading) return null;
  if (error) return null;

  return (
    <div className="mx-auto flex max-w-screen-2xl flex-col items-center gap-10 py-12">
      <div className="flex flex-col items-center justify-center gap-5">
        <Typography variant="h1" className="text-foreground max-w-3xl text-center text-4xl font-bold md:text-5xl">
          {productsDataset.heading}
        </Typography>

        <Typography variant="p" className="text-accent max-w-2xl text-center text-lg">
          {productsDataset.description}
        </Typography>
      </div>

      {!!products.length && (
        <div className="w-full pb-24">
          <Slider options={{ loop: true, align: "start" }}>{products.map((item: ProductPropType, index: number) => (!!item ? <Product key={index} product={item} /> : null))}</Slider>
        </div>
      )}
    </div>
  );
};
