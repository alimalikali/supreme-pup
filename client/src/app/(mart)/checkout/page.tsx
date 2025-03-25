"use client";
import React, { useState } from "react";

const Checkout = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <section className="bg-background flex min-h-screen items-center justify-center px-6 py-10">
      <div className="bg-foreground w-full max-w-4xl rounded-2xl p-8 shadow-2xl">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-900 dark:text-white">Checkout</h2>

        {/* Step Progress */}
        <div className="mb-8 flex justify-between">
          {["Billing", "Shipping", "Payment"].map((label, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full font-bold text-white ${step >= index + 1 ? "bg-accent" : "bg-gray-300"}`}>{index + 1}</div>
              <p className="mt-2 text-gray-700 dark:text-gray-300">{label}</p>
            </div>
          ))}
        </div>

        {/* Step Forms */}
        {step === 1 && <BillingForm />}
        {step === 2 && <ShippingForm />}
        {step === 3 && <PaymentForm />}

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
            <button className="ml-auto rounded-lg bg-green-600 px-6 py-3 text-white transition hover:bg-green-700">Place Order</button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Checkout;

/* Billing Form */
const BillingForm = () => (
  <div>
    <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Billing Information</h3>
    <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <input type="text" placeholder="Full Name" className="input-field" />
      <input type="email" placeholder="Email Address" className="input-field" />
      <input type="text" placeholder="Phone Number" className="input-field" />
      <input type="text" placeholder="Billing Address" className="input-field col-span-2" />
    </form>
  </div>
);

/* Shipping Form */
const ShippingForm = () => (
  <div>
    <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Shipping Address</h3>
    <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <input type="text" placeholder="Street Address" className="input-field col-span-2" />
      <input type="text" placeholder="City" className="input-field" />
      <input type="text" placeholder="State/Province" className="input-field" />
      <input type="text" placeholder="Postal Code" className="input-field" />
      <input type="text" placeholder="Country" className="input-field col-span-2" />
    </form>
  </div>
);

/* Payment Form */
const PaymentForm = () => (
  <div>
    <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Payment Details</h3>
    <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <input type="text" placeholder="Cardholder Name" className="input-field col-span-2" />
      <input type="text" placeholder="Card Number" className="input-field col-span-2" />
      <input type="text" placeholder="Expiration Date (MM/YY)" className="input-field" />
      <input type="text" placeholder="CVV" className="input-field" />
    </form>
  </div>
);

/* Tailwind Input Field */
