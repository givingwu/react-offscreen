// biome-ignore lint/style/useImportType: <explanation>
import * as React from "react";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";

interface ITabContextMenuProps {
	children: React.ReactNode;
	tabKey: string;
	onClose?: (key: string) => void;
	onCloseOthers?: (key: string) => void;
	onCloseAll?: () => void;
}

export const TabContextMenu: React.FC<ITabContextMenuProps> = ({
	children,
	tabKey,
	onClose,
	onCloseOthers,
	onCloseAll,
}) => {
	const items: MenuProps["items"] = [
		{
			key: "close",
			label: "关闭标签页",
			onClick: () => onClose?.(tabKey),
		},
		{
			key: "closeOthers",
			label: "关闭其他标签页",
			onClick: () => onCloseOthers?.(tabKey),
		},
		{
			key: "closeAll",
			label: "关闭所有标签页",
			onClick: () => onCloseAll?.(),
		},
	];

	return (
		<Dropdown menu={{ items }} trigger={["contextMenu"]}>
			{children}
		</Dropdown>
	);
};
