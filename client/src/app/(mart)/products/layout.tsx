import GlobalLayout from "@/components/global-layout";
import Navbar from "@/components/navbar";
import { webBlocksDataset } from "@/constants/data";

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-32 flex min-h-screen w-full flex-col items-center">
      <Navbar navigation={webBlocksDataset.navigationData} />
      <GlobalLayout>{children}</GlobalLayout>
    </div>
  );
}
