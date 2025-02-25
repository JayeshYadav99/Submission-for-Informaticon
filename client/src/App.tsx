import "./App.css";
import ProductGallery from "./components/ProductGallery";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";

function App() {
  // Mock product data
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 129.99,
      rating: 4.5,
      reviews: 24,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      category: "electronics",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 199.99,
      rating: 4.8,
      reviews: 42,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
      category: "electronics",
    },
    {
      id: 3,
      name: "Wireless Earbuds",
      price: 89.99,
      rating: 4.3,
      reviews: 18,
      image:
        "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500",
      category: "electronics",
    },
    {
      id: 4,
      name: "Digital Camera",
      price: 599.99,
      rating: 4.7,
      reviews: 56,
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
      category: "electronics",
    },
    {
      id: 5,
      name: "Gaming Mouse",
      price: 79.99,
      rating: 4.6,
      reviews: 89,
      image:
        "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500",
      category: "electronics",
    },
    {
      id: 6,
      name: "Mechanical Keyboard",
      price: 149.99,
      rating: 4.9,
      reviews: 127,
      image:
        "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500",
      category: "electronics",
    },
    {
      id: 7,
      name: "Laptop Stand",
      price: 39.99,
      rating: 4.4,
      reviews: 65,
      image:
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500",
      category: "home",
    },
    {
      id: 8,
      name: "Bluetooth Speaker",
      price: 89.99,
      rating: 4.5,
      reviews: 92,
      image:
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
      category: "electronics",
    },
    {
      id: 9,
      name: "Tablet",
      price: 349.99,
      rating: 4.7,
      reviews: 183,
      image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500",
      category: "electronics",
    },
  ];
  const categories = [
    { id: "electronics", name: "Electronics" },
    { id: "clothing", name: "Clothing" },
    { id: "home", name: "Home & Garden" },
    { id: "sports", name: "Sports" },
  ];
  return (
    <>
      <Navbar />

      <ProductGallery products={products} categories={categories} />

      <Footer />
    </>
  );
}

export default App;
