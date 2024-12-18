import * as React from "react";

export const Count = ({ title }: { title: string }) => {
	const [count, setCount] = React.useState(0);

	return (
		<div className="flex flex-col">
			<h1>{title}</h1>

			<button
				type="button"
				className="w-8 h-8 bg-slate-500"
				onClick={() => setCount(count + 1)}
			>
				{count}
			</button>
		</div>
	);
};