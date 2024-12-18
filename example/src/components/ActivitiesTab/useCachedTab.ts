import { useLocation } from "react-router-dom";
import { useCallback, useEffect } from "react";
import type { MenuDataItem } from "@ant-design/pro-components";
import { useSessionStorageState } from "ahooks";
import type { TabItem } from "./Tab";

const CACHED_SESSION_TABS = "CACHED_SESSION_TABS";

export const useCachedTab = (routes: MenuDataItem[]) => {
	const location = useLocation();
	const [tabs = [], setTabs] = useSessionStorageState<TabItem[]>(
		CACHED_SESSION_TABS,
		{
			defaultValue: [],
			// listenStorageChange: true,
		},
	);

	// 从路由配置中获取当前路由的配置
	const findRoute = useCallback(
		(path: string) => {
			return routes.find((route) => {
				// 支持动态路由匹配，如 /strategy/:businessType/list
				const pattern = new RegExp(
					`^${route.path?.replace(/:[^/]+/g, "[^/]+")}$`,
				);
				return pattern.test(path);
			});
		},
		[routes],
	);

	// 监听路由变化
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		console.log("location.path", location.pathname);
		const route = findRoute(location.pathname);
		console.log("route", route);

		if (route?.extendInfo?.keepAlive) {
			const samePathTab = tabs.find((tab) => tab.path === location.pathname);
			const sameSearchTab = tabs.find((tab) => tab.search === location.search);
			const existingTab = samePathTab && sameSearchTab;

			if (!existingTab) {
				// 添加新标签
				const newTab: TabItem = {
					label: route.name ?? route.title,
					closable: route.extendInfo?.closable ?? true,
					keepAlive: route.extendInfo?.keepAlive ?? true,
					path: route.path ?? "",
					search: location.search,
				};

				if (route.extendInfo?.tabMode === "single") {
					// 单标签模式：替换所有标签
					setTabs([newTab]);
				} else {
					// 多标签模式：添加新标签
					setTabs([...tabs, newTab]);
				}
			}
		}
	}, [location.pathname]);

	return {
		tabs,
		setTabs,
	};
};
