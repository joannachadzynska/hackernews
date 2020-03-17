import * as React from "react";
import ListItem from "./ListItem";

export interface ListProps {
	list: any;
}

const List: React.SFC<ListProps> = ({ list }) =>
	list.map((item: any) => <ListItem key={item.objectID} {...item} />);

export default List;
