import React from "react";
import { ChevronDown } from "lucide-react";

interface SortDropdownProps {
    sortValue: string;
    onChange: (value: string) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ sortValue, onChange }) => {
    return (
        <div className="relative inline-block w-64">
            <select
                value={sortValue}
                onChange={(e) => onChange(e.target.value)}
                className="block w-full appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded leading-tight 
                   focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
                <option value="featured">Featured</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Best Rated</option>
            </select>
            {/* Chevron icon absolutely positioned on the right */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <ChevronDown className="h-4 w-4" />
            </div>
        </div>
    );
};

export default SortDropdown;
