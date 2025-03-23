import { notFound } from "next/navigation";
import { fakeProducts } from "@/constants/data";
import ProductPageClient from "@/ui/product-page/product-page-client";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params; // ✅ Await once
  const { slug } = resolvedParams;

  const product = fakeProducts.find((p) => p.path.substring(1) === slug);
  if (!product) return notFound();

  return <ProductPageClient product={product} />;
}
