// biome-ignore lint/style/useImportType: <explanation>
import * as React from "react";
import { DndContext, type DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
	SortableContext,
	horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableTab } from "./SortableTab";
import type { TabItem } from "./Tab";

interface ITabListProps {
	items: TabItem[];
	activeKey?: string;
	onChange?: (key: string) => void;
	onClose?: (key: string) => void;
	onSort?: (activeId: string, overId: string) => void;
}

export const TabList: React.FC<ITabListProps> = ({
	items,
	activeKey,
	onChange,
	onClose,
	onSort,
}) => {
	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (over && active.id !== over.id) {
			onSort?.(active.id as string, over.id as string);
		}
	};

	return (
		<DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
			<SortableContext
				items={items.map((item) => item.path)}
				strategy={horizontalListSortingStrategy}
			>
				<div className="flex items-center gap-2">
					{items.map((item) => (
						<SortableTab
							key={item.path}
							{...item}
							active={item.path === activeKey}
							onClick={() => onChange?.(item.path)}
							onClose={() => onClose?.(item.path)}
						/>
					))}
				</div>
			</SortableContext>
		</DndContext>
	);
};
