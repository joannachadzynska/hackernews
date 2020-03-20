import * as React from "react";
import InputWithLabel from "./InputWithLabel";
import styles from "../App.module.css";

export interface SearchFormProps {
	searchTerm: string;
	onSearchInput: any;
	onSearchSubmit: any;
}

const SearchForm: React.SFC<SearchFormProps> = ({
	searchTerm,
	onSearchInput,
	onSearchSubmit
}) => {
	return (
		<form onSubmit={onSearchSubmit} className={styles.searchForm}>
			<InputWithLabel
				id='search'
				value={searchTerm}
				onInputChange={onSearchInput}
				isFocused>
				<strong>Search: </strong>
			</InputWithLabel>
			<button
				type='submit'
				disabled={!searchTerm}
				className={`${styles.button} ${styles.buttonLarge}`}>
				Submit
			</button>
		</form>
	);
};

export default SearchForm;
