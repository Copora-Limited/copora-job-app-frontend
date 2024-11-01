/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, InputHTMLAttributes } from "react";
import { FaAsterisk } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  isDelete?: boolean;
  handleDelete?: any;
  isRequired?: boolean;
}

const PrimaryInput: FC<CustomInputProps> = ({
  label,
  isDelete,
  handleDelete,
  isRequired,
  ...inputProps
}) => {
  return (
    <div className="w-full flex flex-col gap-1 my-4">
      {label && (
        <div className="w-full flex items-center justify-between">
          <label
            htmlFor={label}
            className="md:text-[14px] text-[12px] text-[#344054] font-medium flex items-center gap-1"
          >
            {label}
            {isRequired && (
              <span className="text-red-600">
                <FaAsterisk size={6} />
              </span>
            )}
          </label>

          {isDelete && (
            <RiDeleteBin5Line
              className="cursor-pointer text-appMuted transition-all duration-300 hover:text-red-500"
              onClick={handleDelete}
            />
          )}
        </div>
      )}
      <input
        {...inputProps}
        className="w-full md:h-[40px] h-[35px] rounded-[8px] border border-[#D0D5DD] py-[8px] px-[14px] outline-0 placeholder:text-[#667085] placeholder:text-[14px] text-[14px] text-black"
      />
    </div>
  );
};

export default PrimaryInput;
