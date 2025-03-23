import GlobalLayout from "@/components/global-layout";
import Navbar from "@/components/navbar";
import { webBlocksDataset } from "@/constants/data";

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className=" flex min-h-screen flex-col items-center w-full my-32 ">
    <Navbar navigation={webBlocksDataset.navigationData} />
    <GlobalLayout>
      {children}
    </GlobalLayout>
  </div>;
}
