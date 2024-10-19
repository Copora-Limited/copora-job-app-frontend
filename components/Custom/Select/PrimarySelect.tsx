import { FaAsterisk } from "react-icons/fa";

interface PrimarySelectProps<T>
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: T[];
  initialValue?: string;
  label?: string;
  isRequired?: boolean;
}

const PrimarySelect = <T extends string>({
  label,
  options,
  initialValue,
  isRequired,
  ...selectProps
}: PrimarySelectProps<T>) => {
  return (
    <div className="custom-select">
      {label && (
        <label
          htmlFor={selectProps.id}
          className="md:text-[14px] text-[12px] text-[#344054] font-medium flex items-center gap-1"
        >
          {label}
          {isRequired && (
            <span className="text-red-600">
              <FaAsterisk size={6} />
            </span>
          )}
        </label>
      )}
      <select
        {...selectProps}
        className="w-full md:h-[40px] h-[35px] rounded-[8px] border border-[#D0D5DD] py-[8px] px-[8px] outline-0 placeholder:text-[#667085] placeholder:text-[14px] text-[14px] text-black"
      >
        <option value="">{initialValue}</option>
        {options?.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PrimarySelect;
