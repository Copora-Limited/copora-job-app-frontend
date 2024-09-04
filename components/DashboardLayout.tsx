// components/DashboardLayout.tsx
import React, { ReactNode } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import TopNav from "./TopNav";
import SideNav from "./SideNav";
import Content from "./Content";
import publicRoutes from "@/publicRoute";

interface LayoutProps {
	children: ReactNode;
}

const DashboardLayout: React.FC<LayoutProps> = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const { data: session } = useSession();
	const router = useRouter();
	const isPublicRoute = publicRoutes.includes(router.pathname);

	const userRole = session?.user?.role; // Get the user role from session data
	const isApplicant = userRole === "applicant";

	return (
		<div className="flex flex-col h-screen">
			<TopNav />
			<div className="flex flex-1">
				{!isPublicRoute && <SideNav isApplicant={isApplicant} />}
				<div className="flex-1">
					<Content />
					<div className="p-8">{children}</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardLayout;
