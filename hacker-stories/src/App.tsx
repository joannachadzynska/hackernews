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

import { API_BASE, API_SEARCH, PARAM_SEARCH, PARAM_PAGE } from "./utils/api";

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
				data:
					action.payload.page === 0
						? action.payload.list
						: state.data.concat(action.payload.list),
				page: action.payload.page
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

const getUrl = (searchTerm: any, page: number) =>
	`${API_BASE}${API_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`;

const extractSearchTerm = (url: any) =>
	url
		.substring(url.lastIndexOf("?") + 1, url.lastIndexOf("&"))
		.replace(PARAM_SEARCH, "");

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

	const [urls, setUrls] = useState([getUrl(searchTerm, 0)]);

	const [stories, dispatchStories] = useReducer(storiesReducer, {
		data: [],
		page: 0,
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
				payload: {
					list: result.data.hits,
					page: result.data.page
				}
			});
		} catch {
			dispatchStories({ type: "STORIES_FETCH_FAILURE" });
		}
	}, [urls]);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		handleFetchStories();
		return () => window.removeEventListener("scroll", handleScroll);
	}, [handleFetchStories]);

	useEffect(() => {
		if (!stories.isLoading) return;
		fetchMoreOnScroll();
	}, [stories.isLoading]);

	const fetchMoreOnScroll = () => {
		setTimeout(() => {
			handleMore();
		}, 2000);
	};

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
		handleSearch(searchTerm, 0);
		setSearchTerm("");
	};

	const handleLastSearch = (searchTerm: any) => {
		setSearchTerm(searchTerm);
		handleSearch(searchTerm, 0);
	};

	const handleSearch = (searchTerm: any, page: number) => {
		const url = getUrl(searchTerm, page);
		setUrls(urls.concat(url));
	};

	const handleMore = () => {
		const lastUrl = urls[urls.length - 1];
		const searchTerm = extractSearchTerm(lastUrl);

		handleSearch(searchTerm, stories.page + 1);
	};

	const handleScroll = () => {
		if (
			window.innerHeight + document.documentElement.scrollTop !==
			document.documentElement.offsetHeight
		)
			return;

		console.log("Fetch more list items!");
		handleMore();
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

			<List list={stories.data} onRemoveItem={handleRemoveStory} />
			{stories.isLoading ? (
				<p>Loading...</p>
			) : (
				<button type='button' onClick={handleMore}>
					More
				</button>
			)}
		</StyledContainer>
	);
};

export default App;
