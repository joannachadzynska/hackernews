import React, { useEffect, useCallback, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeStory, getStories } from "./features/stories/storiesSlice";
// components
// import { Counter } from "./features/counter/Counter";
import { List, SearchForm } from "./components";
import LastSearches from "./components/+Searches";

// utils
import { getUrl, extractSearchTerm } from "./utils/api";
import { getSumComments, getLastSearches } from "./utils/helpers";
import useSemiPersistentState from "./customHooks/index";

// used types
import { Story } from "./components/+List/types";

// styles
import { StyledContainer, StyledHeadlinePrimary } from "./style";
import { StyledButtonSmall } from "./components/shared/Button/style";

const App = () => {
	const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "React");
	const [urls, setUrls] = useState([getUrl(searchTerm, 0)]);
	const [isFetching, setIsFetching] = useState(false);
	const dispatch = useDispatch();
	const stories = useSelector((state: any) => state.stories);

	const handleFetchStories = useCallback(async () => {
		// if (!searchTerm) return;
		const lastUrl = urls[urls.length - 1];
		dispatch(getStories(lastUrl));
	}, [urls]);

	const handleSearch = (searchTerm: any, page: number) => {
		const url = getUrl(searchTerm, page);
		setUrls(urls.concat(url));
	};

	const handleMore = () => {
		const lastUrl = urls[urls.length - 1];
		const searchTerm = extractSearchTerm(lastUrl);
		handleSearch(searchTerm, stories.page + 1);
	};

	const fetchMoreOnScroll = useCallback(() => {
		setTimeout(() => {
			handleMore();
			setIsFetching(false);
		}, 2000);
	}, []);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		handleFetchStories();
	}, [handleFetchStories]);

	useEffect(() => {
		if (!isFetching) return;
		fetchMoreOnScroll();
	}, [isFetching, fetchMoreOnScroll]);

	const handleRemoveStory = useCallback(
		(item: Story) => {
			dispatch(removeStory(item));
		},
		[dispatch]
	);

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

	const handleScroll = () => {
		if (
			window.innerHeight + document.documentElement.scrollTop ===
				document.documentElement.offsetHeight ||
			!isFetching
		) {
			setIsFetching(true);
		} else {
			return;
		}
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
				<StyledButtonSmall onClick={handleMore}>More</StyledButtonSmall>
			)}
		</StyledContainer>
	);
};

export default App;
