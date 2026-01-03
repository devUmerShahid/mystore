import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12 flex flex-col">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto w-full px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand / About */}
        <div>
          <h2 className="text-white text-2xl font-semibold mb-4 tracking-wide">
            My Store
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed mb-6">
            Your one-stop destination for premium products at unbeatable prices.
            Shop smart, shop with confidence — every time.
          </p>

          <div className="flex space-x-4 text-lg">
            <a href="#" className="hover:scale-110 transform transition duration-300">
              <FontAwesomeIcon icon={faFacebookF} className="hover:text-blue-500" />
            </a>
            <a href="#" className="hover:scale-110 transform transition duration-300">
              <FontAwesomeIcon icon={faTwitter} className="hover:text-sky-400" />
            </a>
            <a href="#" className="hover:scale-110 transform transition duration-300">
              <FontAwesomeIcon icon={faInstagram} className="hover:text-pink-500" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm">
            <li><a href="/" className="hover:text-white transition">Home</a></li>
            <li><a href="/home" className="hover:text-white transition">Shop</a></li>
            <li><a href="/cart" className="hover:text-white transition">Cart</a></li>
            <li><a href="/profile" className="hover:text-white transition">Profile</a></li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
            Customer Support
          </h3>
          <ul className="space-y-3 text-sm">
            <li><a href="/#contact" className="hover:text-white transition">Contact Us</a></li>
            <li><a href="/#faq" className="hover:text-white transition">FAQs</a></li>
            <li><a href="/#returns" className="hover:text-white transition">Return Policy</a></li>
            <li><a href="/#terms" className="hover:text-white transition">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Newsletter / Stay Connected */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
            Stay Updated
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            Subscribe to get the latest updates, offers, and news.
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:flex-1 px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} <span className="font-semibold text-gray-200">My Store</span>. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
