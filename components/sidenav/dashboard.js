import Link from "next/link";
import { useRouter } from "next/router";
import useDashboardStore from "@/hooks/Store/useDashboardStore";

export default function Dashboard() {
  const router = useRouter();
  const pathname = router.pathname;
  const isActive = pathname?.split("/")[2]?.toLowerCase() === "dashboard";
  const setIsDashboardSideBarOpen = useDashboardStore(
    (state) => state.setIsDashboardSideBarOpen
  );

  return (
    <Link href="/dashboard/dashboard" passHref>
      <a
        className={`w-full h-[40px] rounded-[4px] ${
          isActive ? "bg-[#EBF1FD] text-secondary" : "bg-secondary text-white"
        } flex items-center gap-2 pl-4 transition-all duration-500 hover:bg-[#EBF1FD] hover:text-secondary group`}
        onClick={() => setIsDashboardSideBarOpen(false)}
      >
        <svg
          width="18"
          height="17"
          viewBox="0 0 18 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={
            isActive ? "fill-secondary" : "fill-[#fff] group-hover:fill-secondary"
          }
        >
          <path d="M7.56721 0.670181L1.8359 4.6821C1.11176 5.189 0.709122 6.04061 0.776915 6.92192L1.36443 14.5596C1.4383 15.5199 2.30842 16.2179 3.26189 16.0817L5.90324 15.7044C6.72432 15.5871 7.3342 14.8839 7.3342 14.0545V13C7.3342 12.0795 8.08039 11.3333 9.00087 11.3333C9.92134 11.3333 10.6675 12.0795 10.6675 13V14.0545C10.6675 14.8839 11.2774 15.5871 12.0985 15.7044L14.7398 16.0817C15.6933 16.2179 16.5634 15.5199 16.6373 14.5596L17.2248 6.92193C17.2926 6.04061 16.89 5.189 16.1658 4.6821L10.4345 0.670183C9.57372 0.0676223 8.42801 0.0676211 7.56721 0.670181Z" />
        </svg>
        <span className="mt-1">Dashboard</span>
      </a>
    </Link>
  );
}
