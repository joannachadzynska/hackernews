import React from "react";
// import { Counter } from "./features/counter/Counter";
import "./App.css";
import List from "./components/List";
import Search from "./components/Search";
import useSemiPersistentState from "./customHooks/index";

export interface AppProps {}

const App: React.SFC<AppProps> = () => {
	const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "React");

	// const getTitle = (title: string) => title;
	const stories = [
		{
			title: "React",
			url: "https://reactjs.org",
			author: "Jordan Walke",
			num_comments: 3,
			points: 4,
			objectID: 0
		},
		{
			title: "Redux",
			url: "https://redux.js.org",
			author: "Dan Abramov, Andrew Clark",
			num_comments: 2,
			points: 5,
			objectID: 1
		}
	];

	const handleSearch = (e: any) => {
		setSearchTerm(e.target.value);
	};

	const searchedStories = stories.filter((story) =>
		story.title.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className='App'>
			{/* <h1>Hello, {getTitle("React with typeScript")}</h1> */}
			<h1>My Hacker Stories</h1>
			<Search onSearch={handleSearch} search={searchTerm} />
			{/* <header className='App-header'>
				<Counter />
			</header> */}
			<hr />
			<List list={searchedStories} />
		</div>
	);
};

export default App;
