import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ page, totalPages, onNext, onPrev }) {
    return (
        <div className="flex items-center justify-center space-x-6 py-8">
            <button
                onClick={onPrev}
                disabled={page <= 1}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-300 shadow-sm text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>

            <span className="text-sm font-medium text-gray-700 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
                Página {page} de {totalPages || 1}
            </span>

            <button
                onClick={onNext}
                disabled={page >= totalPages}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-300 shadow-sm text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
}
