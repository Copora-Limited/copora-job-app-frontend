interface Props {
  icon: string;
  title: string;
  data: string | number | undefined;
  isPhone?: boolean;
  isEmail?: boolean;
}

export default function ApplicantSideNav({
  data,
  icon,
  title,
  isEmail,
  isPhone,
}: Props) {
  if (isEmail) {
    return (
      <a
        href={`mailto:${data}`}
        className="w-full pl-5 py-3 flex items-center gap-4 border-b border-[#F7F9FC]"
      >
        <img src={icon} alt={title} />
        <div>
          <p className="leading-tight text-[12px] text-[#667185]">{title}</p>
          <h4 className="text-[14px] font-medium text-primary">{data}</h4>
        </div>
      </a>
    );
  }
  if (isPhone) {
    return (
      <a
        href={`tel:${data}`}
        className="w-full pl-5 py-3 flex items-center gap-4 border-b border-[#F7F9FC]"
      >
        <img src={icon} alt={title} />
        <div>
          <p className="leading-tight text-[12px] text-[#667185]">{title}</p>
          <h4 className="text-[14px] font-medium text-primary">{data}</h4>
        </div>
      </a>
    );
  }
  return (
    <div className="w-full pl-5 py-3 flex items-center gap-4 border-b border-[#F7F9FC]">
      <img src={icon} alt={title} />
      <div>
        <p className="leading-tight text-[12px] text-[#667185]">{title}</p>
        <h4 className="text-[14px] font-medium text-primary">{data}</h4>
      </div>
    </div>
  );
}
