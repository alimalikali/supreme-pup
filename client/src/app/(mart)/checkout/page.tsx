"use client";
import React, { useState } from "react";

const Checkout = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <section className="min-h-screen flex items-center justify-center bg-background px-6 py-10">
      <div className="max-w-4xl w-full bg-foreground p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Checkout
        </h2>

        {/* Step Progress */}
        <div className="flex justify-between mb-8">
          {["Billing", "Shipping", "Payment"].map((label, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold ${
                  step >= index + 1 ? "bg-accent" : "bg-gray-300"
                }`}
              >
                {index + 1}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mt-2">{label}</p>
            </div>
          ))}
        </div>

        {/* Step Forms */}
        {step === 1 && <BillingForm />}
        {step === 2 && <ShippingForm />}
        {step === 3 && <PaymentForm />}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          {step > 1 && (
            <button
              onClick={prevStep}
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-black/30 transition"
            >
              Back
            </button>
          )}
          {step < 3 ? (
            <button
              onClick={nextStep}
              className="ml-auto px-6 py-3 bg-accent text-white rounded-lg hover:opacity-80 transition"
            >
              Next
            </button>
          ) : (
            <button
              className="ml-auto px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Place Order
            </button>
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
    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
      Billing Information
    </h3>
    <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
      Shipping Address
    </h3>
    <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
      Payment Details
    </h3>
    <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input type="text" placeholder="Cardholder Name" className="input-field col-span-2" />
      <input type="text" placeholder="Card Number" className="input-field col-span-2" />
      <input type="text" placeholder="Expiration Date (MM/YY)" className="input-field" />
      <input type="text" placeholder="CVV" className="input-field" />
    </form>
  </div>
);

/* Tailwind Input Field */

