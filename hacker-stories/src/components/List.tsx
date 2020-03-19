import * as React from "react";
import ListItem from "./ListItem";

export interface ListProps {
	list: any;
	onRemoveItem: any;
}

const List: React.SFC<ListProps> = ({ list, onRemoveItem }) =>
	list.map((item: any) => (
		<ListItem key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
	));

export default List;
