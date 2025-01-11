import React from "react";

export const HealthAndDisability = ({ healthAndDisability }) => {
  //   console.log("healthAndDisability", healthAndDisability);

  // Validate healthAndDisability data
  if (!healthAndDisability) {
    return <div>No health and Disability record Available</div>;
  }

  const formatBoolean = (value) => {
    return value ? "Yes" : "No";
  };

  const fields = [
    {
      label: "GP Name",
      value: healthAndDisability.gpName || "N/A",
    },
    {
      label: "GP Address",
      value: healthAndDisability.gpAddress || "N/A",
    },
    {
      label: "Relevant Health Issues",
      value: formatBoolean(healthAndDisability.relevantHealthIssues),
      details: healthAndDisability.relevantHealthIssuesDetails || "N/A",
    },
    {
      label: "Major Illness or Treatment",
      value: formatBoolean(healthAndDisability.majorIllnessTreatment),
      details: healthAndDisability.majorIllnessDetails || "N/A",
    },
    {
      label: "Sudden Loss of Consciousness",
      value: formatBoolean(healthAndDisability.suddenLossOfConsciousness),
      details: healthAndDisability.consciousnessLossDetails || "N/A",
    },
    {
      label: "Health-Related Absences",
      value: formatBoolean(healthAndDisability.healthRelatedAbsences),
      details: healthAndDisability.healthRelatedAbsencesDetails || "N/A",
    },
    {
      label: "Current Medications",
      value: formatBoolean(healthAndDisability.currentMedications),
      details: healthAndDisability.medicationDetails || "N/A",
    },
    {
      label: "Physical Limitations",
      value: formatBoolean(healthAndDisability.physicalLimitations),
      details: healthAndDisability.limitationsDetails || "N/A",
    },
    {
      label: "Color Vision Defects",
      value: formatBoolean(healthAndDisability.colorVisionDefects),
      details: healthAndDisability.colorVisionDefectsDetails || "N/A",
    },
    {
      label: "Disability Adjustment Needs",
      value: healthAndDisability.disabilityAdjustmentNeeds || "N/A",
    },
    {
      label: "Agreement to Certification",
      value: formatBoolean(healthAndDisability.agreementCertification),
    },
    {
      label: "Agreement to Report Infection",
      value: formatBoolean(healthAndDisability.agreementToReportInfection),
    },
    {
      label: "Attempted Contact",
      value: formatBoolean(healthAndDisability.attempted),
    },
  ];

  return (
    <div className="w-full py-5 border-b">
      <h3 className="font-medium md:text-[23px] text-[16px]">
        Health and Disability Information
      </h3>
      {/* grid grid-cols-2 mt-4 gap-3 p-2 border rounded-md bg-[#F9F9F9] */}
      <div className="grid grid-cols-2 mt-4 gap-3 p-2 border rounded-md bg-[#F9F9F9]">
        {fields.map((field, index) => (
          <div key={index}>
            <p className="text-[12px] text-[#9F9F9F]">{field.label}</p>
            <h4 className="text-[#3C3C3C] text-[12px] font-semibold capitalize">
              {field.value || "N/A"}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
};
