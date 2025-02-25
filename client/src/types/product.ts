export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  thumbnail: string;
  rating: number;
  stock: number;
  brand: string;
  discountPercentage: number;
}

export interface Category {
  slug: string,
  name: string,
  url: string
}

export interface ProductGalleryProps {
  products: Product[];
  categories: string[];
}

export type SortOption = "featured" | "price_asc" | "price_desc" | "rating";
