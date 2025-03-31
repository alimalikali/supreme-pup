import { Button } from "@/components/button";
import ProductsGrid from "@/ui/dashboard/products/products-grid";
import { Plus } from "lucide-react";
import Link from "next/link";

const Products = () => {
  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-muted-foreground">Manage your product inventory</p>
        </div>
        <div className="flex gap-3">
          {/* <Button variant="outline" size="sm">
            <Download size={16} className="mr-2" />
            Export
          </Button> */}
          <Link href="/admin/products/add-product">
            <Button size="sm">
              <Plus size={16} className="mr-2" />
              Add Product
            </Button>
          </Link>
        </div>
      </div>
      <ProductsGrid />
    </>
  );
};

export default Products;
