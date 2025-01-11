import React from "react";

import { Button } from "@/components/ui/button";
export const ConfirmationModal = ({ isProcessing, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-lg font-semibold mb-4">
          Are you sure you want to resend the invite?
        </h3>
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <button
            type="button"
            className={`w-full h-[44px] mt-6 flex items-center justify-center gap-2 transition duration-500 text-white border border-[#667080] rounded-[100px] md:text-[16px] text-[13px] font-semibold px-[12px] disabled:bg-[#D0D5DD] disabled:text-white disabled:cursor-not-allowed disabled:border-none click_btn ${
              isProcessing ? "bg-gray-400" : "bg-appGreen hover:bg-teal-700"
            }`}
            onClick={onConfirm}
            disabled={isProcessing}
          >
            {isProcessing ? "Sending..." : " Yes, Resend"}
          </button>
        </div>
      </div>
    </div>
  );
};
