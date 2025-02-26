

# E-Commerce Product Listing - React Optimizations

This project is a modern, responsive e-commerce product listing page built in React with a strong focus on performance and user experience. The project demonstrates best practices in React Query, Tailwind CSS, server-side filtering, skeleton loaders, and more.

## Live Demo

Check out the live demo: [https://store-one-rust.vercel.app/](https://store-one-rust.vercel.app/)

Design: https://excalidraw.com/#room=76f0790e34cfacc4f74b,_PZsLCqHahAjtNKzOJuLsQ

---

## Key Optimizations in React

### 1. Efficient Data Fetching with React Query
- **Caching & Automatic Refetching:**  
  Uses React Query to fetch products and categories from the custom Node.js server. Data is cached and only refetched when necessary, reducing network requests.
- **Keep-Previous Data:**  
  The `keepPreviousData: true` option ensures smooth transitions during pagination and filter changes.

### 2. Debounced Search Input
- **Reduced API Calls:**  
  Implements a custom `useDebounce` hook to debounce the search input, preventing excessive API calls as users type.

### 3. Optimized Filtering & Sorting
- **Server-Side Filtering:**  
  Filtering (category, price range, search query, sort order) is offloaded to the server, returning only the relevant subset of products.
- **State Reset on Filter Change:**  
  The current page resets automatically when filters change to ensure updated results.

### 4. Component Memoization & Clean Event Handlers
- **useCallback & useEffect:**  
  Critical event handlers (pagination, category toggling) are wrapped in `useCallback` to reduce unnecessary re-creations on re-renders.
- **Separation of Concerns:**  
  Modular components such as `CategoryList`, `PriceRangeOptions`, and `SortDropdown` improve code readability and performance.

### 5. Skeleton Loaders & Lazy Loading
- **Improved Perceived Performance:**  
  Skeleton loaders are displayed while data is being fetched, enhancing the user experience.
- **Lazy Loading Images:**  
  Product images use the `loading="lazy"` attribute to defer loading offscreen images, reducing initial load time.

### 6. Tailwind CSS for Consistent and Fast Styling
- **Utility-First Styling:**  
  Tailwind CSS is used for a consistent, responsive UI, speeding up development and reducing custom CSS.
- **Responsive & Mobile-First Design:**  
  The design adapts to various screen sizes, with a mobile bottom sheet filter and a desktop sidebar.

---

## Project Structure

```
ecommerce-product-listing/
├── server/
│   ├── server.js           # Express server handling filtering & serving local JSON data
│   ├── products.json       # Local JSON data for products
│   ├── categories.json     # Local JSON data for categories
│   └── package.json
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProductGallery.tsx       # Main product listing component with optimizations
│   │   │   ├── CategoryList.tsx         # Category filtering UI with custom checkbox indicator
│   │   │   ├── helpers/
│   │   │   │   ├── PriceRangeOptions.tsx  # Predefined price range options with toggle and custom UI
│   │   │   │   └── SortDropDown.tsx       # Tailwind-styled sort dropdown
│   │   │   └── skeletons/
│   │   │       ├── ProductSkeleton.tsx    # Skeleton component for product cards
│   │   │       └── CategoryListSkeleton.tsx  # Skeleton component for categories
│   │   ├── hooks/
│   │   │   └── useDebounce.ts             # Custom debounce hook
│   │   ├── utils/
│   │   │   ├── fetchProducts.ts           # API utility for fetching products
│   │   │   └── fetchCategories.ts         # API utility for fetching categories
│   │   └── App.tsx
│   ├── package.json
│   └── tailwind.config.js
├── README.md
└── package.json
```

---

## Running the Application

### Backend
1. Navigate to the `server` directory:
   ```bash
   cd server
   npm install
   npm run start
   ```
   The backend server listens on `http://localhost:3000` (adjust as needed).

### Frontend
1. Navigate to the `client` directory:
   ```bash
   cd client
   npm install
   npm run dev
   ```
   This starts the React development server.

---

## Optimizations Focus

- **React Query Caching:**  
  Ensures that data is cached and reduces unnecessary network calls.
- **Debounced Search:**  
  Improves responsiveness by reducing API calls during typing.
- **Server-Side Filtering:**  
  Offloads heavy filtering logic from the client.
- **Skeleton Loaders:**  
  Enhance the perceived performance while waiting for data.
- **Tailwind CSS Styling:**  
  Uniform and responsive design using utility classes.

---
