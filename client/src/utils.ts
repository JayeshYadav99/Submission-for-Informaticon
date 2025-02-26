import { ITEMS_PER_PAGE } from "./constants";

// Define your fetch functions
export const fetchProducts = async ({ queryKey }: { queryKey: any }) => {
    const [_key, { searchQuery, selectedCategory, currentPage, priceRange, sortBy }] = queryKey;
    const limit = ITEMS_PER_PAGE;
    const skip = (currentPage - 1) * limit;
    const params = new URLSearchParams();

    if (searchQuery) params.append("search", searchQuery);
    if (selectedCategory) params.append("category", selectedCategory);
    // We assume the server supports min/max price filtering.
    params.append("minPrice", priceRange[0].toString());
    params.append("maxPrice", priceRange[1].toString());

    if (sortBy && sortBy !== "featured") params.append("sort", sortBy);
    params.append("limit", limit.toString());
    params.append("skip", skip.toString());

    const response = await fetch(`${import.meta.env.VITE_API_URL}/products?${params.toString()}`);
    if (!response.ok) {
        throw new Error("Error fetching products");
    }
    return response.json();
};

export const fetchCategories = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/categories`);
    if (!res.ok) {
        throw new Error('Failed to fetch categories');
    }
    return res.json();
};