// CustomModal.tsx
import React, { useState, useEffect } from "react";
import { CloseIcon } from "../../Icon";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300); // Match duration with your exit animation
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget === event.target) {
      onClose(); // Close modal if backdrop is clicked
    }
  };

  const handleClose = () => {
    onClose(); // Trigger the onClose function
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div
        className={`bg-white rounded-lg shadow-lg p-6 w-full max-w-md transition-transform transform ${
          isOpen ? "animate-fadeIn" : "animate-fadeOut"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold"></h2>
          <button onClick={handleClose} aria-label="Close">
            <CloseIcon />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default CustomModal;
