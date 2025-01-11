import React from "react";

export const FoodSafetyQuestionnaire = ({ foodSafetyQuestionnaire }) => {
  if (!foodSafetyQuestionnaire) {
    return <div>No food Safety Questionnaire Available</div>;
  }

  return (
    <div className="w-full py-5 border-b">
      <h3 className="font-medium md:text-[23px] text-[16px]">
        Food Safety Questionnaire
      </h3>
      {/* <p className="mt-2 text-sm text-[#9F9F9F]">
        Answer questions about food safety knowledge and practices.
      </p> */}
      <div className="space-y-6 mt-4 p-4 border rounded-md bg-[#F9F9F9]">
        <div>
          <h4 className="font-semibold">
            It is important to clean chopping boards/utensils after using them
            for raw meat.
          </h4>
          <p className="text-sm">
            Answer:{" "}
            {foodSafetyQuestionnaire.cleaningRawMeatUtensilsRequired
              ? "True"
              : "False"}
          </p>
        </div>

        <div>
          <h4 className="font-semibold">
            You only need to clean hands and kitchen surfaces when they look
            dirty.
          </h4>
          <p className="text-sm">
            Answer:{" "}
            {foodSafetyQuestionnaire.cleanHandsWhenDirty ? "True" : "False"}
          </p>
        </div>

        <div>
          <h4 className="font-semibold">
            Food contaminated with food poisoning bacteria would:
          </h4>
          <p className="text-sm">
            Answer: {foodSafetyQuestionnaire.contaminatedFoodCharacteristics}
          </p>
        </div>

        <div>
          <h4 className="font-semibold">
            Which one of these statements about bacteria is true?
          </h4>
          <p className="text-sm">
            Answer: {foodSafetyQuestionnaire.bacteriaFactOne}
          </p>
        </div>

        <div>
          <h4 className="font-semibold">
            Where should High Risk Food be stored in a refrigerator?
          </h4>
          <p className="text-sm">
            Answer: {foodSafetyQuestionnaire.highRiskFoodStorage}
          </p>
        </div>

        <div>
          <h4 className="font-semibold">
            What is the temperature danger zone for food safety?
          </h4>
          <p className="text-sm">
            Answer: {foodSafetyQuestionnaire.temperatureDangerZone}
          </p>
        </div>

        <div>
          <h4 className="font-semibold">
            Please give three scenarios of when you should wash your hands at
            work.
          </h4>
          <ul className="text-sm list-disc pl-5">
            {foodSafetyQuestionnaire.handWashingScenarios.map(
              (scenario, index) => (
                <li key={index}>{scenario.trim()}</li>
              )
            )}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold">What is an allergen?</h4>
          <p className="text-sm">
            Answer: {foodSafetyQuestionnaire.allergenDefinition}
          </p>
        </div>

        <div>
          <h4 className="font-semibold">
            Which of the following are high-risk foods?
          </h4>
          <p className="text-sm">
            Answer: {foodSafetyQuestionnaire.highRiskFoods}
          </p>
        </div>

        <div>
          <h4 className="font-semibold">
            Which of the following is true about bacteria?
          </h4>
          <p className="text-sm">
            Answer: {foodSafetyQuestionnaire.bacteriaFactTwo}
          </p>
        </div>

        <div>
          <h4 className="font-semibold">
            Name one offence under the Food Safety Act 1990.
          </h4>
          <p className="text-sm">
            Answer: {foodSafetyQuestionnaire.foodSafetyActOffence}
          </p>
        </div>
      </div>
    </div>
  );
};
