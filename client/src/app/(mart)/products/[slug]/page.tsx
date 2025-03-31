import ProductPageClient from "@/ui/product-page/product-page-client";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params; // ✅ Await once
  const { slug } = resolvedParams;

  if (!slug) return notFound();

  return <ProductPageClient slug={slug} />;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params; // ✅ Await once
  const { slug } = resolvedParams;
  if (!slug) {
    return { title: "Product Not Found", description: "This product does not exist." };
  }

  // Fetch product data manually
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${slug}`);
  if (!response.ok) {
    return { title: "Product Not Found", description: "This product does not exist." };
  }

  const product = await response.json();

  return {
    title: `${product.title} - Buy Now | YourStore`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      url: `https://pup.com/product/${slug}`,
      images: [
        {
          url: product.thumbnail.url,
          width: 800,
          height: 600,
          alt: product.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description,
      images: [product.thumbnail.url],
    },
  };
}
