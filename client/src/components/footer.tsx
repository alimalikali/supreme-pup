import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-accent ">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Company Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">PUP</h2>
          <p className="text-gray-300  text-sm mt-2">
            Your one-stop destination for smart shopping.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">Shop</h3>
          <ul className="mt-3 space-y-2 text-gray-300  text-sm">
            <li><Link href="/products" className="hover:text-gray-900 dark:hover:text-white transition">All Products</Link></li>
            <li><Link href="/categories" className="hover:text-gray-900 dark:hover:text-white transition">Categories</Link></li>
            <li><Link href="/offers" className="hover:text-gray-900 dark:hover:text-white transition">Best Deals</Link></li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">Support</h3>
          <ul className="mt-3 space-y-2 text-gray-300  text-sm">
            <li><Link href="/contact" className="hover:text-gray-900 dark:hover:text-white transition">Contact Us</Link></li>
            <li><Link href="/faq" className="hover:text-gray-900 dark:hover:text-white transition">FAQs</Link></li>
            <li><Link href="/returns" className="hover:text-gray-900 dark:hover:text-white transition">Returns Policy</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">Follow Us</h3>
          <ul className="mt-3 flex space-x-4">
            <li><Link href="https://facebook.com" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition"><span className="sr-only">Facebook</span>🌐</Link></li>
            <li><Link href="https://twitter.com" className="text-gray-600 dark:text-gray-400 hover:text-blue-400 transition"><span className="sr-only">Twitter</span>🐦</Link></li>
            <li><Link href="https://instagram.com" className="text-gray-600 dark:text-gray-400 hover:text-pink-500 transition"><span className="sr-only">Instagram</span>📸</Link></li>
          </ul>
        </div>

      </div>

      {/* Copyright */}
      <div className="text-center text-gray-300  text-sm py-6 border-t border-foreground">
        © {new Date().getFullYear()} PUP. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
