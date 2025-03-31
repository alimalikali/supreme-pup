"use client";

import { useGetOrderByUserIdQuery } from "@/global/features/orders/orderApi";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function UserOrders() {
  const router = useRouter();
  const { id } = useParams();
  const { data: orders, isLoading: ordersLoading, error } = useGetOrderByUserIdQuery(id);

  if (!id) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-xl text-gray-500">no user id</p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center justify-center p-4 pt-20">
      {ordersLoading ? (
        <div className="flex h-64 w-64 items-center justify-center">
          {/* Add a loading animation or spinner */}
          <p className="text-xl text-gray-500">Loading Orders...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center space-y-4">
          <p className="text-xl text-red-500">Error loading orders. Please try again later.</p>
        </div>
      ) : (
        <div className="w-full max-w-4xl space-y-6">
          <div className="flex items-center gap-4">
            <div>
              <button onClick={() => router.push("/")} className="text-xl text-blue-600 hover:underline">
                ⬅ Back
              </button>
            </div>
            <div>
              <h1 className="text-2xl font-semibold">Order History</h1>
              <p className="text-gray-500">Check the status of recent orders and manage returns.</p>
            </div>
          </div>
          <div className="space-y-4">
            {Array.isArray(orders) && orders.length ? (
              orders.map((order: any) => (
                <div key={order._id} className="space-y-4 rounded-lg border p-4 shadow-lg transition-all duration-300 ease-in-out hover:scale-105">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-gray-600">
                        Order Number: <span className="font-semibold">{order._id}</span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Date Placed: <span className="font-semibold">{new Date(order.createdAt).toDateString()}</span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Total Amount: <span className="font-semibold">${order.total}</span>
                      </p>
                    </div>
                    <p className="text-sm text-gray-600">Items: {order.item.length}</p>
                  </div>
                  {order.item.map((productItem: any, index: number) => (
                    <div key={index} className="flex gap-4 border-t pt-4">
                      <Image
                        className="h-24 w-24 rounded-md object-cover"
                        height={200}
                        width={200}
                        src={productItem.product?.thumbnail?.url ?? "/assets/images/bg.jpg"} // Ensure thumbnail URL is accessed correctly
                        alt={productItem.product?.title ?? "Product Image"}
                      />

                      <div className="flex-1">
                        <h2 className="text-lg font-semibold text-gray-800">{productItem.product?.title}</h2>
                        <p className="text-gray-600">{productItem.product?.brand?.name}</p>
                        <p className="text-gray-500">Qty: {productItem.quantity}</p>
                        <p className="font-semibold text-gray-700">${productItem.product?.price.current}</p>
                        <p className="text-sm text-gray-500">{productItem.product?.description}</p>
                        <div className="mt-2 flex gap-2">
                          <Link href={`/products/${productItem.product?.slug}`} className="rounded-md border px-3 py-1 text-blue-600 hover:bg-gray-100">
                            View Product
                          </Link>
                          <button className="rounded-md bg-blue-500 px-3 py-1 text-white transition-all duration-200 hover:bg-blue-600">Buy Again</button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <p className="text-sm text-gray-600">
                    Status: <span className="font-semibold text-green-600">{order.status}</span>
                  </p>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center space-y-4">
                <p className="text-lg text-gray-500">Oh! Looks like you haven&apos;t been shopping lately.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
