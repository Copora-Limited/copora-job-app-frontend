export default function StatisticsCard({ detail, title, color = "#F2FAFF" }) {
  return (
    <div
      style={{ backgroundColor: color }}
      className="w-full md:h-[110px] h-[100px] rounded-[8px] border border-[#F9FAFB] p-2 flex flex-col justify-between"
    >
      <img
        src="/assets/stat-avatar.svg"
        alt="statistics icon"
        className="w-[32px] h-[32px] rounded-full"
      />
      <p className="text-[12px] text-[#667085]">{title}</p>
      <h4>{detail}</h4>
    </div>
  );
}
