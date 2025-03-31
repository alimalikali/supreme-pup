// import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import DashboardStats from "@/ui/dashboard/dashboard-stats";
// import RecentOrders from "@/components/Dashboard/RecentOrders";
// import SalesChart from "@/components/Dashboard/SalesChart";
// import TopProducts from "@/components/Dashboard/TopProducts";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Bell, Search } from "lucide-react";

const Index = () => {
  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back to your PupShop dashboard!</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input type="search" placeholder="Search..." className="w-[200px] pl-10 sm:w-[300px]" />
          </div>
          <Button variant="outline" size="sm">
            <Bell size={20} />
          </Button>
        </div>
      </div>
      <DashboardStats />
      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* <SalesChart /> */}
        {/* <TopProducts /> */}
      </div>
      {/* <RecentOrders /> */}
    </>
  );
};

export default Index;
