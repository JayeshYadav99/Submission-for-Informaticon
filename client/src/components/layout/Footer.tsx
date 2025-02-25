const Footer = () => {
  return (
    <footer className="bg-slate-200  mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h3 className="font-semibold mb-4">About Us</h3>
          <p className="text-sm text-gray-600">
            Your trusted source for quality products.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Customer Service</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <a href="#" className="hover:text-gray-900">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-900">
                Shipping Info
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-900">
                Returns
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-900">
                FAQ
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <a href="#" className="hover:text-gray-900">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-900">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-900">
                Sitemap
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Newsletter</h3>
          <div className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-4 py-2 rounded-l-lg border border-r-0 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-4 ">
        <p className="text-sm text-center text-gray-600">
          © 2025 Store. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
