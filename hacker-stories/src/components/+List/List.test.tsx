import React from "react";
import renderer from "react-test-renderer";

import ListItem from "./ListItem";
import List from "./List";

describe("ListItem", () => {
	const item = {
		title: "React",
		url: "https://reactjs.org/",
		author: "Jordan Walke",
		num_comments: 3,
		points: 4,
		objectID: "0"
	};

	const handleRemoveItem = jest.fn();

	let component: any;

	beforeEach(() => {
		component = renderer.create(
			<ListItem item={item} onRemoveItem={handleRemoveItem} />
		);
	});

	it("renders all properties", () => {
		expect(component.root.findByType("a").props.href).toEqual(
			"https://reactjs.org/"
		);

		// expect(
		// 	component.root.findAllByProps({ children: "Jordan Walke" }).length
		// ).toEqual(1);
	});

	it("calls onRemoveItem on button click", () => {
		component.root.findByType("button").props.onClick();

		expect(handleRemoveItem).toHaveBeenCalledTimes(1);
		expect(handleRemoveItem).toHaveBeenCalledWith(item);
		expect(component.root.findAllByType(ListItem).length).toEqual(1);
	});
});

describe("List", () => {
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

	const handleRemoveItem = jest.fn();

	it("renders two items", () => {
		const component = renderer.create(
			<List list={list} onRemoveItem={handleRemoveItem} />
		);
		expect(component.root.findAllByType(ListItem).length).toEqual(2);
	});
});
