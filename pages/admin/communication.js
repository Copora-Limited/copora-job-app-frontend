"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

  const [formData, setFormData] = useState({
    selectedTags: [],
    emails: [],
    customSubject: "",
    customContent: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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

  const handleTagsChange = (selectedItems) => {
    setFormData((prev) => ({ ...prev, selectedTags: selectedItems }));
  };

  const handleEmailsChange = (newEmails) => {
    setFormData((prev) => ({ ...prev, emails: newEmails }));
  };

  const handleFilterSubmit = async () => {
    setIsLoading(true);
    try {
      const selectedTags = formData.selectedTags.map((tag) => tag.value);
      const data = await fetchUsersByTags(token, selectedTags);

      if (data.emails && data.emails.length > 0) {
        handleEmailsChange(data.emails);
        toast.success(`${data.emails.length} users found!`, {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        toast.info("No users found with the selected tags.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error fetching filtered emails:", error);
      toast.error("Error fetching filtered emails. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      customSubject: formData.customSubject,
      customContent: formData.customContent,
      emails: formData.emails,
    };

    try {
      const response = await sendBulkEmail(token, payload);
      if (response.success) {
        toast.success(response.message || "Email sent successfully!");
      } else {
        toast.error(
          response.message || "Error sending bulk email. Please try again."
        );
      }
    } catch (error) {
      console.error("Error sending bulk email:", error);
      toast.error("Error sending bulk email. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
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

            <div className="space-y-2">
              <Label htmlFor="to">To</Label>
              <EmailInput
                emails={formData.emails}
                onEmailsChange={handleEmailsChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="customSubject">Subject</Label>
              <input
                id="customSubject"
                name="customSubject"
                type="text"
                onChange={handleChange}
                placeholder="Email subject"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="customContent">Content</Label>
              <Textarea
                id="customContent"
                name="customContent"
                onChange={handleChange}
                placeholder="Email content"
                className="min-h-[200px] w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

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
