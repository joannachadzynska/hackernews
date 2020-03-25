import React from "react";

export interface LastSearchesProps {
	lastSearches: any;
	onLastSearch: (searchTerm: any) => void;
}

const LastSearches: React.SFC<LastSearchesProps> = ({
	lastSearches,
	onLastSearch
}) => {
	return (
		<>
			{" "}
			{lastSearches.map((searchTerm: any, index: number) => (
				<button
					key={searchTerm + index}
					type='button'
					onClick={() => onLastSearch(searchTerm)}>
					{searchTerm}
				</button>
			))}
		</>
	);
};

export default LastSearches;
