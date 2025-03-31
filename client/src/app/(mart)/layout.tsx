import Navbar from "@/components/navbar";
import { webBlocksDataset } from "@/constants/data";

type MartLayoutProps = { children: React.ReactNode };

export default async function MartLayout({ children }: MartLayoutProps) {
  return (
    <>
      <Navbar navigation={webBlocksDataset.navigationData} />

      {children}
    </>
  );
}
