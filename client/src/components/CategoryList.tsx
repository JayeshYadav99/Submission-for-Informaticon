import React, { useState } from "react";
import { Category } from "../types/product";

interface CategoryListProps {
    categories: Category[];
    selectedCategories: string[];
    toggleCategory: (slug: string) => void;
}

const CATEGORIES_TO_SHOW = 5;

const CategoryList: React.FC<CategoryListProps> = ({
    categories,
    selectedCategories,
    toggleCategory,
}) => {
    const [showAll, setShowAll] = useState(false);

    // Determine which categories to display
    const displayedCategories = showAll ? categories : categories.slice(0, CATEGORIES_TO_SHOW);

    return (
        <div className="border-2 border-gray-200 bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold mb-4 text-gray-900">Categories</h3>
            <div className="space-y-2">
                {displayedCategories.map((category) => {
                    const isSelected = selectedCategories.includes(category.slug);
                    return (
                        <label
                            key={category.slug}
                            className="flex items-center cursor-pointer"
                        >
                            {/* Hidden native checkbox */}
                            <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleCategory(category.slug)}
                                className="sr-only"
                            />
                            {/* Custom circle indicator */}
                            <span
                                className={`flex h-5 w-5 items-center justify-center rounded-full transition-colors 
                  ${isSelected
                                        ? "border-2 border-indigo-600 bg-indigo-100"
                                        : "border-2 border-gray-300 bg-white"
                                    }`}
                            >
                                {isSelected && (
                                    <svg
                                        className="h-3 w-3 text-indigo-600"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M5 13l4 4L19 7"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                )}
                            </span>
                            <span className="ml-2 text-sm text-gray-700">
                                {category.name}
                            </span>
                        </label>
                    );
                })}
            </div>
            {/* Toggle button for showing more categories */}
            {categories.length > CATEGORIES_TO_SHOW && (
                <button
                    onClick={() => setShowAll(!showAll)}
                    className="mt-2 text-sm text-indigo-600 hover:underline"
                >
                    {showAll ? "View Less" : "View More Categories"}
                </button>
            )}
        </div>
    );
};

export default CategoryList;
