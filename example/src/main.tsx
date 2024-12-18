import "react-app-polyfill/ie11";
import "antd/dist/reset.css";
import "./index.css";

import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { routes } from "./routes";
import { TabPage } from "./pages/Tab/page";
import { AuthLayout } from "./components/AuthLayout";
import { ActivitiesProvider } from "./components/ActivitiesTab";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<ActivitiesProvider menus={routes}>
							<AuthLayout routes={routes} />
						</ActivitiesProvider>
					}
				>
					{routes.map((route) => (
						<Route
							key={route.id}
							path={route.path}
							element={<TabPage title={route.name} />}
						/>
					))}
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

ReactDOM.render(<App />, document.getElementById("root"));
