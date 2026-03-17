import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function ErrorMessage({ message }) {
    if (!message) return null;
    return (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-8 rounded-xl flex flex-col items-center justify-center text-center max-w-lg mx-auto my-8">
            <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
            <h3 className="font-bold text-lg mb-1">Oh snap! Algo salió mal</h3>
            <p className="text-sm">{message}</p>
        </div>
    );
}
