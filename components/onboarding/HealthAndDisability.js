import React, { useState } from "react";

const HealthAndDisabilityForm = ({ formData = {}, onChange }) => {
    const initialFormData = formData || {};

    const [formState, setFormState] = useState({
        gpName: initialFormData.gpName || "",
        gpAddress: initialFormData.gpAddress || "",
        relevantHealthIssues: initialFormData.relevantHealthIssues || false,
        relevantHealthIssuesDetails: initialFormData.relevantHealthIssuesDetails || "",
        majorIllnessTreatment: initialFormData.majorIllnessTreatment || false,
        majorIllnessDetails: initialFormData.majorIllnessDetails || "",
        suddenLossOfConsciousness: initialFormData.suddenLossOfConsciousness || false,
        consciousnessLossDetails: initialFormData.consciousnessLossDetails || "",
        healthRelatedAbsences: initialFormData.healthRelatedAbsences || false,
        healthRelatedAbsencesDetails: initialFormData.healthRelatedAbsencesDetails || "",
        currentMedications: initialFormData.currentMedications || false,
        medicationDetails: initialFormData.medicationDetails || "",
        physicalLimitations: initialFormData.physicalLimitations || false,
        limitationsDetails: initialFormData.limitationsDetails || "",
        colorVisionDefects: initialFormData.colorVisionDefects || false,
        colorVisionDefectsDetails: initialFormData.colorVisionDefectsDetails || "",
        disabilityAdjustmentNeeds: initialFormData.disabilityAdjustmentNeeds || "",
        agreementCertification: initialFormData.agreementCertification || false,
        agreementToReportInfection: initialFormData.agreementToReportInfection || false,
    });

    const handleChange = (field, value) => {
        const updatedFormState = { ...formState, [field]: value };
        setFormState(updatedFormState);
        onChange(updatedFormState); // Notify parent component
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Health and Disability Form</h2>

            {/* GP Name */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Doctor/GP Name</label>
                <input
                    type="text"
                    value={formState.gpName}
                    onChange={(e) => handleChange("gpName", e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                />
            </div>

            {/* GP Address */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Doctor/GP Address</label>
                <textarea
                    value={formState.gpAddress}
                    onChange={(e) => handleChange("gpAddress", e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                />
            </div>

            {/* Relevant Health Issues */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Do you have any relevant health issues?
                </label>
                <input
                    type="checkbox"
                    checked={formState.relevantHealthIssues}
                    onChange={(e) => handleChange("relevantHealthIssues", e.target.checked)}
                    className="mt-2"
                />
                {formState.relevantHealthIssues && (
                    <textarea
                        value={formState.relevantHealthIssuesDetails}
                        onChange={(e) => handleChange("relevantHealthIssuesDetails", e.target.value)}
                        placeholder="Please provide details"
                        className="w-full p-2 border border-gray-300 rounded mt-2"
                    />
                )}
            </div>

            {/* Major Illness Treatment */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Have you undergone treatment for a major illness?
                </label>
                <input
                    type="checkbox"
                    checked={formState.majorIllnessTreatment}
                    onChange={(e) => handleChange("majorIllnessTreatment", e.target.checked)}
                    className="mt-2"
                />
                {formState.majorIllnessTreatment && (
                    <textarea
                        value={formState.majorIllnessDetails}
                        onChange={(e) => handleChange("majorIllnessDetails", e.target.value)}
                        placeholder="Please provide details"
                        className="w-full p-2 border border-gray-300 rounded mt-2"
                    />
                )}
            </div>

            {/* Sudden Loss of Consciousness */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Have you ever experienced a sudden loss of consciousness?
                </label>
                <input
                    type="checkbox"
                    checked={formState.suddenLossOfConsciousness}
                    onChange={(e) => handleChange("suddenLossOfConsciousness", e.target.checked)}
                    className="mt-2"
                />
                {formState.suddenLossOfConsciousness && (
                    <textarea
                        value={formState.consciousnessLossDetails}
                        onChange={(e) => handleChange("consciousnessLossDetails", e.target.value)}
                        placeholder="Please provide details"
                        className="w-full p-2 border border-gray-300 rounded mt-2"
                    />
                )}
            </div>

            {/* Health Related Absences */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Have you had absences related to health issues?
                </label>
                <input
                    type="checkbox"
                    checked={formState.healthRelatedAbsences}
                    onChange={(e) => handleChange("healthRelatedAbsences", e.target.checked)}
                    className="mt-2"
                />
                {formState.healthRelatedAbsences && (
                    <textarea
                        value={formState.healthRelatedAbsencesDetails}
                        onChange={(e) => handleChange("healthRelatedAbsencesDetails", e.target.value)}
                        placeholder="Please provide details"
                        className="w-full p-2 border border-gray-300 rounded mt-2"
                    />
                )}
            </div>

            {/* Current Medications */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Are you currently taking any medications?
                </label>
                <input
                    type="checkbox"
                    checked={formState.currentMedications}
                    onChange={(e) => handleChange("currentMedications", e.target.checked)}
                    className="mt-2"
                />
                {formState.currentMedications && (
                    <textarea
                        value={formState.medicationDetails}
                        onChange={(e) => handleChange("medicationDetails", e.target.value)}
                        placeholder="Please provide details"
                        className="w-full p-2 border border-gray-300 rounded mt-2"
                    />
                )}
            </div>

            {/* Physical Limitations */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Do you have any physical limitations?
                </label>
                <input
                    type="checkbox"
                    checked={formState.physicalLimitations}
                    onChange={(e) => handleChange("physicalLimitations", e.target.checked)}
                    className="mt-2"
                />
                {formState.physicalLimitations && (
                    <textarea
                        value={formState.limitationsDetails}
                        onChange={(e) => handleChange("limitationsDetails", e.target.value)}
                        placeholder="Please provide details"
                        className="w-full p-2 border border-gray-300 rounded mt-2"
                    />
                )}
            </div>

            {/* Color Vision Defects */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Do you have any color vision defects?
                </label>
                <input
                    type="checkbox"
                    checked={formState.colorVisionDefects}
                    onChange={(e) => handleChange("colorVisionDefects", e.target.checked)}
                    className="mt-2"
                />
                {formState.colorVisionDefects && (
                    <textarea
                        value={formState.colorVisionDefectsDetails}
                        onChange={(e) => handleChange("colorVisionDefectsDetails", e.target.value)}
                        placeholder="Please provide details"
                        className="w-full p-2 border border-gray-300 rounded mt-2"
                    />
                )}
            </div>

            {/* Disability Adjustment Needs */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Do you have any disability adjustment needs?
                </label>
                <textarea
                    value={formState.disabilityAdjustmentNeeds}
                    onChange={(e) => handleChange("disabilityAdjustmentNeeds", e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                />
            </div>

            {/* Agreement Certification */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Do you certify the provided information is accurate?
                </label>
                <input
                    type="checkbox"
                    checked={formState.agreementCertification}
                    onChange={(e) => handleChange("agreementCertification", e.target.checked)}
                    className="mt-2"
                />
            </div>

            {/* Agreement to Report Infection */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Do you agree to report any infectious conditions?
                </label>
                <input
                    type="checkbox"
                    checked={formState.agreementToReportInfection}
                    onChange={(e) => handleChange("agreementToReportInfection", e.target.checked)}
                    className="mt-2"
                />
            </div>
        </div>
    );
};

export default HealthAndDisabilityForm;
