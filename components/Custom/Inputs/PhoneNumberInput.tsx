import { Dispatch, SetStateAction } from "react";
import PhoneInput from "react-phone-input-2";

interface Props {
  phoneNo: string;
  setError: Dispatch<SetStateAction<string | null>>;
  setPhoneNo: Dispatch<SetStateAction<string>>;
  onFocus?: () => void;
}

export default function PhoneNumberInput({
  phoneNo,
  setError,
  setPhoneNo,
  onFocus,
}: Props) {
  return (
    <PhoneInput
      country={"gb"}
      value={phoneNo}
      onChange={(phone) => {
        setError(null);
        setPhoneNo(phone);
      }}
      preferredCountries={["uk"]}
      buttonClass="h-full w-fit"
      enableSearch
      dropdownClass=""
      onFocus={onFocus}
      inputStyle={{
        width: "100%",
        height: "38px",
        borderRadius: "8px",
        color: "#000",
        border: "1px solid #D0D5DD",
        fontWeight: "500",
      }}
      buttonStyle={{
        borderTopLeftRadius: "8px",
        borderBottomLeftRadius: "8px",
        border: "1px solid #D0D5DD",
      }}
      containerStyle={{
        borderRadius: "8px",
      }}
    />
  );
}
