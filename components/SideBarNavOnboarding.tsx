// components/SideBarNav.tsx
import { FC } from "react";
import { useRouter } from "next/router";

interface SideBarNavProps {
  steps: string[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const SideBarNav: FC<SideBarNavProps> = ({ steps, currentStep, setCurrentStep }) => {
  const router = useRouter();

  const handleNavigation = (index: number) => {
    router.push(`/onboarding?step=${index + 1}`, undefined, {
      shallow: true,
    });
    setCurrentStep(index);
  };

  return (
    <div className="w-full md:w-1/4 bg-gray-100 p-4">
      <ul className="space-y-4">
        {steps.map((step, index) => (
          <li
            key={step}
            className={`cursor-pointer p-2 ${
              currentStep === index
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handleNavigation(index)}
          >
            {step}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBarNav;
