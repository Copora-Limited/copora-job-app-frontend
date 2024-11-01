import React, { useState, useEffect } from "react";
import PrimaryInput from "@/components/Custom/Inputs/PrimaryInput";
import { useSession } from "next-auth/react";
import { useSessionContext } from "@/context/SessionContext";
import { CircleSpinnerOverlay } from "react-spinner-overlay";

const HealthAndDisabilityForm = ({ onChange }) => {
  const { data: session } = useSession();
  const { token } = useSessionContext();
  const applicationNo = session?.user?.applicationNo;

  const [isMounted, setIsMounted] = useState(false);
  const [hasFetchedData, setHasFetchedData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [warning, setWarning] = useState(""); // Add this state for warning

  // Data Set
  const [formState, setFormState] = useState({
    gpName: "",
    gpAddress: "",
    relevantHealthIssues: false,
    relevantHealthIssuesDetails: "",
    majorIllnessTreatment: false,
    majorIllnessDetails: "",
    suddenLossOfConsciousness: false,
    consciousnessLossDetails: "",
    healthRelatedAbsences: false,
    healthRelatedAbsencesDetails: "",
    currentMedications: false,
    medicationDetails: "",
    physicalLimitations: false,
    limitationsDetails: "",
    colorVisionDefects: false,
    colorVisionDefectsDetails: "",
    disabilityAdjustmentNeeds: "",
    agreementCertification: false,
    agreementToReportInfection: false,
    attempted: false,
  });

  useEffect(() => {
    setIsMounted(true);
    const fetchData = async () => {
      if (!token || !applicationNo || hasFetchedData) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/health-and-disability/${applicationNo}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch contact data.");
        }

        const data = await response.json();
        const hasData = Object.keys(data).length > 0;

        setFormState({
          gpName: data.gpName || "",
          gpAddress: data.gpAddress || "",
          relevantHealthIssues: data.relevantHealthIssues ?? false,
          relevantHealthIssuesDetails: data.relevantHealthIssuesDetails || "",
          majorIllnessTreatment: data.majorIllnessTreatment ?? false,
          majorIllnessDetails: data.majorIllnessDetails || "",
          suddenLossOfConsciousness: data.suddenLossOfConsciousness ?? false,
          consciousnessLossDetails: data.consciousnessLossDetails || "",
          healthRelatedAbsences: data.healthRelatedAbsences ?? false,
          healthRelatedAbsencesDetails: data.healthRelatedAbsencesDetails || "",
          currentMedications: data.currentMedications ?? false,
          medicationDetails: data.medicationDetails || "",
          physicalLimitations: data.physicalLimitations ?? false,
          limitationsDetails: data.limitationsDetails || "",
          colorVisionDefects: data.colorVisionDefects ?? false,
          colorVisionDefectsDetails: data.colorVisionDefectsDetails || "",
          disabilityAdjustmentNeeds: data.disabilityAdjustmentNeeds || "",
          agreementCertification: data.agreementCertification ?? false,
          agreementToReportInfection: data.agreementToReportInfection ?? false,
          //   attempted: data.attempted ?? false,
        });

        onChange(data);
        setIsLoading(false);
        setHasFetchedData(true);
      } catch (error) {
        console.error("Error fetching contact data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [hasFetchedData, onChange]);

  useEffect(() => {
    // Example condition to set a warning message
    if (formState.agreementCertification === false) {
      setWarning("Please certify the agreement before proceeding.");
    } else {
      setWarning("");
    }
  }, [formState.agreementCertification]);

  const handleChange = (field, value) => {
    const updatedFormState = { ...formState, [field]: value };
    setFormState(updatedFormState);
    onChange(updatedFormState); // Notify parent component
  };

  return (
    <div>
      {isMounted && (
        <CircleSpinnerOverlay
          loading={isLoading}
          overlayColor="rgba(0,153,255,0.2)"
        />
      )}
      <>
        {/* GP Name */}
        <PrimaryInput
          id="gpName"
          label="GP Name (Doctor)"
          isRequired
          type="text"
          placeholder="Enter your GP Name"
          value={formState.gpName}
          onChange={(e) => handleChange("gpName", e.target.value)}
        />

        {/* GP Address */}
        <PrimaryInput
          id="gpAddress"
          label="GP Address"
          isRequired
          type="text"
          placeholder="Enter address"
          value={formState.gpAddress}
          onChange={(e) => handleChange("gpAddress", e.target.value)}
        />

        <h4 className="mt-5 md:text-[14px] text-[12px] text-[#475467] font-semibold">
          Health Questions
        </h4>

        {/* Relevant Health Issues */}
        <QuestionWithDetails
          question="Do you have any health issues or a disability relevant to the position or role you seek?"
          field="relevantHealthIssues"
          detailsField="relevantHealthIssuesDetails"
          formState={formState}
          handleChange={handleChange}
        />

        {/* Additional questions following the same format */}
        <QuestionWithDetails
          question="Have you been treated for any major illness in the last 12 months?"
          field="majorIllnessTreatment"
          detailsField="majorIllnessDetails"
          formState={formState}
          handleChange={handleChange}
        />

        <QuestionWithDetails
          question="Are you subject to sudden loss of consciousness due to e.g Epilepsy, Diabetes etc?"
          field="suddenLossOfConsciousness"
          detailsField="consciousnessLossDetails"
          formState={formState}
          handleChange={handleChange}
        />

        <QuestionWithDetails
          question="Have you had any absence from work due to ill health in the last 3 years?"
          field="healthRelatedAbsences"
          detailsField="healthRelatedAbsencesDetails"
          formState={formState}
          handleChange={handleChange}
        />

        {/* Current Medications */}
        <QuestionWithDetails
          question="Are you taking any medicines, drugs or injections?"
          field="currentMedications"
          detailsField="medicationDetails"
          formState={formState}
          handleChange={handleChange}
        />

        {/* Physical Limitations */}
        <QuestionWithDetails
          question="Do you have any limitations regarding prolonged standing, or with full movement of trunk or limbs, or with the ability to lift normal weights?"
          field="physicalLimitations"
          detailsField="limitationsDetails"
          formState={formState}
          handleChange={handleChange}
        />

        {/* Color Vision Defects */}
        <QuestionWithDetails
          question="Do you have any colour vision defects?"
          field="colorVisionDefects"
          detailsField="colorVisionDefectsDetails"
          formState={formState}
          handleChange={handleChange}
        />

        <div className="my-3 col-span-2">
          <p className="text-[14px] text-[#475467]">
            Self Certification of Health
          </p>
          <div className="w-full flex items-start gap-3 mt-1">
            <input
              type="checkbox"
              checked={formState.agreementCertification}
              onChange={(e) =>
                handleChange("agreementCertification", e.target.checked)
              }
              name="agreementCertification"
              id="agreementCertification"
              className="accent-appGreen"
            />

            <label
              htmlFor="agreementCertification"
              className="text-black text-[12px]"
            >
              {warning ? (
                <h3 className="text-[14px] text-[red] font-semibold">
                  {warning}
                </h3>
              ) : (
                "I Agree that to the best of my knowledge, all the above statements are true and I understand that if I have wilfully withheld or falsified any information, my Conditions of Employment may be invalidated. I Certify that I am free and have no medical history to suggest I could suffer from any sickness, disease or infection that is likely to contaminate food or place where food is prepared."
              )}
            </label>
          </div>
        </div>
      </>
    </div>
  );
};

// Reusable component for questions with Yes/No options and a details input
const QuestionWithDetails = ({
  question,
  field,
  detailsField,
  formState,
  handleChange,
}) => (
  <div className="my-5 pb-5 w-full flex flex-col gap-2">
    <h6 className="text-[14px] font-medium text-black">{question}</h6>
    <div className="flex gap-4">
      <label>
        <input
          type="radio"
          className="accent-[#247A84] rounded-md mr-2"
          name={field}
          value={true}
          checked={formState[field] === true}
          onChange={() => handleChange(field, true)}
        />
        Yes
      </label>
      <label>
        <input
          type="radio"
          className="accent-[#247A84] rounded-md mr-2"
          name={field}
          value={formState[field]}
          checked={formState[field] === false}
          onChange={() => handleChange(field, false)}
        />
        No
      </label>
    </div>
    {formState[field] && (
      <PrimaryInput
        id={detailsField}
        isRequired={false}
        placeholder="Please specify"
        value={formState[detailsField]}
        onChange={(e) => handleChange(detailsField, e.target.value)}
      />
    )}
  </div>
);

export default HealthAndDisabilityForm;
