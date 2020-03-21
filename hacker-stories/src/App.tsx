import React, {
	useEffect,
	useReducer,
	useCallback,
	useState,
	useMemo
} from "react";
// import { Counter } from "./features/counter/Counter";

import List from "./components/List";
import useSemiPersistentState from "./customHooks/index";
import axios from "axios";

import styled from "styled-components";
import SearchForm from "./components/SearchForm";
import { Story, Stories } from "./types/types";

type StoriesState = {
	data: Stories;
	isLoading: boolean;
	isError: boolean;
};

interface StoriesFetchInitAction {
	type: "STORIES_FETCH_INIT";
}

interface StoriesFetchSuccessAction {
	type: "STORIES_FETCH_SUCCESS";
	payload: Stories;
}

interface StoriesFetchFailureAction {
	type: "STORIES_FETCH_FAILURE";
}

interface StoriesRemoveAction {
	type: "REMOVE_STORY";
	payload: Story;
}

type StoriesAction =
	| StoriesFetchInitAction
	| StoriesFetchSuccessAction
	| StoriesFetchFailureAction
	| StoriesRemoveAction;

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

export const storiesReducer = (state: StoriesState, action: StoriesAction) => {
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

const getSumComments = (stories: any) => {
	console.log("C");
	return stories.data.reduce(
		(result: any, value: any) => result + value.num_comments,
		0
	);
};

const App: React.SFC<AppProps> = () => {
	console.log("B:App");

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
			dispatchStories({ type: "STORIES_FETCH_FAILURE" });
		}
	}, [url]);

	useEffect(() => {
		handleFetchStories();
	}, [handleFetchStories]);

	const handleRemoveStory = useCallback((item: Story) => {
		dispatchStories({
			type: "REMOVE_STORY",
			payload: item
		});
	}, []);

	const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setUrl(`${API_ENDPOINT}${searchTerm}`);
	};

	const sumComments = useMemo(() => getSumComments(stories), [stories]);
	return (
		<StyledContainer>
			<StyledHeadlinePrimary>
				My Hacker Stories with {sumComments} comments.
			</StyledHeadlinePrimary>

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
