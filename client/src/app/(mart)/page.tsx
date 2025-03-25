import Footer from "@/components/footer";
import GlobalLayout from "@/components/global-layout";
import { webBlocksDataset } from "@/constants/data";
import { FeatureHighlight } from "@/ui/feature-highlight/feature-highlight";
import Hero from "@/ui/hero/hero";
import Newsletter from "@/ui/news-letter/news-letter";
import { PictureGrid } from "@/ui/picture-grid/picture-grid";
import { ProductSlider } from "@/ui/product-slider/product-slider";

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen w-full flex-col items-center">
        <Hero banner={webBlocksDataset.heroData} />
        <GlobalLayout>
          <FeatureHighlight features={webBlocksDataset.featureData} />
          <ProductSlider productsDataset={webBlocksDataset.fakeProducts} />
          <PictureGrid datasetGrid={webBlocksDataset.imageDataset} />
        </GlobalLayout>
        <Newsletter />
        <Footer />
      </main>
    </>
  );
}
