import * as React from "react";
import { Activity } from "@ivliu/react-offscreen";
import { NavLink } from "react-router-dom";
import { theme } from "antd";
import { Layout, Menu } from "antd";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { ActivitiesTab } from "../ActivitiesTab";
import { useState, useEffect, useMemo } from "react";
import { useCachedTab } from "../ActivitiesTab/useCachedTab";
import type { MenuDataItem } from "@ant-design/pro-components";

const { Header, Content, Footer, Sider } = Layout;

export const AuthLayout = ({
	routes,
}: {
	routes: MenuDataItem[];
}) => {
	const location = useLocation();
	const currentPath = location.pathname;
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	const selectedKey = useMemo(() => {
		return (
			routes.find((route) => currentPath.includes(route.path as string))
				?.path || ""
		);
	}, [currentPath, routes]);

	const { tabs } = useCachedTab(routes);
	const [activeKey, setActiveKey] = useState(currentPath);

	useEffect(() => {
		setActiveKey(currentPath);
	}, [currentPath]);

	const menuItems = useMemo(() => {
		return routes.map((route) => ({
			key: route.path as string,
			label: <NavLink to={route.path as string}>{route.name}</NavLink>,
		}));
	}, [routes]);

	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Header style={{ padding: 0, background: colorBgContainer }}>
				<div
					style={{
						color: "#000",
						fontSize: "20px",
						padding: "0 24px",
						lineHeight: "64px",
					}}
				>
					React Offscreen Demo
				</div>
			</Header>
			<Layout>
				<Sider width={240} style={{ background: colorBgContainer }}>
					<Menu
						mode="inline"
						selectedKeys={[selectedKey]}
						style={{ height: "100%" }}
						items={menuItems}
					/>
				</Sider>
				<Layout style={{ padding: "24px" }}>
					<Header
						style={{
							height: 40,
							padding: 0,
							marginBottom: 16,
							background: colorBgContainer,
						}}
					>
						<ActivitiesTab activeKey={activeKey} />
					</Header>
					<Content
						style={{
							padding: 24,
							margin: 0,
							minHeight: 280,
							background: colorBgContainer,
						}}
					>
						{tabs.map((route) => (
							<Activity
								key={route.path}
								mode={activeKey === route.path ? "visible" : "hidden"}
							>
								<Outlet />
							</Activity>
						))}
					</Content>
					<Footer style={{ textAlign: "center" }}>
						React Offscreen Demo ©{new Date().getFullYear()}
					</Footer>
				</Layout>
			</Layout>
		</Layout>
	);
};