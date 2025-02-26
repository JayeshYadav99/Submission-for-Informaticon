

# E-Commerce Product Listing

A modern, responsive React application for browsing, filtering, and sorting products, complete with a custom Node.js/Express backend. This project demonstrates best practices in React Query, Tailwind CSS, server-side filtering, and skeleton loaders.

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Prerequisites](#prerequisites)
5. [Installation](#installation)
6. [Running the Project](#running-the-project)
7. [Project Structure](#project-structure)
8. [Usage](#usage)
9. [Customization](#customization)
10. [License](#license)

---

## Overview

This project is an e-commerce product listing page built with **React** and **TypeScript**. It includes:

- A **Node.js/Express** backend that serves local JSON data (products and categories).  
- A **React** frontend with **React Query** for data fetching, **Tailwind CSS** for styling, and skeleton loaders for a smooth user experience.

**Key Concepts**:
- **Client & Server**: The client fetches data from the Node server via endpoints like `/products` and `/categories`.
- **Filtering & Sorting**: Users can filter products by category, price range, and search query, as well as sort by price or rating.
- **Pagination**: Server-side pagination for efficient data handling.
- **Skeleton Loading**: Provides a placeholder UI while fetching data (both products and categories).

---

## Features

- **Responsive UI**:  
  Built with a mobile-first approach using Tailwind CSS, with a bottom sheet filter panel on mobile and a sidebar on desktop.

- **Price Range Filtering**:  
  Allows selecting or toggling a range (e.g., \$1–\$100). Uses either a checkbox-based approach for toggling on/off or a dual-thumb slider (depending on your chosen implementation).

- **Category Selection**:  
  Users can choose from categories served by the backend, displayed with a custom circle indicator that toggles a check icon.

- **Search**:  
  Debounced input that prevents excessive API calls as the user types.

- **Sort Dropdown**:  
  A Tailwind-styled `<select>` with a chevron icon. Sort by featured, price ascending/descending, or rating.

- **Skeletons**:  
  Placeholder UIs for both product cards and category lists while data is loading, ensuring a polished experience.

- **Server-Side Filtering**:  
  The Node.js backend filters data by category, search query, price range, and sort order, returning only the relevant subset to the client.

---

## Tech Stack

- **Frontend**:
  - [React](https://reactjs.org/) (TypeScript)
  - [React Query](https://react-query.tanstack.com/) for data fetching and caching
  - [Tailwind CSS](https://tailwindcss.com/) for styling
  - [Vite](https://vitejs.dev/)
  - [Lucide React](https://lucide.dev/) or other icon libraries

- **Backend**:
  - [Node.js](https://nodejs.org/) / [Express](https://expressjs.com/)
  - [CORS](https://www.npmjs.com/package/cors) for cross-origin resource sharing

---

## Prerequisites

- **Node.js** >= 14  
- **npm** or **yarn**  
- A modern web browser

---

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/ecommerce-product-listing.git
   cd ecommerce-product-listing
   ```

2. **Install dependencies** (both server and client):
   ```bash
   # If your server is in a folder like "server" and the client in "client", do:
   cd server
   npm install

   cd ../client
   npm install
   ```

   Or if it's a single package.json for both, simply:
   ```bash
   npm install
   ```

3. **Configure Environment**:  
   - If your Node.js server runs at `http://localhost:3000`, ensure the client fetches from `http://localhost:3000/products` and `http://localhost:3000/categories`.
   - Adjust any environment variables or `.env` files if needed.

---

## Running the Project

### **Backend**

1. In the `server` directory (or root if the backend is there):
   ```bash
   npm run start
   ```
   By default, it listens on `PORT=3000`. Adjust in `server.js` if needed.

### **Frontend**

1. In the `client` directory:
   ```bash
   npm run dev
   ```
   or
   ```bash
   npm run start
   ```
   depending on your tooling. Typically, Vite uses `npm run dev` on port 5173, Create React App uses port 3000, etc.

---

## Project Structure

An example structure might look like:

```
ecommerce-product-listing/
├── server/
│   ├── server.js
│   ├── products.json
│   ├── categories.json
│   └── package.json
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProductGallery.tsx
│   │   │   ├── CategoryList.tsx
│   │   │   ├── PriceRangeOptions.tsx
│   │   │   ├── SortDropdown.tsx
│   │   │   └── skeletons/
│   │   │       ├── ProductSkeleton.tsx
│   │   │       └── CategoryListSkeleton.tsx
│   │   ├── hooks/
│   │   │   └── useDebounce.ts
│   │   ├── utils/
│   │   │   ├── fetchProducts.ts
│   │   │   └── fetchCategories.ts
│   │   └── App.tsx
│   ├── package.json
│   └── tailwind.config.js
├── README.md
└── package.json
```

- **server.js**: Node.js/Express server that loads local JSON and supports query parameters for filtering.
- **ProductGallery.tsx**: Main component that shows search, filter, pagination, and product cards.
- **CategoryList** and **PriceRangeOptions**: UI for filtering categories and price ranges.
- **Skeletons**: Placeholder UIs rendered while data is loading.
- **React Query** hooks: `useQuery` calls in your main components or a dedicated data-fetching utility.

---

## Usage

- **Search**: Type a product title in the search bar. The client uses a debounced input so it doesn’t fetch on every keystroke.
- **Filters**: 
  - **Category**: Check the circle next to a category to filter products.  
  - **Price Range**: Toggle one of the predefined ranges, or click again to deselect.  
- **Sort**: Use the dropdown to sort by featured, price ascending/descending, or rating.
- **Pagination**: The bottom of the page includes next/prev buttons and page numbers.

---

## Customization

- **Add More Filters**: You can extend the backend to support brand filters, color, etc., then adjust your React UI.
- **Dual-Thumb Slider**: For advanced price range selection, integrate libraries like `react-range` or `react-two-thumb-input-range`.
- **Styling**: Update your `tailwind.config.js` or your custom CSS classes for a different color palette or spacing.

---



With this setup, you have a robust e-commerce product listing solution showcasing **React Query**, **Tailwind CSS**, **skeleton loaders**, and a **Node.js** backend with server-side filtering. Feel free to open issues or PRs for improvements, and happy coding!
