import { Link } from "react-router-dom";
import { Search, ShoppingCart, User, Home, Package, Info, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-700 shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex items-center justify-between py-3 px-4 sm:px-6 md:px-10">
        
        {/* Left: Logo */}
        <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide">
          <Link to="/" className="cursor-pointer text-white hover:text-gray-200">
            <span className="font-serif italic">E-Shop</span>
          </Link>
        </div>

        {/* Center: Navigation Links (Hidden on Mobile) */}
        <nav className="hidden md:flex items-center gap-8 text-white text-lg font-semibold">
          <Link to="/" className="hover:text-gray-200 flex items-center gap-2">
            <Home size={22} /> Home
          </Link>
          <Link to="/products" className="hover:text-gray-200 flex items-center gap-2">
            <Package size={22} /> Products
          </Link>
          <Link to="/about" className="hover:text-gray-200 flex items-center gap-2">
            <Info size={22} /> About
          </Link>
        </nav>

        {/* Right: Icons */}
        <div className="flex items-center gap-6">
          <button className="text-white hover:text-gray-200">
            <Link to="/Search">
              <Search size={26} />
            </Link>
          </button>
          <Link to="/cart" className="text-white hover:text-gray-200">
            <ShoppingCart size={26} />
          </Link>
          <Link to="/login" className="text-white hover:text-gray-200">
            <User size={26} />
          </Link>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white focus:outline-none" 
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu with Smooth Animation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-blue-700 w-full text-center py-3 shadow-md"
          >
            <ul className="flex flex-col gap-4 text-white text-lg">
              <li>
                <Link to="/" className="cursor-pointer hover:text-gray-200 flex items-center justify-center gap-2">
                  <Home size={20} /> Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="cursor-pointer hover:text-gray-200 flex items-center justify-center gap-2">
                  <Package size={20} /> Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="cursor-pointer hover:text-gray-200 flex items-center justify-center gap-2">
                  <Info size={20} /> About
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
