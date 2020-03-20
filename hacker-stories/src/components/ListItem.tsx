import React from "react";
import styles from "../App.module.css";
import styled from "styled-components";
import { StyledButtonSmall } from "./StyledButton";

const StyledItem = styled.div`
	display: flex;
	align-items: center;
	padding-bottom: 5px;
`;

const StyledColumn = styled.span<{ width: string }>`
	padding: 0 5px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;

	a {
		color: inherit;
	}

	width: ${(props) => props.width};
`;

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
		<StyledItem>
			<StyledColumn width='40%'>
				<a href={url}>{title}</a>
			</StyledColumn>
			<StyledColumn width='30%'>{author}</StyledColumn>
			<StyledColumn width='10%'>{num_comments}</StyledColumn>
			<StyledColumn width='10%'>{points}</StyledColumn>
			<StyledColumn width='10%'>
				<StyledButtonSmall
					onClick={handleRemoveItem}
					type='button'
					className={`${styles.button} ${styles.buttonSmall}`}>
					Dismiss
				</StyledButtonSmall>
			</StyledColumn>
		</StyledItem>
	);
};

export default ListItem;
