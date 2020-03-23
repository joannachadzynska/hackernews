import React from "react";
import { StyledButtonSmall } from "../shared/Button/style";
import { ReactComponent as Check } from "../../assets/logo.svg";
import { ListItemProps } from "./types";
import { StyledItem, StyledColumn } from "./style";

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
				<StyledButtonSmall onClick={handleRemoveItem} type='button'>
					<Check height='18px' width='18px' />
				</StyledButtonSmall>
			</StyledColumn>
		</StyledItem>
	);
};

export default ListItem;
