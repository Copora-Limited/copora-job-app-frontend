import React, { useState } from "react";
import { CloseIcon } from "@/components/Icon";
import PrimaryInput from "@/components/Custom/Inputs/PrimaryInput";

const EmailInput = ({ emails, onEmailsChange }) => {
  const [emailInput, setEmailInput] = useState("");

  const handleAddEmail = () => {
    if (emailInput && !emails.includes(emailInput)) {
      onEmailsChange([...emails, emailInput]);
      setEmailInput("");
    }
  };

  const handleRemoveEmail = (email) => {
    onEmailsChange(emails.filter((e) => e !== email));
  };

  const handleRemoveAllEmails = () => {
    onEmailsChange([]); // Clear all emails
  };

  const handleEmailChange = (e) => {
    setEmailInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddEmail();
    }
  };

  return (
    <div>
      <div className="border rounded p-2 flex flex-wrap gap-1">
        {emails.map((email, index) => (
          <div
            key={`selected-${email}-${index}`}
            className="flex items-center gap-1 bg-blue-100 text-blue-700 rounded px-2 py-1"
          >
            {email}
            <button
              type="button"
              onClick={() => handleRemoveEmail(email)}
              className="text-blue-500 hover:text-blue-700"
              aria-label={`Remove ${email}`}
            >
              <CloseIcon />
            </button>
          </div>
        ))}
        <PrimaryInput
          value={emailInput}
          onChange={handleEmailChange}
          onKeyPress={handleKeyPress}
          placeholder="Add Email"
          className="flex-grow"
        />
        <div className="flex gap-2 mt-2">
          <button
            type="button"
            onClick={handleAddEmail}
            className="text-sm text-gray-500 hover:text-gray-700"
            aria-label="Add Email"
          >
            Add
          </button>
          {emails.length > 0 && (
            <button
              type="button"
              onClick={handleRemoveAllEmails}
              className="text-sm text-red-500 hover:text-red-700"
              aria-label="Remove All Emails"
            >
              Remove All Emails
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailInput;
