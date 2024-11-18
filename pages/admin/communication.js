"use client";
import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/selectTwo";
import { filterEmails } from "@/hooks/actions";
import DashboardLayout from "@/components/DashboardLayout"; // Adjust the path as needed

export default function EmailForm() {
  const [filters, setFilters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, setValue } = useForm();

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
              <Label htmlFor="filter">Filter</Label>
              <div className="flex space-x-2">
                <Select onValueChange={handleFilterChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select filters" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="filter1">Filter 1</SelectItem>
                    <SelectItem value="filter2">Filter 2</SelectItem>
                    <SelectItem value="filter3">Filter 3</SelectItem>
                    <SelectItem value="filter4">Filter 4</SelectItem>
                    <SelectItem value="filter5">Filter 5</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  onClick={handleFilterSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? "Filtering..." : "Filter"}
                </Button>
              </div>
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
