export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface ProductGalleryProps {
  products: Product[];
  categories: Category[];
}

export type SortOption = "featured" | "price_asc" | "price_desc" | "rating";
