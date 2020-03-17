import React from "react";

export interface ListItemProps {
	title: string;
	url: string;
	author: string;
	num_comments: number;
	points: number;
	objectID: number;
}

const ListItem: React.SFC<ListItemProps> = ({
	title,
	url,
	author,
	num_comments,
	points
}) => {
	return (
		<div>
			<span>
				<a href={url}>{title}</a>
			</span>
			<span>{author}</span>
			<span>{num_comments}</span>
			<span>{points}</span>
		</div>
	);
};

export default ListItem;
