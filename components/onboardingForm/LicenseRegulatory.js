import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useSessionContext } from "@/context/SessionContext";
import { CircleSpinnerOverlay } from "react-spinner-overlay";
import CheckOption from "@/components/GeneralInformation/CheckOption";

const LicenseRegulatory = ({ onChange }) => {
  const { data: session } = useSession();
  const { token } = useSessionContext();
  const applicationNo = session?.user?.applicationNo;

  const [checked, setChecked] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasFetchedData, setHasFetchedData] = useState(false);

  useEffect(() => {
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
        setFormState(data);
        onChange(data); // Notify parent component with fetched data
        setIsLoading(false);
        setHasFetchedData(true);
      } catch (error) {
        console.error("Error fetching contact data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [applicationNo, token, hasFetchedData, onChange]);

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
      <div className="w-full flex flex-col gap-5 mt-5 text-[14px] font-azoSansLight">
        It is in breach of Licensing Regulations to contravene these
        regulations:
        <ul className="list-disc pl-8">
          <li>To serve intoxicating liquor in the incorrect quantities</li>
          <li>To serve diluted beer, wine or spirits</li>
          <li>To serve liquor to any person under 18 years of age</li>
          <li>
            To permit drunkenness or any violent, quarrelsome or riotous conduct
            to take place on the premises or sell intoxicating liquor to or for,
            the consumption of a drunken person or habitual drunkard.
          </li>
          <li>
            To give credit for any intoxicating liquor served in a public bar,
            except when supplied with a meal and paid for at the same time.
          </li>
          <li>
            To serve or permit, the consumption out of permitted hours, of
            intoxicating liquor.
          </li>
          <li>
            To miss-describe/pass off any goods and/ or sell drinks at a price
            different to that displayed on the appropriate bar tariff.
          </li>
          <li>Do not serve customers who are drunk or appear to be so.</li>
          <li>
            Do not serve under 18-year old’s - only take Passport, Driver’s
            License, or a Proof of Age Card carrying the PASS logo as ID if
            unsure. It is your responsibility to check the age of the customer.
          </li>
          <li>
            Weights and measures – Spirits, wine and beer must be served in the
            correct quantities as stipulated in the Licensing Act 2003. e.g. Rum
            in 25ml or 35mls or multiples thereof. Please sign below in
            acknowledgement of these regulations, in agreement that you fully
            understand and will comply with the above for the whole duration of
            your employment with Copora.
          </li>
        </ul>
      </div>

      <div className="w-full mt-4 font-azoSansLight">
        <CheckOption
          checked={checked}
          text="I agree that you fully understand and will comply with the above for the whole duration of your employment with Copora."
          id="licensing"
          onChange={(e) => setChecked(e.target.checked)}
        />
      </div>
    </>
  );
};

export default LicenseRegulatory;
