import * as React from "react";
import ListItem from "./ListItem";

export interface ListProps {
	list: any;
	onRemoveItem: any;
}

const List: React.SFC<ListProps> = React.memo(({ list, onRemoveItem }) => {
	console.log("B:List");

	return list.map((item: any) => (
		<ListItem key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
	));
});

export default List;
