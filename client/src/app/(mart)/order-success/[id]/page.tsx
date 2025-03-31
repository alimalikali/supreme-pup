"use client";

import { useCheckAuthQuery } from "@/global/features/auth/authApi";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const OrderSuccessPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: user } = useCheckAuthQuery({});

  useEffect(() => {
    if (!id) {
      router.push("/");
    }
  }, [id, router]);

  return (
    <div className="bg-background flex h-screen w-screen items-center justify-center">
      <div className="flex w-full max-w-lg transform flex-col items-center space-y-6 rounded-lg bg-white p-8 shadow-xl transition-all duration-300 ease-in-out hover:scale-105">
        <div className="bg-background flex h-32 w-32 items-center justify-center rounded-full shadow-xl">
          <p className="animate-ping text-2xl text-lime-500">❤️</p>
        </div>
        <div className="space-y-4 text-center">
          <h6 className="text-xl font-medium text-gray-700">Hey {user?.name}</h6>
          <h5 className="text-2xl font-bold text-gray-800">Your Order #{id} is confirmed</h5>
          <p className="text-sm text-gray-500">Thank you for shopping with us ❤️</p>
        </div>
        <button
          onClick={() => {
            router.push(`/orders/${user?._id}`);
          }}
          className="mt-6 transform rounded-full bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gradient-to-l"
        >
          Check Order Status in My Orders
        </button>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
