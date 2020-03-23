import * as React from "react";
import InputWithLabel from "../+InputWithLabel";
import styled from "styled-components";
import { StyledButtonLarge } from "../StyledButton";

const StyledSearchForm = styled.form`
	padding: 10px 0 20px 0;
	display: flex;
	align-items: baseline;
	justify-content: space-around;
	width: 50%;
`;

export interface SearchFormProps {
	searchTerm: string;
	onSearchInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSearchSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

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
