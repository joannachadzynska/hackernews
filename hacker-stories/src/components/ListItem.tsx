import React from "react";

export interface ListItemProps {
	item: {
		title: string;
		url: string;
		author: string;
		num_comments: number;
		points: number;
		objectID: number;
	};
	key: any;
	onRemoveItem: any;
}

const ListItem: React.SFC<ListItemProps> = ({ item, onRemoveItem }) => {
	const { title, url, author, num_comments, points } = item;
	const handleRemoveItem = () => {
		onRemoveItem(item);
	};

	return (
		<div>
			<span>
				<a href={url}>{title}</a>
			</span>
			<span>{author}</span>
			<span>{num_comments}</span>
			<span>{points}</span>
			<span>
				<button onClick={handleRemoveItem} type='button'>
					Dismiss
				</button>
			</span>
		</div>
	);
};

export default ListItem;
