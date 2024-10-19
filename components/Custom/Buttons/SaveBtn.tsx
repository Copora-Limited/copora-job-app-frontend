import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

export default function SaveBtn({ text, ...props }: Props) {
  return (
    <button
      {...props}
      type="submit"
      className="w-full h-[44px] flex items-center justify-center gap-2 bg-appGreen hover:bg-teal-700 transition duration-500 text-white border border-[#667080] rounded-[100px] text-[15px] font-semibold px-[12px] disabled:bg-[#7e7e7e] disabled:text-white disabled:cursor-not-allowed click_btn"
    >
      <svg
        width="15"
        height="16"
        viewBox="0 0 15 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-spin"
      >
        <rect
          opacity="0.87"
          x="6.43945"
          y="5.52515"
          width="2"
          height="5"
          rx="1"
          transform="rotate(135 6.43945 5.52515)"
          fill="#101828"
        />
        <rect
          opacity="0.75"
          x="5"
          y="7"
          width="2"
          height="5"
          rx="1"
          transform="rotate(90 5 7)"
          fill="#101828"
        />
        <rect
          opacity="0.63"
          x="5.02539"
          y="9.06055"
          width="2"
          height="5"
          rx="1"
          transform="rotate(45 5.02539 9.06055)"
          fill="#101828"
        />
        <rect
          opacity="0.51"
          x="6.5"
          y="10.5"
          width="2"
          height="5"
          rx="1"
          fill="#101828"
        />
        <rect
          opacity="0.39"
          x="13.5117"
          y="12.5962"
          width="2"
          height="5"
          rx="1"
          transform="rotate(135 13.5117 12.5962)"
          fill="#101828"
        />
        <rect
          opacity="0.27"
          x="15"
          y="7"
          width="2"
          height="5"
          rx="1"
          transform="rotate(90 15 7)"
          fill="#101828"
        />
        <rect
          opacity="0.15"
          x="12.0977"
          y="1.98975"
          width="2"
          height="5"
          rx="1"
          transform="rotate(45 12.0977 1.98975)"
          fill="#101828"
        />
        <rect x="6.5" y="0.5" width="2" height="5" rx="1" fill="#101828" />
      </svg>
      {text ? text : "SAVE"}
    </button>
  );
}
