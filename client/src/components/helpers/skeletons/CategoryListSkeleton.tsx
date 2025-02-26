// CategoryListSkeleton.tsx
import React from "react";

const CategoryListSkeleton: React.FC = () => {
    return (
        <div className="border-2 border-gray-200 bg-white rounded-lg p-4 space-y-4">
            <h3 className="font-semibold text-gray-900">Categories</h3>
            <div className="space-y-2">
                {/* Render a few placeholder lines */}
                {Array.from({ length: 5 }).map((_, index) => (
                    <div
                        key={index}
                        className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"
                    />
                ))}
            </div>
        </div>
    );
};

export default CategoryListSkeleton;
