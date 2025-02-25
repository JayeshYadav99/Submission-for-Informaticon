// Define your fetch functions
export const fetchProducts = async () => {
    const res = await fetch('https://dummyjson.com/products?limit=100');
    if (!res.ok) {
        throw new Error('Failed to fetch products');
    }
    return res.json();
};

export const fetchCategories = async () => {
    const res = await fetch('https://dummyjson.com/products/categories');
    if (!res.ok) {
        throw new Error('Failed to fetch categories');
    }
    return res.json();
};