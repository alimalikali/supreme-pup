"use client";

import api from "@/global/apiSlice";
import { useCheckAuthQuery, useLogoutMutation } from "@/global/features/auth/authApi";
import { useGetCartByUserIdQuery } from "@/global/features/cart/cartApi";
import { useAppDispatch } from "@/global/store";
import { NavbarProps } from "@/types/navbar";
import { ChevronDown, LogOut, Menu, ShoppingCart, UserCircle, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "./button";
import { Typography } from "./typography";

const Navbar = ({ navigation }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const { data: user, isLoading } = useCheckAuthQuery({});
  const [logout] = useLogoutMutation();
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const loggedInUser = user?._id;
  const loggedInUserIsAdmin = user?.isAdmin;

  const { data: cartItems } = useGetCartByUserIdQuery(loggedInUser, { skip: !loggedInUser });

  const cartItemsCount = Array.isArray(cartItems) ? cartItems.reduce((total: number, item: { quantity: number }) => total + item.quantity, 0) : 0;

  const handleLogout = async () => {
    try {
      await logout({}).unwrap();
      router.push("/login");
      dispatch(api.util.resetApiState());
      toast.success("Logout Successfully");
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Logout Failed");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdown && profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileDropdown]);

  useEffect(() => {
    setProfileDropdown(false);
  }, [pathname]);

  return (
    <nav className="fixed top-4 z-10 w-full px-0 sm:px-12 lg:px-20">
      <div className="mx-2 flex max-w-screen-2xl items-center justify-between rounded-4xl border bg-white px-3 py-2 sm:mx-auto sm:px-12 lg:px-20">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            {/* Logo */}
            <div className="flex items-center">
              <Link href={navigation.logo.href} className="text-xl font-bold text-gray-900">
                {navigation.logo.text}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="rounded-md p-2 text-black focus:outline-none md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Right Section (Profile, Login, Register & Cart) */}
            <div className="relative hidden items-center gap-5 md:flex">
              {isLoading ? (
                <span className="text-gray-700">Loading...</span>
              ) : loggedInUser ? (
                <div ref={profileRef} className="relative z-[51]">
                  <button onClick={() => setProfileDropdown(!profileDropdown)} className="flex items-center text-gray-700 hover:text-gray-900">
                    <Typography variant="h4">Hey👋, {user.name.split(" ")[0]}</Typography>
                    {loggedInUserIsAdmin && (
                      <Typography variant="h4" className="bg-foreground mx-2 flex items-center gap-1 rounded-md px-3 py-2 font-medium text-white">
                        Admin
                        <ChevronDown size={16} className="ml-1" />
                      </Typography>
                    )}
                  </button>

                  {/* Profile Dropdown */}
                  {profileDropdown &&
                    (loggedInUserIsAdmin ? (
                      <>
                        <div className="absolute top-10 right-10 mt-2 w-48 rounded-md border bg-white p-2 shadow-lg">
                          {/* <Link href={`/`} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                            Home
                          </Link> */}
                          {/* <Link href={`/profile/${user._id}`} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                            Profile
                          </Link> */}
                          <Link href={`/admin/orders`} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                            Orders
                          </Link>
                          <Link href={`/admin/dashboard`} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                            DashBoard
                          </Link>
                          <Link href={`/admin/products`} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                            Products
                          </Link>
                          <button onClick={handleLogout} className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100">
                            <LogOut size={16} className="mr-2 inline-block" />
                            Logout
                          </button>
                        </div>
                      </> // Render admin-specific UI here
                    ) : (
                      <div className="absolute top-10 right-10 mt-2 w-48 rounded-md border bg-white p-2 shadow-lg">
                        <Link href={`/`} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                          Home
                        </Link>
                        <Link href={`/profile/${user._id}`} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                          Profile
                        </Link>
                        <Link href={`/orders/${user._id}`} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                          Orders
                        </Link>
                        <button onClick={handleLogout} className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100">
                          <LogOut size={16} className="mr-2 inline-block" />
                          Logout
                        </button>
                      </div>
                    ))}
                </div>
              ) : (
                <>
                  <Link href="/login" className="flex items-center text-gray-700 transition hover:text-gray-900">
                    <UserCircle size={30} className="mr-1" />
                    Login
                  </Link>
                  <Link href="/signup" className="flex items-center text-gray-700 transition hover:text-gray-900">
                    <UserCircle size={30} className="mr-1" />
                    Register
                  </Link>
                </>
              )}

              {/* Cart */}
              <div className="relative mr-5">
                <Link href={navigation.icons.cart.href} className="relative">
                  <ShoppingCart size={30} className="text-gray-700 transition hover:text-gray-900" />
                  <span className="absolute -top-1 -right-5 rounded-full bg-black px-2 py-0.5 text-xs text-white">{cartItemsCount}</span>
                </Link>
              </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
              <div className="absolute -top-5 left-0 flex min-h-screen w-full flex-col items-start space-y-4 border-t border-gray-200 bg-white px-3 py-6 shadow-md md:hidden">
                {/* Close Button */}
                <Button className="absolute top-4 right-4 rounded-md p-2 text-white focus:outline-none" onClick={() => setIsOpen(false)}>
                  <X size={24} />
                </Button>

                {/* Mobile Login & Register */}
                {isLoading ? (
                  <Typography variant="p" className="text-gray-700">
                    Loading...
                  </Typography>
                ) : loggedInUser ? (
                  <div ref={profileRef} className="relative">
                    <Button className="flex items-center text-gray-300 hover:text-gray-500 focus:ring-0 focus:outline-0" onClick={() => setProfileDropdown(!profileDropdown)}>
                      <UserCircle size={30} className="mr-1" />
                      <Typography variant="h4">Hey👋, {user.name.split(" ")[0]}</Typography>
                      <ChevronDown size={16} className="ml-1" />
                    </Button>

                    {/* Profile Dropdown */}
                    {profileDropdown && (
                      <div className="absolute -right-10 z-[51] mt-2 w-48 rounded-md border bg-white shadow-lg">
                        <Link href={`/profile/${user.id}`} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                          Profile
                        </Link>
                        <Button onClick={handleLogout} className="w-full rounded-sm bg-black px-4 py-2 text-left">
                          <LogOut size={16} className="mr-2 inline-block" />
                          Logout
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Link href="/login" className="flex items-center text-gray-700 transition hover:text-gray-900">
                      <UserCircle size={30} className="mr-1" />
                      <Typography variant="h4">Login</Typography>
                    </Link>
                    <Link href="/signup" className="flex items-center text-gray-700 transition hover:text-gray-900">
                      <UserCircle size={30} className="mr-1" />
                      <Typography variant="h4">Register</Typography>
                    </Link>
                  </div>
                )}

                {/* Mobile Cart */}
                <Link href={navigation.icons.cart.href} className="relative">
                  <ShoppingCart size={30} className="text-gray-700 transition hover:text-gray-900" />
                  <span className="absolute -top-1 -right-5 rounded-full bg-black px-2 py-0.5 text-xs text-white">{cartItemsCount}</span>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
