import { useState } from "react";
import { Heart, ShoppingCart, Settings, Menu } from "lucide-react";
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              className="md:hidden mr-4"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
            <a href="#" className="text-indigo-600 font-semibold">
              Store
            </a>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Home
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Categories
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Deals
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Contact
            </a>
          </nav>
          <div className="flex items-center space-x-4 md:space-x-6">
            <Settings className="w-5 h-5 text-gray-600" />
            <Heart className="w-5 h-5 text-gray-600" />
            <ShoppingCart className="w-5 h-5 text-gray-600" />
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"} mt-4`}
        >
          <nav className="flex flex-col space-y-4">
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Home
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Categories
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Deals
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Contact
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
