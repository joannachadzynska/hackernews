import React, { useEffect, useReducer, useCallback, useState } from "react";
// import { Counter } from "./features/counter/Counter";
// import styles from "./App.module.css";
import List from "./components/List";
import useSemiPersistentState from "./customHooks/index";
import axios from "axios";
import { ReactComponent as Check } from "./assets/logo.svg";
import styled from "styled-components";
import SearchForm from "./components/SearchForm";

export interface AppProps {}

const StyledContainer = styled.div`
	height: 100vw;
	padding: 1.25rem;
	background: #83a4d4;
	background: linear-gradient(to left, #b6fbff, #83a4d4);
	color: #171212;
`;

const StyledHeadlinePrimary = styled.h1`
	font-size: 3rem;
	font-weight: 300;
	letter-spacing: 2px;
`;

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

export const storiesReducer = (state: any, action: any) => {
	switch (action.type) {
		case "STORIES_FETCH_INIT":
			return {
				...state,
				isLoading: true,
				isError: false
			};

		case "STORIES_FETCH_SUCCESS":
			return {
				...state,
				isLoading: false,
				isError: false,
				data: action.payload
			};

		case "STORIES_FETCH_FAILURE":
			return {
				...state,
				isLoading: false,
				isError: true
			};

		case "REMOVE_STORY":
			return {
				...state,
				data: state.data.filter(
					(story: any) => action.payload.objectID !== story.objectID
				)
			};

		default:
			throw new Error();
	}
};

// const getAsyncStories = () =>
// 	new Promise((resolve) =>
// 		setTimeout(() => resolve({ data: { stories: initialStories } }), 2000)
// 	);

const App: React.SFC<AppProps> = () => {
	const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "React");

	const [url, setUrl] = useState(`${API_ENDPOINT}${searchTerm}`);

	const [stories, dispatchStories] = useReducer(storiesReducer, {
		data: [],
		isLoading: false,
		isError: false
	});

	const handleFetchStories = useCallback(async () => {
		if (!searchTerm) return;
		dispatchStories({ type: "STORIES_FETCH_INIT" });

		try {
			const result = await axios.get(url);

			dispatchStories({
				type: "STORIES_FETCH_SUCCESS",
				payload: result.data.hits
			});
		} catch {
			dispatchStories({ type: "STORES_FETCH_FAILURE" });
		}
	}, [url]);

	useEffect(() => {
		handleFetchStories();
	}, [handleFetchStories]);

	const handleRemoveStory = (item: any) => {
		dispatchStories({
			type: "REMOVE_STORY",
			payload: item
		});
	};

	// const getTitle = (title: string) => title;

	const handleSearchInput = (e: any) => {
		setSearchTerm(e.target.value);
	};

	const handleSearchSubmit = (e: any) => {
		e.preventDefault();
		setUrl(`${API_ENDPOINT}${searchTerm}`);
	};

	// const searchedStories = stories.data.filter((story: any) =>
	// 	story.title.toLowerCase().includes(searchTerm.toLowerCase())
	// );

	return (
		<StyledContainer>
			{/* <h1>Hello, {getTitle("React with typeScript")}</h1> */}

			<StyledHeadlinePrimary>My Hacker Stories</StyledHeadlinePrimary>

			<SearchForm
				searchTerm={searchTerm}
				onSearchInput={handleSearchInput}
				onSearchSubmit={handleSearchSubmit}
			/>

			{/* <header className='App-header'>
				<Counter />
			</header> */}
			<hr />

			{stories.isError && <p>Something went wrong ...</p>}

			{stories.isLoading ? (
				<p>Loading...</p>
			) : (
				<List list={stories.data} onRemoveItem={handleRemoveStory} />
			)}
		</StyledContainer>
	);
};

export default App;
