import { Product } from "./product";
import Slider from "@/components/slider";
import { Typography } from "@/components/typography";
import { Product as ProductPropType } from "@/types/products";

interface ProductSliderProps {
  productsDataset: {
    heading: string;
    description: string;
    products: ProductPropType[];
  };
}

export const ProductSlider = ({ productsDataset }: ProductSliderProps) => {
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

      {!!productsDataset.products.length && (
        <div className="w-full pb-24">
          <Slider options={{ loop: true, align: "start" }}>
            {productsDataset.products.map((item) =>
              !!item ? (
                <Product
                  key={item.path}
                  product={{
                    id: item.id,
                    name: item.name,
                    path: item.path,
                    variants: null,
                    Variant: {
                      firstImage: item.Variant.firstImage,
                      price: item.Variant.price,
                    },
                  }}
                />
              ) : null,
            )}
          </Slider>
        </div>
      )}
    </div>
  );
};
