import { ChangeEvent, Dispatch, MutableRefObject, SetStateAction } from "react";
import CheckOption from "./CheckOption";
import UploadedFile from "../Custom/UploadedFile";

interface QualificationCardProps {
  title: string;
  inputRef: MutableRefObject<HTMLInputElement | null>;
  isCertificate1Checked: boolean;
  setIsCertificate1Checked: Dispatch<SetStateAction<boolean>>;
  isCertificate2Checked: boolean;
  setIsCertificate2Checked: Dispatch<SetStateAction<boolean>>;
  idLeft: string;
  idRight: string;
  file: string | undefined;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function QualificationsCard({
  title,
  inputRef,
  isCertificate1Checked,
  setIsCertificate1Checked,
  isCertificate2Checked,
  setIsCertificate2Checked,
  idLeft,
  idRight,
  file,
  setFile,
  handleFileChange,
}: QualificationCardProps) {
  const handleUpload = () => {
    inputRef.current?.click();
  };

  return (
    <div className="w-full flex flex-col gap-3 cursor-default">
      <input
        type="file"
        ref={inputRef}
        hidden
        onChange={handleFileChange}
        accept="application/*"
      />
      <p className="md:text-[14px] text-[12px] text-black">{title}</p>
      <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-4">
        <CheckOption
          text="Yes (If yes, Upload certificate)"
          checked={isCertificate1Checked}
          onChange={(e) => {
            setIsCertificate2Checked(false);
            setIsCertificate1Checked(e.target.checked);
          }}
          id={idLeft}
        />
        <CheckOption
          text="No"
          checked={isCertificate2Checked}
          onChange={(e) => {
            setIsCertificate1Checked(false);
            setIsCertificate2Checked(e.target.checked);
          }}
          id={idRight}
        />
        {isCertificate1Checked &&
          (file ? (
            <div className="w-full md:h-[75px] h-[60px]">
              <UploadedFile
                fileName={file}
                onDelete={() => setFile(null)}
                type=".pdf"
              />
            </div>
          ) : (
            <div
              className={`w-full md:h-[75px] h-[60px] border-dashed border ${
                file ? "border-appGreen" : "border-[#D0D5DD]"
              } rounded-[10px] px-5 mt-3 flex items-center justify-between gap-3 transition-all duration-500 hover:border-appGreen`}
            >
              <svg
                width="32"
                height="33"
                viewBox="0 0 32 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="16" cy="16.5" r="16" fill="#F9FAFB" />
                <path
                  d="M13.333 19.1667L15.9997 16.5M15.9997 16.5L18.6663 19.1667M15.9997 16.5V22.5M21.333 19.6619C22.1473 18.9894 22.6663 17.972 22.6663 16.8333C22.6663 14.8083 21.0247 13.1667 18.9997 13.1667C18.854 13.1667 18.7177 13.0907 18.6438 12.9652C17.7744 11.4899 16.1693 10.5 14.333 10.5C11.5716 10.5 9.33301 12.7386 9.33301 15.5C9.33301 16.8774 9.88997 18.1247 10.791 19.029"
                  stroke="#475367"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <div>
                <p className="text-[12px] text-primary font-medium">
                  Upload Certificate
                </p>
                <p className="text-[12px] text-[#98A2B3]">
                  SVG, PNG, JPG, GIF | 10MB max.
                </p>
              </div>
              <div
                onClick={handleUpload}
                className="w-[80px] h-[36px] flex items-center justify-center bg-appGreen text-white text-[14px] rounded-[6px]"
              >
                {file ? "Uploaded" : "Upload"}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
