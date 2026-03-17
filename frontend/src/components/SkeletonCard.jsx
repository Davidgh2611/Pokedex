import React from 'react';

export default function SkeletonCard() {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden transform hover:-translate-y-1 transition duration-200">
            <div className="h-48 w-full skeleton-box"></div>
            <div className="p-4 flex flex-col items-center">
                <div className="h-6 w-32 skeleton-box rounded mb-3"></div>
                <div className="h-6 w-20 skeleton-box rounded-full mb-3"></div>
                <div className="h-4 w-24 skeleton-box rounded"></div>
            </div>
        </div>
    );
}
