import * as React from "react";
import ListItem from "./ListItem";
import { Stories, Story } from "../../types/types";

export interface ListProps {
	list: Stories;
	onRemoveItem: (item: Story) => void;
}

const List: React.SFC<ListProps> = ({ list, onRemoveItem }: ListProps) => {
	console.log("B:List");

	return (
		<>
			{list.map((item: any) => (
				<ListItem key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
			))}
		</>
	);
};

export default List;
