import React from "react";

export interface SearchFormProps {
	searchTerm: string;
	onSearchInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSearchSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
