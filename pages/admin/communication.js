"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import TagSelect from "@/components/TagSelect";
import EmailInput from "@/components/EmailInput";
import { useFetchTags } from "@/hooks/useUserProfile";
import { fetchUsersByTags, sendBulkEmail } from "@/hooks/actions";
import DashboardLayout from "@/components/DashboardLayout";
import { useSessionContext } from "@/context/SessionContext";

export default function EmailForm() {
  const { token } = useSessionContext();
  const [isLoading, setIsLoading] = useState(false);
  const { tags = {} } = useFetchTags(token);

  // State for managing the form data
  const [formData, setFormData] = useState({
    selectedTags: [],
    emails: [],
    subject: "",
    content: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Format tags for the `TagSelect` component
  const formatTags = (tagGroup) =>
    Array.isArray(tagGroup)
      ? tagGroup.map((tag) => ({ value: tag.name, label: tag.name }))
      : [];

  const items = [
    ...(tags.location ? formatTags(tags.location) : []),
    ...(tags.group ? formatTags(tags.group) : []),
    ...(tags.employmentType ? formatTags(tags.employmentType) : []),
    ...(tags.jobTitle ? formatTags(tags.jobTitle) : []),
  ];

  // Handle tag changes
  const handleTagsChange = (selectedItems) => {
    setFormData((prev) => ({ ...prev, selectedTags: selectedItems }));
  };

  // Handle email changes dynamically
  const handleEmailsChange = (newEmails) => {
    setFormData((prev) => ({ ...prev, emails: newEmails }));
  };

  // Fetch users by tags
  const handleFilterSubmit = async () => {
    setIsLoading(true);
    try {
      const selectedTags = formData.selectedTags.map((tag) => tag.value);
      const data = await fetchUsersByTags(token, selectedTags);

      if (data.emails && data.emails.length > 0) {
        handleEmailsChange(data.emails); // Update emails state
      } else {
        alert("No users found with the selected tags.");
      }
    } catch (error) {
      console.error("Error fetching filtered emails:", error);
      alert("Error fetching filtered emails. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Submit form using FormData
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    const payload = {
      customSubject: data.get("subject"),
      customContent: data.get("content"),
      emails: formData.emails.join(", "),
    };

    try {
      const response = await sendBulkEmail(token, payload);
      if (response.success) {
        alert(response.message || "Email sent successfully!"); // Success message
      } else {
        alert(
          response.message || "Error sending bulk email. Please try again."
        );
      }
    } catch (error) {
      console.error("Error sending bulk email:", error);
      alert("Error sending bulk email. Please try again.");
    }
  };

  return (
    <DashboardLayout>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Send Email</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Tag Selection and Filter */}
            <div className="flex items-center gap-4">
              <div className="flex-grow">
                <TagSelect
                  items={items}
                  selectedTags={formData.selectedTags}
                  onTagsChange={handleTagsChange}
                />
              </div>
              <div>
                <Button
                  type="button"
                  onClick={handleFilterSubmit}
                  disabled={isLoading}
                  size="sm"
                  className="w-full p-2 rounded-md bg-teal-700 hover:bg-teal-900 transition duration-500 text-white"
                >
                  {isLoading ? "Filtering..." : "Filter"}
                </Button>
              </div>
            </div>

            {/* To Field */}
            <div className="space-y-2">
              <Label htmlFor="to">To</Label>
              <EmailInput
                emails={formData.emails}
                onEmailsChange={handleEmailsChange}
              />
            </div>

            {/* Subject Field */}
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <input
                id="subject"
                name="subject"
                type="text"
                onChange={handleChange}
                placeholder="Email subject"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Content Field */}
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                name="content"
                onChange={handleChange}
                placeholder="Email content"
                className="min-h-[200px] w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* File Attachment Field */}
            <div className="space-y-2">
              <Label htmlFor="attach">Attach</Label>
              <input
                id="attach"
                name="attach"
                type="file"
                multiple
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full p-2 rounded-md bg-teal-700 hover:bg-teal-900 transition duration-500 text-white"
            >
              Send Email
            </Button>
          </form>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
