import React from "react";

export const ImageModal = ({ isOpen, imageUrl, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-lg font-semibold mb-4 text-center">
          Profile Picture
        </h3>
        <div className="flex justify-center items-center mb-4">
          <img
            src={imageUrl}
            alt="Profile"
            className="max-h-60 w-auto object-contain rounded-lg"
          />
        </div>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="w-full h-[44px] flex items-center justify-center gap-2 transition duration-500 text-white border border-[#667080] rounded-[100px] md:text-[16px] text-[13px] font-semibold px-[12px] bg-gray-400 hover:bg-gray-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
