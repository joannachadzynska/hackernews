import React, { useEffect, useReducer } from "react";
// import { Counter } from "./features/counter/Counter";
import "./App.css";
import List from "./components/List";
import useSemiPersistentState from "./customHooks/index";
import InputWithLabel from "./components/InputWithLabel";
import { initialStories } from "./data/data.js";

export interface AppProps {}

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

const getAsyncStories = () =>
	// new Promise((resolve, reject) => setTimeout(() => reject, 2000));
	new Promise((resolve) =>
		setTimeout(() => resolve({ data: { stories: initialStories } }), 2000)
	);

const App: React.SFC<AppProps> = () => {
	const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "React");

	const [stories, dispatchStories] = useReducer(storiesReducer, {
		data: [],
		isLoading: false,
		isError: false
	});

	useEffect(() => {
		dispatchStories({ type: "STORIES_FETCH_INIT" });

		getAsyncStories()
			.then((result: any) => {
				dispatchStories({
					type: "STORIES_FETCH_SUCCESS",
					payload: result.data.stories
				});
			})
			.catch(() => dispatchStories({ type: "STORIES_FETCH_FAILURE" }));
	}, []);

	const handleRemoveStory = (item: any) => {
		dispatchStories({
			type: "REMOVE_STORY",
			payload: item
		});
	};

	// const getTitle = (title: string) => title;

	const handleSearch = (e: any) => {
		setSearchTerm(e.target.value);
	};

	const searchedStories = stories.data.filter((story: any) =>
		story.title.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className='App'>
			{/* <h1>Hello, {getTitle("React with typeScript")}</h1> */}
			<h1>My Hacker Stories</h1>

			<InputWithLabel
				id='search'
				value={searchTerm}
				onInputChange={handleSearch}
				isFocused>
				Search
			</InputWithLabel>

			{/* <Search onSearch={handleSearch} search={searchTerm} /> */}
			{/* <header className='App-header'>
				<Counter />
			</header> */}
			<hr />

			{stories.isError && <p>Something went wrong ...</p>}

			{stories.isLoading ? (
				<p>Loading...</p>
			) : (
				<List list={searchedStories} onRemoveItem={handleRemoveStory} />
			)}
		</div>
	);
};

export default App;
