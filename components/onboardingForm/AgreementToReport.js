import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useSessionContext } from "@/context/SessionContext";
import { CircleSpinnerOverlay } from "react-spinner-overlay";

const AgreementToReportInfection = ({ onChange }) => {
  const { data: session } = useSession();
  const { token } = useSessionContext();
  const applicationNo = session?.user?.applicationNo;

  const [checked, setChecked] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasFetchedData, setHasFetchedData] = useState(false);

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
        // console.log("hasData", hasData);
        console.log("initial data", data.agreementToReportInfection);
        setChecked(data.agreementToReportInfection);
        onChange(data.agreementToReportInfection);
        setIsLoading(false);
        setHasFetchedData(true);
      } catch (error) {
        console.error("Error fetching contact data:", error);
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      // Cleanup if needed
      setIsMounted(false);
    };
  }, [token, applicationNo, hasFetchedData, onChange]);

  const handleChange = (value) => {
    setChecked(value);
    const updatedFormState = { agreementToReportInfection: value };
    onChange(updatedFormState); // Notify parent component
  };

  return (
    <>
      {isMounted && (
        <CircleSpinnerOverlay
          loading={isLoading}
          overlayColor="rgba(0,153,255,0.2)"
        />
      )}
      <div className="w-full col-span-2 flex flex-col gap-3 md:text-[14px] text-[12px] text-[#475467] font-azoSansMedium">
        <p className="mt-3">
          I agree to report to my immediate manager or supervisor as soon as
          possible, by telephone if necessary, in any of the following
          circumstances:
        </p>

        <div>
          1. Should I suffer from any illness involving any of the following
          conditions:
          <ul className="list-disc pl-8">
            <li>Vomiting</li>
            <li>Diarrhea</li>
            <li>
              Septic skin lesions (boils, infected cuts, etc., however small)
            </li>
            <li>Discharge from ear, eye, nose or any other site</li>
          </ul>
        </div>

        <div>
          2. Before returning to work following any illness with the above
          conditions.
        </div>

        <div>
          3. If any of my household is suffering from diarrhea and/or vomiting.
        </div>

        <div>
          4. After returning from a holiday during which I suffered from
          diarrhea and/or vomiting.
        </div>

        <div>
          5. After returning from holiday during which any member of my party
          had an attack of vomiting and/or diarrhea.
        </div>

        <br />

        <span>Before returning to work</span>

        <div>
          I am aware that I must remain off work for at least 48 hours after any
          symptoms of diarrhoea and vomiting have stopped
        </div>

        <div>
          I will not return to work unless I have discussed this with my manager
          and they have confirmed they are happy for me to return
        </div>

        <div>
          I will visit my doctor before returning, if requested to do so by my
          manager
        </div>

        <div>
          I have read and understand my responsibilities as stated above in the
          form “agreement to report infection” I can confirm that I have not had
          any of the symptoms listed above in the last 48 hours. I also agree to
          abide by points 1 – 5 listed above for the whole duration of my
          employment with Copora.
        </div>

        <div className="w-full flex items-center gap-3">
          <input
            type="checkbox"
            id="agree"
            checked={checked}
            onChange={(e) => handleChange(e.target.checked)} // Pass the checked state directly
            className="accent-[#247A84] rounded-md"
          />
          <label htmlFor="agree">I agree to report Infection</label>
        </div>
      </div>
    </>
  );
};

export default AgreementToReportInfection;
