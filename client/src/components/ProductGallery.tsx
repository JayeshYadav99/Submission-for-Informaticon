import { Search, ChevronLeft, ChevronRight, SlidersHorizontal, X } from "lucide-react";
import { useState, useMemo, useEffect, useCallback } from "react";
import { Product, Category, SortOption } from "../types/product";
import { ITEMS_PER_PAGE } from '../constants';
import { useDebounce } from '../hooks/useDebounce';
import CategoryList from "./CategoryList";
import ProductSkeleton from "./ProductSkelton";
import { useQuery } from 'react-query';
interface ProductGalleryProps {
  setIsFilterOpen: (isOpen: boolean) => void;
}
import { fetchProducts, fetchCategories } from '../utils';
const ProductGallery: React.FC<ProductGalleryProps> = ({ setIsFilterOpen }) => {

  const [isLocalFilterOpen, setIsLocalFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState(2000);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [currentPage, setCurrentPage] = useState(1);

  // Debounced search query for performance
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Use React Query to fetch products
  const {
    data: productsData,
    isLoading: productsLoading,
    error: productsError,
  } = useQuery('products', fetchProducts);

  // Use React Query to fetch categories
  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useQuery('categories', fetchCategories);

  const loading = productsLoading || categoriesLoading;
  const error = productsError || categoriesError;

  const products: Product[] = productsData?.products || [];
  const categories: Category[] = categoriesData || [];



  const filteredProducts = useMemo(() => {
    return products
      .filter(product => {
        const matchesSearch = product.title
          .toLowerCase()
          .includes(debouncedSearchQuery.toLowerCase());

        const matchesCategory =
          selectedCategories.length === 0 ||
          selectedCategories.includes(product.category);

        const matchesPrice = product.price <= priceRange;

        return matchesSearch && matchesCategory && matchesPrice;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'price_asc':
            return a.price - b.price;
          case 'price_desc':
            return b.price - a.price;
          case 'rating':
            return b.rating - a.rating;
          default:
            return 0;
        }
      });
  }, [products, debouncedSearchQuery, selectedCategories, priceRange, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategories, priceRange, sortBy]);


  const toggleCategory = useCallback((category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);



  // Mobile filter handlers
  // When the local filter state changes, update the parent's state.
  useEffect(() => {
    setIsFilterOpen(isLocalFilterOpen);
  }, [isLocalFilterOpen, setIsFilterOpen]);

  // Filter handlers now only update local state.
  const openFilters = useCallback(() => setIsLocalFilterOpen(true), []);
  const closeFilters = useCallback(() => setIsLocalFilterOpen(false), []);


  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {String(error)}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search and Filter Bar */}
      <div className="flex items-center gap-4 mb-8">
        <div className="relative flex-1">
          <input
            type="search"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
        <button
          onClick={openFilters}
          className="md:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg"
        >
          <SlidersHorizontal className="h-5 w-5" />
          Filters
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        {/* Desktop Sidebar */}
        <div className="hidden md:block space-y-6">
          <div>
            <CategoryList
              categories={categories}
              selectedCategories={selectedCategories}
              toggleCategory={toggleCategory}
            />
          </div>

          <div className="border-2 border-gray-200 p-4 rounded-lg">
            <h3 className="font-semibold mb-4 text-gray-900">Price Range</h3>
            <input
              type="range"
              min="20"
              max="2000"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between mt-2">
              <span className="text-sm text-gray-600">$0</span>
              <span className="text-sm text-gray-600">${priceRange}</span>
            </div>
          </div>
        </div>

        {/* Mobile Filter Bottom Sheet */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity ${isLocalFilterOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          onClick={closeFilters}
        />
        <div
          className={`fixed inset-x-0 bottom-0 bg-white rounded-t-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isLocalFilterOpen ? 'translate-y-0' : 'translate-y-full'
            }`}
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button onClick={closeFilters}>
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6 max-h-[70vh] overflow-y-auto">
              <div>
                <CategoryList
                  categories={categories}
                  selectedCategories={selectedCategories}
                  toggleCategory={toggleCategory}
                />
              </div>

              <div>
                <h3 className="font-semibold mb-4 text-gray-900">Price Range</h3>
                <input
                  type="range"
                  min="20"
                  max="2000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-gray-600">$0</span>
                  <span className="text-sm text-gray-600">${priceRange}</span>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 pt-4 pb-2 bg-white border-t mt-6">
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setSelectedCategories([]);
                    setPriceRange(2000);
                    closeFilters();
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700"
                >
                  Reset
                </button>
                <button
                  onClick={closeFilters}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="md:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-600">
              Showing {paginatedProducts.length} products
            </p>
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
            >
              <option value="featured">Featured</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Best Rated</option>
            </select>
          </div>

          {loading ? (
            // Show skeleton placeholders while loading
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          ) : paginatedProducts.length === 0 ? (
            // When loading is done but no products exist (e.g., due to filtering)
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No products found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategories([]);
                  setPriceRange(2000);
                  setSortBy("featured");
                }}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            // Render the grid of product cards if products exist
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedProducts.map((product) => (
                <div
                  key={product.id}
                  className="group relative border border-gray-200 rounded-lg overflow-hidden"
                >
                  <div className="aspect-square relative bg-gray-100">
                    <img
                      src={product.thumbnail || "/placeholder.svg"}
                      alt={product.title}
                      loading="lazy"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-4">
                    {/* Title */}
                    <h3 className="font-medium text-gray-900 mb-2 sm:mb-3">
                      {product.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3 sm:mb-4">
                      {product.description}
                    </p>

                    {/* Price & Add to Cart */}
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900">
                        ${product.price.toFixed(2)}
                      </span>
                      <button type="button" className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}


          {/* Pagination */}
          {filteredProducts.length > 0 && (
            <div className="flex justify-center items-center mt-8 space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg ${currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                const isCurrentPage = page === currentPage;

                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 rounded-lg ${isCurrentPage
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-gray-600 hover:bg-gray-50"
                        }`}
                    >
                      {page}
                    </button>
                  );
                }

                if (page === currentPage - 2 || page === currentPage + 2) {
                  return (
                    <span key={page} className="px-2">
                      ...
                    </span>
                  );
                }

                return null;
              })}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg ${currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProductGallery;
