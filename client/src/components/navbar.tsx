"use client";

import { useState } from "react";
import { ShoppingCart, ChevronDown, HeartIcon, Menu, X } from "lucide-react";
import { NavbarProps } from "@/types/navbar";
import Link from "next/link";


const Navbar = ({ navigation }: NavbarProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="flex justify-between items-center py-2 sm:py-4 px-3 sm:px-12 lg:px-20 bg-white rounded-4xl mx-auto border fixed max-w-[1506px] w-full top-4 left-1/2 -translate-x-1/2 z-10">
            {/* Logo */}
            <div className="flex items-center">
                <a href={navigation.logo.href} className="text-xl font-bold text-gray-900">
                    {navigation.logo.text}
                </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6">
                {navigation.menuItems.map((item) => (
                    <a
                        key={item.name}
                        href={item.href}
                        className="text-gray-700 flex items-center hover:text-gray-900 transition"
                    >
                        {item.name}
                        {item.hasDropdown && <ChevronDown size={16} className="ml-1" />}
                    </a>
                ))}
            </div>

            {/* Mobile Menu Button */}
            <button
                className="md:hidden p-2 rounded-md focus:outline-none text-black"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Right Section (Cart & Heart) */}
            <div className="hidden md:flex items-center gap-5">
                <HeartIcon size={30} className="text-gray-700 hover:text-gray-900 transition" />
                <div className="relative mr-5">
                    <Link href={navigation.icons.cart.href} className="relative">
                        <ShoppingCart size={30} className="text-gray-700 hover:text-gray-900 transition" />
                        <span className="absolute -top-1 -right-5 bg-black text-white text-xs px-2 py-0.5 rounded-full">
                            {navigation.icons.cart.cartCount}
                        </span>
                    </Link>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="absolute top-16 left-0 w-full bg-white shadow-md border-t border-gray-200 flex flex-col items-center space-y-4 py-4 md:hidden">
                    {navigation.menuItems.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className="text-gray-700 flex items-center hover:text-gray-900 transition"
                        >
                            {item.name}
                            {item.hasDropdown && <ChevronDown size={16} className="ml-1" />}
                        </a>
                    ))}

                    {/* Mobile Cart & Heart */}
                    <div className="flex items-center gap-3">
                        <HeartIcon size={20} className="text-gray-700 hover:text-gray-900 transition" />
                        <Link href={navigation.icons.cart.href} className="relative">
                            <ShoppingCart size={30} className="text-gray-700 hover:text-gray-900 transition" />
                            <span className="absolute -top-1 -right-5 bg-black text-white text-xs px-2 py-0.5 rounded-full">
                                {navigation.icons.cart.cartCount}
                            </span>
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
