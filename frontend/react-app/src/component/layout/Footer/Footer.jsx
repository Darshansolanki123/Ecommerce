import { useLocation } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, Phone } from "lucide-react";

const Footer = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin/");

  return (
    <footer
      className={`bg-gradient-to-r from-blue-600 to-purple-700 text-white py-8 mt-auto relative w-full ${
        isAdminPage ? "lg:pl-[250px]" : "pl-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        {/* Footer Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center sm:text-left">
          
          {/* Logo & Intro */}
          <div>
            <h2 className="text-3xl font-extrabold italic font-serif">E-Shop</h2>
            <p className="mt-2 text-sm text-gray-200">
              Your one-stop shop for the latest and greatest products. Shop with confidence and style!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-gray-200">
              <li>About Us</li>
              <li>Contact</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Customer Support</h3>
            <ul className="space-y-2 text-gray-200">
              <li>FAQs</li>
              <li>Shipping & Returns</li>
              <li>Track Order</li>
              <li>Help Center</li>
            </ul>
          </div>

          {/* Contact & Social Media */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
            <p className="flex items-center gap-2 justify-center sm:justify-start">
              <Mail size={18} /> support@eshop.com
            </p>
            <p className="flex items-center gap-2 mt-1 justify-center sm:justify-start">
              <Phone size={18} /> +1 234 567 890
            </p>

            {/* Social Media Icons */}
            <div className="flex justify-center sm:justify-start gap-4 mt-4">
              <Facebook size={24} />
              <Twitter size={24} />
              <Instagram size={24} />
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 text-center border-t border-gray-400 pt-4 text-gray-200 text-sm">
          © {new Date().getFullYear()} E-Shop. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
