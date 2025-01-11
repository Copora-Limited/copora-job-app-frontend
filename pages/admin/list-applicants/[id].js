import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useSessionContext } from "@/context/SessionContext";
import SideNav from "./sideNav";
import { fetchApplicantRecord } from "@/hooks/actions";
import { CircleSpinnerOverlay } from "react-spinner-overlay";
import { ApproveIcon } from "@/components/Icon";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GeneralInformation } from "@/components/OnboardingContent/GeneralInformation";
import { ContactInformation } from "@/components/OnboardingContent/ContactInformation";
import { PersonalDetails } from "@/components/OnboardingContent/PersonalDetails";
import { NextOfKin } from "@/components/OnboardingContent/NextOfKin";
import { References } from "@/components/OnboardingContent/References";
import { EducationalDetails } from "@/components/OnboardingContent/EducationalDetails";
import { HealthAndDisability } from "@/components/OnboardingContent/HealthAndDisability";
import { FoodSafetyQuestionnaire } from "@/components/OnboardingContent/FoodSafetyQuestionnaire";
import { BankDetails } from "@/components/OnboardingContent/BankDetails";
import { ConfirmationModal } from "@/components/modal/ConfirmationModal";
import ApproveUserModal from "@/components/dashboard/modal/ApproveUserModal"; // Import the modal
import { ImageModal } from "@/components/modal/ImageModal";
import DashboardLayout from "@/components/DashboardLayout";
import {
  useUserProfile,
  useContactDetails,
  usePersonalDetails,
  useResendInvite,
} from "@/hooks/useUserProfile";
import { toast } from "react-toastify";

export default function Component() {
  const router = useRouter();
  const { id } = router.query;
  const { token } = useSessionContext();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [applicantdata, setApplicantData] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [isApproveUserModalOpen, setIsApproveUserModalOpen] = useState(false); // Add state for approve modal

  const {
    userData,
    loading: profileLoading,
    error: profileError,
  } = useUserProfile(id, token);
  const {
    contactData,
    loading: contactLoading,
    error: contactError,
  } = useContactDetails(userData?.applicationNo, token);
  const {
    personalData,
    loading: personalLoading,
    error: personalError,
  } = usePersonalDetails(userData?.applicationNo, token);

  const isLoading = profileLoading || contactLoading || personalLoading;
  const isError = profileError || contactError || personalError;

  const openImageModal = () => setIsImageModalOpen(true);
  const closeImageModal = () => setIsImageModalOpen(false);

  useEffect(() => {
    const fetchApplicantData = async () => {
      if (!token || !userData?.applicationNo) return;

      setIsMounted(true);
      try {
        const data = await fetchApplicantRecord(token, userData?.applicationNo);
        setApplicantData(data);
      } catch (error) {
        console.error("Error fetching references:", error);
      } finally {
        setIsMounted(false);
      }
    };

    if (userData?.applicationNo) {
      fetchApplicantData();
    }
  }, [token, userData?.applicationNo]);

  // Handle resend invite
  const handleResendInvite = async () => {
    setIsProcessing(true); // Start processing
    try {
      await useResendInvite({ applicationNo: userData.applicationNo });
      toast.success("Invitation resent successfully.");
      setIsConfirmationModalOpen(false); // Close modal on success
    } catch (error) {
      toast.error("Failed to resend invite.");
    } finally {
      setIsProcessing(false); // End processing, regardless of success or failure
    }
  };

  // Approve applicant - open the approve modal
  const handleApproveApplicant = () => {
    setIsApproveUserModalOpen(true); // Open the ApproveUserModal
  };

  // Close approve modal
  const closeApproveUserModal = () => {
    setIsApproveUserModalOpen(false);
  };

  // Open confirmation modal for resend invite
  const openConfirmationModal = () => setIsConfirmationModalOpen(true);

  // Close confirmation modal
  const closeConfirmationModal = () => setIsConfirmationModalOpen(false);

  // Refs for scrolling
  const personalDetailsRef = useRef(null);
  const generalInfoRef = useRef(null);
  const contactInfoRef = useRef(null);
  const emergencyDetailsRef = useRef(null);
  const educationalDetailRef = useRef(null);
  const healthAndDisabilityRef = useRef(null);
  const referenceRef = useRef(null);
  const foodSafetyRef = useRef(null);
  const bankDetailsRef = useRef(null);

  const sections = [
    { value: "Personal Details", ref: personalDetailsRef },
    { value: "General Information", ref: generalInfoRef },
    { value: "Contact Details", ref: contactInfoRef },
    { value: "Next of Kin", ref: emergencyDetailsRef },
    { value: "Education Details", ref: educationalDetailRef },
    { value: "Health and Disability", ref: healthAndDisabilityRef },
    { value: "Reference", ref: referenceRef },
    { value: "Food Safety", ref: foodSafetyRef },
    { value: "Bank Details", ref: bankDetailsRef },
  ];

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    const selectedSection = sections.find(
      (section) => section.value === selectedValue
    );
    const sectionRef = selectedSection ? selectedSection.ref : null;

    if (sectionRef && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <DashboardLayout>
      <CircleSpinnerOverlay
        loading={isLoading || isProcessing}
        overlayColor="rgba(0,153,255,0.2)"
      />
      {isError && (
        <p className="text-red-500 font-medium text-center">
          Error loading data:{" "}
          {profileError?.message ||
            contactError?.message ||
            personalError?.message}
        </p>
      )}

      {!isLoading && !isError && (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
          {/* Content */}
          <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
            <span>/</span>
            <span className="text-gray-400">New Candidates</span>
            <span>/</span>
            <span>{`${userData.firstName} ${userData.lastName}`}</span>
          </div>

          <div className="w-full h-[10%] flex md:flex-row flex-col mb-3 gap-3 md:items-center items-start justify-between md:mt-2 mt-1">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                <img
                  src={
                    personalData?.passportPhoto || "/assets/default_user.png"
                  }
                  alt="Profile"
                  className="h-full w-full object-cover cursor-pointer"
                  onClick={openImageModal} // Open the modal on click
                />
              </div>
              <div>
                <h1 className="text-xl font-bold">{`${userData.firstName} ${userData.lastName}`}</h1>
                <p className="text-sm text-gray-500">{userData.email}</p>
              </div>
            </div>

            <div className="md:w-fit w-full flex items-center md:justify-start justify-between md:gap-3 gap-2">
              {["Invitation Sent", "Onboarding not Completed"].includes(
                userData.onboardingStatus
              ) ? (
                <button
                  type="button"
                  className="flex items-center gap-2 py-2 md:px-8 px-4 rounded-full bg-[#247A84] text-white"
                  onClick={openConfirmationModal} // Trigger the confirmation modal
                >
                  Resend Invite
                </button>
              ) : (
                <button
                  type="button"
                  className="flex items-center gap-2 py-2 md:px-8 px-4 rounded-full bg-[#247A84] text-white"
                  onClick={handleApproveApplicant} // Open the ApproveUserModal
                >
                  <ApproveIcon />
                  Approve
                </button>
              )}
              <select className="flex items-center gap-2 py-[8px] px-[10px] rounded-[100px] border border-[#CBD5E1] outline-0 bg-white md:text-[14px] text-[10px] text-primary group">
                <option value="">-- Choose how to export --</option>
                <option value="Export CSV">Export CSV</option>
                <option value="Export PDF">Export PDF</option>
              </select>

              <select
                onChange={handleSelectChange}
                defaultValue=""
                className="flex items-center gap-2 py-[8px] px-[10px] rounded-[100px] border border-[#CBD5E1] outline-0 bg-white md:text-[14px] text-[10px] text-primary group"
              >
                {sections.map((section, index) => (
                  <option key={index} value={section.value}>
                    {section.value}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex md:flex-row flex-col gap-4 w-full md:h-[70vh] h-[65vh]">
            <div>
              <SideNav
                userData={userData}
                contactData={contactData}
                personalData={personalData}
              />
            </div>
            <div className="bg-white px-2 applicant_side h-full md:overflow-y-scroll scroller-none">
              {sections.map((section, index) => (
                <div key={index} ref={section.ref}>
                  {section.value === "Personal Details" ? (
                    <PersonalDetails
                      applicantdata={applicantdata?.personalDetails}
                    />
                  ) : section.value === "General Information" ? (
                    <GeneralInformation
                      applicantdata={applicantdata?.generalInfo}
                    />
                  ) : section.value === "Contact Details" ? (
                    <ContactInformation
                      applicantdata={applicantdata?.contactDetails}
                    />
                  ) : section.value === "Work Experience" ? (
                    <WorkExperience
                      applicantdata={applicantdata?.workExperience}
                    />
                  ) : section.value === "Next of Kin" ? (
                    <NextOfKin nextOfKin={applicantdata?.nextOfKin} />
                  ) : section.value === "Education Details" ? (
                    <EducationalDetails
                      educationalDetails={applicantdata?.educationalDetails}
                    />
                  ) : section.value === "Health and Disability" ? (
                    <HealthAndDisability
                      healthAndDisability={applicantdata?.healthAndDisability}
                    />
                  ) : section.value === "Reference" ? (
                    <References applicantdata={applicantdata?.reference} />
                  ) : section.value === "Food Safety" ? (
                    <FoodSafetyQuestionnaire
                      foodSafetyQuestionnaire={
                        applicantdata?.foodSafetyQuestionnaire
                      }
                    />
                  ) : section.value === "Bank Details" ? (
                    <BankDetails bankDetails={applicantdata?.bankDetails} />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <ImageModal
        isOpen={isImageModalOpen}
        imageUrl={personalData?.passportPhoto || "/assets/default_user.png"}
        onClose={closeImageModal}
      />
      {isConfirmationModalOpen && (
        <ConfirmationModal
          isProcessing={isProcessing}
          onConfirm={handleResendInvite}
          onCancel={() => setIsConfirmationModalOpen(false)}
        />
      )}
      {isApproveUserModalOpen && ( // Show the ApproveUserModal when open
        <ApproveUserModal
          id={userData?.id}
          isOpen={isApproveUserModalOpen}
          onClose={closeApproveUserModal}
        />
      )}
    </DashboardLayout>
  );
}
