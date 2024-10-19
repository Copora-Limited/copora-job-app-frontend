import { InputHTMLAttributes, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function PasswordInput({
  label,
  ...inputProps
}: PasswordInputProps) {
  const [type, setType] = useState<"password" | "text">("password");
  return (
    <div className="w-full flex flex-col gap-1">
      {label && (
        <div className="w-full flex items-center justify-between">
          <label
            htmlFor={label}
            className="md:text-[14px] text-[12px] text-[#344054] font-medium"
          >
            {label}
          </label>
        </div>
      )}
      <div className="w-full md:h-[40px] h-[35px] flex items-center justify-between rounded-[8px] border border-[#D0D5DD] py-[8px] px-[14px]">
        <input
          {...inputProps}
          type={type}
          className="outline-0 border-0 w-full h-full placeholder:text-[#667085] placeholder:text-[14px] text-[14px] text-[#667085]"
        />
        {type === "password" ? (
          <FaEye
            className="text-[19px] cursor-pointer text-appGreen transition-all duration-500 hover:text-teal-500"
            onClick={() => setType("text")}
          />
        ) : (
          <FaEyeSlash
            className="text-[19px] cursor-pointer text-appGreen transition-all duration-500 hover:text-teal-500"
            onClick={() => setType("password")}
          />
        )}
      </div>
    </div>
  );
}
