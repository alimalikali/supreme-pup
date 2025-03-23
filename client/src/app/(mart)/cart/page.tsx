"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cartData } from "@/constants/data"; // Example dataset
import { Button } from "@/components/button";
import { X } from "lucide-react";

const Cart = () => {
    const [cart, setCart] = useState(cartData);

    // Update item quantity
    const updateQuantity = (id: string, type: "increase" | "decrease") => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        quantity:
                            type === "increase"
                                ? item.quantity + 1
                                : item.quantity > 1
                                    ? item.quantity - 1
                                    : 1,
                    }
                    : item
            )
        );
    };

    // Remove item from cart
    const removeItem = (id: string) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    // Calculate subtotal
    const subtotal = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );
    const tax = subtotal * 0.05;
    const total = subtotal + tax;

    return (
        <section className="min-h-screen bg-background py-10 px-6">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-foreground">
                    Shopping Cart
                </h2>

                {cart.length === 0 ? (
                    <div className="text-center mt-10">
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            Your cart is empty 😢
                        </p>
                        <Link
                            href="/shop"
                            className="mt-4 inline-block px-6 py-3 bg-background text-white rounded-lg  transition"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="mt-8 bg-accent p-6 rounded-xl shadow-lg">
                            {cart.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between py-4 border-b border-gray-300 dark:border-gray-700"
                                >
                                    <div className="flex items-center gap-4">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            width={80}
                                            height={80}
                                            className="rounded-lg"
                                        />
                                        <div>
                                            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                                                {item.name}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                ${item.price.toFixed(2)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 text-white">
                                        <button
                                            onClick={() => updateQuantity(item.id, "decrease")}
                                            className="px-3 py-1 bg-foreground rounded-lg"
                                        >
                                            -
                                        </button>
                                        <span className="text-lg">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, "increase")}
                                            className="px-3 py-1 bg-foreground rounded-lg "
                                        >
                                            +
                                        </button>
                                        <Button
                                            onClick={() => removeItem(item.id)}
                                            className=" bg-red-950 w-12 p-2.5 rounded-full"
                                        >
                                            <X/>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Checkout Section */}
                        <div className="mt-8 p-6 bg-accent rounded-xl shadow-lg text-background">
                            <div className="flex justify-between text-lg font-semibold">
                                <p>Subtotal:</p>
                                <p>${subtotal.toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between text-lg font-semibold mt-2">
                                <p>Tax (5%):</p>
                                <p>${tax.toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between text-xl font-bold mt-4">
                                <p>Total:</p>
                                <p>${total.toFixed(2)}</p>
                            </div>
                            <Button className="w-full mt-6 px-6 py-3 bg-foreground hover:bg-background/20  transition">

                                <Link href="/checkout" >
                                    Proceed to Checkout
                                </Link>
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default Cart;
