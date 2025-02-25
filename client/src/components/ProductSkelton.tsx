// ProductSkeleton.tsx or .jsx
export default function ProductSkeleton() {
    return (
        <div className="group relative border border-gray-200 rounded-lg overflow-hidden animate-pulse">
            {/* Image Placeholder */}
            <div className="aspect-square relative bg-gray-200" />

            <div className="p-4">
                {/* Title Placeholder */}
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 sm:mb-3"></div>

                {/* Description Placeholder */}
                <div className="h-3 bg-gray-200 rounded w-full mb-3 sm:mb-4"></div>

                {/* Price & Button Placeholder */}
                <div className="flex items-center justify-between">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-8 bg-gray-200 rounded w-16"></div>
                </div>
            </div>
        </div>
    );
}
