import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-accent w-full px-3 sm:px-12 lg:px-20">
      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-8 px-6 py-12 sm:grid-cols-2 md:grid-cols-4">
        {/* Company Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">PUP</h2>
          <p className="mt-2 text-sm text-gray-300">Your one-stop destination for smart shopping.</p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">Shop</h3>
          <ul className="mt-3 space-y-2 text-sm text-gray-300">
            <li>
              <Link href="/products" className="transition hover:text-gray-900 dark:hover:text-white">
                All Products
              </Link>
            </li>
            <li>
              <Link href="/categories" className="transition hover:text-gray-900 dark:hover:text-white">
                Categories
              </Link>
            </li>
            <li>
              <Link href="/offers" className="transition hover:text-gray-900 dark:hover:text-white">
                Best Deals
              </Link>
            </li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">Support</h3>
          <ul className="mt-3 space-y-2 text-sm text-gray-300">
            <li>
              <Link href="/contact" className="transition hover:text-gray-900 dark:hover:text-white">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/faq" className="transition hover:text-gray-900 dark:hover:text-white">
                FAQs
              </Link>
            </li>
            <li>
              <Link href="/returns" className="transition hover:text-gray-900 dark:hover:text-white">
                Returns Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">Follow Us</h3>
          <ul className="mt-3 flex space-x-4">
            <li>
              <Link href="https://facebook.com" className="text-gray-600 transition hover:text-blue-600 dark:text-gray-400">
                <span className="sr-only">Facebook</span>🌐
              </Link>
            </li>
            <li>
              <Link href="https://twitter.com" className="text-gray-600 transition hover:text-blue-400 dark:text-gray-400">
                <span className="sr-only">Twitter</span>🐦
              </Link>
            </li>
            <li>
              <Link href="https://instagram.com" className="text-gray-600 transition hover:text-pink-500 dark:text-gray-400">
                <span className="sr-only">Instagram</span>📸
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-foreground border-t py-6 text-center text-sm text-gray-300">© {new Date().getFullYear()} PUP. All rights reserved.</div>
    </footer>
  );
};

export default Footer;
