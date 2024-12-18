// biome-ignore lint/style/useImportType: <explanation>
import * as React from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";
import clsx from "clsx";
import { TabContextMenu } from "./TabContextMenu";
import { useNavigate } from "react-router-dom";

export interface TabItem {
	label: string;
	path: string;
	search?: string;
	closable?: boolean;
	keepAlive?: boolean;
}

export interface ITabProps extends TabItem {
	active?: boolean;
	closable?: boolean;
	onClick?: () => void;
	onClose?: () => void;
	onCloseOthers?: () => void;
	onCloseAll?: () => void;
}

export const Tab: React.FC<ITabProps> = ({
	path,
	label,
	active,
	closable,
	onClick,
	onClose,
	onCloseOthers,
	onCloseAll,
}) => {
	const navigate = useNavigate();

	return (
		<TabContextMenu
			tabKey={path}
			onClose={onClose}
			onCloseOthers={onCloseOthers}
			onCloseAll={onCloseAll}
		>
			<div
				className={clsx(
					"flex items-center px-4 py-2 cursor-pointer border-b-2 max-h-10",
					"transition-all duration-200 ease-in-out",
					"hover:bg-gray-50",
					"group relative",
					{
						"border-primary border-b-2 border-blue-500 text-primary bg-primary/5":
							active,
						"border-transparent hover:text-primary": !active,
					},
				)}
			>
				{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
				<div
					onClick={onClick}
					className="mr-1 inline-flex items-center leading-none whitespace-nowrap"
				>
					{label}
				</div>
				{closable && (
					<Button
						type="text"
						size="small"
						className={clsx(
							"opacity-0 group-hover:opacity-100",
							"transition-opacity duration-200",
							"-mr-2 ml-1",
						)}
						icon={<CloseOutlined className="text-xs" />}
						onClick={(e) => {
							e.stopPropagation();
							onClose?.();
						}}
					/>
				)}
			</div>
		</TabContextMenu>
	);
};

export const TabList: React.FC<{
	items: TabItem[];
	activeKey?: string;
	onChange?: (key: string) => void;
	onClose?: (key: string) => void;
}> = ({ items, activeKey, onChange, onClose }) => {
	return (
		<div className="flex items-center gap-2 border-b border-gray-200">
			{items.map((item) => (
				<Tab
					key={item.path}
					{...item}
					active={item.path === activeKey}
					closable={item.closable}
					onClick={() => onChange?.(item.path)}
					onClose={() => onClose?.(item.path)}
				/>
			))}
		</div>
	);
};
