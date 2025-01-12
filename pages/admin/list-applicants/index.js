// ListUsersPage.tsx
import React, { useEffect, useRef, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { Tab } from "@headlessui/react";
import { useSessionContext } from "@/context/SessionContext";
import { ExportIcon, UploadIcon } from "@/components/Icon";
import DashboardLayout from "@/components/DashboardLayout";
import { CircleSpinnerOverlay } from "react-spinner-overlay";
import UserTable from "@/components/dashboard/UserTable";
import UploadCandidateModal from "@/components/dashboard/modal/UploadCandidateModal";
import AddCandidate from "@/components/dashboard/modal/AddCandidatetwo"; // Import AddCandidate
import axios from "axios";

const ListUsersPage = () => {
  const { token } = useSessionContext();
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("Invitation Sent");
  const [isMounted, setIsMounted] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isAddCandidateModalOpen, setIsAddCandidateModalOpen] = useState(false); // State for Add Candidate Modal
  const fileRef = useRef(null);
  const [hasFetchedData, setHasFetchedData] = useState(false);
  const [search, setSearch] = useState("");

  // Fetch statuses
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/applicant/onboarding-status`)
      .then((response) => {
        if (response.data.success) {
          setStatuses(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching onboarding statuses:", error);
      });
  }, []);

  useEffect(() => {
    setIsMounted(true);

    const fetchUsers = async () => {
      if (!token || !selectedStatus) return;

      try {
        const response = await fetch(
          `${
            process.env.NEXT_PUBLIC_BASE_URL
          }/auth/users/status/${encodeURIComponent(
            selectedStatus
          )}?role=applicant`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [selectedStatus, token]);

  const handleOpenUploadModal = () => setIsUploadModalOpen(true);
  const handleCloseUploadModal = () => setIsUploadModalOpen(false);

  const handleOpenAddCandidateModal = () => setIsAddCandidateModalOpen(true); // Open Add Candidate Modal
  const handleCloseAddCandidateModal = () => setIsAddCandidateModalOpen(false); // Close Add Candidate Modal

  const handleDownloadCSV = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/applicant/download/csv`,
        {
          method: "GET",
          headers: {
            "Content-Type": "text/csv",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Could not fetch the CSV file.");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "all_applicants.csv");

      document.body.appendChild(link);

      link.click();
      link.parentNode?.removeChild(link);
    } catch (error) {
      console.error("Error downloading CSV:", error);
      alert(`Failed to download CSV. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <DashboardLayout>
        {isMounted && (
          <CircleSpinnerOverlay
            loading={isLoading}
            overlayColor="rgba(0,153,255,0.2)"
          />
        )}
        <div className="w-full h-[92vh] grid grid-rows-[10%_1fr] md:px-12 px-5 py-10">
          <div className="h-[22vh] flex flex-col gap-4">
            {/* First Section - Title and description */}
            <div className="w-full h-[8%] flex justify-between items-center md:gap-0 gap-4 mt-1 ">
              {/* Left side: Title and description */}
              <div>
                <h5 className="md:text-[20px] text-[16px] font-medium text-black">
                  New Candidate
                </h5>
                <p className="text-[#667085] md:text-[14px] text-[12px] font-normal">
                  Manage new employee from here
                </p>
              </div>

              {/* Right side: Buttons */}
              <div className="flex items-center gap-3">
                <input type="file" ref={fileRef} hidden />

                <div
                  className="md:h-[40px] h-[35px] px-4 flex items-center gap-3 bg-white border border-[#D0D5DD] text-[#344054] md:text-[14px] text-[12px] rounded-full cursor-pointer"
                  onClick={handleOpenUploadModal}
                >
                  Upload Candidates
                  <UploadIcon />
                </div>

                <UploadCandidateModal
                  isOpen={isUploadModalOpen}
                  onClose={handleCloseUploadModal}
                />

                <div
                  className="md:h-[40px] h-[35px] px-4 flex items-center gap-3 bg-white border border-[#D0D5DD] text-[#344054] md:text-[14px] text-[12px] rounded-full cursor-pointer"
                  onClick={handleDownloadCSV}
                >
                  Export CSV
                  <ExportIcon />
                </div>

                <div
                  className="md:h-[40px] h-[35px] px-4 flex items-center gap-3 bg-appGreen text-white md:text-[14px] text-[12px] rounded-full cursor-pointer transition-all duration-300 hover:bg-teal-600"
                  onClick={handleOpenAddCandidateModal}
                >
                  <FaPlusCircle />
                  Add Candidate
                </div>
              </div>
            </div>

            {/* Second Section - Tabs */}
            <div className="h-[7%] mt-4">
              <Tab.Group
                onChange={(index) => setSelectedStatus(statuses[index])}
              >
                <Tab.List className="flex space-x-4 border-b border-[#D0D5DD] pb-2">
                  {statuses.map((status) => (
                    <Tab
                      key={status}
                      className={({ selected }) =>
                        selected
                          ? "text-teal-700 border-b-2 border-teal-700 pb-2"
                          : "text-gray-500"
                      }
                    >
                      {status}
                    </Tab>
                  ))}
                </Tab.List>
              </Tab.Group>
            </div>
          </div>

          <div className="w-full h-[70vh] mt-10 bg-white rounded-[10px] border border-[#E4E7EC] flex flex-col gap-3 overflow-y-auto p-4 scroller-none">
            <div className="w-full h-full ">
              <UserTable users={users} />
            </div>
          </div>
        </div>

        {/* Add Candidate Modal */}
        <AddCandidate
          isOpen={isAddCandidateModalOpen}
          onClose={handleCloseAddCandidateModal}
        />
      </DashboardLayout>
    </>
  );
};

export default ListUsersPage;
