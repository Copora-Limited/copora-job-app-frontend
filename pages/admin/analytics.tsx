// pages/index.tsx
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";

const HomePage: React.FC = () => {
	return (
		<DashboardLayout>
			<h2 className="text-xl font-semibold">Home Page Content</h2>
			<p>This is where your home page content goes.</p>
		</DashboardLayout>
	);
};

export default HomePage;
