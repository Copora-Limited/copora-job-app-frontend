/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { FaTrash } from "react-icons/fa"; // Import FaTrash
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomModal from "./CustomModal"; // Ensure this path is correct
import { useSessionContext } from "@/context/SessionContext"; // Ensure this import matches your context path
import { UploadFile } from "@/components/Icon";

interface UploadCandidateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UploadCandidateModal: React.FC<UploadCandidateModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { token } = useSessionContext();
  const [resume, setResume] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setResume(file);
  };

  const handleRemoveFile = () => setResume(null);

  const handleUpload = async () => {
    if (!resume) {
      toast.error("Please select a file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("file", resume);

    try {
      setIsUploading(true);

      // Check if token is available from session context
      if (!token) {
        toast.error("Authentication token not found. Please log in.");
        return;
      }

      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/users/upload-users`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Candidates uploaded and invitation sent!");
      onClose();
    } catch (error: any) {
      console.error("Upload error:", error);
      if (error.response && error.response.status === 401) {
        toast.error("Unauthorized. Please check your credentials.");
      } else {
        toast.error("Error uploading candidates. Please try again.");
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      {/* <h2 className="text-lg font-semibold mb-4">Upload Candidate</h2> */}

      <label
        htmlFor="resume"
        className="block text-sm font-medium text-gray-700"
      >
        Upload Excel file
      </label>

      {resume ? (
        <div className="flex items-center justify-between p-4 bg-gray-100 rounded-md">
          <div className="flex items-center">
            <div className="ml-4">
              <p className="text-sm font-medium">{resume.name}</p>
              <p className="text-xs text-gray-500">
                {(resume.size / 1024).toFixed(2)} KB
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleRemoveFile}
            className="text-red-600 hover:text-red-800"
          >
            <FaTrash />
          </button>
        </div>
      ) : (
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <UploadFile />

            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500"
              >
                <span>Click to upload</span>
                <input
                  id="file-upload"
                  name="resume"
                  type="file"
                  onChange={handleFileChange}
                  className="sr-only"
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">Only .xls format allowed</p>
          </div>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={isUploading}
        className={`w-full h-[44px] mt-6 flex items-center justify-center gap-2 transition duration-500 text-white border border-[#667080] rounded-[100px] md:text-[16px] text-[13px] font-semibold px-[12px] disabled:bg-[#D0D5DD] disabled:text-white disabled:cursor-not-allowed disabled:border-none click_btn ${
          isUploading ? "bg-gray-400" : "bg-appGreen hover:bg-teal-700"
        }`}
      >
        {isUploading ? "Uploading..." : "Upload"}
      </button>
    </CustomModal>
  );
};

export default UploadCandidateModal;
