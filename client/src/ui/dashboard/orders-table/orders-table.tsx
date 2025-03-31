"use client";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import StatusBadge from "@/components/status-badge";
import { useGetAllOrdersQuery, useUpdateOrderByIdMutation } from "@/global/features/orders/orderApi";
import { Search } from "lucide-react";
import { useState } from "react";

const editOptions = ["All", "Pending", "Dispatched", "Out for delivery", "Delivered", "Cancelled"];

const OrdersTable = () => {
  const { data: orders = [], isLoading } = useGetAllOrdersQuery({});
  const [updateOrderStatus] = useUpdateOrderByIdMutation();

  const [statusFilter, setStatusFilter] = useState<"All" | "Pending" | "Dispatched" | "Out for delivery" | "Delivered" | "Cancelled">("All");
  const [searchQuery, setSearchQuery] = useState("");

  // **Filter Orders Based on Status & Search**
  const filteredOrders = orders.filter((order: any) => {
    const matchesStatus = statusFilter === "All" || order.status === statusFilter;
    const matchesQuery = searchQuery === "" || order._id.toLowerCase().includes(searchQuery.toLowerCase()) || order.address[0]?.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || order.address[0]?.email.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesQuery;
  });

  const handleStatusFilter = (status: any) => {
    setStatusFilter(status);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus({ _id: orderId, status: newStatus }).unwrap();
    } catch (error) {
      console.error("Failed to update order:", error);
    }
  };

  return (
    <div className="dashboard-card">
      {/* Filters and Search */}
      <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="relative w-full sm:w-auto">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input type="search" placeholder="Search orders..." className="w-full pl-10 sm:w-[300px]" value={searchQuery} onChange={handleSearch} />
        </div>

        <div className="flex flex-wrap gap-2">
          {editOptions.map((status) => (
            <Button key={status} variant={statusFilter === status ? "primary" : "outline"} size="sm" onClick={() => handleStatusFilter(status)}>
              {status}
            </Button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="py-8 text-center">
            <p className="text-muted-foreground">Loading orders...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-muted-foreground">No orders found</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="pb-2 text-left font-medium">Order ID</th>
                <th className="pb-2 text-left font-medium">Customer</th>
                <th className="pb-2 text-left font-medium">Status</th>
                <th className="pb-2 text-left font-medium">Items</th>
                <th className="pb-2 text-left font-medium">Total</th>
                <th className="pb-2 text-left font-medium">Date</th>
                <th className="pb-2 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order: any, index: number) => (
                <tr key={index} className="border-b last:border-0">
                  <td className="py-3 font-medium">{order._id}</td>
                  <td className="py-3">{order.address[0]?.fullName || "Unknown"}</td>
                  <td className="py-3">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="py-3">{order.item.length}</td>
                  <td className="py-3">${(order.total || 0).toFixed(2)}</td>
                  <td className="py-3">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 text-left">
                    <select value={order.status} onChange={(e) => handleStatusUpdate(order._id, e.target.value)} className="rounded border px-2 py-1">
                      {editOptions
                        .filter((status) => status !== "all")
                        .map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default OrdersTable;
