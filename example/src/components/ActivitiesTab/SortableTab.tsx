import * as React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Tab } from "./Tab";
import type { ITabProps } from "./Tab";
import { useRef } from "react";
import { useLongPress } from "ahooks";

interface ISortableTabProps extends ITabProps {
	isDragging?: boolean;
}

export const SortableTab = (props: ISortableTabProps) => {
	const ref = useRef<HTMLDivElement>(null);
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({
			id: props.path,
		});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	useLongPress(
		() => {
			console.log("long press");
		},
		ref,
		{
			onLongPressEnd: () => {
				console.log("long press end");
			},
			onClick: props.onClick,
		},
	);

	return (
		<div
			ref={setNodeRef}
			style={style}
			className=" sort-wrapper flex items-center group"
			{...attributes}
			{...listeners}
		>
			<div ref={ref} className="tab-wrapper w-fit h-auto">
				<Tab {...props} onClick={undefined} />
			</div>
		</div>
	);
};
