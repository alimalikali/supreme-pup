import { fakeProducts } from "@/constants/data";
import { Product } from "@/ui/product-slider/product";

const Products = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">All Products</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {fakeProducts.map((item, index) =>
          !!item ? (
            <Product
              key={index}
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
      </div>
    </div>
  );
};

export default Products;
