

# E-Commerce Product Listing - React Optimizations

This project is a modern, responsive e-commerce product listing page built in React with a strong focus on performance and user experience. Below is an overview of the key optimizations and best practices implemented in the React application.

---

## Key Optimizations in React

### 1. **Efficient Data Fetching with React Query**
- **Caching & Automatic Refetching:**  
  We use React Query to fetch products and categories from our custom Node.js server. This ensures that data is cached and only refetched when needed, reducing network requests and speeding up navigation.
- **Keep-Previous Data:**  
  The `keepPreviousData: true` option is used so that the previous page's data remains visible while new data is loading, resulting in a smoother UI transition during pagination and filter changes.

### 2. **Debounced Search Input**
- **Reduced API Calls:**  
  The search input is debounced using a custom `useDebounce` hook. This prevents excessive API calls as the user types, ensuring that the application only queries the backend after the user has paused, improving responsiveness and reducing load.

### 3. **Optimized Filtering & Sorting**
- **Server-Side Filtering:**  
  Filters such as category, price range, search query, and sort options are applied on the server side. This offloads heavy filtering logic from the client and only returns the necessary subset of products.
- **State Reset on Filter Change:**  
  The current page resets to 1 automatically whenever filters change, ensuring that users always see relevant, updated results without manual intervention.

### 4. **Component Memoization & Clean Event Handlers**
- **useCallback & useEffect:**  
  Critical event handlers like pagination and category toggling are wrapped in `useCallback` to avoid unnecessary re-creations on each render.
- **Separation of Concerns:**  
  Components such as `CategoryList`, `PriceRangeOptions`, and `SortDropdown` are modularized and optimized for reusability, reducing render overhead and improving maintainability.

### 5. **Skeleton Loaders & Lazy Loading**
- **Improved Perceived Performance:**  
  Skeleton loaders are shown while product and category data are being fetched, enhancing the user experience by providing immediate visual feedback.
- **Lazy Loading Images:**  
  Product images use the `loading="lazy"` attribute to defer loading offscreen images, reducing initial page load time and saving bandwidth.

### 6. **Tailwind CSS for Consistent and Fast Styling**
- **Utility-First Styling:**  
  Tailwind CSS is used extensively to build a uniform, responsive UI. This not only speeds up development but also minimizes custom CSS overhead.
- **Responsive & Mobile-First Design:**  
  The application is designed with a mobile-first approach, using Tailwind’s responsive utilities to ensure optimal performance and user experience across devices.

---

## Project Structure (Focus on React Optimizations)

```
client/
├── src/
│   ├── components/
│   │   ├── ProductGallery.tsx       # Main component with optimizations (debounced search, memoization, skeleton loaders)
│   │   ├── CategoryList.tsx         # Modular category filter with custom checkbox styling
│   │   ├── helpers/
│   │   │   ├── PriceRangeOptions.tsx  # Predefined price range options with toggle and custom UI
│   │   │   └── SortDropDown.tsx       # Tailwind-styled dropdown for sorting
│   │   └── skeletons/
│   │       ├── ProductSkeleton.tsx    # Skeleton component for product cards
│   │       └── CategoryListSkeleton.tsx  # Skeleton component for categories
│   ├── hooks/
│   │   └── useDebounce.ts             # Custom hook for debouncing search input
│   ├── utils/
│   │   ├── fetchProducts.ts           # API call using React Query with server-side filtering
│   │   └── fetchCategories.ts         # API call to fetch categories
│   ├── App.tsx
│   └── tailwind.config.js
└── package.json
```

---

## Running the Application

1. **Install Dependencies**  
   Navigate to the `client` directory and install the necessary packages:

   ```bash
   npm install
   ```

2. **Run the Development Server**  
   Start the React application:

   ```bash
   npm run dev
   ```

3. **Ensure Backend is Running**  
   Your custom Node.js/Express server (which handles filtering and returns local JSON data) should be running, typically on `http://localhost:3000`.

---

## Final Thoughts

This project demonstrates how to build a high-performance e-commerce product listing page using React optimizations. The use of React Query, debounced search, skeleton loaders, and Tailwind CSS not only enhances the user experience but also ensures that the app remains responsive and maintainable as it scales.

Feel free to explore and extend the optimizations as needed!

---



You can customize this README further to fit your project's exact details, but it should give a good overview of the optimizations and structure in your React application.
