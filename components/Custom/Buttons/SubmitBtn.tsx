import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export default function SubmitBtn({ text, ...props }: Props) {
  return (
    <button
      {...props}
      className="w-full h-[44px] flex items-center justify-center gap-2 bg-appGreen hover:bg-teal-700 transition duration-500 text-white border border-[#667080] rounded-[100px] md:text-[16px] text-[13px] font-semibold px-[12px] disabled:bg-[#D0D5DD] disabled:text-white disabled:cursor-not-allowed disabled:border-none click_btn"
    >
      {text}
    </button>
  );
}
