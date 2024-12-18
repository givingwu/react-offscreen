import * as React from "react";
import { Count } from "../../components/Count";

export const TabPage = ({ title }: { title: string }) => {
	return (
		<div className={`tab-page tab-${title}`}>
			<Count title={title} />
		</div>
	);
};