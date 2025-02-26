import React from "react";

const DEFAULT_RANGE: [number, number] = [1, 7999];

interface RangeOption {
    label: string;
    value: [number, number];
}

interface PriceRangeCardProps {
    selectedRange: [number, number];
    onChange: (range: [number, number]) => void;
}

const PriceRangeCard: React.FC<PriceRangeCardProps> = ({
    selectedRange,
    onChange,
}) => {
    const ranges: RangeOption[] = [
        { label: "$1 - $100", value: [1, 100] },
        { label: "$101 - $500", value: [101, 500] },
        { label: "$501 - $1000", value: [501, 1000] },
        { label: "$1001 - $2000", value: [1001, 2000] },
        { label: "$2001 - $7999", value: [2001, 7999] },
    ];

    return (
        <div className="border-2 border-gray-200 bg-white rounded-lg p-4">
            <h3 className="font-semibold mb-4 text-gray-900">Price Range</h3>
            <div className="space-y-2">
                {ranges.map((range) => {
                    // Check if this range is currently selected and not the default
                    const isSelected =
                        JSON.stringify(range.value) === JSON.stringify(selectedRange) &&
                        JSON.stringify(selectedRange) !== JSON.stringify(DEFAULT_RANGE);

                    // Toggle logic:
                    // - If already selected, revert to DEFAULT_RANGE (deselect).
                    // - Otherwise, select the new range.
                    const handleChange = () => {
                        if (isSelected) {
                            onChange(DEFAULT_RANGE);
                        } else {
                            onChange(range.value);
                        }
                    };

                    return (
                        <label key={range.label} className="flex items-center cursor-pointer">
                            {/* Hidden native checkbox for accessibility */}
                            <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={handleChange}
                                className="sr-only"
                            />
                            {/* Custom circle indicator */}
                            <span
                                className={`flex h-5 w-5 items-center justify-center rounded-full transition-colors
                  ${isSelected
                                        ? "border-2 border-indigo-600 bg-indigo-100"
                                        : "border-2 border-gray-300 bg-white"
                                    }
                `}
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
                            <span className="ml-2 text-sm text-gray-700">{range.label}</span>
                        </label>
                    );
                })}
            </div>
        </div>
    );
};

export default PriceRangeCard;
