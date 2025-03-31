import { cn } from "@/lib/utils";
import { OrderStatus } from "@/utils/mockData";

interface StatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const getStatusColor = (status: string) => {
    switch (
      status.toLowerCase() // Normalize case
    ) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "dispatched":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "out for delivery":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return <span className={cn("rounded-full border px-2.5 py-0.5 text-xs font-medium", getStatusColor(status), className)}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>;
};

export default StatusBadge;
