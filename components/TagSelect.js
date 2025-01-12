// src/components/TagSelect.js
import React, { useState } from "react";
import { useSelect, useMultipleSelection } from "downshift";
import { CloseIcon } from "@/components/Icon";
import PrimaryInput from "@/components/Custom/Inputs/PrimaryInput";

const TagSelect = ({ items, selectedTags, onTagsChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Filter items based on the search term
  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const {
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems,
  } = useMultipleSelection({
    selectedItems: selectedTags,
    onSelectedItemsChange: ({ selectedItems }) => onTagsChange(selectedItems),
  });

  const { getToggleButtonProps, getMenuProps, highlightedIndex, getItemProps } =
    useSelect({
      items: filteredItems,
      selectedItem: null,
      onSelectedItemChange: ({ selectedItem }) => {
        if (selectedItem) {
          const isAlreadySelected = selectedItems.some(
            (item) => item.value === selectedItem.value
          );
          if (!isAlreadySelected) {
            // console.log("selectedItem", selectedItem);

            addSelectedItem(selectedItem);
          } else {
            removeSelectedItem(selectedItem);
          }
        }
      },
      itemToString: (item) => (item ? item.label : ""),
    });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRemoveSelectedItem = (item) => {
    const updatedSelectedItems = selectedItems.filter(
      (selectedItem) => selectedItem.value !== item.value
    );
    onTagsChange(updatedSelectedItems); // Update the parent state
  };

  return (
    <div>
      <div className="border rounded p-2 flex flex-wrap gap-1">
        {selectedItems.map((item, index) => (
          <div
            key={`selected-${item.value}-${index}`}
            className="flex items-center gap-1 bg-blue-100 text-blue-700 rounded px-2 py-1"
          >
            {item.label}
            <button
              type="button"
              onClick={() => handleRemoveSelectedItem(item)} // Remove selected tag
              className="text-blue-500 hover:text-blue-700"
              aria-label={`Remove ${item.label}`}
            >
              <CloseIcon />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setDropdownOpen((prev) => !prev)} // Toggle dropdown visibility manually
          className="text-sm text-gray-500 hover:text-gray-700"
          aria-label="Toggle tag dropdown"
        >
          Add Tags
        </button>
      </div>

      {dropdownOpen && (
        <div className="relative">
          {/* Close Icon for dropdown */}
          <button
            type="button"
            onClick={() => setDropdownOpen(false)} // Manually close dropdown
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            aria-label="Close dropdown"
          >
            <CloseIcon />
          </button>
          {/* Search Input */}
          <PrimaryInput
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search Tags..."
            className="mb-2"
          />
          <ul
            {...getMenuProps()}
            className="border rounded mt-1 max-h-40 overflow-y-auto"
          >
            {filteredItems.map((item, index) => (
              <li
                key={`${item.value}-${index}`}
                {...getItemProps({
                  item,
                  index,
                  style: {
                    backgroundColor:
                      highlightedIndex === index ? "#f0f0f0" : "white",
                    fontWeight: selectedItems.some(
                      (selected) => selected.value === item.value
                    )
                      ? "bold"
                      : "normal",
                  },
                  onClick: () => addSelectedItem(item),
                })}
                className="px-3 py-2 cursor-pointer"
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TagSelect;
