// components/DashboardLayout.tsx
import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import TopNav from "./TopNav";
import SideNav from "./SideNav";
import Content from "./Content";
import publicRoutes from "@/publicRoute";

interface LayoutProps {
	children: ReactNode;
}

const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
	const { data: session } = useSession();
	const router = useRouter();
	const isPublicRoute = publicRoutes.includes(router.pathname);

	const userRole = session?.user?.role; // Get the user role from session data
	const userEmail = session?.user?.email; // Get the user role from session data
	const token = session?.user?.token; // Get the user role from session data
	const resetPassword = session?.user?.resetPassword; // Get the resetPassword status from session data

	const isApplicant = userRole === "applicant";

	useEffect(() => {
		if (isApplicant && !resetPassword) {
			router.push(`/auth/notify-me?email=${userEmail}&new=true`); // Redirect to reset-password page if necessary
		}
	}, [isApplicant, resetPassword, router]);

	return (
		<div className="flex flex-col h-screen">
			{!isPublicRoute && <TopNav />}
			<div className="flex flex-1">
				{!isPublicRoute && <SideNav isApplicant={isApplicant} />}
				<div className="flex-1">
					<Content />
					<div className="">{children}</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardLayout;
