const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

const productsData = require("./products.json"); // Load products data
const categoriesData = require("./categories.json"); // Load categories data

// Enable CORS for all routes
app.use(cors());

// GET /products endpoint (with filtering, sorting, and pagination)
app.get("/products", (req, res) => {
  try {
    let { search, category, minPrice, maxPrice, sort, limit, skip } = req.query;

    // Set defaults and convert types
    limit = parseInt(limit) || 10;
    skip = parseInt(skip) || 0;
    minPrice = parseFloat(minPrice) || 0;
    maxPrice = parseFloat(maxPrice) || Infinity;

    // Get all products from the JSON file
    let products = productsData.products;

    // Apply search filtering on title
    if (search) {
      const lowerSearch = search.toLowerCase();
      products = products.filter((p) =>
        p.title.toLowerCase().includes(lowerSearch)
      );
    }

    // Filter by category if provided
    if (category) {
      products = products.filter((p) => p.category === category);
    }

    // Apply price filtering
    products = products.filter(
      (p) => p.price >= minPrice && p.price <= maxPrice
    );

    // Apply sorting if provided
    if (sort === "price_asc") {
      products.sort((a, b) => a.price - b.price);
    } else if (sort === "price_desc") {
      products.sort((a, b) => b.price - a.price);
    } else if (sort === "rating") {
      products.sort((a, b) => b.rating - a.rating);
    }

    const total = products.length;

    // Apply pagination (skip and limit)
    products = products.slice(skip, skip + limit);

    res.json({ total, products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// GET /categories endpoint
// Returns the list of categories from the local categories.json file.
app.get("/categories", (req, res) => {
  try {
    res.json(categoriesData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
