import React, { useState } from "react";

const BankDetailsForm = ({ formData = {}, onChange }) => {
    const initialFormData = formData || {};

    const [formState, setFormState] = useState({
        bankName: initialFormData.bankName || "",
        accountNumber: initialFormData.accountNumber || "",
        sortCode: initialFormData.sortCode || "",
        accountName: initialFormData.accountName || "",
        employmentStatusDeclaration: initialFormData.employmentStatusDeclaration || "",
    });

    const handleChange = (field, value) => {
        const updatedFormState = { ...formState, [field]: value };
        setFormState(updatedFormState);
        onChange(updatedFormState); // Notify parent component
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Bank Details Form</h2>

            {/* Bank Name */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Bank Name</label>
                <input
                    type="text"
                    value={formState.bankName}
                    onChange={(e) => handleChange("bankName", e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                />
            </div>

            {/* Account Number */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Account Number</label>
                <input
                    type="text"
                    value={formState.accountNumber}
                    onChange={(e) => handleChange("accountNumber", e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                />
            </div>

            {/* Sort Code */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Sort Code</label>
                <input
                    type="text"
                    value={formState.sortCode}
                    onChange={(e) => handleChange("sortCode", e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                />
            </div>

            {/* Account Name */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Account Name</label>
                <input
                    type="text"
                    value={formState.accountName}
                    onChange={(e) => handleChange("accountName", e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                />
            </div>

            {/* Employment Status Declaration */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Employment Status Declaration
                </label>
                <textarea
                    value={formState.employmentStatusDeclaration}
                    onChange={(e) => handleChange("employmentStatusDeclaration", e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                />
            </div>
        </div>
    );
};

export default BankDetailsForm;
