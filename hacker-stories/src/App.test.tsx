import React from "react";
import renderer from "react-test-renderer";
import axios from "axios";

// import { render } from "@testing-library/react";
// import { Provider } from "react-redux";
// import { store } from "./app/store";
import App from "./App";
import { List } from "./components";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

// test suite
// describe("something truthy", () => {
// 	// test case
// 	it("true to be true", () => {
// 		// test assertion
// 		expect(true).toBe(true);
// 	});

// 	// test case
// 	it("false to be false", () => {
// 		// assertion
// 		expect(false).toBe(false);
// 	});
// });

describe("App", () => {
	it("succeeds fetching data with a list", async () => {
		const list = [
			{
				title: "React",
				url: "https://reactjs.org/",
				author: "Jordan Walke",
				num_comments: 3,
				points: 4,
				objectID: "0"
			},
			{
				title: "Redux",
				url: "https://redux.js.org",
				author: "Dan Abramov, Andrew Clark",
				num_comments: 2,
				points: 5,
				objectID: "1"
			}
		];

		const promise = Promise.resolve({
			data: {
				hits: list
			}
		});

		mockedAxios.get.mockImplementationOnce(() => promise);

		let component: any;
		await renderer.act(async () => {
			component = renderer.create(<App />);
		});

		expect(component.root.findByType(List).props.list).toEqual(list);
	});

	it("fails fetching data with a list", async () => {
		const promise = Promise.reject();

		mockedAxios.get.mockImplementationOnce(() => promise);

		let component: any;

		await renderer.act(async () => {
			component = renderer.create(<App />);
		});

		expect(component.root.findByType("p").props.children).toEqual(
			"Something went wrong ..."
		);
	});
});
