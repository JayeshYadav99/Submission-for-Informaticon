import React, { useState, useEffect, useCallback } from "react";
import { useQuery } from "react-query";
import { Search, ChevronLeft, ChevronRight, SlidersHorizontal, X } from "lucide-react";
import { useDebounce } from "../hooks/useDebounce";
import CategoryList from "./CategoryList";
import ProductSkeleton from "./helpers/skeletons/ProductSkeleton";
import { ITEMS_PER_PAGE } from "../constants";
import { fetchCategories, fetchProducts } from "../utils";
import PriceRangeOptions from "./helpers/PriceRangeOptions";
import SortDropdown from "./helpers/SortDropdown"
import CategoryListSkeleton from "./helpers/skeletons/CategoryListSkeleton";



interface ProductGalleryProps {
  setIsFilterOpen: (isOpen: boolean) => void;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ setIsFilterOpen }) => {
  // Local state for filtering and pagination
  const [isLocalFilterOpen, setIsLocalFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(""); // single category filtering

  const [priceRange, setPriceRange] = useState<[number, number]>([1, 7999]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured"); // can be "price_asc", "price_desc", "rating", etc.
  const [currentPage, setCurrentPage] = useState(1);

  // Debounce the search query to avoid excessive API calls
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Sync local filter state with parent's state for UI purposes (e.g., scroll lock)
  useEffect(() => {
    setIsFilterOpen(isLocalFilterOpen);
  }, [isLocalFilterOpen, setIsFilterOpen]);

  // Reset page when any filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchQuery, selectedCategory, priceRange, sortBy]);

  // React Query fetch with a query key that includes all filter parameters.
  const { data, isLoading, error } = useQuery(
    [
      "products",
      {
        searchQuery: debouncedSearchQuery,
        selectedCategory,
        currentPage,
        priceRange,
        sortBy,
      },
    ],
    fetchProducts,
    { keepPreviousData: true }
  );

  // React Query: Fetch categories from our custom server
  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useQuery("categories", fetchCategories);


  // Assume the server returns an object with "total" and "products" array.
  const totalProducts = data?.total || 0;
  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);
  const products = data?.products || [];

  // Handler for pagination
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // For category filtering, we toggle the category (or clear if already selected)
  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory((prev) => (prev === category ? "" : category));
    setCurrentPage(1);
  }, []);

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

          {/* Conditionally render skeleton or CategoryList in mobile */}
          {categoriesLoading ? (
            <CategoryListSkeleton />
          ) : (
            <CategoryList
              categories={categoriesData || []}
              selectedCategories={[selectedCategory]}
              toggleCategory={handleCategoryChange}
            />
          )}

          <PriceRangeOptions selectedRange={priceRange} onChange={setPriceRange} />

        </div>

        {/* Mobile Filter Bottom Sheet */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity ${isLocalFilterOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          onClick={closeFilters}
        />
        <div
          className={`fixed inset-x-0 bottom-0 bg-white rounded-t-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isLocalFilterOpen ? "translate-y-0" : "translate-y-full"}`}
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button onClick={closeFilters}>
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Conditionally render skeleton or CategoryList in mobile */}
              {categoriesLoading ? (
                <CategoryListSkeleton />
              ) : (
                <CategoryList
                  categories={categoriesData || []}
                  selectedCategories={[selectedCategory]}
                  toggleCategory={handleCategoryChange}
                />
              )}
              <div>
                <h3 className="font-semibold mb-4 text-gray-900">Price Range</h3>
                <PriceRangeOptions selectedRange={priceRange} onChange={setPriceRange} />
              </div>
            </div>
            <div className="sticky bottom-0 pt-4 pb-2 bg-white border-t mt-6">
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setSelectedCategory("");
                    setPriceRange([1, 7999]);
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
            <p className="text-sm text-gray-600">Showing {products.length} products</p>
            <SortDropdown
              sortValue={sortBy}
              onChange={(val) => setSortBy(val)}
            />

          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("");
                  setPriceRange([1, 7999]);
                  setSortBy("featured");
                }}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product: any) => (
                <div key={product.id} className="group relative border border-gray-200 rounded-lg overflow-hidden">
                  <div className="aspect-square relative bg-gray-100">
                    <img
                      src={product.thumbnail || "/placeholder.svg"}
                      alt={product.title}
                      loading="lazy"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-2 sm:mb-3">{product.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3 sm:mb-4">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900">${product.price.toFixed(2)}</span>
                      <button
                        type="button"
                        className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {totalProducts > 0 && (
            <div className="flex justify-center items-center mt-8 space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg ${currentPage === 1 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              {Array.from({ length: totalPages }).map((_, index) => {
                const page = index + 1;
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 rounded-lg ${page === currentPage ? "bg-indigo-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"
                      }`}
                  >
                    {page}
                  </button>
                );
              })}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg ${currentPage === totalPages ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-600 hover:bg-gray-50"
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
