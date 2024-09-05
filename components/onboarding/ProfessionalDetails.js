import React, { useState, useEffect } from "react";

const ProfessionalDetails = ({ formData = [], onChange }) => {
    // Initialize state with props or with a single default work experience
    const [workExperiences, setWorkExperiences] = useState(
        Array.isArray(formData) && formData.length > 0
            ? formData
            : [
                {
                    companyName: "",
                    jobTitle: "",
                    startDate: "",
                    endDate: "",
                    responsibilities: "",
                    achievements: "",
                    referenceContactName: "",
                    referenceContactPhone: "",
                    referenceContactEmail: "",
                },
            ]
    );

    // Sync workExperiences when formData prop changes
    useEffect(() => {
        if (Array.isArray(formData)) {
            setWorkExperiences(
                formData.length > 0
                    ? formData
                    : [
                        {
                            companyName: "",
                            jobTitle: "",
                            startDate: "",
                            endDate: "",
                            responsibilities: "",
                            achievements: "",
                            referenceContactName: "",
                            referenceContactPhone: "",
                            referenceContactEmail: "",
                        },
                    ]
            );
        }
    }, [formData]);

    // Handle input changes
    const handleWorkExperienceChange = (index, field, value) => {
        const updatedExperiences = workExperiences.map((exp, i) =>
            i === index ? { ...exp, [field]: value } : exp
        );
        setWorkExperiences(updatedExperiences);
        onChange(updatedExperiences); // Notify parent component
    };

    // Add new work experience
    const addWorkExperience = () => {
        setWorkExperiences([
            ...workExperiences,
            {
                companyName: "",
                jobTitle: "",
                startDate: "",
                endDate: "",
                responsibilities: "",
                achievements: "",
                referenceContactName: "",
                referenceContactPhone: "",
                referenceContactEmail: "",
            },
        ]);
    };

    // Remove work experience
    const removeWorkExperience = (index) => {
        setWorkExperiences(workExperiences.filter((_, i) => i !== index));
        onChange(workExperiences.filter((_, i) => i !== index)); // Notify parent component
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Professional Details</h2>
            {workExperiences.map((experience, index) => (
                <div key={index} className="border p-4 mb-4 rounded">
                    {/* Company Name */}
                    <div className="flex flex-col md:flex-row gap-4 mb-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700">
                                Company Name
                            </label>
                            <input
                                type="text"
                                value={experience.companyName}
                                onChange={(e) => handleWorkExperienceChange(index, "companyName", e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                placeholder="Company Name"
                            />
                        </div>

                        {/* Job Title */}
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700">
                                Job Title
                            </label>
                            <input
                                type="text"
                                value={experience.jobTitle}
                                onChange={(e) => handleWorkExperienceChange(index, "jobTitle", e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                placeholder="Job Title"
                            />
                        </div>
                    </div>

                    {/* Start Date and End Date */}
                    <div className="flex flex-col md:flex-row gap-4 mb-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700">
                                Start Date
                            </label>
                            <input
                                type="date"
                                value={experience.startDate ? new Date(experience.startDate).toISOString().slice(0, 10) : ""}
                                onChange={(e) => handleWorkExperienceChange(index, "startDate", e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                            />
                        </div>

                        {/* End Date */}
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700">
                                End Date
                            </label>
                            <input
                                type="date"
                                value={experience.endDate ? new Date(experience.endDate).toISOString().slice(0, 10) : ""}
                                onChange={(e) => handleWorkExperienceChange(index, "endDate", e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                            />
                        </div>
                    </div>

                    {/* Responsibilities and Achievements */}
                    <div className="flex flex-col md:flex-row gap-4 mb-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700">
                                Responsibilities
                            </label>
                            <textarea
                                value={experience.responsibilities}
                                onChange={(e) => handleWorkExperienceChange(index, "responsibilities", e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                placeholder="Responsibilities"
                            />
                        </div>

                        {/* Achievements */}
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700">
                                Achievements
                            </label>
                            <textarea
                                value={experience.achievements}
                                onChange={(e) => handleWorkExperienceChange(index, "achievements", e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                placeholder="Achievements"
                            />
                        </div>
                    </div>

                    {/* Reference Contact Details */}
                    <div className="flex flex-col md:flex-row gap-4 mb-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700">
                                Reference Contact Name
                            </label>
                            <input
                                type="text"
                                value={experience.referenceContactName}
                                onChange={(e) => handleWorkExperienceChange(index, "referenceContactName", e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                placeholder="Reference Contact Name"
                            />
                        </div>

                        {/* Reference Contact Phone */}
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700">
                                Reference Contact Phone
                            </label>
                            <input
                                type="text"
                                value={experience.referenceContactPhone}
                                onChange={(e) => handleWorkExperienceChange(index, "referenceContactPhone", e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                placeholder="Reference Contact Phone"
                            />
                        </div>
                    </div>

                    {/* Reference Contact Email */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Reference Contact Email
                        </label>
                        <input
                            type="email"
                            value={experience.referenceContactEmail}
                            onChange={(e) => handleWorkExperienceChange(index, "referenceContactEmail", e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            placeholder="Reference Contact Email"
                        />
                    </div>

                    {/* Remove Button */}
                    {workExperiences.length > 1 && (
                        <div className="text-right">
                            <button
                                type="button"
                                onClick={() => removeWorkExperience(index)}
                                className="text-red-600 hover:text-red-800"
                            >
                                Remove Experience
                            </button>
                        </div>
                    )}
                </div>
            ))}

            {/* Add New Work Experience Button */}
            <div className="mt-4">
                <button
                    type="button"
                    onClick={addWorkExperience}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                    Add Work Experience
                </button>
            </div>
        </div>
    );
};

export default ProfessionalDetails;
