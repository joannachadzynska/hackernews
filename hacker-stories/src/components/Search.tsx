import React from "react";
import InputWithLabel from "./InputWithLabel";

export interface SearchProps {
	onSearch: any;
	search: string;
}

const Search: React.SFC<SearchProps> = ({ onSearch, search }) => {
	return (
		<div>
			{/* <InputWithLabel
				id='search'
				name='search'
				type='text'
				value={search}
				onInputChange={onSearch}
			/> */}
		</div>
	);
};

export default Search;
