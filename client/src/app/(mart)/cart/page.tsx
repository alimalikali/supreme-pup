"use client";
import { Button } from "@/components/button";
import { decreaseQuantity, increaseQuantity, removeFromCart } from "@/lib/features/cart/cartSlice";
import { RootState } from "@/lib/store";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state: RootState) => state.cart.items);
  console.log(cartItems, "cartItems");

  // Calculate subtotal
  const subtotal = cartItems.reduce((acc: number, item: { price: number; quantity: number }) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  return (
    <section className="bg-background min-h-screen px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-accent text-center text-3xl font-bold">Shopping Cart</h2>

        {cartItems.length === 0 ? (
          <div className="mt-10 text-center">
            <p className="text-foreground text-lg">Your cart is empty 😢</p>
            <Link href="/products" className="bg-accent text-background mt-4 inline-block rounded-lg px-6 py-3 transition">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="bg-accent mt-8 rounded-xl p-6 shadow-lg">
              {cartItems.map((item: { id: string; image: string; name: string; price: number; quantity: number }) => (
                <div key={item.id} className="flex items-center justify-between border-b border-gray-300 py-4 dark:border-gray-700">
                  <div className="flex items-center gap-4">
                    <Image src={item.image} alt={item.name} width={80} height={80} className="rounded-lg" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                      <p className="text-gray-600 dark:text-gray-300">${item.price.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-white">
                    <button onClick={() => dispatch(decreaseQuantity(item.id))} className="bg-foreground rounded-lg px-3 py-1">
                      -
                    </button>
                    <span className="text-lg">{item.quantity}</span>
                    <button onClick={() => dispatch(increaseQuantity(item.id))} className="bg-foreground rounded-lg px-3 py-1">
                      +
                    </button>
                    <div className="flex size-10 items-center justify-center rounded-full bg-white p-1">
                      <Trash2 onClick={() => dispatch(removeFromCart(item.id))} className="text-black" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Checkout Section */}
            <div className="bg-accent text-background mt-8 rounded-xl p-6 shadow-lg">
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
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;
