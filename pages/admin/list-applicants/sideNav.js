import ApplicantSideNav from "@/components/dashboard/ApplicantSideNav";
import React, { useState } from "react";
import EditUserDetailsModal from "@/components/dashboard/modal/EditUserDetailsModal";

const SideNav = ({ userData, contactData, personalData }) => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Functions to open and close the modal
  const handleOpenUploadModal = () => setIsUploadModalOpen(true);
  const handleCloseUploadModal = () => setIsUploadModalOpen(false);

  const onboardingStatus = userData?.onboardingStatus?.toLowerCase();

  // Function to determine status class
  const getStatusClass = () => {
    if (onboardingStatus === "invitation sent") {
      return "text-[#C8951A] bg-[#C8951A1A]";
    } else if (onboardingStatus === "onboarding not completed") {
      return "text-[#F32013] bg-[#F320131A]";
    } else {
      return "text-[#027A48] bg-[#ECFDF3]";
    }
  };

  const getDotClass = () => {
    if (onboardingStatus === "invitation sent") {
      return "bg-[#C8951A]";
    } else if (onboardingStatus === "onboarding not completed") {
      return "bg-[#F32013]";
    } else {
      return "bg-[#027A48]";
    }
  };

  return (
    <div className="bg-white md:w-[300px] w-full rounded-[8px] border border-[#EDEDF2] md:overflow-y-scroll scroller-none">
      {/* Application Status */}
      <div className="w-full flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 pl-5 py-2 border-b border-[#F7F9FC]">
          <img
            src="/assets/applicant/application_vector.svg"
            alt="application_vector"
          />
          <div>
            <p className="leading-tight text-[12px] text-[#667185]">
              Application Status
            </p>
            <div
              className={`text-[10px] md:text-[12px] w-fit md:h-[28px] h-[22px] px-2 py-[2px] rounded-[16px] flex items-center gap-2 ${getStatusClass()}`}
            >
              <div
                className={`md:w-1.5 w-1 md:h-1.5 h-1 rounded-full ${getDotClass()}`}
              />
              <span className="mt-1">
                {userData?.onboardingStatus || "Unknown"}
              </span>
            </div>
          </div>
        </div>
        <div className="pr-5 py-2 flex items-center gap-2">
          <button
            className="flex items-center gap-2  text-sm text-[#667185] cursor-pointer hover:text-blue-500"
            onClick={handleOpenUploadModal} // Opens the modal
          >
            <span>Edit</span>
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      <EditUserDetailsModal
        id={userData?.id}
        isOpen={isUploadModalOpen} // Controls the visibility of the modal
        onClose={handleCloseUploadModal} // Closes the modal
      />

      {/* Candidate Information */}
      <ApplicantSideNav
        data={userData?.applicationNo || "-"}
        icon="/assets/applicant/user.svg"
        title="Candidate ID"
      />
      <ApplicantSideNav
        data={userData?.email || "-"}
        isEmail
        icon="/assets/applicant/envelope.svg"
        title="Email"
      />
      <ApplicantSideNav
        data={userData?.firstName || "-"}
        icon="/assets/applicant/candidate_user.svg"
        title="First Name"
      />
      <ApplicantSideNav
        data={userData?.lastName || "-"}
        icon="/assets/applicant/candidate_user.svg"
        title="Last Name"
      />

      <ApplicantSideNav
        data={"+" + contactData?.phone || "-"}
        icon="/assets/applicant/envelope.svg"
        isPhone
        title="Phone Number"
      />

      <ApplicantSideNav
        data={
          personalData?.dateOfBirth
            ? new Date(personalData.dateOfBirth).toLocaleDateString()
            : "-"
        }
        icon="/assets/applicant/calendar.svg"
        title="Date of Birth"
      />

      <ApplicantSideNav
        data={
          personalData?.dateOfBirth
            ? new Date().getFullYear() -
              new Date(personalData.dateOfBirth).getFullYear()
            : "-"
        }
        icon="/assets/applicant/envelope.svg"
        title="Applicant’s Age"
      />

      <ApplicantSideNav
        data={
          userData?.updatedAt
            ? new Date(userData.updatedAt).toLocaleDateString()
            : "-"
        }
        icon="/assets/applicant/calendar.svg"
        title="Onboarding Date"
      />
    </div>
  );
};

export default SideNav;
