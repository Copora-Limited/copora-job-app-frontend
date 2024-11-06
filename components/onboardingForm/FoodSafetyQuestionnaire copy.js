import React, { useState, useEffect } from "react";
// import InputError from "@/utils/InputError";
import { useSession } from "next-auth/react";
import { useSessionContext } from "@/context/SessionContext";
import { CircleSpinnerOverlay } from "react-spinner-overlay";

const FoodSafetyQuestionnaire = ({ onChange }) => {
  const { data: session } = useSession();
  const { token } = useSessionContext();
  const applicationNo = session?.user?.applicationNo;

  const [formState, setFormState] = useState({
    cleaningRawMeatUtensilsRequired: "",
    cleanHandsWhenDirty: "",
    contaminatedFoodAppearance: "",
    trueStatementAboutBacteria: "",
    highRiskFoodStorage: "",
    temperatureDangerZone: "",
    handWashingScenarios: [],
    foodSafetyActTrueOrFalse: "",
    allergenDefinition: "",
    highRiskFoods: "",
    bacteriaFacts: "",
    foodSafetyActOffence: "",
    // Add more fields with initial values as needed
  });

  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasFetchedData, setHasFetchedData] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const fetchData = async () => {
      if (!token || !applicationNo || hasFetchedData) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/food-safety-questionnaire/${applicationNo}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch contact data.");
        }

        const data = await response.json();
        setFormState((prev) => ({ ...prev, ...data })); // Merge with existing state
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

  const handleChange = (field, value) => {
    const updatedFormState = { ...formState, [field]: value };
    console.log("Updated Form State:", updatedFormState); // Debug log
    setFormState(updatedFormState);
    onChange(updatedFormState); // Notify parent component
  };

  // Updated handleCheckboxChange function
  const handleCheckboxChange = (name, value) => {
    const newValue = formState[name] === value ? "" : value;
    const updatedFormData = { ...formState, [name]: newValue };
    console.log("Updated Form Data:", updatedFormData); // Debug log
    setFormState(updatedFormData);
    onChange(updatedFormData); // Notify parent component
  };

  const handleRadioChange = (field, value) => {
    const updatedFormState = { ...formState, [field]: value };
    console.log("Updated Form State (Radio):", updatedFormState); // Debug log
    setFormState(updatedFormState);
    onChange(updatedFormState); // Notify parent component
  };

  const handleHandWashingScenariosChange = (value) => {
    setFormState((prevState) => {
      const scenarios = Array.isArray(prevState.handWashingScenarios)
        ? [...prevState.handWashingScenarios]
        : [];

      if (scenarios.includes(value)) {
        scenarios.splice(scenarios.indexOf(value), 1); // Remove if already exists
      } else {
        scenarios.push(value); // Add new scenario
      }

      const updatedState = { ...prevState, handWashingScenarios: scenarios };
      console.log("Updated handWashingScenarios:", updatedState); // Debug log
      onChange(updatedState); // Notify parent component
      return updatedState;
    });
  };

  return (
    <>
      {isMounted && (
        <CircleSpinnerOverlay
          loading={isLoading}
          overlayColor="rgba(0,153,255,0.2)"
        />
      )}
      <div className="w-full flex flex-col gap-5 mt-5">
        {/* Question 1 */}
        <h6 className="text-[14px] text-gray-900 font-mediun">
          True or False: It is important to clean chopping boards/utensils after
          using them for raw meat.
        </h6>
        <div className="w-full flex md:flex-row flex-col md:items-start items-center gap-4 mt-2">
          <div className="flex items-center gap-3">
            <input type="checkbox" id="q1-true" className="accent-appGreen" />
            <label htmlFor="q1-true">True</label>
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" id="q1-false" className="accent-appGreen" />
            <label htmlFor="q1-false">False</label>
          </div>
        </div>

        {/* Question 2 */}
        <h6 className="text-[14px] text-gray-900 font-mediun">
          True or False: You only need to clean hands and kitchen surfaces when
          they look dirty.
        </h6>
        <div className="w-full flex md:flex-row flex-col md:items-start items-center gap-4 mt-2">
          <div className="flex items-center gap-3">
            <input type="checkbox" id="q2-true" className="accent-appGreen" />
            <label htmlFor="q2-true">True</label>
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" id="q2-false" className="accent-appGreen" />
            <label htmlFor="q2-false">False</label>
          </div>
        </div>

        {/* Question 3 */}
        <h6 className="text-[14px] text-gray-900 font-mediun">
          Food contaminated with food poisoning bacteria would: (please select
          one answer)
        </h6>
        {[
          "Be slimy and bitter",
          "Look and taste normal",
          "Smell",
          "Change colour",
        ].map((option, index) => (
          <div key={index} className="flex items-center gap-3">
            <input
              type="radio"
              name="q3"
              id={`q3-${index}`}
              className="accent-appGreen"
              onChange={() =>
                handleChange("contaminatedFoodCharacteristics", option)
              }
            />
            <label htmlFor={`q3-${index}`}>{option}</label>
          </div>
        ))}

        {/* Question 4 */}
        <h6 className="text-[14px] text-gray-900 font-mediun">
          Which one of these statements about bacteria is true?
        </h6>
        {[
          "All types of bacteria give food poisoning",
          "Freezing makes food last longer by killing bacteria",
          "Bacteria grow fastest when they are warm",
          "All bacteria need air to survive",
        ].map((option, index) => (
          <div key={index} className="flex items-center gap-3">
            <input
              type="radio"
              name="q4"
              id={`q4-${index}`}
              className="accent-appGreen"
            />
            <label htmlFor={`q4-${index}`}>{option}</label>
          </div>
        ))}

        {/* Question 5 */}
        <h6 className="text-[14px] text-gray-900 font-mediun">
          Where should High Risk Food be stored in a refrigerator?
        </h6>
        {["Below raw food", "Above raw food"].map((option, index) => (
          <div key={index} className="flex items-center gap-3">
            <input
              type="radio"
              name="q5"
              id={`q5-${index}`}
              className="accent-appGreen"
            />
            <label htmlFor={`q5-${index}`}>{option}</label>
          </div>
        ))}

        {/* Question 6 */}
        <h6 className="text-[14px] text-gray-900 font-mediun">
          What is the temperature danger zone for food safety?
        </h6>
        {["-18°C – 0°C", "0°C – 5°C", "5°C – 63°C", "63°C – 90°C"].map(
          (option, index) => (
            <div key={index} className="flex items-center gap-3">
              <input
                type="radio"
                name="q6"
                id={`q6-${index}`}
                className="accent-appGreen"
              />
              <label htmlFor={`q6-${index}`}>{option}</label>
            </div>
          )
        )}

        {/* Question 7 */}
        <h6 className="text-[14px] text-gray-900 font-mediun">
          Please give three scenarios of when you should wash your hands at
          work.
        </h6>
        {[1, 2, 3].map((num) => (
          <input
            key={num}
            type="text"
            placeholder={`Scenario ${num}`}
            className="border border-gray-300 p-2 rounded-md w-full"
          />
        ))}

        {/* Question 8 */}
        <h6 className="text-[14px] text-gray-900 font-mediun">
          True or False: The Food Safety Act 1990 is wide-ranging legislation on
          food safety and consumer protection in relation to food throughout
          Great Britain.
        </h6>
        <div className="w-full flex md:flex-row flex-col md:items-start items-center gap-4 mt-2">
          <div className="flex items-center gap-3">
            <input type="checkbox" id="q8-true" className="accent-appGreen" />
            <label htmlFor="q8-true">True</label>
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" id="q8-false" className="accent-appGreen" />
            <label htmlFor="q8-false">False</label>
          </div>
        </div>

        {/* Question 9 */}
        <h6 className="text-[14px] text-gray-900 font-mediun">
          What is an allergen?
        </h6>
        {[
          "A tool that is used to make food",
          "A food or ingredient that causes an allergic reaction",
          "A type of vegetable",
          "A term used to describe washing up",
        ].map((option, index) => (
          <div key={index} className="flex items-center gap-3">
            <input
              type="radio"
              name="q9"
              id={`q9-${index}`}
              className="accent-appGreen"
            />
            <label htmlFor={`q9-${index}`}>{option}</label>
          </div>
        ))}

        {/* Question 10 */}
        <h6 className="text-[14px] text-gray-900 font-mediun">
          Which of the following are high-risk foods?
        </h6>
        {["A chocolate bar", "Cooked meat and fish", "Apple", "Shellfish"].map(
          (option, index) => (
            <div key={index} className="flex items-center gap-3">
              <input
                type="radio"
                name="q10"
                id={`q10-${index}`}
                className="accent-appGreen"
              />
              <label htmlFor={`q10-${index}`}>{option}</label>
            </div>
          )
        )}

        {/* Question 11 */}
        <h6 className="text-[14px] text-gray-900 font-mediun">
          Which of the following is true about bacteria?
        </h6>
        {[
          "Every type of bacteria can give people food poisoning",
          "By freezing food, you can kill bacteria",
          "Bacteria multiplies and grows faster in warm environments",
          "Bacteria needs air to survive",
        ].map((option, index) => (
          <div key={index} className="flex items-center gap-3">
            <input
              type="radio"
              name="q11"
              id={`q11-${index}`}
              className="accent-appGreen"
            />
            <label htmlFor={`q11-${index}`}>{option}</label>
          </div>
        ))}

        {/* Question 12 */}
        <h6 className="text-[14px] text-gray-900 font-mediun">
          Name one offence under the Food Safety Act 1990.
        </h6>
        {[
          "Selling food that is Cold",
          "Selling Food that is Hot",
          "Selling food that is unfit for consumption",
          "Selling a mixture of hot and cold food",
        ].map((option, index) => (
          <div key={index} className="flex items-center gap-3">
            <input
              type="radio"
              name="q12"
              id={`q12-${index}`}
              className="accent-appGreen"
            />
            <label htmlFor={`q12-${index}`}>{option}</label>
          </div>
        ))}
      </div>
    </>
  );
};

export default FoodSafetyQuestionnaire;
