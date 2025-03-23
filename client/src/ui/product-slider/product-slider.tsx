import { Product } from "./product";
import Slider from "@/components/slider";
import { Typography } from "@/components/typography";
import { Product as ProductPropType } from "@/types/products";



interface ProductSliderProps {
    productsDataset: {

        heading: string;
        description: string;
        products: ProductPropType[];
    }

}

export const ProductSlider = ({ productsDataset }: ProductSliderProps) => {
    return (

        <div className="flex-col flex items-center py-12 gap-10">

            <div className="flex flex-col justify-center items-center gap-5">
                <Typography variant="h1" className="text-4xl md:text-5xl font-bold text-foreground max-w-3xl text-center">
                    {productsDataset.heading}
                </Typography>

                <Typography variant="p" className="text-lg text-accent max-w-2xl  text-center">
                    {productsDataset.description}
                </Typography>
            </div>


            {!!productsDataset.products.length && (
                <div className="w-full pb-24">
                    <Slider options={{ loop: true, align: 'start' }}>

                        {productsDataset.products.map((item) => (
                            !!item ? (
                                <Product
                                    key={item.path}
                                    product={{
                                        name: item.name,
                                        path: item.path,
                                        variants: null,
                                        defaultVariant: {
                                            firstImage: item.defaultVariant.firstImage,
                                            defaultPrice: item.defaultVariant.defaultPrice,
                                        },
                                    }}
                                />
                            ) : null
                        ))}
                    </Slider>

                </div>
            )}
        </div>
    );
};
