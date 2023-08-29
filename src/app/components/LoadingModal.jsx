import React from "react";

export const LoadingModal = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-800">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-b-4"></div>
        <div className="mt-4 text-center">Loading...</div>
      </div>
    </div>
  );
};
