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
    handWashingScenarios: [],
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
        {/* Question 1: cleaningRawMeatUtensilsRequired */}
        <h6 className="text-[14px] text-black font-medium">
          It is important to clean chopping boards/utensils after using them for
          raw meat.
        </h6>
        <div className="w-full flex md:flex-row flex-col md:items-start items-center gap-4 mt-2">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="utensil-true-1"
              checked={formState.cleaningRawMeatUtensilsRequired === true}
              className="accent-appGreen"
              onChange={() =>
                handleCheckboxChange("cleaningRawMeatUtensilsRequired", true)
              }
            />
            <label htmlFor="utensil-true-1">True</label>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="utensil-false-1"
              checked={formState.cleaningRawMeatUtensilsRequired === false}
              className="accent-appGreen"
              onChange={() =>
                handleCheckboxChange("cleaningRawMeatUtensilsRequired", false)
              }
            />
            <label htmlFor="utensil-false-1">False</label>
          </div>
        </div>

       

        {/* Question 3: Cleaning Requirement */}
        <h6 className="text-[14px] text-black font-medium">
          You only need to clean hands and kitchen surfaces when they look
          dirty.
        </h6>
        <div className="w-full flex md:flex-row flex-col md:items-start items-center gap-4 mt-2">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="cleaningRequirement-true"
              checked={formState.cleaningRequirement === true}
              className="accent-appGreen"
              onChange={() => handleCheckboxChange("cleaningRequirement", true)}
            />
            <label htmlFor="cleaningRequirement-true">True</label>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="cleaningRequirement-false"
              checked={formState.cleaningRequirement === false}
              className="accent-appGreen"
              onChange={() =>
                handleCheckboxChange("cleaningRequirement", false)
              }
            />
            <label htmlFor="cleaningRequirement-false">False</label>
          </div>
        </div>

        {/* Question 4: Contaminated Food Characteristics */}
        <h6 className="text-[14px] text-black font-medium">
          Food contaminated with food poisoning bacteria would: (please select
          one answer)
        </h6>
        {[
          "Be slimy and bitter",
          "Look and taste normal",
          "Smell",
          "Change colour",
        ].map((option) => (
          <div key={option} className="flex items-center gap-3">
            <input
              type="checkbox"
              id={`contaminatedFood-${option}`}
              checked={formState.contaminatedFoodCharacteristics === option}
              className="accent-appGreen"
              onChange={() =>
                handleChange("contaminatedFoodCharacteristics", option)
              }
            />
            <label htmlFor={`contaminatedFood-${option}`}>{option}</label>
          </div>
        ))}

        {/* Question 5: Bacteria Fact True */}
        <h6 className="text-[14px] text-black font-medium">
          Which one of these statements about bacteria is true?
        </h6>
        {[
          "All types of bacteria give food poisoning",
          "Freezing makes food last longer by killing bacteria",
          "Bacteria grow fastest when they are warm",
          "All bacteria need air to survive",
        ].map((option) => (
          <div key={option} className="flex items-center gap-3">
            <input
              type="checkbox"
              id={`bacteriaFact-${option}`}
              checked={formState.bacteriaFactTrue === option}
              className="accent-appGreen"
              onChange={() => handleChange("bacteriaFactTrue", option)}
            />
            <label htmlFor={`bacteriaFact-${option}`}>{option}</label>
          </div>
        ))}

        {/* Question 6: High Risk Food Storage Position */}
        <h6 className="text-[14px] text-black font-medium">
          Where should High Risk Food be stored in a refrigerator?
        </h6>
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="highRiskFood-Below"
            checked={formState.highRiskFoodStoragePosition === "Below raw food"}
            className="accent-appGreen"
            onChange={() =>
              handleChange("highRiskFoodStoragePosition", "Below raw food")
            }
          />
          <label htmlFor="highRiskFood-Below">Below raw food</label>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="highRiskFood-Above"
            checked={formState.highRiskFoodStoragePosition === "Above raw food"}
            className="accent-appGreen"
            onChange={() =>
              handleChange("highRiskFoodStoragePosition", "Above raw food")
            }
          />
          <label htmlFor="highRiskFood-Above">Above raw food</label>
        </div>

        {/* Question 7: Temperature Danger Zone */}
        <h6 className="text-[14px] text-black font-medium">
          What is the temperature danger zone for food safety?
        </h6>
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="dangerZone-18-0"
            checked={formState.temperatureDangerZone === "-18-0°C"}
            className="accent-appGreen"
            onChange={() => handleChange("temperatureDangerZone", "-18-0°C")}
          />
          <label htmlFor="dangerZone-18-0">-18°C - 0°C</label>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="dangerZone-0-5"
            checked={formState.temperatureDangerZone === "0-5°C"}
            className="accent-appGreen"
            onChange={() => handleChange("temperatureDangerZone", "0-5°C")}
          />
          <label htmlFor="dangerZone-0-5">0°C - 5°C</label>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="dangerZone-5-63"
            checked={formState.temperatureDangerZone === "5-63°C"}
            className="accent-appGreen"
            onChange={() => handleChange("temperatureDangerZone", "5-63°C")}
          />
          <label htmlFor="dangerZone-5-63">5°C - 63°C</label>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="dangerZone-63-90"
            checked={formState.temperatureDangerZone === "63-90°C"}
            className="accent-appGreen"
            onChange={() => handleChange("temperatureDangerZone", "63-90°C")}
          />
          <label htmlFor="dangerZone-63-90">63°C - 90°C</label>
        </div>

        {/* Question 8: Hand Washing Scenarios */}
        <h6 className="text-[14px] text-black font-medium">
          Please give three scenarios of when you should wash your hands at work
          (Select all that apply)
        </h6>
        {[
          "Before preparing food",
          "After touching raw meat",
          "After going to the toilet",
          "After coughing/sneezing",
        ].map((option) => (
          <div key={option} className="flex items-center gap-3">
            <input
              type="checkbox"
              id={`handWashing-${option}`}
              checked={formState.handWashingScenarios?.includes(option)} // Use optional chaining
              className="accent-appGreen"
              onChange={() => handleHandWashingScenariosChange(option)}
            />

            <label htmlFor={`handWashing-${option}`}>{option}</label>
          </div>
        ))}

        {/* Question 9: Allergen Definition */}
        <h6 className="text-[14px] text-black font-medium">
          What is an allergen ?
        </h6>
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="allergenDefinition-1"
            checked={formState.allergenDefinition === "1"}
            className="accent-appGreen"
            onChange={() => handleChange("allergenDefinition", "1")}
          />
          <label htmlFor="allergenDefinition-1">
            A tool that is used to make food
          </label>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="allergenDefinition-2"
            checked={formState.allergenDefinition === "2"}
            className="accent-appGreen"
            onChange={() => handleChange("allergenDefinition", "2")}
          />
          <label htmlFor="allergenDefinition-2">
            A food or ingredient that causes an allergic reaction
          </label>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="allergenDefinition-3"
            checked={formState.allergenDefinition === "3"}
            className="accent-appGreen"
            onChange={() => handleChange("allergenDefinition", "3")}
          />
          <label htmlFor="allergenDefinition-3">A type of vegetable</label>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="allergenDefinition-4"
            checked={formState.allergenDefinition === "4"}
            className="accent-appGreen"
            onChange={() => handleChange("allergenDefinition", "4")}
          />
          <label htmlFor="allergenDefinition-4">
            A term used to describe washing up
          </label>
        </div>

        {/* Question 10: High Risk Foods Examples */}
        <h6 className="text-[14px] text-black font-medium">
          Which of the following are high-risk foods? (Select all that apply)
        </h6>
        {["A chocolate bar", "Cooked meat and fish", "Apple", "Shellfish"].map(
          (option) => (
            <div key={option} className="flex items-center gap-3">
              <input
                type="checkbox"
                id={`highRiskFoods-${option}`}
                checked={formState.highRiskFoodsExamples?.includes(option)}
                className="accent-appGreen"
                onChange={() => handleChange("highRiskFoodsExamples", option)}
              />
              <label htmlFor={`highRiskFoods-${option}`}>{option}</label>
            </div>
          )
        )}

        {/* Question 11: Food Safety Act Offense */}
        <h6 className="text-[14px] text-black font-medium">
          A business owner could be prosecuted for a Food Safety Act offense if:
        </h6>
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="foodSafetyActOffense-1"
            checked={formState.foodSafetyActOffense === "1"}
            className="accent-appGreen"
            onChange={() => handleChange("foodSafetyActOffense", "1")}
          />
          <label htmlFor="foodSafetyActOffense-1">
            The business does not have a valid Food Safety Certificate
          </label>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="foodSafetyActOffense-2"
            checked={formState.foodSafetyActOffense === "2"}
            className="accent-appGreen"
            onChange={() => handleChange("foodSafetyActOffense", "2")}
          />
          <label htmlFor="foodSafetyActOffense-2">
            The business does not display its food hygiene rating
          </label>
        </div>

        
      </div>
    </>
  );
};

export default FoodSafetyQuestionnaire;
