import React from 'react';

export default function Loader({ message = "Loading..." }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-70">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500 border-b-4 border-gray-200 mb-4"></div>
        <span className="text-lg font-semibold text-green-700 animate-pulse">{message}</span>
      </div>
    </div>
  );
}
