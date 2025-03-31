import OrdersTable from "@/ui/dashboard/orders-table/orders-table";

const Orders = () => {
  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Orders</h1>
          <p className="text-muted-foreground">Manage your customer orders</p>
        </div>
        <div className="flex gap-3">
        </div>
      </div>
      <OrdersTable />
    </>
  );
};

export default Orders;
