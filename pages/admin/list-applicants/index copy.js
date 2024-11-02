// ListUsersPage.tsx
import React, { useEffect, useRef, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { useSessionContext } from "@/context/SessionContext";
import { ExportIcon, UploadIcon } from "@/components/Icon";
import DashboardLayout from "@/components/DashboardLayout";
import { CircleSpinnerOverlay } from "react-spinner-overlay";
import UserTable from "@/components/dashboard/UserTable";
import UploadCandidateModal from "@/components/dashboard/modal/UploadCandidateModal";
import AddCandidate from "@/components/dashboard/modal/AddCandidate"; // Import AddCandidate

const ListUsersPage = () => {
  const { token } = useSessionContext();
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isAddCandidateModalOpen, setIsAddCandidateModalOpen] = useState(false); // State for Add Candidate Modal
  const fileRef = useRef(null);
  const [hasFetchedData, setHasFetchedData] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setIsMounted(true);
    
    const fetchUsers = async () => {
      if (!token || hasFetchedData) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/users`,
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
        const adminUsers = data.filter((user) => user.role === "applicant");
        setUsers(adminUsers);
        setHasFetchedData(true);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [hasFetchedData, token]);

  const handleOpenUploadModal = () => setIsUploadModalOpen(true);
  const handleCloseUploadModal = () => setIsUploadModalOpen(false);
  
  const handleOpenAddCandidateModal = () => setIsAddCandidateModalOpen(true); // Open Add Candidate Modal
  const handleCloseAddCandidateModal = () => setIsAddCandidateModalOpen(false); // Close Add Candidate Modal

  const handleDownloadCSV = async () => {
    // CSV download logic...
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
        <div className="w-full h-[92vh] grid grid-rows-[10%_1fr] md:px-12 px-5 py-3">
          <div className="h-[22vh]">
            <div className="w-full h-[8%] flex justify-between md:gap-0 gap-4 mt-1">
              <div>
                <h5 className="md:text-[20px] text-[16px] font-medium text-black">
                  New Candidate
                </h5>
                <p className="text-[#667085] md:text-[14px] text-[12px] font-normal">
                  Manage new employee from here
                </p>
              </div>

              <div className="flex item-center gap-3">
                <input type="file" ref={fileRef} hidden />
                <div
                  className="md:h-[40px] h-[35px] px-4 flex items-center justify-items-center md:gap-4 gap-3 bg-white border border-[#D0D5DD] text-[#344054] md:text-[14px] text-[12px] rounded-[100px] cursor-pointer"
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
                  className="md:h-[40px] h-[35px] px-4 flex items-center justify-items-center md:gap-4 gap-3 bg-white border border-[#D0D5DD] text-[#344054] md:text-[14px] text-[12px] rounded-[100px] cursor-pointer"
                  onClick={handleDownloadCSV}
                >
                  Export CSV
                  <ExportIcon />
                </div>

                <div
                  className="md:h-[40px] h-[35px] px-4 flex items-center justify-items-center md:gap-4 gap-3 bg-appGreen text-white md:text-[14px] text-[12px] rounded-[100px] cursor-pointer transition-all duration-300 hover:bg-teal-600"
                  onClick={handleOpenAddCandidateModal} // Open Add Candidate Modal
                >
                  <FaPlusCircle />
                  Add Candidate
                </div>
              </div>
            </div>

            {/* Tab Goes here */}
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
