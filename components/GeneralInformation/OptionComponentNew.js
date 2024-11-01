// OptionComponentNew.js
const OptionsComponent = ({
  title,
  isCheckedLeft,
  setIsCheckedLeft,
  isCheckedRight,
  setIsCheckedRight,
  idLeft,
  idRight,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="md:text-[14px] text-[12px] text-[#667085]">{title}</p>

      <div className="flex items-start gap-4">
        <label htmlFor={idLeft} className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            id={idLeft}
            name={title}
            checked={isCheckedLeft}
            onChange={() => setIsCheckedLeft()} // Call the left function
            className="mr-2 accent-appGreen"
          />
          Yes
        </label>

        <label htmlFor={idRight} className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            id={idRight}
            name={title}
            checked={isCheckedRight}
            onChange={() => setIsCheckedRight()} // Call the right function
            className="mr-2 accent-appGreen"
          />
          No
        </label>
      </div>
    </div>
  );
};

export default OptionsComponent; // Default export
