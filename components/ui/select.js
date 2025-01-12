// components/ui/select.js
import React, { useState } from "react";

export function Select({ children }) {
  return <div className="relative">{children}</div>;
}

export function SelectTrigger({ children, className, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-2 border border-gray-300 rounded-md ${className}`}
    >
      {children}
    </button>
  );
}

export function SelectContent({ children, isOpen }) {
  if (!isOpen) return null;
  return (
    <div className="absolute w-full bg-white border border-gray-300 rounded-md mt-1">
      {children}
    </div>
  );
}

export function SelectItem({ value, children, onSelect }) {
  return (
    <div
      onClick={() => onSelect(value)}
      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
    >
      {children}
    </div>
  );
}

export function SelectValue({ placeholder }) {
  return <span>{placeholder}</span>;
}
