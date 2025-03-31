"use client";
import RippleButton from "@/components/RippleButton";
import { useCheckAuthQuery } from "@/global/features/auth/authApi";
import { useClearCartMutation, useGetCartByUserIdQuery, useRemoveFromCartMutation, useUpdateCartItemMutation } from "@/global/features/cart/cartApi";
import { Product } from "@/types/products";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Cart = () => {
  const { data: user, isLoading: authLoading } = useCheckAuthQuery({});
  const loggedInUser = user?._id;

  const {
    data: cartItems,
    isLoading: cartLoading,
    error,
  } = useGetCartByUserIdQuery(loggedInUser, {
    skip: !loggedInUser,
  });

  const [updateCartItem] = useUpdateCartItemMutation();
  const [removeFromCart] = useRemoveFromCartMutation();
  const [clearCart] = useClearCartMutation();

  if (authLoading || cartLoading) {
    return <p className="text-center text-lg">Loading cart...</p>;
  }

  if (error) {
    return <p className="text-center text-lg text-red-500">Failed to load cart items.</p>;
  }

  const handleClearCart = async (id: string) => {
    await clearCart(id);
  };

  // Handle increase/decrease in quantity
  const handleQuantityChange = async (id: string, action: "increase" | "decrease") => {
    const updatedQuantity = action === "increase" ? cartItems.find((item: { _id: string }) => item._id === id)?.quantity + 1 : cartItems.find((item: { _id: string }) => item._id === id)?.quantity - 1;
    if (updatedQuantity && updatedQuantity > 0) {
      await updateCartItem({ id, updatedData: { quantity: updatedQuantity } });
    }
  };

  // Handle item removal
  const handleRemoveItem = async (id: string) => {
    await removeFromCart(id);
  };

  // Calculate subtotal, tax, and total
  const subtotal = cartItems.reduce((acc: number, item: { product: { price: { current: number } }; quantity: number }) => acc + item.product.price.current * item.quantity, 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  return (
    <section className="bg-background min-h-screen px-6 py-28">
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        <h2 className="text-accent text-center text-4xl font-bold">Shopping Cart</h2>

        {cartItems.length === 0 ? (
          <div className="mt-10 text-center">
            <p className="text-foreground text-lg">Your cart is empty 😢</p>
            <RippleButton>
              <Link href="/products" className="bg-accent text-background mt-4 inline-block rounded-lg px-6 py-3 transition">
                Continue Shopping
              </Link>
            </RippleButton>
          </div>
        ) : (
          <>
            <div className="bg-accent flex flex-col gap-3 rounded-xl p-3 shadow-lg md:gap-10 md:p-6">
              {cartItems.map((item: { _id: string; product: Product; quantity: number }) => (
                <div key={item._id} className="bg-background flex h-fit flex-col items-center justify-between gap-5 rounded-lg border-b border-gray-300 p-3 md:h-[200px] md:flex-row md:p-6 dark:border-gray-700">
                  {/* Product Information */}
                  <div className="flex h-full flex-col items-center gap-6 text-black md:flex-row">
                    <Image src={item.product.thumbnail.url} alt={item.product.title} width={150} height={150} className="rounded-lg object-cover shadow-md" />

                    <div className="text-center md:text-left">
                      <h3 className="text-xl font-semibold">{item.product.title}</h3>
                      <p className="text-gray-700">${item.product.price.current}</p>
                    </div>
                  </div>

                  {/* Quantity Controls and Delete Button */}
                  <div className="flex h-full flex-row items-end justify-between gap-4 text-black md:flex-col-reverse">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <RippleButton onClick={() => handleQuantityChange(item._id, "decrease")} className="bg-accent hover:bg-accent/80 flex h-8 w-8 items-center justify-center rounded-full text-xl transition">
                        -
                      </RippleButton>
                      <span className="text-xl font-semibold">{item.quantity}</span>
                      <RippleButton onClick={() => handleQuantityChange(item._id, "increase")} className="bg-accent hover:bg-accent/80 flex h-8 w-8 items-center justify-center rounded-full text-xl transition">
                        +
                      </RippleButton>
                    </div>

                    {/* Trash Icon Button */}
                    <RippleButton onClick={() => handleRemoveItem(item._id)} className="hover:bg-foreground/30 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-400 text-black shadow-md transition">
                      <Trash2 size={18} className="m-auto" />
                    </RippleButton>
                  </div>
                </div>
              ))}
            </div>

            {/* Clear All Cart Button */}
            <div className="mt-6 text-center">
              <RippleButton onClick={() => handleClearCart(loggedInUser)} className="bg-foreground/90 rounded-lg px-6 py-3 text-white transition hover:bg-red-500">
                Clear All Cart
              </RippleButton>
            </div>

            {/* Checkout Section */}
            <div className="bg-accent text-background rounded-xl p-6 shadow-lg">
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
              <Link href="/checkout" className="w-full max-w-full">
                <RippleButton className="bg-foreground hover:bg-background/20 mt-6 w-full px-6 py-3 transition">Proceed to Checkout</RippleButton>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;
