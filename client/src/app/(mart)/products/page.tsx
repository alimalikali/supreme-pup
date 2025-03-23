import { fakeProducts } from '@/constants/data';
import { Product } from '@/ui/product-slider/product';
import React from 'react'

const Products = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {fakeProducts.map((item , index) => (
          !!item ? (
            <Product
              key={index}
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
      </div>
    </div>
  );
};

export default Products;