"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import TagSelect from "@/components/TagSelect";

import { useFetchTags } from "@/hooks/useUserProfile";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/selectTwo";
import { filterEmails } from "@/hooks/actions";
import DashboardLayout from "@/components/DashboardLayout"; // Adjust the path as needed
import { useSessionContext } from "@/context/SessionContext";

export default function EmailForm() {
  const { token } = useSessionContext();
  const [filters, setFilters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, setValue } = useForm();
  const { tags = {} } = useFetchTags(token);

  // Form state for each field
  const [formData, setFormData] = useState({
    id: "",
    selectedTags: [],
    onboardingStatus: "", // Initialize with an empty string
  });

  // Handle form input changes
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

  const handleFilterChange = (value) => {
    setFilters((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const handleFilterSubmit = async () => {
    setIsLoading(true);
    try {
      const emails = await filterEmails(filters);
      setValue("to", emails.join(", "));
    } catch (error) {
      console.error("Error fetching filtered emails:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (data) => {
    console.log(data);
    // Here you would typically send the email using an API
    alert("Email sent successfully!");
  };

  return (
    <DashboardLayout>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Send Email</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Tags
              </label>
            </div>
            <div className="space-y-2">
              <Label htmlFor="to">To</Label>
              <Input
                id="to"
                {...register("to")}
                placeholder="Recipient email addresses"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                {...register("subject")}
                placeholder="Email subject"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cc">Copy (CC)</Label>
              <Input
                id="cc"
                {...register("cc")}
                placeholder="CC email addresses"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bcc">Blind Copy (BCC)</Label>
              <Input
                id="bcc"
                {...register("bcc")}
                placeholder="BCC email addresses"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                {...register("content")}
                placeholder="Email content"
                className="min-h-[200px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="attach">Attach</Label>
              <Input id="attach" type="file" multiple />
            </div>
            <Button type="submit" className="w-full">
              Send Email
            </Button>
          </form>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
