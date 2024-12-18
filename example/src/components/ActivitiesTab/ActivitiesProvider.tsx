import * as React from "react";
import { createContext, useContext, type ReactNode } from "react";
import type { MenuDataItem } from "@ant-design/pro-components";
import { useCachedTab } from "./useCachedTab";
import type { TabItem } from "./Tab";

export interface IActivityContextType {
	tabs: TabItem[];
	setTabs: (tabs: TabItem[] | ((prev?: TabItem[]) => TabItem[])) => void;
	menus: MenuDataItem[];
}

const ActivityContext = createContext<IActivityContextType>({
	tabs: [],
	setTabs: () => {},
	menus: [],
});

export interface IActivitiesProviderProps {
	children: ReactNode;
	menus: MenuDataItem[];
}

export const ActivitiesProvider = ({
	children,
	menus,
}: IActivitiesProviderProps) => {
	const { tabs, setTabs } = useCachedTab(menus);

	return (
		<ActivityContext.Provider
			value={{
				tabs,
				setTabs,
				menus,
			}}
		>
			{children}
		</ActivityContext.Provider>
	);
};

export const useActivity = () => {
	const context = useContext(ActivityContext);

	if (!context) {
		throw new Error("useActivity must be used within ActivitiesProvider");
	}

	return context;
};
