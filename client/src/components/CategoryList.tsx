import { useState } from "react";
import { Category } from "../types/product";
interface CategoryListProps {
    categories: Category[];
    selectedCategories: string[];
    toggleCategory: (slug: string) => void;
}

function CategoryList({ categories, selectedCategories, toggleCategory }: CategoryListProps) {
    // Number of categories to show by default
    const CATEGORIES_TO_SHOW = 5;

    // Track whether we are showing all or just the default subset
    const [showAll, setShowAll] = useState(false);

    // Determine which categories to display
    const displayedCategories = showAll
        ? categories
        : categories.slice(0, CATEGORIES_TO_SHOW);

    return (
        <div className="border-2 border-gray-200 p-4 rounded-lg">
            <h3 className="font-semibold mb-4 text-gray-900">Categories</h3>
            <div className="space-y-3">
                {displayedCategories.map((category) => (
                    <label key={category.slug} className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            checked={selectedCategories.includes(category.slug)}
                            onChange={() => toggleCategory(category.slug)}
                        />
                        <span className="text-sm text-gray-600">{category.name}</span>
                    </label>
                ))}

                {/* Only show the button if we have more categories than the default subset */}
                {categories.length > CATEGORIES_TO_SHOW && (
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="mt-2 text-sm text-indigo-600 hover:underline"
                    >
                        {showAll ? "View Less" : "View More Categories"}
                    </button>
                )}
            </div>
        </div>
    );
}

export default CategoryList;
