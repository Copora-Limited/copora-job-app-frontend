import { Dispatch, SetStateAction } from "react";
import CheckOption from "./CheckOption";

interface Props {
  title: string;
  idLeft: string;
  idRight: string;
  isCheckedLeft: boolean;
  setIsCheckedLeft: Dispatch<SetStateAction<boolean>>;
  isCheckedRight: boolean;
  setIsCheckedRight: Dispatch<SetStateAction<boolean>>;
}

export default function OptionsComponent({
  title,
  isCheckedLeft,
  setIsCheckedLeft,
  isCheckedRight,
  setIsCheckedRight,
  idLeft,
  idRight,
}: Props) {
  return (
    <div className="flex flex-col gap-4">
      <p className="md:text-[14px] text-[12px] text-[#667085]">{title}</p>
      <div className="flex items-start gap-4">
        <CheckOption
          id={idLeft}
          text="Yes"
          checked={isCheckedLeft}
          onChange={(e) => {
            setIsCheckedRight(false);
            setIsCheckedLeft(e.target.checked);
          }}
        />

        <CheckOption
          id={idRight}
          text="No"
          checked={isCheckedRight}
          onChange={(e) => {
            setIsCheckedLeft(false);
            setIsCheckedRight(e.target.checked);
          }}
        />
      </div>
    </div>
  );
}
