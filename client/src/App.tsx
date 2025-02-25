import "./App.css";
import ProductGallery from "./components/ProductGallery";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import { useState } from "react";

function App() {
  // Lift filter state up to control scrolling from a parent container.
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    // The container is given full-screen height and conditionally applies overflow-hidden
    <div className={`min-h-screen ${isFilterOpen ? "overflow-hidden" : "overflow-auto"}`}>
      <Navbar />

      <ProductGallery setIsFilterOpen={setIsFilterOpen} />

      <Footer />
    </div>
  );
}

export default App;
