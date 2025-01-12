// components/ui/button.js
import React from "react";
import clsx from "clsx";

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded",
        {
          "bg-blue-600 text-white hover:bg-blue-700": variant === "primary",
          "bg-gray-200 text-gray-700 hover:bg-gray-300": variant === "ghost",
        },
        {
          "px-4 py-2 text-sm": size === "sm",
          "px-6 py-3 text-base": size === "md",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
