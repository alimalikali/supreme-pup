import Link from 'next/link';
import { Fragment } from 'react';
import { Price } from './price';
import CustomImage from '@/components/image';

type ProductProps = {
    product: {
        name?: string | null;
        path?: string | null;
        defaultVariant?: { firstImage: { url: string | null } | null; defaultPrice: any | null } | null;
        variants?: Array<{ sku?: string | null; firstImage: { url: string | null } | null } | null> | null;
    } | null;
};

export const Product = ({ product }: ProductProps) => {
    const { name, path, defaultVariant, variants } = product ?? {};
    const { firstImage, defaultPrice } = defaultVariant ?? {};
    const totalVariants = variants?.length || 0;

    return (
        <Link
          href={path ? `/products/${path.substring(1)}` : '/'}

            className="rounded-2xl h-fit p-2 pb-0 text-foreground border-gray-300 border-solid border text-primary relative flex flex-col items-stretch bg-white"
            data-testid={path}
        >
            <div className="relative justify-stretch h-full max-h-5/6 flex flex-col">
                <div className="rounded-xl overflow-hidden border grow border-gray-300  aspect-[1] row-span-5">
                    {firstImage?.url && (
                        <CustomImage src={firstImage.url} alt={name ?? 'Product Image'} layout="fill" className="absolute inset-0 w-full h-full" loading="lazy"/>
                    )}
                </div>
                {totalVariants > 1 && (
                    <div className="grid grid-cols-6 gap-1.5 pt-1.5">
                        {variants?.slice(0, 5).map((variant, index) => (
                            <Fragment key={variant?.sku ?? index}>
                                {!!variant?.firstImage?.url && (
                                    <div className="aspect-square w-full rounded-sm relative border border-solid border-muted">
                                        <CustomImage src={variant.firstImage.url} alt={`Variant ${index + 1}`} layout="fill"   className="absolute inset-0 w-full h-full " loading="lazy"  />
                                    </div>
                                )}
                            </Fragment>
                        ))}
                        {totalVariants > 5 && (
                            <span className="aspect-square flex text-sm font-bold items-center justify-center rounded-sm relative border-solid overflow-hidden border border-muted">
                                +{totalVariants - 5}
                            </span>
                        )}
                    </div>
                )}
            </div>
            <div className="flex flex-col px-2 py-2 pb-4 justify-start min-h-1/6">
                <span>{name}</span>
                <b>
                    <Price price={defaultPrice} />
                </b>
            </div>
        </Link>
    );
};