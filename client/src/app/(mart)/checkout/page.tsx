"use client";
import { Button } from "@/components/button";
import { useCheckAuthQuery } from "@/global/features/auth/authApi";
import { useClearCartMutation, useGetCartByUserIdQuery } from "@/global/features/cart/cartApi";
import { useCreateOrderMutation } from "@/global/features/orders/orderApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Checkout = () => {
  const { data: user } = useCheckAuthQuery({});
  const loggedInUser = user?._id;
  const router = useRouter(); // Initialize rou
  const { data: cartItems } = useGetCartByUserIdQuery(loggedInUser, { skip: !loggedInUser });
  const [clearCart, { isLoading: clearcartloading }] = useClearCartMutation();

  const [createOrder] = useCreateOrderMutation(); // Initialize createOrder mutation

  const [step, setStep] = useState(1);
  const [paymentType, setPaymentType] = useState("");
  const [shippingAddress, setShippingAddress] = useState({
    user: loggedInUser,
    phoneNumber: "",
    fullName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    type: "",
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => (prev > 1 ? prev - 1 : 1));

  // Calculate subtotal, tax, and total
  const subtotal = cartItems.reduce((acc: number, item: { product: { price: { current: number } }; quantity: number }) => acc + item.product.price.current * item.quantity, 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const handlePlaceOrder = async () => {
    try {
      // Create order data
      const orderData = {
        user: loggedInUser,
        item: cartItems.map((item: any) => ({
          product: item.product._id,
          quantity: item.quantity,
          price: item.product.price.current,
        })),
        address: shippingAddress,
        paymentMode: paymentType,
        total: total,
      };
      console.log(orderData, "orderdata");

      const response = await createOrder(orderData).unwrap();
      console.log("✅ Order created successfully!", response);

      await clearCart(loggedInUser).unwrap();
      console.log("✅ Cart cleared successfully!");

      router.push(`/order-success/${response._id}`);
    } catch (error) {
      console.error("❌ Failed to place order:", error);
    }
  };

  return (
    <>
      <section className="bg-background flex min-h-screen items-center justify-center px-6 pt-10 pb-5">
        <div className="bg-foreground w-full max-w-4xl rounded-2xl p-8 shadow-2xl">
          <h2 className="mb-6 text-center text-3xl font-bold text-gray-900 dark:text-white">Checkout</h2>

          {/* Step Progress */}
          <div className="mb-8 flex justify-between">
            {["Billing", "Shipping", "Payment"].map((label, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full font-bold ${step >= index + 1 ? "bg-accent" : "bg-gray-300 text-black/70"}`}>{index + 1}</div>
                <p className="mt-2 text-gray-700 dark:text-gray-300">{label}</p>
              </div>
            ))}
          </div>

          {/* Step Forms */}
          {step === 1 && <BillingForm shippingAddress={shippingAddress} setShippingAddress={setShippingAddress} />}
          {step === 2 && <ShippingForm shippingAddress={shippingAddress} setShippingAddress={setShippingAddress} />}
          {step === 3 && <PaymentForm paymentType={paymentType} setPaymentType={setPaymentType} />}

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            {step > 1 && (
              <button onClick={prevStep} className="rounded-lg bg-black px-6 py-3 text-white transition hover:bg-black/30">
                Back
              </button>
            )}
            {step < 3 ? (
              <button onClick={nextStep} className="bg-accent ml-auto rounded-lg px-6 py-3 text-white transition hover:opacity-80">
                Next
              </button>
            ) : (
              <button onClick={handlePlaceOrder} className="ml-auto rounded-lg bg-green-600 px-6 py-3 text-white transition hover:bg-green-700">
                {clearcartloading ? "placing order" : "Place Order"}
              </button>
            )}
          </div>
        </div>
      </section>
      <section className="flex w-full flex-col items-center justify-center gap-5">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">Order Summary</h2>

        {/* Checkout Section */}
        <div className="bg-accent text-background w-full max-w-4xl rounded-2xl p-6 shadow-lg">
          <div className="flex justify-between text-lg font-semibold">
            <p>Subtotal:</p>
            <p>${subtotal.toFixed(2)}</p>
          </div>
          <div className="mt-2 flex justify-between text-lg font-semibold">
            <p>Tax (5%):</p>
            <p>${tax.toFixed(2)}</p>
          </div>
          <div className="mt-4 flex justify-between text-xl font-bold">
            <p>Total:</p>
            <p>${total.toFixed(2)}</p>
          </div>
          <Button className="bg-foreground hover:bg-background/20 mt-6 w-full px-6 py-3 transition">
            <Link href="/cart" className="w-full">
              Back to Cart
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default Checkout;

/* Billing Form */
interface ShippingFormProps {
  shippingAddress: {
    user: any;
    fullName: string;
    email: string;
    phoneNumber: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    type: string;
  };
  setShippingAddress: React.Dispatch<
    React.SetStateAction<{
      user: any;
      fullName: string;
      email: string;
      phoneNumber: string;
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
      type: string;
    }>
  >;
}

const BillingForm = ({ shippingAddress, setShippingAddress }: ShippingFormProps) => (
  <div>
    <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Billing Information</h3>
    <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <input type="text" placeholder="Full Name" className="input-field" onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })} />
      <input type="email" placeholder="Email Address" className="input-field" onChange={(e) => setShippingAddress({ ...shippingAddress, email: e.target.value })} />
      <input type="text" placeholder="Phone Number" className="input-field" onChange={(e) => setShippingAddress({ ...shippingAddress, phoneNumber: e.target.value })} />
      <input type="text" placeholder="Type eg.Home" className="input-field col-span-2" onChange={(e) => setShippingAddress({ ...shippingAddress, type: e.target.value })} />
    </form>
  </div>
);

const ShippingForm = ({ shippingAddress, setShippingAddress }: ShippingFormProps) => (
  <div>
    <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Shipping Address</h3>
    <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <input type="text" placeholder="Street Address" className="input-field col-span-2" onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })} />
      <input type="text" placeholder="City" className="input-field" onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })} />
      <input type="text" placeholder="State/Province" className="input-field" onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })} />
      <input type="text" placeholder="Postal Code" className="input-field" onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })} />
      <input type="text" placeholder="Country" className="input-field col-span-2" onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })} />
    </form>
  </div>
);

/* Payment Form */
interface PaymentFormProps {
  paymentType: string;
  setPaymentType: React.Dispatch<React.SetStateAction<string>>;
}

const PaymentForm = ({ paymentType, setPaymentType }: PaymentFormProps) => (
  <div>
    <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Payment Details</h3>
    <form className="grid grid-cols-1 gap-4">
      <select value={paymentType} onChange={(e) => setPaymentType(e.target.value)} className="input-field">
        <option value="">Select Payment Type</option>
        <option value="COD">Cash on Delivery</option>
        <option value="UPI">UPI</option>
        <option value="CARD">Credit/Debit Card</option>
      </select>
      {paymentType === "card" && (
        <>
          <input type="text" placeholder="Cardholder Name" className="input-field" />
          <input type="text" placeholder="Card Number" className="input-field" />
          <input type="text" placeholder="Expiration Date (MM/YY)" className="input-field" />
          <input type="text" placeholder="CVV" className="input-field" />
        </>
      )}
    </form>
  </div>
);
