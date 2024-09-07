import { Menu } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faEllipsisVertical,
	faEdit,
	faTrashAlt,
	faEye,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link"; // Assuming you are using Next.js

interface ActionMenuProps {
	userId: string | number;
}

const ActionMenu: React.FC<ActionMenuProps> = ({ userId }) => {
	return (
		<div className="relative">
			<Menu>
				<Menu.Button className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-300">
					<FontAwesomeIcon icon={faEllipsisVertical} />
				</Menu.Button>
				<Menu.Items className="absolute right-0 w-48 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
					<div className="p-1">
						{menuItems.map((item) => (
							<Menu.Item key={item.label}>
								{({ active }) => (
									<ActionItem
										href={item.href ? item.href(userId) : undefined}
										active={active}
										icon={item.icon}
										label={item.label}
										onClick={
											item.onClick ? () => item.onClick(userId) : undefined
										}
									/>
								)}
							</Menu.Item>
						))}
					</div>
				</Menu.Items>
			</Menu>
		</div>
	);
};

const menuItems = [
	{
		label: "View",
		href: (id: string | number) => `/admin/view/${id}`,
		icon: faEye,
	},
	{
		label: "Edit",
		href: (id: string | number) => `/admin/edit/${id}`,
		icon: faEdit,
	},
	{
		label: "Delete",
		onClick: (id: string | number) => handleDelete(id),
		icon: faTrashAlt,
	},
];

interface ActionItemProps {
	href?: string;
	active: boolean;
	icon: any;
	label: string;
	onClick?: () => void;
}

const ActionItem: React.FC<ActionItemProps> = ({
	href,
	active,
	icon,
	label,
	onClick,
}) => {
	return href ? (
		<Link
			href={href}
			className={`${
				active ? "bg-gray-100 dark:bg-gray-600" : ""
			} flex items-center w-full p-2`}>
			<FontAwesomeIcon icon={icon} />
			<span className="ms-2">{label}</span>
		</Link>
	) : (
		<button
			onClick={onClick}
			className={`${
				active ? "bg-gray-100 dark:bg-gray-600" : ""
			} flex items-center w-full p-2`}>
			<FontAwesomeIcon icon={icon} />
			<span className="ms-2">{label}</span>
		</button>
	);
};
function handleDelete(id: string | number) {
	throw new Error("Function not implemented.");
}

export default ActionMenu;
