import { FaTimesCircle } from "react-icons/fa";

export function Saved() {
  return (
    <div className="flex items-center gap-2 transition-all duration-500 saved_animation">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 15.5C12.1421 15.5 15.5 12.1421 15.5 8C15.5 3.85786 12.1421 0.5 8 0.5C3.85786 0.5 0.5 3.85786 0.5 8C0.5 12.1421 3.85786 15.5 8 15.5Z"
          fill="#0EA62F"
        />
        <path
          d="M4.625 8L6.875 10.25L11.375 5.75M15.5 8C15.5 12.1421 12.1421 15.5 8 15.5C3.85786 15.5 0.5 12.1421 0.5 8C0.5 3.85786 3.85786 0.5 8 0.5C12.1421 0.5 15.5 3.85786 15.5 8Z"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p className="text-[12px] text-primary font-medium">Saved</p>
    </div>
  );
}

export function Failed() {
  return (
    <div className="flex items-center gap-2 transition-all duration-500 saved_animation">
      <FaTimesCircle color="red" />
      <p className="text-[12px] text-[red] font-medium">Failed</p>
    </div>
  );
}
