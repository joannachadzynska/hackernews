import React, {
	useEffect,
	useReducer,
	useCallback,
	useState,
	useMemo
} from "react";
import axios from "axios";

// import { Counter } from "./features/counter/Counter";
import { List, SearchForm } from "./components";
import useSemiPersistentState from "./customHooks/index";

import { StoriesState, StoriesAction } from "./types";
import { Story } from "./components/+List/types";
import { StyledContainer, StyledHeadlinePrimary } from "./style";
import LastSearches from "./components/+Searches";

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
	return stories.data.reduce(
		(result: any, value: any) => result + value.num_comments,
		0
	);
};

const getUrl = (searchTerm: any) => `${API_ENDPOINT}${searchTerm}`;

const extractSearchTerm = (url: any) => url.replace(API_ENDPOINT, "");

const getLastSearches = (urls: any) =>
	urls
		.reduce((result: any, url: any, index: any) => {
			const searchTerm = extractSearchTerm(url).toLowerCase();
			// const newResult = Array.from(new Set(result));

			if (index === 0) {
				return result.concat(searchTerm);
			}

			// if (newResult.includes(searchTerm)) {
			// 	return newResult;
			// }

			const previousSearchTerm = result[result.length - 1];
			const previousSearchTerm2 = result[result.length - 2];
			const previousSearchTerm3 = result[result.length - 3];
			const previousSearchTerm4 = result[result.length - 4];
			const previousSearchTerm5 = result[result.length - 5];

			if (
				searchTerm === previousSearchTerm ||
				searchTerm === previousSearchTerm2 ||
				searchTerm === previousSearchTerm3 ||
				searchTerm === previousSearchTerm4 ||
				searchTerm === previousSearchTerm5
			) {
				return result;
			} else {
				return result.concat(searchTerm);
			}
		}, [])
		.slice(1)
		.slice(-5);

const App = () => {
	const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "React");

	const [urls, setUrls] = useState([getUrl(searchTerm)]);

	const [stories, dispatchStories] = useReducer(storiesReducer, {
		data: [],
		isLoading: false,
		isError: false
	});

	const handleFetchStories = useCallback(async () => {
		// if (!searchTerm) return;
		dispatchStories({ type: "STORIES_FETCH_INIT" });

		try {
			const lastUrl = urls[urls.length - 1];
			const result = await axios.get(lastUrl);

			dispatchStories({
				type: "STORIES_FETCH_SUCCESS",
				payload: result.data.hits
			});
		} catch {
			dispatchStories({ type: "STORIES_FETCH_FAILURE" });
		}
	}, [urls]);

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
		handleSearch(searchTerm);
		setSearchTerm("");
	};

	const handleLastSearch = (searchTerm: any) => {
		setSearchTerm(searchTerm);
		handleSearch(searchTerm);
	};

	const handleSearch = (searchTerm: any) => {
		const url = getUrl(searchTerm);
		setUrls(urls.concat(url));
	};

	const lastSearches = getLastSearches(urls);

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

			<LastSearches
				lastSearches={lastSearches}
				onLastSearch={handleLastSearch}
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
