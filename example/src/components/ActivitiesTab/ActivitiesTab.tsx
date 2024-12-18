import * as React from "react";
import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { TabList } from "./TabList";
import { useActivity } from "./ActivitiesProvider";
import type { TabItem } from "./Tab";

export interface IActivitiesTabProps {
	activeKey: string;
	setActiveKey: (path: string) => void;
}

export const ActivitiesTab = memo<IActivitiesTabProps>(
	({ activeKey, setActiveKey }) => {
		const navigate = useNavigate();
		const { tabs, setTabs } = useActivity();

		const handleTabChange = useCallback(
			(path: string) => {
				setActiveKey(path);
				navigate(path);
			},
			[setActiveKey, navigate],
		);

		const handleClose = useCallback(
			(key: string) => {
				setTabs((prev?: TabItem[]) => {
					if (!prev) return [];

					const newTabs = prev.filter((tab) => tab.path !== key);
					// 如果关闭的是当前标签，跳转到最后一个标签
					if (key === activeKey && newTabs.length > 0) {
						navigate(newTabs[newTabs.length - 1].path);
					}
					return newTabs;
				});
			},
			[activeKey, navigate, setTabs],
		);

		const handleSort = useCallback(
			(activeId: string, overId: string) => {
				setTabs((prev?: TabItem[]) => {
					if (!prev) return [];

					const oldIndex = prev.findIndex((tab) => tab.path === activeId);
					const newIndex = prev.findIndex((tab) => tab.path === overId);

					const newTabs = [...prev];
					const [removed] = newTabs.splice(oldIndex, 1);
					newTabs.splice(newIndex, 0, removed);

					return newTabs;
				});
			},
			[setTabs],
		);

		return (
			<TabList
				items={tabs}
				activeKey={activeKey}
				onChange={handleTabChange}
				onClose={handleClose}
				onSort={handleSort}
			/>
		);
	},
);
