import * as React from "react";
import InputWithLabel from "../+InputWithLabel";
import { StyledButtonLarge } from "../shared/Button/style";
import { SearchFormProps } from "./types";
import { StyledSearchForm } from "./style";

const SearchForm: React.SFC<SearchFormProps> = ({
	searchTerm,
	onSearchInput,
	onSearchSubmit
}) => {
	return (
		<StyledSearchForm onSubmit={onSearchSubmit}>
			<InputWithLabel
				id='search'
				value={searchTerm}
				onInputChange={onSearchInput}
				isFocused>
				<strong>Search: </strong>
			</InputWithLabel>
			<StyledButtonLarge type='submit' disabled={!searchTerm}>
				Submit
			</StyledButtonLarge>
		</StyledSearchForm>
	);
};

export default SearchForm;
