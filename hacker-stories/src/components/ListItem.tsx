import React from "react";
import styles from "../App.module.css";

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
		<div className={styles.item}>
			<span>
				<a href={url}>{title}</a>
			</span>
			<span>{author}</span>
			<span>{num_comments}</span>
			<span>{points}</span>
			<span>
				<button
					onClick={handleRemoveItem}
					type='button'
					className={`${styles.button} ${styles.buttonSmall}`}>
					Dismiss
				</button>
			</span>
		</div>
	);
};

export default ListItem;
