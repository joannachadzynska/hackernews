import React, {
	useEffect,
	useReducer,
	useCallback,
	useState,
	useMemo
} from "react";
// import { Counter } from "./features/counter/Counter";
import { List, SearchForm } from "./components";
import useSemiPersistentState from "./customHooks/index";
import axios from "axios";
import { StoriesState, StoriesAction } from "./types";
import { Story } from "./components/+List/types";
import { StyledContainer, StyledHeadlinePrimary } from "./style";

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

const App = () => {
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
	}, [url, searchTerm]);

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
