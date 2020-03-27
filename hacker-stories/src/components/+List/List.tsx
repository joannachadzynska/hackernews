import * as React from "react";
import { sortBy } from "lodash";
import ListItem from "./ListItem";
import { ListProps } from "./types";
import { StyledColumn, StyledItem } from "./style";
import { StyledButtonSmall } from "../shared/Button/style";

const List: React.SFC<ListProps> = ({ list, onRemoveItem }) => {
	const [sort, setSort] = React.useState({
		sortKey: "NONE",
		isReverse: false
	});

	const handleSort = (sortKey: string) => {
		const isReverse = sort.sortKey === sortKey && !sort.isReverse;
		setSort({ sortKey, isReverse });
	};

	const SORTS: any = {
		NONE: (list: ListProps) => list,
		TITLE: (list: ListProps) => sortBy(list, "title"),
		AUTHOR: (list: ListProps) => sortBy(list, "author"),
		COMMENT: (list: ListProps) => sortBy(list, "num_comments").reverse(),
		POINT: (list: ListProps) => sortBy(list, "points").reverse()
	};

	const sortFunction = SORTS[sort.sortKey];
	const sortedList = sort.isReverse
		? sortFunction(list).reverse()
		: sortFunction(list);

	return (
		<div style={{ margin: "1rem 0" }}>
			<StyledItem>
				<StyledColumn width='40%'>
					<StyledButtonSmall onClick={() => handleSort("TITLE")}>
						Title
					</StyledButtonSmall>
				</StyledColumn>
				<StyledColumn width='30%' onClick={() => handleSort("AUTHOR")}>
					<StyledButtonSmall>Author</StyledButtonSmall>
				</StyledColumn>
				<StyledColumn width='10%' onClick={() => handleSort("COMMENT")}>
					<StyledButtonSmall>Comments</StyledButtonSmall>
				</StyledColumn>
				<StyledColumn width='10%' onClick={() => handleSort("POINT")}>
					<StyledButtonSmall>Points</StyledButtonSmall>
				</StyledColumn>
				<StyledColumn width='10%'>Actions</StyledColumn>
			</StyledItem>
			{sortedList.map((item: any, index: number) => (
				<ListItem
					key={item.objectID + index}
					item={item}
					onRemoveItem={onRemoveItem}
				/>
			))}
		</div>
	);
};

export default List;
