"use client";
import MainLayout from "@/components/dashboard-layout";

type AdminLayoutProps = { children: React.ReactNode };

export default function MartLayout({ children }: AdminLayoutProps) {
  return (
    <>
      <MainLayout>{children}</MainLayout>
    </>
  );
}
