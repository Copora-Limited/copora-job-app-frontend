import React from "react";
import DashboardLayout from "@/components/DashboardLayout"; // Adjust the path as needed

export default function Analytics() {
	return (
		<DashboardLayout>
			<div className="flex-grow p-6 bg-gray-100">
				{/* <h1 className="text-3xl font-semibold text-primary mb-6">
					Admin Analytics Dashboard
				</h1> */}

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
					{/* Total Applications */}
					<div className="bg-white shadow rounded-lg p-6">
						<h2 className="text-xl font-semibold text-secondary">
							Total Applications
						</h2>
						<p className="mt-4 text-3xl font-bold text-primary">1,254</p>
					</div>

					{/* Applications Approved */}
					<div className="bg-white shadow rounded-lg p-6">
						<h2 className="text-xl font-semibold text-secondary">
							Applications Approved
						</h2>
						<p className="mt-4 text-3xl font-bold text-primary">853</p>
					</div>

					{/* Applications Rejected */}
					<div className="bg-white shadow rounded-lg p-6">
						<h2 className="text-xl font-semibold text-secondary">
							Applications Rejected
						</h2>
						<p className="mt-4 text-3xl font-bold text-primary">237</p>
					</div>

					{/* New Applications This Month */}
					<div className="bg-white shadow rounded-lg p-6">
						<h2 className="text-xl font-semibold text-secondary">
							New Applications This Month
						</h2>
						<p className="mt-4 text-3xl font-bold text-primary">108</p>
					</div>
				</div>

				{/* Analytics Charts */}
				<div className="bg-white shadow rounded-lg p-6 mb-6">
					<h2 className="text-2xl font-semibold text-primary mb-4">
						Application Trends
					</h2>
					<div className="h-64 bg-gray-200 rounded-lg">
						{/* Placeholder for chart */}
						<p className="text-center pt-24 text-lg">Chart Placeholder</p>
					</div>
				</div>

				{/* Recent Applications Table */}
				<div className="bg-white shadow rounded-lg p-6">
					<h2 className="text-2xl font-semibold text-primary mb-4">
						Recent Applications
					</h2>
					<div className="overflow-x-auto">
						<table className="min-w-full bg-white border border-gray-200">
							<thead className="bg-gray-50">
								<tr>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Applicant Name
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Position Applied
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Status
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Date Applied
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								<tr>
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
										John Doe
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										Software Engineer
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">
										Approved
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										Sep 3, 2024
									</td>
								</tr>
								<tr>
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
										Jane Smith
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										Product Manager
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-500">
										Pending
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										Sep 2, 2024
									</td>
								</tr>
								{/* Add more rows as needed */}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
}
