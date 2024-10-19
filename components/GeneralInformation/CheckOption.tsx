import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  text: string;
}

export default function CheckOption({ text, ...props }: Props) {
  return (
    <div className="flex items-center gap-3 text-[14px] text-black">
      <input
        type="checkbox"
        {...props}
        className="accent-appGreen"
        width={24}
        height={24}
        id={props.id}
      />
      <label htmlFor={props.id}>{text}</label>
    </div>
  );
}
