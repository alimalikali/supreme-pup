"use client";

import { ReactNode } from "react";
import Sidebar from "./sidebar";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="bg-background flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  );
};

export default MainLayout;
