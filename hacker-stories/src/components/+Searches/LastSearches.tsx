import React from "react";
import { StyledButtonSmall } from "../shared/Button/style";

export interface LastSearchesProps {
	lastSearches: any;
	onLastSearch: (searchTerm: any) => void;
}

const LastSearches: React.SFC<LastSearchesProps> = ({
	lastSearches,
	onLastSearch
}) => {
	return (
		<div style={{ margin: "1rem 0" }}>
			<p>Last searches</p>
			<br />
			{lastSearches.map((searchTerm: any, index: number) => (
				<StyledButtonSmall
					key={searchTerm + index}
					type='button'
					onClick={() => onLastSearch(searchTerm)}>
					{searchTerm}
				</StyledButtonSmall>
			))}
		</div>
	);
};

export default LastSearches;
