import React from "react";

export interface SearchProps {
	onSearch: any;
	search: string;
}

const Search: React.SFC<SearchProps> = ({ onSearch, search }) => {
	return (
		<div>
			<label htmlFor='search'>Search: </label>
			<input
				type='text'
				id='search'
				name='search'
				onChange={onSearch}
				value={search}
			/>
		</div>
	);
};

export default Search;
