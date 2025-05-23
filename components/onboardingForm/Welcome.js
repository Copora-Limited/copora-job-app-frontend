const Welcome = ({ onchange }) => {
  return (
    <>
      <p className="text-lg font-semibold text-gray-800 mb-4">
        Please prepare the following before you proceed with this registration:
      </p>

      <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700">
        <li>
          <strong className="font-medium text-gray-800">Photo ID:</strong> A
          valid passport or driver's license.
        </li>
        <li>
          <strong className="font-medium text-gray-800">
            Visa (if applicable):
          </strong>{" "}
          If you require a visa to work in the UK, include a copy of your valid
          visa document.
        </li>
        <li>
          <strong className="font-medium text-gray-800">
            Proof of National Insurance:
          </strong>{" "}
          An HMRC letter, payslip, or income support letter showing your
          National Insurance Number.
        </li>
        <li>
          <strong className="font-medium text-gray-800">
            Proof of Address:
          </strong>{" "}
          A recent bank statement, government letter, or utility bill with your
          current address.
        </li>
        <li>
          <strong className="font-medium text-gray-800">Current Photo:</strong>{" "}
          A recent, passport-style headshot or professional-quality selfie.
        </li>
      </ul>

      <p className="text-sm font-medium text-gray-800 mt-4">
        <strong>Declaration</strong>
      </p>
      <p className="text-sm text-gray-700 mt-2">
        I confirm that the information and documents I provide are accurate,
        genuine, and complete to the best of my knowledge. I understand that any
        false or misleading information may result in the rejection of my
        registration or employment. I agree to promptly inform Copora Ltd of any
        changes to this information, including my personal details, documents,
        or status, and I will ensure that such updates are provided in a timely
        and accurate manner.
      </p>
    </>
  );
};

export default Welcome;
