import { cn } from "@/lib/utils";
import { statsData } from "@/utils/mockData";
import { BadgeDollarSign, LucideArrowDownLeft, LucideArrowUpRight, ShoppingBagIcon, ShoppingCart, User } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  bg: string;
  color: string;
}

const StatCard = ({ title, value, change, icon, bg, color }: StatCardProps) => {
  const isPositive = change > 0;

  return (
    <div className={`${bg} flex h-fit flex-col justify-between gap-5 rounded-2xl p-6 shadow-sm transition-all hover:shadow-md`}>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <div className={cn("flex size-10 items-center justify-center rounded-full bg-black/0 text-2xl", color)}>{icon}</div>
          <span className={cn("text-xl", color)}>{title}</span>
        </div>
        <div className={cn("flex items-center gap-1 text-xs font-medium", color)}>
          {isPositive ? <LucideArrowUpRight className="size-5" /> : <LucideArrowDownLeft className="size-5" />}
          <div className="flex flex-col">
            <span className={cn("text-xl", color)}>{Math.abs(change)}%</span>
          </div>
        </div>
      </div>
      <div className={cn("text-2xl font-bold", color)}>{value}</div>
    </div>
  );
};

const DashboardStats = () => {
  return (
    <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard title="Total Sales" value={`$${statsData.totalSales.toLocaleString()}`} change={statsData.salesGrowth} icon={<ShoppingBagIcon className="size-10" />} bg="bg-[#d1eafe]" color="text-[#2575df]" />
      <StatCard title="Total Orders" value={statsData.totalOrders} change={statsData.ordersGrowth} icon={<User className="size-10" />} bg="bg-[#eedaff]" color="text-[#7d3cdf]" />
      <StatCard title="Total Customers" value={statsData.totalCustomers} change={statsData.customersGrowth} icon={<ShoppingCart className="size-10" />} bg="bg-[#fef4d0]" color="text-[#eda21d]" />
      <StatCard title="Avg Order Value" value={`$${statsData.avgOrderValue}`} change={statsData.revenueGrowth} icon={<BadgeDollarSign className="size-10" />} bg="bg-[#fee1cf]" color="text-[#ea5037]" />
    </div>
  );
};

export default DashboardStats;
